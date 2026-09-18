import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { ApiHttpError } from "@/lib/api";
import type { User } from "@prisma/client";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const verifyPassword = (
  password: string,
  hash: string,
): Promise<boolean> => bcrypt.compare(password, hash);

const usernameFromEmail = (email: string): string =>
  email
    .split("@")[0]
    ?.replace(/[._+]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 24) || "learner";

const ensureUniqueUsername = async (base: string): Promise<string> => {
  const clean = base || "learner";
  for (let i = 0; i < 50; i++) {
    const candidate = i === 0 ? clean : `${clean}-${i + 1}`;
    const exists = await prisma.user.findUnique({ where: { username: candidate } });
    if (!exists) return candidate;
    if (candidate.length > 28) continue;
  }
  return `${clean}-${Date.now().toString(36)}`;
};

export const registerUser = async (input: {
  email: string;
  name: string;
  username: string;
  password: string;
  grade?: number;
}): Promise<User> => {
  const existingByEmail = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existingByEmail) {
    throw new ApiHttpError(409, "An account with this email already exists");
  }
  const existingByUsername = await prisma.user.findUnique({
    where: { username: input.username },
  });
  if (existingByUsername) {
    throw new ApiHttpError(409, "This username is already taken");
  }

  const passwordHash = await hashPassword(input.password);
  let classId: number | undefined = undefined;
  if (input.grade) {
    const klass = await prisma.class.findUnique({ where: { grade: input.grade } });
    if (!klass) throw new ApiHttpError(400, "Class not found");
    classId = klass.id;
  }

  return prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      username: input.username,
      classId,
      credential: {
        create: { passwordHash },
      },
    },
  });
};

export const loginWithPassword = async (
  email: string,
  password: string,
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { credential: true },
  });
  const genericFailure = new ApiHttpError(401, "Invalid email or password");

  if (!user?.credential) throw genericFailure;

  if (user.credential.lockedUntil && user.credential.lockedUntil > new Date()) {
    throw new ApiHttpError(423, "Too many attempts. Try again later.");
  }

  const valid = await verifyPassword(password, user.credential.passwordHash);
  if (!valid) {
    const failed = user.credential.failedAttempts + 1;
    const lockedUntil =
      failed >= MAX_FAILED_ATTEMPTS
        ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
        : null;
    await prisma.userCredential.update({
      where: { userId: user.id },
      data: { failedAttempts: failed, lockedUntil },
    });
    throw genericFailure;
  }

  if (
    user.credential.failedAttempts > 0 ||
    user.credential.lockedUntil !== null
  ) {
    await prisma.userCredential.update({
      where: { userId: user.id },
      data: { failedAttempts: 0, lockedUntil: null },
    });
  }

  return user;
};

// ─── Google sign-in ──────────────────────────────────────────────────────────

export const googleIdTokenSchema = z.object({
  code: z.string().min(1).optional(),
  credential: z.string().min(1).optional(),
});

export const exchangeGoogleCode = async (code: string) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new ApiHttpError(
      500,
      "Google OAuth is not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)",
    );
  }
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ??
    "http://localhost:3000/api/auth/google";
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new ApiHttpError(401, "Google authorization failed", detail);
  }
  return (await response.json()) as {
    id_token: string;
    access_token?: string;
  };
};

/**
 * Verify a Google ID token (signature + claims) using Google's JWKS and
 * jose, then find-or-create the linked FunAcademy user.
 */
export const resolveGoogleUser = async (idToken: string): Promise<User> => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new ApiHttpError(
      500,
      "Google OAuth is not configured (GOOGLE_CLIENT_ID)",
    );
  }

  const { createRemoteJWKSet, jwtVerify } = await import("jose");
  const JWKS = createRemoteJWKSet(
    new URL("https://www.googleapis.com/oauth2/v3/certs"),
  );
  const { payload } = await jwtVerify(idToken, JWKS, {
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: clientId,
  });

  const sub = payload.sub;
  const email = typeof payload.email === "string" ? payload.email : null;
  const emailVerified = payload.email_verified === true;
  const name = typeof payload.name === "string" ? payload.name : null;
  const picture = typeof payload.picture === "string" ? payload.picture : null;

  if (!sub || !email) {
    throw new ApiHttpError(401, "Google account did not provide an email");
  }
  if (!emailVerified) {
    throw new ApiHttpError(401, "Google account email is not verified");
  }

  const identity = await prisma.googleIdentity.findUnique({
    where: { googleSub: sub },
    include: { user: true },
  });
  if (identity) {
    if (picture && picture !== identity.pictureUrl) {
      await prisma.googleIdentity.update({
        where: { id: identity.id },
        data: { pictureUrl: picture },
      });
    }
    return identity.user;
  }

  // New Google user: link by verified email if the account already exists,
  // otherwise create a fresh account.
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return prisma.googleIdentity
      .create({ data: { userId: existing.id, googleSub: sub, email, pictureUrl: picture } })
      .then(() => prisma.user.findUnique({ where: { id: existing.id } }).then((u) => u!));
  }

  const username = await ensureUniqueUsername(usernameFromEmail(email));
  return prisma.user.create({
    data: {
      email,
      name: name ?? username,
      username,
      pictureUrl: picture,
      googleIdentity: {
        create: { googleSub: sub, email, pictureUrl: picture },
      },
    },
  });
};
