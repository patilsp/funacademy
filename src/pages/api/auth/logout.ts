import type { NextApiRequest, NextApiResponse } from "next";

import { clearSessionCookie, handleApi } from "@/lib/api";
import { SESSION_COOKIE, destroySession } from "@/lib/session";

const handler = handleApi(async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  await destroySession(req.cookies[SESSION_COOKIE]);
  clearSessionCookie(res);
  res.status(204).end();
});

export default handler;
