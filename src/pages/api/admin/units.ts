import type { NextApiRequest, NextApiResponse } from "next";

import {
  ApiHttpError,
  handleApi,
  parseJsonBody,
  requireAdmin,
} from "@/lib/api";
import { prisma } from "@/lib/db";
import { unitCreateSchema, unitUpdateSchema } from "@/lib/validation";

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
      const subjectId = req.query.subjectId ? Number(req.query.subjectId) : null;
      const units = await prisma.unit.findMany({
        where: subjectId ? { subjectId } : undefined,
        orderBy: [{ subjectId: "asc" }, { order: "asc" }],
        include: { _count: { select: { lessons: true } } },
      });
      res.status(200).json({ units });
      return;
    }
    case "POST": {
      const input = await parseJsonBody(req, unitCreateSchema);
      const subject = await prisma.subject.findUnique({
        where: { id: input.subjectId },
      });
      if (!subject) throw new ApiHttpError(404, "Subject not found");
      const created = await prisma.unit.create({
        data: {
          subjectId: input.subjectId,
          order: input.order ?? 0,
          title: input.title,
          description: input.description,
        },
      });
      res.status(201).json({ unit: created });
      return;
    }
    case "PATCH": {
      const id = getId(req);
      const input = await parseJsonBody(req, unitUpdateSchema);
      const updated = await prisma.unit.update({ where: { id }, data: input });
      res.status(200).json({ unit: updated });
      return;
    }
    case "DELETE": {
      const id = getId(req);
      await prisma.unit.delete({ where: { id } });
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
