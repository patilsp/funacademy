import type { NextApiRequest, NextApiResponse } from "next";

import {
  ApiHttpError,
  handleApi,
  parseJsonBody,
  requireAdmin,
} from "@/lib/api";
import { prisma } from "@/lib/db";
import { subjectCreateSchema, subjectUpdateSchema } from "@/lib/validation";

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
      const classId = req.query.classId ? Number(req.query.classId) : null;
      const subjects = await prisma.subject.findMany({
        where: classId ? { classId } : undefined,
        orderBy: [{ classId: "asc" }, { order: "asc" }],
        include: { _count: { select: { units: true } } },
      });
      res.status(200).json({ subjects });
      return;
    }
    case "POST": {
      const input = await parseJsonBody(req, subjectCreateSchema);
      const klass = await prisma.class.findUnique({
        where: { grade: input.classId },
      });
      if (!klass) throw new ApiHttpError(404, `Class ${input.classId} not found`);
      const created = await prisma.subject.create({
        data: {
          classId: klass.id,
          code: input.code,
          name: input.name,
          description: input.description,
          order: input.order ?? 0,
        },
      });
      res.status(201).json({ subject: created });
      return;
    }
    case "PATCH": {
      const id = getId(req);
      const input = await parseJsonBody(req, subjectUpdateSchema);
      const updated = await prisma.subject.update({ where: { id }, data: input });
      res.status(200).json({ subject: updated });
      return;
    }
    case "DELETE": {
      const id = getId(req);
      await prisma.subject.delete({ where: { id } });
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
