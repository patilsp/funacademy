import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { ApiHttpError, handleApi, parseJsonBody, requireRole } from "@/lib/api";
import { prisma } from "@/lib/db";

/**
 * /api/parent/link — connect a parent account to a child account.
 *
 *   POST   { username }    → link the learner with that username
 *   DELETE ?studentId=…    → unlink that learner
 *
 * The child must exist and be a STUDENT. Parents discover the username from
 * their child ("What's your explorer username?").
 */

const linkSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9-]+$/, "Letters, numbers and dashes only"),
});

const unlinkSchema = z.object({
  studentId: z.string().min(1),
});

const handler = handleApi(async (req, res) => {
  // Only parents (and admins, for support) manage family links.
  const viewer = await requireRole(req, "PARENT", "ADMIN");

  if (req.method === "POST") {
    const { username } = await parseJsonBody(req, linkSchema);

    if (viewer.username === username) {
      throw new ApiHttpError(400, "That's your own username — link your child's instead");
    }

    const child = await prisma.user.findUnique({ where: { username } });
    if (!child || child.role !== "STUDENT") {
      throw new ApiHttpError(404, "We couldn't find a learner with that username");
    }

    const existing = await prisma.parentLink.findUnique({
      where: { parentUserId_studentUserId: { parentUserId: viewer.id, studentUserId: child.id } },
    });
    if (existing) {
      throw new ApiHttpError(409, "You already follow this learner");
    }

    await prisma.parentLink.create({
      data: { parentUserId: viewer.id, studentUserId: child.id },
    });

    res.status(201).json({
      child: { id: child.id, name: child.name, username: child.username },
    });
    return;
  }

  if (req.method === "DELETE") {
    const { studentId } = await parseJsonBody(req, unlinkSchema);
    const deleted = await prisma.parentLink.deleteMany({
      where: { parentUserId: viewer.id, studentUserId: studentId },
    });
    if (deleted.count === 0) {
      throw new ApiHttpError(404, "That learner is not linked to your account");
    }
    res.status(200).json({ ok: true });
    return;
  }

  res.setHeader("Allow", "POST, DELETE");
  res.status(405).json({ error: "Method not allowed" });
});

export default handler;
