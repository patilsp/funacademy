import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi } from "@/lib/api";
import { prisma } from "@/lib/db";

const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const unitId = Number(req.query.id);
  if (!Number.isInteger(unitId) || unitId <= 0) {
    throw new ApiHttpError(400, "Invalid unit id");
  }

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: {
      subject: {
        select: { id: true, name: true, class: { select: { grade: true } } },
      },
      lessons: {
        orderBy: { order: "asc" },
        include: { _count: { select: { questions: true } } },
      },
    },
  });
  if (!unit) {
    throw new ApiHttpError(404, "Unit not found");
  }

  res.status(200).json({ unit, lessons: unit.lessons });
});

export default handler;
