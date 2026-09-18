import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi } from "@/lib/api";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/session";

const stripAnswers = (
  questions: {
    options: { isCorrect: boolean }[];
  }[],
) =>
  questions.map((q) => ({
    ...q,
    options: q.options.map(({ isCorrect: _isCorrect, ...option }) => option),
  }));

const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const lessonId = Number(req.query.id);
  if (!Number.isInteger(lessonId) || lessonId <= 0) {
    throw new ApiHttpError(400, "Invalid lesson id");
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      unit: {
        select: {
          id: true,
          title: true,
          subject: { select: { id: true, name: true, class: { select: { grade: true } } } },
        },
      },
      questions: {
        orderBy: { order: "asc" },
        include: { options: { orderBy: { order: "asc" } } },
      },
    },
  });
  if (!lesson) {
    throw new ApiHttpError(404, "Lesson not found");
  }

  const viewer = await getSessionUser(req.cookies[SESSION_COOKIE]);
  const isAdmin = viewer?.role === "ADMIN";

  res.status(200).json({
    lesson: {
      ...lesson,
      questions: isAdmin ? lesson.questions : stripAnswers(lesson.questions),
    },
  });
});

export default handler;
