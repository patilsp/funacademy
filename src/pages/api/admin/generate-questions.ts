import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { ApiHttpError, handleApi, parseJsonBody, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/db";
import { generateQuestionsForLesson } from "@/lib/gemini";

/**
 * POST /api/admin/generate-questions
 *
 * Admin-only: ask Gemini for fresh kid-friendly questions for a lesson, then
 * store them as MULTIPLE_CHOICE questions (read-aloud enabled). Existing
 * questions are kept; new ones are appended after the current highest order.
 */

const generateSchema = z.object({
  lessonId: z.number().int().positive(),
  count: z.number().int().min(1).max(8).default(4),
});

const handler = handleApi(async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  await requireAdmin(req);
  const { lessonId, count } = await parseJsonBody(req, generateSchema);

  // The lesson must exist before we spend an AI call on it.
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) throw new ApiHttpError(404, "Lesson not found");

  const generated = await generateQuestionsForLesson(lessonId, count);

  // Append after the highest existing order so the kid sees them last.
  const last = await prisma.question.findFirst({
    where: { lessonId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const baseOrder = (last?.order ?? -1) + 1;

  const created = [];
  let order = baseOrder;
  for (const question of generated) {
    created.push(
      await prisma.question.create({
        data: {
          lessonId,
          order: order++,
          type: "MULTIPLE_CHOICE",
          prompt: question.prompt,
          emoji: question.emoji ?? null,
          speak: true, // read-aloud helps young kids
          options: {
            create: question.options.map((option, index) => ({
              order: index,
              text: option.text,
              emoji: option.emoji ?? null,
              isCorrect: index === question.correctIndex,
            })),
          },
        },
        include: { options: { orderBy: { order: "asc" } } },
      }),
    );
  }

  res.status(201).json({ created });
});

export default handler;
