import { createHash, randomBytes } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";

import { prisma } from "@/lib/db";
import type { Role } from "@prisma/client";

/**
 * Sessions: the browser receives a random 32-byte token in an httpOnly cookie;
 * only its SHA-256 hash is stored server-side. The cookie value is wrapped in
 * a signed JWT so middleware can cheaply reject missing/invalid cookies
 * without a database round trip.
 */

export const SESSION_COOKIE = "fa_session";
const SESSION_TTL_DAYS = 30;
const JWT_ISSUER = "funacademy";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ??
    "dev-only-secret-do-not-use-in-production-0123456789abcdef",
);

const jwtPayloadSchema = z.object({ sid: z.string().min(1) });

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  pictureUrl: string | null;
  role: Role;
  classId: number | null;
};

export const toSessionUser = (user: {
  id: string;
  email: string;
  name: string;
  username: string;
  pictureUrl: string | null;
  role: Role;
  classId: number | null;
}): SessionUser => user;

export const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

export const generateSessionToken = (): string => randomBytes(32).toString("hex");

export const sessionExpiry = (): Date =>
  new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

/** Sign the raw session token into a JWT used as the cookie value. */
export const signSessionJwt = async (tokenHash: string): Promise<string> =>
  new SignJWT({ sid: tokenHash })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_DAYS}d`)
    .sign(secret);

/**
 * Verify the JWT cookie and return the raw token hash to look up in the DB.
 * Returns null when the cookie is missing, malformed, or expired.
 */
export const verifySessionJwt = async (
  cookieValue: string | undefined,
): Promise<string | null> => {
  if (!cookieValue) return null;
  try {
    const { payload } = await jwtVerify(cookieValue, secret, {
      issuer: JWT_ISSUER,
    });
    const parsed = jwtPayloadSchema.safeParse(payload);
    return parsed.success ? parsed.data.sid : null;
  } catch {
    return null;
  }
};

/** Full session resolution: JWT check + DB lookup. Server-side only. */
export const getSessionUser = async (
  cookieValue: string | undefined,
): Promise<SessionUser | null> => {
  const tokenHash = await verifySessionJwt(cookieValue);
  if (!tokenHash) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return toSessionUser(session.user);
};

/** Create a DB session row + signed cookie value for a user. */
export const createSessionForUser = async (userId: string) => {
  const token = generateSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = sessionExpiry();
  await prisma.session.create({ data: { userId, tokenHash, expiresAt } });
  const jwt = await signSessionJwt(tokenHash);
  return { cookie: { name: SESSION_COOKIE, value: jwt, expiresAt } };
};

/** Delete a session by its token hash (logout). */
export const destroySession = async (cookieValue: string | undefined) => {
  const tokenHash = await verifySessionJwt(cookieValue);
  if (!tokenHash) return;
  await prisma.session
    .deleteMany({ where: { tokenHash } })
    .catch(() => undefined);
};
