import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi, parseJsonBody, requireUser } from "@/lib/api";
import { prisma } from "@/lib/db";
import { z } from "zod";

const checkSchema = z.object({
  questionId: z.number().int().positive(),
  // MULTIPLE_CHOICE: chosen option id; WORD_TILES: ordered tile ids
  response: z.union([z.number().int(), z.array(z.number().int())]),
});

/**
 * POST /api/check — grade one answer server-side.
 * Correct answers never ship to the browser; kids get instant feedback
 * and the client only learns right/wrong.
 */
const handler = handleApi(async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const user = await requireUser(req);
  void user;
  const body = await parseJsonBody(req, checkSchema);

  const question = await prisma.question.findUnique({
    where: { id: body.questionId },
    include: { options: true },
  });
  if (!question) throw new ApiHttpError(404, "Question not found");

  let correct: boolean;
  if (question.type === "WORD_TILES") {
    if (!Array.isArray(body.response)) {
      throw new ApiHttpError(400, "WORD_TILES requires an array of tile ids");
    }
    const answerTiles = question.options
      .filter((o) => o.answerPos !== null)
      .sort((a, b) => (a.answerPos ?? 0) - (b.answerPos ?? 0))
      .map((o) => o.id);
    const response: number[] = body.response;
    correct =
      answerTiles.length === response.length &&
      answerTiles.every((id, i) => response[i] === id);
  } else {
    if (Array.isArray(body.response)) {
      throw new ApiHttpError(400, "MULTIPLE_CHOICE requires one option id");
    }
    const option = question.options.find((o) => o.id === body.response);
    correct = Boolean(option?.isCorrect);
  }

  res.status(200).json({ correct });
});

export default handler;
