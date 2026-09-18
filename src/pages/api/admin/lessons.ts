import type { NextApiRequest, NextApiResponse } from "next";

import {
  ApiHttpError,
  handleApi,
  parseJsonBody,
  requireAdmin,
} from "@/lib/api";
import { prisma } from "@/lib/db";
import { lessonCreateSchema, lessonUpdateSchema } from "@/lib/validation";

const getId = (req: NextApiRequest): number => {
  const id = Number(req.query.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiHttpError(400, "Invalid or missing ?id=");
  }
  return id;
};

const handler = handleApi(async (req, res) => {
  await requireAdmin(req);

  switch (req.method) {
    case "GET": {
      const unitId = req.query.unitId ? Number(req.query.unitId) : null;
      const lessons = await prisma.lesson.findMany({
        where: unitId ? { unitId } : undefined,
        orderBy: [{ unitId: "asc" }, { order: "asc" }],
        include: { _count: { select: { questions: true } } },
      });
      res.status(200).json({ lessons });
      return;
    }
    case "POST": {
      const input = await parseJsonBody(req, lessonCreateSchema);
      const unit = await prisma.unit.findUnique({ where: { id: input.unitId } });
      if (!unit) throw new ApiHttpError(404, "Unit not found");
      const created = await prisma.lesson.create({
        data: {
          unitId: input.unitId,
          order: input.order ?? 0,
          title: input.title,
          type: input.type,
          xpReward: input.xpReward,
        },
      });
      res.status(201).json({ lesson: created });
      return;
    }
    case "PATCH": {
      const id = getId(req);
      const input = await parseJsonBody(req, lessonUpdateSchema);
      const updated = await prisma.lesson.update({ where: { id }, data: input });
      res.status(200).json({ lesson: updated });
      return;
    }
    case "DELETE": {
      const id = getId(req);
      await prisma.lesson.delete({ where: { id } });
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
