import type { NextApiRequest, NextApiResponse } from "next";

import { handleApi, requireRole } from "@/lib/api";
import { prisma } from "@/lib/db";

/**
 * GET /api/parent/overview
 *
 * Family HQ data for the signed-in PARENT (or ADMIN): every linked child with
 * their totals (XP, lessons, missions), a computed streak, XP for the last 7
 * days (for the mini bar chart), and their most recent lessons + missions.
 */

const DAY_MS = 86_400_000;

const dateKey = (d: Date): string => d.toISOString().slice(0, 10);

/**
 * Current streak = consecutive practice days ending today (or yesterday, so a
 * streak isn't shown as broken before the kid has practiced today).
 */
const computeStreak = (dates: Date[]): number => {
  if (dates.length === 0) return 0;
  const keys = new Set(dates.map(dateKey));
  const now = new Date();
  let cursor = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (!keys.has(dateKey(cursor))) {
    cursor = new Date(cursor.getTime() - DAY_MS);
    if (!keys.has(dateKey(cursor))) return 0;
  }
  let streak = 0;
  while (keys.has(dateKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }
  return streak;
};

// Class animal avatar — same mapping as the /learn and /signup class pickers.
const CLASS_ANIMALS = ["🐣", "🐥", "🦊", "🐼", "🦄", "🦁", "🐉"];
const avatarFor = (grade: number | null): string =>
  grade && grade >= 1 && grade <= 7 ? CLASS_ANIMALS[grade - 1] ?? "🦉" : "🦉";

/** Fill the last 7 days (oldest → newest) with XP, defaulting to 0. */
const xpLast7 = (
  entries: { date: Date; xpEarned: number }[],
): { date: string; xp: number }[] => {
  const byDate = new Map<string, number>();
  for (const entry of entries) byDate.set(dateKey(entry.date), entry.xpEarned);
  const days: { date: string; xp: number }[] = [];
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  for (let i = 6; i >= 0; i--) {
    const key = dateKey(new Date(today - i * DAY_MS));
    days.push({ date: key, xp: byDate.get(key) ?? 0 });
  }
  return days;
};

const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Only grown-ups may peek at the Family HQ.
  const viewer = await requireRole(req, "PARENT", "ADMIN");

  const links = await prisma.parentLink.findMany({
    where: { parentUserId: viewer.id },
    include: {
      student: {
        include: {
          class: { select: { grade: true } },
          activity: { orderBy: { date: "desc" } },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const children = await Promise.all(
    links.map(async (link) => {
      const student = link.student;

      const [totalXp, lessonsCompleted, missionsDone, recentLessons, recentMissions] =
        await Promise.all([
          prisma.activityLog.aggregate({
            where: { userId: student.id },
            _sum: { xpEarned: true },
          }),
          prisma.studentProgress.count({ where: { userId: student.id } }),
          prisma.missionLog.count({ where: { userId: student.id } }),
          prisma.studentProgress.findMany({
            where: { userId: student.id },
            orderBy: { completedAt: "desc" },
            take: 6,
            include: {
              lesson: {
                select: {
                  id: true,
                  title: true,
                  unit: {
                    select: {
                      subject: { select: { name: true, emoji: true, color: true } },
                    },
                  },
                },
              },
            },
          }),
          prisma.missionLog.findMany({
            where: { userId: student.id },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { lesson: { select: { id: true, title: true } } },
          }),
        ]);

      return {
        id: student.id,
        name: student.name,
        username: student.username,
        grade: student.class?.grade ?? null,
        avatar: avatarFor(student.class?.grade ?? null),
        totalXp: totalXp._sum.xpEarned ?? 0,
        lessonsCompleted,
        missionsDone,
        streak: computeStreak(student.activity.map((a) => a.date)),
        xpLast7: xpLast7(student.activity),
        recentLessons: recentLessons.map((p) => ({
          lessonId: p.lesson.id,
          title: p.lesson.title,
          subjectName: p.lesson.unit.subject.name,
          subjectEmoji: p.lesson.unit.subject.emoji,
          subjectColor: p.lesson.unit.subject.color,
          completedAt: p.completedAt.toISOString(),
          bestAccuracy: p.bestAccuracy,
        })),
        recentMissions: recentMissions.map((m) => ({
          mission: m.mission,
          lessonTitle: m.lesson.title,
          xpEarned: m.xpEarned,
          createdAt: m.createdAt.toISOString(),
        })),
      };
    }),
  );

  res.status(200).json({ children });
});

export default handler;
