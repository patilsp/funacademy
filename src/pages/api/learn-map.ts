import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi, requireUser } from "@/lib/api";
import { prisma } from "@/lib/db";

/**
 * GET /api/learn-map
 * Everything the quest map needs for the signed-in kid's class:
 * the three tracks with subjects, units, lessons and this kid's progress.
 */
const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const user = await requireUser(req);
  if (user.classId == null) {
    throw new ApiHttpError(409, "NO_CLASS", {
      message: "Pick your class to start your quest.",
    });
  }

  const [klass, progress] = await Promise.all([
    prisma.class.findUnique({ where: { id: user.classId } }),
    prisma.studentProgress.findMany({
      where: { userId: user.id },
      select: { lessonId: true, bestAccuracy: true },
    }),
  ]);
  if (!klass) {
    throw new ApiHttpError(404, "Class not found");
  }

  const completedLessonIds = new Set(progress.map((p) => p.lessonId));

  const subjects = await prisma.subject.findMany({
    where: { classId: klass.id },
    orderBy: { order: "asc" },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              order: true,
              title: true,
              type: true,
              xpReward: true,
              mission: true,
            },
          },
        },
      },
    },
  });

  const tracks = { MIND: [], TOOLS: [], CREATE: [] } as Record<
    "MIND" | "TOOLS" | "CREATE",
    {
      id: number;
      code: string;
      name: string;
      emoji: string;
      color: string;
      unitCount: number;
      lessonCount: number;
      doneCount: number;
      units: {
        id: number;
        order: number;
        title: string;
        description: string | null;
        lessons: { id: number; order: number; title: string; type: string; xpReward: number; completed: boolean; hasMission: boolean }[];
      }[];
    }[]
  >;

  for (const subject of subjects) {
    const track = subject.track as "MIND" | "TOOLS" | "CREATE";
    const units = subject.units.map((unit) => ({
      id: unit.id,
      order: unit.order,
      title: unit.title,
      description: unit.description,
      lessons: unit.lessons.map((lesson) => ({
        id: lesson.id,
        order: lesson.order,
        title: lesson.title,
        type: lesson.type,
        xpReward: lesson.xpReward,
        completed: completedLessonIds.has(lesson.id),
        hasMission: Boolean(lesson.mission),
      })),
    }));
    const lessonCount = units.reduce((sum, u) => sum + u.lessons.length, 0);
    const doneCount = units.reduce(
      (sum, u) => sum + u.lessons.filter((l) => l.completed).length,
      0,
    );
    tracks[track].push({
      id: subject.id,
      code: subject.code,
      name: subject.name,
      emoji: subject.emoji,
      color: subject.color,
      unitCount: units.length,
      lessonCount,
      doneCount,
      units,
    });
  }

  res.status(200).json({
    class: { id: klass.id, grade: klass.grade, name: klass.name },
    tracks,
    completedCount: completedLessonIds.size,
  });
});

export default handler;
