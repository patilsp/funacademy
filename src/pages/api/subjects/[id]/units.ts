import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi } from "@/lib/api";
import { prisma } from "@/lib/db";

const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const subjectId = Number(req.query.id);
  if (!Number.isInteger(subjectId) || subjectId <= 0) {
    throw new ApiHttpError(400, "Invalid subject id");
  }

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    include: {
      class: { select: { grade: true, name: true } },
      units: {
        orderBy: { order: "asc" },
        include: { _count: { select: { lessons: true } } },
      },
    },
  });
  if (!subject) {
    throw new ApiHttpError(404, "Subject not found");
  }

  res.status(200).json({ subject, units: subject.units });
});

export default handler;
