import type { NextApiRequest, NextApiResponse } from "next";

import { handleApi } from "@/lib/api";
import { prisma } from "@/lib/db";

const handler = handleApi(async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const classes = await prisma.class.findMany({
    orderBy: { grade: "asc" },
    include: { _count: { select: { subjects: true, students: true } } },
  });
  res.status(200).json({ classes });
});

export default handler;
