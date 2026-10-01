import { z } from "zod";

import { ApiHttpError } from "@/lib/api";
import { prisma } from "@/lib/db";

/**
 * Gemini-powered question generation for the admin console.
 *
 * Uses the Google Generative Language REST API directly (no SDK needed):
 *   POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
 *
 * Requires GOOGLE_API_KEY (Google AI Studio). The model defaults to
 * gemini-2.5-flash and can be overridden with GOOGLE_MODEL.
 */

const MODEL = process.env.GOOGLE_MODEL ?? "gemini-2.5-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// Shape of one AI-generated question (validated before anything is stored).
export const generatedOptionSchema = z.object({
  text: z.string().trim().min(1).max(200),
  emoji: z.string().trim().max(8).nullable().optional(),
});

export const generatedQuestionSchema = z.object({
  prompt: z.string().trim().min(1).max(300),
  emoji: z.string().trim().max(8).nullable().optional(),
  options: z.array(generatedOptionSchema).min(2).max(6),
  // zero-based index into options — converted to isCorrect flags on insert
  correctIndex: z.number().int().min(0),
});

export type GeneratedQuestion = z.infer<typeof generatedQuestionSchema>;

const buildPrompt = (input: {
  grade: number | null;
  subjectName: string;
  lessonTitle: string;
  lessonContext: string;
  existing: string[];
  count: number;
}): string => {
  const age = input.grade ? 5 + input.grade : 9;
  return [
    `You write quiz questions for CurioQuest, a playful learning app for kids in Class 1-7.`,
    `Audience: kids around age ${age} (Class ${input.grade ?? "?"}).`,
    `Subject: ${input.subjectName}. Lesson: "${input.lessonTitle}".`,
    input.lessonContext
      ? `Lesson story so far (for context, keep questions inside this topic): ${input.lessonContext}`
      : "",
    input.existing.length > 0
      ? `Questions that already exist (do NOT repeat them): ${input.existing.join(" | ")}`
      : "",
    `Write ${input.count} NEW multiple-choice questions that are:`,
    `- factual, clear and kind; simple words a child can read alone`,
    `- each with 3-4 short options where exactly ONE is correct`,
    `- distractors plausible but clearly wrong to an expert; never "all of the above"`,
    `- each may include one big relevant emoji hint (kid-friendly, not scary)`,
    `Return ONLY a JSON array, each item shaped exactly like:`,
    `{"prompt": "...", "emoji": "...", "options": [{"text": "...", "emoji": "..."}], "correctIndex": 0}`,
    `correctIndex is the 0-based index of the correct option in options.`,
  ]
    .filter(Boolean)
    .join("\n");
};

/** Strip markdown fences and extract the first JSON array from model output. */
const parseJsonArray = (raw: string): unknown[] => {
  const cleaned = raw
    .replace(/^\s*```(?:json)?/i, "")
    .replace(/```\s*$/, "")
    .trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    throw new ApiHttpError(502, "AI returned an unexpected format. Please try again.");
  }
  try {
    const parsed: unknown = JSON.parse(cleaned.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    throw new ApiHttpError(502, "AI returned invalid JSON. Please try again.");
  }
};

export const generateQuestionsForLesson = async (
  lessonId: number,
  count: number,
): Promise<GeneratedQuestion[]> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new ApiHttpError(
      503,
      "AI generation is not configured yet. Add a GOOGLE_API_KEY from Google AI Studio in Settings → Environment.",
    );
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      unit: {
        select: {
          title: true,
          subject: { select: { name: true, class: { select: { grade: true } } } },
        },
      },
      questions: { select: { prompt: true }, orderBy: { order: "asc" } },
    },
  });
  if (!lesson) throw new ApiHttpError(404, "Lesson not found");

  // Give the model the story text as grounding context (trimmed to stay small).
  const story = lesson.story as { scenes?: { text?: string }[] } | null;
  const lessonContext = (story?.scenes ?? [])
    .map((s) => s.text ?? "")
    .filter(Boolean)
    .join(" ")
    .slice(0, 600);

  const prompt = buildPrompt({
    grade: lesson.unit.subject.class.grade,
    subjectName: lesson.unit.subject.name,
    lessonTitle: lesson.title,
    lessonContext,
    existing: lesson.questions.slice(-8).map((q) => q.prompt),
    count,
  });

  const response = await fetch(`${API_BASE}/${MODEL}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[gemini] generation failed", response.status, detail.slice(0, 400));
    throw new ApiHttpError(
      response.status === 429 ? 429 : 502,
      response.status === 429
        ? "AI rate limit reached. Please wait a moment and try again."
        : "The AI service could not generate questions. Please try again.",
    );
  }

  const payload = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text =
    payload.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";

  // Validate every item; silently drop malformed ones so the admin always
  // receives only usable questions.
  const candidates = parseJsonArray(text);
  const valid: GeneratedQuestion[] = candidates
    .map((item) => generatedQuestionSchema.safeParse(item))
    .filter((r) => r.success && r.data.correctIndex < r.data.options.length)
    .map((r) => r.data as GeneratedQuestion);

  if (valid.length === 0) {
    throw new ApiHttpError(502, "The AI returned no usable questions. Please try again.");
  }
  return valid;
};
