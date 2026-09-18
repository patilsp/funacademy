import type { NextApiRequest, NextApiResponse } from "next";

import {
  clearSessionCookie,
  handleApi,
  parseJsonBody,
  setSessionCookie,
} from "@/lib/api";
import { registerUser } from "@/lib/auth";
import { createSessionForUser } from "@/lib/session";
import { registerSchema } from "@/lib/validation";

const handler = handleApi(async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const input = await parseJsonBody(req, registerSchema);
  const user = await registerUser(input);
  const session = await createSessionForUser(user.id);

  setSessionCookie(res, session.cookie);
  res.status(201).json({
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
