import type { NextApiRequest, NextApiResponse } from "next";
import type { Role } from "@prisma/client";
import type { ZodType } from "zod";

import { SESSION_COOKIE, getSessionUser } from "@/lib/session";
import type { SessionUser } from "@/lib/session";

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> | void;

/** Standard JSON error shape used by every API route. */
export const apiError = (
  res: NextApiResponse,
  status: number,
  error: string,
  details?: unknown,
): void => {
  res.status(status).json({ error, ...(details ? { details } : {}) });
};

/** Throwable error carrying an HTTP status. */
export class ApiHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiHttpError";
  }
}

/** Wrap a handler so thrown errors become consistent JSON responses. */
export const handleApi =
  (handler: ApiHandler): ApiHandler =>
  async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof ApiHttpError) {
        apiError(res, error.status, error.message, error.details);
        return;
      }
      console.error("[api]", error);
      apiError(res, 500, "Internal server error");
    }
  };

export const readSessionCookie = (req: NextApiRequest): string | undefined =>
  req.cookies[SESSION_COOKIE];

const serializeSessionCookie = (value: string, expiresAt: Date): string =>
  [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Expires=${expiresAt.toUTCString()}`,
    ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
  ].join("; ");

export const setSessionCookie = (
  res: NextApiResponse,
  cookie: { name: string; value: string; expiresAt: Date },
): void => {
  res.setHeader("Set-Cookie", serializeSessionCookie(cookie.value, cookie.expiresAt));
};

export const clearSessionCookie = (res: NextApiResponse): void => {
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
};

/** Returns the signed-in user or throws 401. */
export const requireUser = async (req: NextApiRequest): Promise<SessionUser> => {
  const user = await getSessionUser(readSessionCookie(req));
  if (!user) throw new ApiHttpError(401, "Not authenticated");
  return user;
};

export const requireRole = async (
  req: NextApiRequest,
  ...roles: Role[]
): Promise<SessionUser> => {
  const user = await requireUser(req);
  if (!roles.includes(user.role)) throw new ApiHttpError(403, "Forbidden");
  return user;
};

export const requireAdmin = (req: NextApiRequest): Promise<SessionUser> =>
  requireRole(req, "ADMIN");

/** Parse + validate a JSON body with zod, throwing 400 on failure. */
export const parseJsonBody = async <T>(
  req: NextApiRequest,
  schema: ZodType<T>,
): Promise<T> => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    throw new ApiHttpError(400, "Invalid request body", result.error.flatten());
  }
  return result.data;
};
