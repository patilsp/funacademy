import type { NextApiRequest, NextApiResponse } from "next";

import {
  clearSessionCookie,
  handleApi,
  parseJsonBody,
  setSessionCookie,
} from "@/lib/api";
import { loginWithPassword } from "@/lib/auth";
import { createSessionForUser } from "@/lib/session";
import { loginSchema } from "@/lib/validation";

const handler = handleApi(async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password } = await parseJsonBody(req, loginSchema);
  const user = await loginWithPassword(email, password);
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
});

export default handler;
