import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { ApiHttpError, handleApi, parseJsonBody, requireUser } from "@/lib/api";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/session";

const patchSchema = z.object({
  grade: z.number().int().min(1).max(7).optional(),
  name: z.string().trim().min(1).max(80).optional(),
});

const handler = handleApi(async (req, res) => {
  if (req.method === "GET") {
    const user = await getSessionUser(req.cookies[SESSION_COOKIE]);
    res.status(200).json({ user });
    return;
  }

  if (req.method === "PATCH") {
    const me = await requireUser(req);
    const body = await parseJsonBody(req, patchSchema);

    let classId: number | undefined | null = undefined;
    if (body.grade !== undefined) {
      const klass = await prisma.class.findUnique({
        where: { grade: body.grade },
      });
      if (!klass) throw new ApiHttpError(400, "Class not found");
      classId = klass.id;
    }

    const updated = await prisma.user.update({
      where: { id: me.id },
      data: {
        ...(classId !== undefined ? { classId } : {}),
        ...(body.name !== undefined ? { name: body.name } : {}),
      },
    });

    res.status(200).json({
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        username: updated.username,
        pictureUrl: updated.pictureUrl,
        role: updated.role,
        classId: updated.classId,
      },
    });
    return;
  }

  res.setHeader("Allow", "GET, PATCH");
  res.status(405).json({ error: "Method not allowed" });
});

export default handler;
