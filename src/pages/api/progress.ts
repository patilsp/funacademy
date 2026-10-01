import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi, parseJsonBody, requireUser } from "@/lib/api";
import { prisma } from "@/lib/db";
import { upsertActivityLog } from "@/lib/activity";
import { z } from "zod";

const postSchema = z.object({
  lessonId: z.number().int().positive(),
  accuracy: z.number().int().min(0).max(100),
  score: z.number().int().min(0),
  totalQuestions: z.number().int().min(0),
  xpEarned: z.number().int().min(0).max(500),
});

/**
 * GET  /api/progress — this kid's completed lesson ids (and today's XP).
 * POST /api/progress — mark a lesson complete, award XP, log the activity.
 */
const handler = handleApi(async (req, res) => {
  const user = await requireUser(req);

  if (req.method === "GET") {
    const [progress, todayLog] = await Promise.all([
      prisma.studentProgress.findMany({
        where: { userId: user.id },
        select: { lessonId: true, bestAccuracy: true, timesCompleted: true },
      }),
      prisma.activityLog.findUnique({
        where: {
          userId_date: { userId: user.id, date: todayDateString() },
        },
      }),
    ]);
    res.status(200).json({
      progress,
      xpToday: todayLog?.xpEarned ?? 0,
    });
    return;
  }

  if (req.method === "POST") {
    const body = await parseJsonBody(req, postSchema);

    const lesson = await prisma.lesson.findUnique({
      where: { id: body.lessonId },
      select: { id: true, xpReward: true },
    });
    if (!lesson) throw new ApiHttpError(404, "Lesson not found");

    const existing = await prisma.studentProgress.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId: body.lessonId } },
    });

    // First completion awards full XP; replays award half (min 2).
    const alreadyDone = Boolean(existing);
    const xpAwarded = alreadyDone
      ? Math.max(2, Math.floor(lesson.xpReward / 2))
      : body.xpEarned;

    await prisma.$transaction([
      prisma.studentProgress.upsert({
        where: { userId_lessonId: { userId: user.id, lessonId: body.lessonId } },
        update: {
          timesCompleted: { increment: 1 },
          bestAccuracy: Math.max(existing?.bestAccuracy ?? 0, body.accuracy),
        },
        create: {
          userId: user.id,
          lessonId: body.lessonId,
          bestAccuracy: body.accuracy,
        },
      }),
      upsertActivityLog(user.id, xpAwarded),
    ]);

    res.status(200).json({ ok: true, xpAwarded, alreadyDone });
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.status(405).json({ error: "Method not allowed" });
});

const todayDateString = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};

export default handler;
