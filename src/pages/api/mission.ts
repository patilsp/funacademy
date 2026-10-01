import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi, parseJsonBody, requireUser } from "@/lib/api";
import { prisma } from "@/lib/db";
import { upsertActivityLog } from "@/lib/activity";
import { z } from "zod";

const postSchema = z.object({
  lessonId: z.number().int().positive(),
});

/**
 * POST /api/mission — parent/kid confirms the offline real-world mission.
 * One confirmation per lesson; awards missionXp once.
 */
const handler = handleApi(async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const user = await requireUser(req);
  const body = await parseJsonBody(req, postSchema);

  const lesson = await prisma.lesson.findUnique({
    where: { id: body.lessonId },
    select: { mission: true, missionXp: true },
  });
  if (!lesson) throw new ApiHttpError(404, "Lesson not found");
  if (!lesson.mission) {
    throw new ApiHttpError(400, "This lesson has no mission");
  }

  const existing = await prisma.missionLog.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId: body.lessonId } },
  });
  if (existing) {
    res.status(200).json({ ok: true, alreadyConfirmed: true, xpAwarded: 0 });
    return;
  }

  await prisma.$transaction([
    prisma.missionLog.create({
      data: {
        userId: user.id,
        lessonId: body.lessonId,
        mission: lesson.mission,
        xpEarned: lesson.missionXp,
      },
    }),
    upsertActivityLog(user.id, lesson.missionXp),
  ]);

  res.status(200).json({ ok: true, alreadyConfirmed: false, xpAwarded: lesson.missionXp });
});

export default handler;
