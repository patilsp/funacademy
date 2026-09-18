import type { NextApiRequest, NextApiResponse } from "next";

import { handleApi, requireUser, setSessionCookie } from "@/lib/api";
import { SESSION_COOKIE, createSessionForUser, getSessionUser } from "@/lib/session";

const handler = handleApi(async (req, res) => {
  switch (req.method) {
    case "GET": {
      const user = await getSessionUser(req.cookies[SESSION_COOKIE]);
      if (!user) {
        res.status(401).json({ user: null });
        return;
      }
      res.status(200).json({ user });
      return;
    }
    case "POST": {
      // Refresh: create a fresh session for the current user (rolling sessions).
      const user = await requireUser(req);
      const session = await createSessionForUser(user.id);
      setSessionCookie(res, session.cookie);
      res.status(200).json({ user });
      return;
    }
    default: {
      res.setHeader("Allow", "GET, POST");
      res.status(405).json({ error: "Method not allowed" });
    }
  }
});

export default handler;
