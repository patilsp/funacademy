/**
 * Seed script — Class 1-7 structure + content migrated from the old
 * hard-coded data (src/utils/units.ts, src/pages/lesson.tsx).
 *
 * Run with a real DATABASE_URL after `prisma migrate deploy`:
 *   node prisma/seed.js
 *
 * Idempotent: safe to run repeatedly (upserts on natural keys).
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CLASSES = [
  { grade: 1, name: "Class 1", description: "Foundations: letters, numbers, and the world around you." },
  { grade: 2, name: "Class 2", description: "Building fluency in reading, writing, and arithmetic." },
  { grade: 3, name: "Class 3", description: "Multiplication, fractions, and curious science." },
  { grade: 4, name: "Class 4", description: "Long division, ecosystems, and map skills." },
  { grade: 5, name: "Class 5", description: "Decimals, percentages, and ancient history." },
  { grade: 6, name: "Class 6", description: "Ratios, algebra basics, and earth science." },
  { grade: 7, name: "Class 7", description: "Pre-algebra to algebra, physics, and civics." },
];

const SUBJECTS_PER_CLASS = [
  { code: "en", name: "English", order: 1 },
  { code: "math", name: "Mathematics", order: 2 },
  { code: "sci", name: "Science", order: 3 },
  { code: "hist", name: "History", order: 4 },
  { code: "geo", name: "Geography", order: 5 },
  { code: "evs", name: "Environmental Studies", order: 6 },
];

// The 12 questions migrated from the old hard-coded lesson.tsx problems.
const QUESTIONS = [
  {
    type: "MULTIPLE_CHOICE",
    prompt: 'Which one of these is "the apple"?',
    correct: ["Apple"],
    options: ["Apple", "Boy", "Girl"],
  },
  {
    type: "WORD_TILES",
    prompt: "El niño",
    correct: ["The", "boy"],
    options: ["woman", "milk", "water", "I", "The", "boy"],
  },
  {
    type: "MULTIPLE_CHOICE",
    prompt: 'Which one of these is "the boy"?',
    correct: ["Boy"],
    options: ["Boy", "Apple", "Girl"],
  },
  {
    type: "WORD_TILES",
    prompt: "La niña",
    correct: ["The", "girl"],
    options: ["woman", "girl", "water", "The", "milk", "is"],
  },
  {
    type: "MULTIPLE_CHOICE",
    prompt: 'Which one of these is "the girl"?',
    correct: ["Girl"],
    options: ["Girl", "Boy", "Apple"],
  },
  {
    type: "WORD_TILES",
    prompt: "El agua",
    correct: ["The", "water"],
    options: ["woman", "The", "apple", "water", "is", "boy"],
  },
  {
    type: "MULTIPLE_CHOICE",
    prompt: 'Which one of these is "the water"?',
    correct: ["Water"],
    options: ["Apple", "Milk", "Water"],
  },
  {
    type: "WORD_TILES",
    prompt: "El hombre",
    correct: ["The", "man"],
    options: ["man", "The", "is", "apple", "boy", "milk"],
  },
  {
    type: "MULTIPLE_CHOICE",
    prompt: 'Which one of these is "the man"?',
    correct: ["Man"],
    options: ["Boy", "Milk", "Man"],
  },
  {
    type: "WORD_TILES",
    prompt: "La manzana",
    correct: ["The", "apple"],
    options: ["man", "apple", "The", "is", "milk", "I"],
  },
  {
    type: "MULTIPLE_CHOICE",
    prompt: 'Which one of these is "the milk"?',
    correct: ["Milk"],
    options: ["Apple", "Milk", "Girl"],
  },
  {
    type: "WORD_TILES",
    prompt: "La mujer",
    correct: ["The", "woman"],
    options: ["The", "woman", "boy", "is", "apple", "I"],
  },
];

const UNITS = [
  {
    title: "Form basic sentences, greet people",
    description: "Say hello and build your first sentences.",
    lessons: [
      { title: "Greetings", type: "LESSON", xpReward: 10, questionRange: [0, 4] },
      { title: "A date", type: "LESSON", xpReward: 10, questionRange: [4, 8] },
      { title: "Unit 1 review", type: "TEST", xpReward: 15, questionRange: [8, 12] },
    ],
  },
  {
    title: "Get around in a city",
    description: "Ask for places and follow directions.",
    lessons: [
      { title: "One thing", type: "LESSON", xpReward: 10, questionRange: [0, 4] },
      { title: "A very big family", type: "LESSON", xpReward: 10, questionRange: [4, 8] },
      { title: "Unit 2 review", type: "TEST", xpReward: 15, questionRange: [8, 12] },
    ],
  },
  {
    title: "Order food and drink",
    description: "Order meals and talk about what you like.",
    lessons: [
      { title: "The passport", type: "LESSON", xpReward: 10, questionRange: [0, 4] },
      { title: "The honeymoon", type: "LESSON", xpReward: 10, questionRange: [4, 8] },
      { title: "Unit 3 review", type: "TEST", xpReward: 15, questionRange: [8, 12] },
    ],
  },
];

const sliceQuestions = (from, to) =>
  QUESTIONS.slice(from, to).map((question, index) => ({
    order: index,
    type: question.type,
    prompt: question.prompt,
    options: question.options.map((text, optionIndex) => ({
      order: optionIndex,
      text,
      isCorrect: question.correct.includes(text),
    })),
  }));

async function seedClassesAndSubjects() {
  for (const classDef of CLASSES) {
    const klass = await prisma.class.upsert({
      where: { grade: classDef.grade },
      update: { name: classDef.name, description: classDef.description },
      create: classDef,
    });

    for (const subjectDef of SUBJECTS_PER_CLASS) {
      await prisma.subject.upsert({
        where: {
          classId_code: { classId: klass.id, code: subjectDef.code },
        },
        update: { name: subjectDef.name, order: subjectDef.order },
        create: {
          classId: klass.id,
          code: subjectDef.code,
          name: subjectDef.name,
          order: subjectDef.order,
        },
      });
    }
  }
  console.log(
    "Seeded " + CLASSES.length + " classes with " + SUBJECTS_PER_CLASS.length + " subjects each.",
  );
}

async function seedDemoCourse() {
  // Give every class the same playable demo course inside its Mathematics
  // subject. Questions are cloned per lesson so classes stay independent.
  for (let grade = 1; grade <= 7; grade++) {
    const klass = await prisma.class.findUnique({ where: { grade } });
    if (!klass) continue;

    const mathSubject = await prisma.subject.findUnique({
      where: { classId_code: { classId: klass.id, code: "math" } },
    });
    if (!mathSubject) continue;

    for (let unitIndex = 0; unitIndex < UNITS.length; unitIndex++) {
      const unitDef = UNITS[unitIndex];
      const unit = await prisma.unit.upsert({
        where: {
          subjectId_order: { subjectId: mathSubject.id, order: unitIndex + 1 },
        },
        update: { title: unitDef.title, description: unitDef.description },
        create: {
          subjectId: mathSubject.id,
          order: unitIndex + 1,
          title: unitDef.title,
          description: unitDef.description,
        },
      });

      for (let lessonIndex = 0; lessonIndex < unitDef.lessons.length; lessonIndex++) {
        const lessonDef = unitDef.lessons[lessonIndex];
        const lesson = await prisma.lesson.upsert({
          where: {
            unitId_order: { unitId: unit.id, order: lessonIndex + 1 },
          },
          update: {
            title: lessonDef.title,
            type: lessonDef.type,
            xpReward: lessonDef.xpReward,
          },
          create: {
            unitId: unit.id,
            order: lessonIndex + 1,
            title: lessonDef.title,
            type: lessonDef.type,
            xpReward: lessonDef.xpReward,
          },
        });

        const existingQuestions = await prisma.question.count({
          where: { lessonId: lesson.id },
        });
        if (existingQuestions > 0) continue;

        for (const questionDef of sliceQuestions(
          lessonDef.questionRange[0],
          lessonDef.questionRange[1],
        )) {
          await prisma.question.create({
            data: {
              lessonId: lesson.id,
              order: questionDef.order,
              type: questionDef.type,
              prompt: questionDef.prompt,
              options: {
                create: questionDef.options,
              },
            },
          });
        }
      }
    }
  }
  console.log("Seeded demo Mathematics course for classes 1-7.");
}

async function main() {
  console.log("Seeding FunAcademy content...");
  await seedClassesAndSubjects();
  await seedDemoCourse();
  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
