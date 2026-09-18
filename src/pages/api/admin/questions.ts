import type { NextApiRequest, NextApiResponse } from "next";
import type { Prisma } from "@prisma/client";

import {
  ApiHttpError,
  handleApi,
  parseJsonBody,
  requireAdmin,
} from "@/lib/api";
import { prisma } from "@/lib/db";
import { questionCreateSchema, questionUpdateSchema } from "@/lib/validation";

const getId = (req: NextApiRequest): number => {
  const id = Number(req.query.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiHttpError(400, "Invalid or missing ?id=");
  }
  return id;
};

/** Replace all options of a question in one transaction. */
const replaceOptions = async (
  questionId: number,
  options: { order: number; text: string; imageKey?: string | null; isCorrect: boolean }[],
) => {
  await prisma.$transaction([
    prisma.questionOption.deleteMany({ where: { questionId } }),
    ...options.map((option) =>
      prisma.questionOption.create({
        data: {
          questionId,
          order: option.order,
          text: option.text,
          imageKey: option.imageKey ?? null,
          isCorrect: option.isCorrect,
        },
      }),
    ),
  ]);
};

const handler = handleApi(async (req, res) => {
  await requireAdmin(req);

  switch (req.method) {
    case "GET": {
      const lessonId = req.query.lessonId ? Number(req.query.lessonId) : null;
      const questions = await prisma.question.findMany({
        where: lessonId ? { lessonId } : undefined,
        orderBy: [{ lessonId: "asc" }, { order: "asc" }],
        include: { options: { orderBy: { order: "asc" } } },
      });
      res.status(200).json({ questions });
      return;
    }
    case "POST": {
      const input = await parseJsonBody(req, questionCreateSchema);
      const lesson = await prisma.lesson.findUnique({
        where: { id: input.lessonId },
      });
      if (!lesson) throw new ApiHttpError(404, "Lesson not found");

      const count = await prisma.question.count({ where: { lessonId: input.lessonId } });
      const order = input.order ?? count;
      const created = await prisma.question.create({
        data: {
          lessonId: input.lessonId,
          order,
          type: input.type,
          prompt: input.prompt,
          imageKey: input.imageKey ?? null,
          options: {
            create: input.options.map((o) => ({
              order: o.order,
              text: o.text,
              imageKey: o.imageKey ?? null,
              isCorrect: o.isCorrect,
            })),
          },
        },
        include: { options: { orderBy: { order: "asc" } } },
      });
      res.status(201).json({ question: created });
      return;
    }
    case "PATCH": {
      const id = getId(req);
      const input = await parseJsonBody(req, questionUpdateSchema);
      const existing = await prisma.question.findUnique({ where: { id } });
      if (!existing) throw new ApiHttpError(404, "Question not found");

      const data: Prisma.QuestionUpdateInput = {};
      if (input.order !== undefined) data.order = input.order;
      if (input.type !== undefined) data.type = input.type;
      if (input.prompt !== undefined) data.prompt = input.prompt;
      if (input.imageKey !== undefined) data.imageKey = input.imageKey;

      const updated = await prisma.$transaction(async (tx) => {
        const q = await tx.question.update({ where: { id }, data });
        if (input.options) {
          await replaceOptions(id, input.options);
        }
        return tx.question.findUnique({
          where: { id },
          include: { options: { orderBy: { order: "asc" } } },
        });
      });
      res.status(200).json({ question: updated });
      return;
    }
    case "DELETE": {
      const id = getId(req);
      await prisma.question.delete({ where: { id } });
      res.status(204).end();
      return;
    }
    default: {
      res.setHeader("Allow", "GET, POST, PATCH, DELETE");
      res.status(405).json({ error: "Method not allowed" });
    }
  }
});

export default handler;
