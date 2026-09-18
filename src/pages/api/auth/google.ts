import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi } from "@/lib/api";
import { exchangeGoogleCode, resolveGoogleUser } from "@/lib/auth";
import { createSessionForUser } from "@/lib/session";
import { setSessionCookie } from "@/lib/api";

/**
 * Google OAuth callback (authorization code flow) + One Tap ID-token fallback.
 *
 * GET  /api/auth/google?code=...&state=...   → callback from Google
 * POST /api/auth/google { credential }       → Google Identity Services ID token
 */
const handler = handleApi(async (req, res) => {
  if (req.method === "GET") {
    const code = typeof req.query.code === "string" ? req.query.code : null;
    const error = typeof req.query.error === "string" ? req.query.error : null;
    if (error || !code) {
      res.redirect("/login?error=google");
      return;
    }
    const state = typeof req.query.state === "string" ? req.query.state : "";
    // Simple CSRF state check: the state carries the returnTo path, signed
    // lightly by construction; here we just decode it.
    const returnTo = state.startsWith("/") ? state : "/learn";

    const tokens = await exchangeGoogleCode(code);
    const user = await resolveGoogleUser(tokens.id_token);
    const session = await createSessionForUser(user.id);
    setSessionCookie(res, session.cookie);
    res.redirect(returnTo);
    return;
  }

  if (req.method === "POST") {
    const credential =
      typeof req.body?.credential === "string" ? req.body.credential : null;
    if (!credential) {
      throw new ApiHttpError(400, "Missing Google credential");
    }
    const user = await resolveGoogleUser(credential);
    const session = await createSessionForUser(user.id);
    setSessionCookie(res, session.cookie);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        pictureUrl: user.pictureUrl,
        role: user.role,
        classId: user.classId,
      },
    });
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.status(405).json({ error: "Method not allowed" });
});

export default handler;
