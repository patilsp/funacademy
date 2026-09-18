import type { NextApiRequest, NextApiResponse } from "next";

import {
  ApiHttpError,
  handleApi,
  parseJsonBody,
  requireAdmin,
} from "@/lib/api";
import { prisma } from "@/lib/db";
import { classCreateSchema, classUpdateSchema } from "@/lib/validation";

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
      const classes = await prisma.class.findMany({
        orderBy: { grade: "asc" },
        include: { _count: { select: { subjects: true, students: true } } },
      });
      res.status(200).json({ classes });
      return;
    }
    case "POST": {
      const input = await parseJsonBody(req, classCreateSchema);
      const exists = await prisma.class.findUnique({ where: { grade: input.grade } });
      if (exists) throw new ApiHttpError(409, `Class ${input.grade} already exists`);
      const created = await prisma.class.create({ data: input });
      res.status(201).json({ class: created });
      return;
    }
    case "PATCH": {
      const id = getId(req);
      const input = await parseJsonBody(req, classUpdateSchema);
      const updated = await prisma.class.update({ where: { id }, data: input });
      res.status(200).json({ class: updated });
      return;
    }
    case "DELETE": {
      const id = getId(req);
      await prisma.class.delete({ where: { id } });
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
