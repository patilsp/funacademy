import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  name: z.string().trim().min(1, "Name is required").max(80),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-z0-9-]+$/, "Letters, numbers and dashes only"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  grade: z
    .number()
    .int()
    .min(1, "Class must be between 1 and 7")
    .max(7, "Class must be between 1 and 7")
    .optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required").max(128),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Admin content schemas ───────────────────────────────────────────────────

export const classCreateSchema = z.object({
  grade: z.number().int().min(1).max(7),
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(500).optional(),
});

export const classUpdateSchema = z.object({
  grade: z.number().int().min(1).max(7).optional(),
  name: z.string().trim().min(1).max(80).optional(),
  description: z.string().trim().max(500).nullable().optional(),
});

export const subjectCreateSchema = z.object({
  classId: z.number().int().min(1).max(7),
  code: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(10)
    .regex(/^[a-z0-9-]+$/, "Letters, numbers and dashes only"),
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(500).optional(),
  order: z.number().int().min(0).optional(),
});

export const subjectUpdateSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  description: z.string().trim().max(500).nullable().optional(),
  order: z.number().int().min(0).optional(),
});

export const unitCreateSchema = z.object({
  subjectId: z.number().int().positive(),
  order: z.number().int().min(0).optional(),
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional(),
});

export const unitUpdateSchema = z.object({
  order: z.number().int().min(0).optional(),
  title: z.string().trim().min(1).max(120).optional(),
  description: z.string().trim().max(500).nullable().optional(),
});

export const lessonCreateSchema = z.object({
  unitId: z.number().int().positive(),
  order: z.number().int().min(0).optional(),
  title: z.string().trim().min(1).max(160),
  type: z.enum(["LESSON", "PRACTICE", "TEST"]).default("LESSON"),
  xpReward: z.number().int().min(0).max(500).default(10),
});

export const lessonUpdateSchema = z.object({
  order: z.number().int().min(0).optional(),
  title: z.string().trim().min(1).max(160).optional(),
  type: z.enum(["LESSON", "PRACTICE", "TEST"]).optional(),
  xpReward: z.number().int().min(0).max(500).optional(),
});

export const questionOptionSchema = z.object({
  order: z.number().int().min(0).max(9),
  text: z.string().trim().min(1, "Option text is required").max(200),
  imageKey: z.string().trim().max(50).nullable().optional(),
  isCorrect: z.boolean().default(false),
});

export const questionCreateSchema = z
  .object({
    lessonId: z.number().int().positive(),
    order: z.number().int().min(0).max(99).optional(),
    type: z.enum(["MULTIPLE_CHOICE", "WORD_TILES"]).default("MULTIPLE_CHOICE"),
    prompt: z.string().trim().min(1, "Prompt is required").max(500),
    imageKey: z.string().trim().max(50).nullable().optional(),
    options: z.array(questionOptionSchema).min(2).max(10),
  })
  .refine((q) => q.options.some((o) => o.isCorrect), {
    message: "At least one option must be marked correct",
    path: ["options"],
  });

export const questionUpdateSchema = z.object({
  order: z.number().int().min(0).max(99).optional(),
  type: z.enum(["MULTIPLE_CHOICE", "WORD_TILES"]).optional(),
  prompt: z.string().trim().min(1).max(500).optional(),
  imageKey: z.string().trim().max(50).nullable().optional(),
  options: z
    .array(questionOptionSchema)
    .min(2)
    .max(10)
    .optional(),
});
