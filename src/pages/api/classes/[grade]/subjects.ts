import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHttpError, handleApi } from "@/lib/api";
import { prisma } from "@/lib/db";

const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const grade = Number(req.query.grade);
  if (!Number.isInteger(grade) || grade < 1 || grade > 7) {
    throw new ApiHttpError(400, "grade must be an integer between 1 and 7");
  }

  const klass = await prisma.class.findUnique({
    where: { grade },
    include: {
      subjects: {
        orderBy: { order: "asc" },
        include: { _count: { select: { units: true } } },
      },
    },
  });
  if (!klass) {
    throw new ApiHttpError(404, `Class ${grade} not found`);
  }

  res.status(200).json({ class: { id: klass.id, grade: klass.grade, name: klass.name }, subjects: klass.subjects });
});

export default handler;
