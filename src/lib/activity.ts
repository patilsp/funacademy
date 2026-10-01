import { prisma } from "@/lib/db";

/**
 * Upsert today's ActivityLog row for a user, adding the given XP.
 * Must be called inside a transaction with the progress write.
 */
export const upsertActivityLog = (userId: string, xpEarned: number) =>
  prisma.activityLog.upsert({
    where: {
      userId_date: { userId, date: todayUtcDate() },
    },
    update: { xpEarned: { increment: xpEarned } },
    create: { userId, date: todayUtcDate(), xpEarned },
  });

const todayUtcDate = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};
