import type { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useBoundStore } from "~/hooks/useBoundStore";

type Role = "STUDENT" | "PARENT" | "TEACHER" | "ADMIN";

type ApiListResponse<T> = Record<string, T[]>;

const useApiList = <T,>(endpoint: string) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? `Failed to load (${response.status})`);
        setItems([]);
        return;
      }
      const key = Object.keys(data as ApiListResponse<T>)[0];
      setItems(key ? ((data as ApiListResponse<T>)[key] as T[]) : []);
    } catch {
      setError("Network error while loading");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { items, loading, error, refresh };
};

const jsonRequest = async (
  method: "POST" | "PATCH" | "DELETE",
  url: string,
  body?: unknown,
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const response = await fetch(url, {
      method,
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (response.ok) return { ok: true };
    const data = await response.json().catch(() => null);
    return { ok: false, error: data?.error ?? `Request failed (${response.status})` };
  } catch {
    return { ok: false, error: "Network error" };
  }
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`fa-input ${props.className ?? ""}`} />
);

const Field = ({ label, error, children }: { label: string; error?: string | null; children: React.ReactNode }) => (
  <label className="flex flex-col gap-1">
    <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">{label}</span>
    {children}
    {error && <span className="text-xs font-semibold text-coral-strong">{error}</span>}
  </label>
);

const SubmitButton = ({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) => (
  <button className="fa-btn-primary-sm" type="submit" disabled={disabled}>
    {children}
  </button>
);

const RowActions = ({
  onDelete,
  deleteLabel = "Delete",
}: {
  onDelete: () => void;
  deleteLabel?: string;
}) => (
  <div className="flex gap-2">
    <button className="fa-btn-secondary-sm text-coral-strong" type="button" onClick={onDelete}>
      {deleteLabel}
    </button>
  </div>
);

const ErrorBanner = ({ message }: { message: string }) => (
  <div role="alert" className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong">
    {message}
  </div>
);

// ─── Classes ─────────────────────────────────────────────────────────────────

type ClassRow = {
  id: number;
  grade: number;
  name: string;
  description: string | null;
  _count?: { subjects: number; students: number };
};

const ClassesSection = () => {
  const { items, loading, error, refresh } = useApiList<ClassRow>("/api/admin/classes");
  const [formError, setFormError] = useState<string | null>(null);
  const [grade, setGrade] = useState("");
  const [name, setName] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const result = await jsonRequest("POST", "/api/admin/classes", {
      grade: Number(grade),
      name,
    });
    if (!result.ok) {
      setFormError(result.error ?? "Failed to create class");
      return;
    }
    setGrade("");
    setName("");
    await refresh();
  };

  const remove = async (id: number) => {
    await jsonRequest("DELETE", `/api/admin/classes?id=${id}`);
    await refresh();
  };

  return (
    <section className="flex flex-col gap-5">
      <form className="fa-card flex flex-col gap-3 p-5 sm:flex-row sm:items-end" onSubmit={submit}>
        <Field label="Grade (1-7)">
          <Input type="number" min={1} max={7} value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </Field>
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Class 3" required />
        </Field>
        <SubmitButton disabled={!grade || !name}>Add class</SubmitButton>
      </form>
      {formError && <ErrorBanner message={formError} />}
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <p className="fa-caption">Loading…</p>
      ) : (
        <div className="fa-card divide-y divide-line overflow-hidden">
          {items.length === 0 && <p className="fa-caption p-5">No classes yet. Add one above.</p>}
          {items.map((klass) => (
            <div key={klass.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-bold text-ink">Class {klass.grade} — {klass.name}</div>
                <div className="fa-caption">
                  {klass._count?.subjects ?? 0} subjects · {klass._count?.students ?? 0} students
                </div>
              </div>
              <RowActions onDelete={() => void remove(klass.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Subjects ────────────────────────────────────────────────────────────────

type SubjectRow = {
  id: number;
  classId: number;
  code: string;
  name: string;
  order: number;
  _count?: { units: number };
};

const SubjectsSection = () => {
  const { items, loading, error, refresh } = useApiList<SubjectRow>("/api/admin/subjects");
  const [formError, setFormError] = useState<string | null>(null);
  const [classId, setClassId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const result = await jsonRequest("POST", "/api/admin/subjects", {
      classId: Number(classId),
      code,
      name,
    });
    if (!result.ok) {
      setFormError(result.error ?? "Failed to create subject");
      return;
    }
    setCode("");
    setName("");
    await refresh();
  };

  const remove = async (id: number) => {
    await jsonRequest("DELETE", `/api/admin/subjects?id=${id}`);
    await refresh();
  };

  return (
    <section className="flex flex-col gap-5">
      <form className="fa-card flex flex-col gap-3 p-5 sm:flex-row sm:items-end" onSubmit={submit}>
        <Field label="Class grade">
          <Input type="number" min={1} max={7} value={classId} onChange={(e) => setClassId(e.target.value)} required />
        </Field>
        <Field label="Code (e.g. math)">
          <Input value={code} onChange={(e) => setCode(e.target.value)} required />
        </Field>
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Mathematics" required />
        </Field>
        <SubmitButton disabled={!classId || !code || !name}>Add subject</SubmitButton>
      </form>
      {formError && <ErrorBanner message={formError} />}
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <p className="fa-caption">Loading…</p>
      ) : (
        <div className="fa-card divide-y divide-line overflow-hidden">
          {items.length === 0 && <p className="fa-caption p-5">No subjects yet.</p>}
          {items.map((subject) => (
            <div key={subject.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-bold text-ink">{subject.name} <span className="fa-caption">({subject.code})</span></div>
                <div className="fa-caption">Class {subject.classId} · {subject._count?.units ?? 0} units</div>
              </div>
              <RowActions onDelete={() => void remove(subject.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Units ───────────────────────────────────────────────────────────────────

type UnitRow = {
  id: number;
  subjectId: number;
  order: number;
  title: string;
  _count?: { lessons: number };
};

const UnitsSection = () => {
  const { items, loading, error, refresh } = useApiList<UnitRow>("/api/admin/units");
  const [formError, setFormError] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const result = await jsonRequest("POST", "/api/admin/units", {
      subjectId: Number(subjectId),
      title,
    });
    if (!result.ok) {
      setFormError(result.error ?? "Failed to create unit");
      return;
    }
    setTitle("");
    await refresh();
  };

  const remove = async (id: number) => {
    await jsonRequest("DELETE", `/api/admin/units?id=${id}`);
    await refresh();
  };

  return (
    <section className="flex flex-col gap-5">
      <form className="fa-card flex flex-col gap-3 p-5 sm:flex-row sm:items-end" onSubmit={submit}>
        <Field label="Subject ID">
          <Input type="number" min={1} value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required />
        </Field>
        <Field label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Fractions basics" required />
        </Field>
        <SubmitButton disabled={!subjectId || !title}>Add unit</SubmitButton>
      </form>
      {formError && <ErrorBanner message={formError} />}
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <p className="fa-caption">Loading…</p>
      ) : (
        <div className="fa-card divide-y divide-line overflow-hidden">
          {items.length === 0 && <p className="fa-caption p-5">No units yet.</p>}
          {items.map((unit) => (
            <div key={unit.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-bold text-ink">#{unit.order} {unit.title}</div>
                <div className="fa-caption">Subject {unit.subjectId} · {unit._count?.lessons ?? 0} lessons</div>
              </div>
              <RowActions onDelete={() => void remove(unit.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Lessons ─────────────────────────────────────────────────────────────────

type LessonRow = {
  id: number;
  unitId: number;
  order: number;
  title: string;
  type: string;
  xpReward: number;
  _count?: { questions: number };
};

const LessonsSection = () => {
  const { items, loading, error, refresh } = useApiList<LessonRow>("/api/admin/lessons");
  const [formError, setFormError] = useState<string | null>(null);
  const [unitId, setUnitId] = useState("");
  const [title, setTitle] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const result = await jsonRequest("POST", "/api/admin/lessons", {
      unitId: Number(unitId),
      title,
    });
    if (!result.ok) {
      setFormError(result.error ?? "Failed to create lesson");
      return;
    }
    setTitle("");
    await refresh();
  };

  const remove = async (id: number) => {
    await jsonRequest("DELETE", `/api/admin/lessons?id=${id}`);
    await refresh();
  };

  return (
    <section className="flex flex-col gap-5">
      <form className="fa-card flex flex-col gap-3 p-5 sm:flex-row sm:items-end" onSubmit={submit}>
        <Field label="Unit ID">
          <Input type="number" min={1} value={unitId} onChange={(e) => setUnitId(e.target.value)} required />
        </Field>
        <Field label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Addition within 20" required />
        </Field>
        <SubmitButton disabled={!unitId || !title}>Add lesson</SubmitButton>
      </form>
      {formError && <ErrorBanner message={formError} />}
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <p className="fa-caption">Loading…</p>
      ) : (
        <div className="fa-card divide-y divide-line overflow-hidden">
          {items.length === 0 && <p className="fa-caption p-5">No lessons yet.</p>}
          {items.map((lesson) => (
            <div key={lesson.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-bold text-ink">#{lesson.order} {lesson.title}</div>
                <div className="fa-caption">
                  Unit {lesson.unitId} · {lesson.type} · {lesson.xpReward} XP · {lesson._count?.questions ?? 0} questions
                </div>
              </div>
              <RowActions onDelete={() => void remove(lesson.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Questions ───────────────────────────────────────────────────────────────

type OptionRow = { order: number; text: string; imageKey: string | null; isCorrect: boolean };
type QuestionRow = {
  id: number;
  lessonId: number;
  order: number;
  type: string;
  prompt: string;
  options: OptionRow[];
};

const QuestionsSection = () => {
  const { items, loading, error, refresh } = useApiList<QuestionRow>("/api/admin/questions");
  const [formError, setFormError] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const result = await jsonRequest("POST", "/api/admin/questions", {
      lessonId: Number(lessonId),
      prompt,
      type: "MULTIPLE_CHOICE",
      options: options.map((text, index) => ({
        order: index,
        text,
        isCorrect: index === correctIndex,
      })),
    });
    if (!result.ok) {
      setFormError(result.error ?? "Failed to create question");
      return;
    }
    setPrompt("");
    setOptions(["", "", ""]);
    setCorrectIndex(0);
    await refresh();
  };

  const remove = async (id: number) => {
    await jsonRequest("DELETE", `/api/admin/questions?id=${id}`);
    await refresh();
  };

  return (
    <section className="flex flex-col gap-5">
      <form className="fa-card flex flex-col gap-4 p-5" onSubmit={submit}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Field label="Lesson ID">
            <Input type="number" min={1} value={lessonId} onChange={(e) => setLessonId(e.target.value)} required />
          </Field>
          <div className="grow">
            <Field label="Prompt">
              <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="What is 7 + 8?" required />
            </Field>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">Options (select the correct one)</span>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="correct-option"
                checked={correctIndex === index}
                onChange={() => setCorrectIndex(index)}
                aria-label={`Mark option ${index + 1} correct`}
              />
              <Input
                value={option}
                onChange={(e) =>
                  setOptions((current) => current.map((o, i) => (i === index ? e.target.value : o)))
                }
                placeholder={`Option ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>
        <SubmitButton disabled={!lessonId || !prompt}>Add question</SubmitButton>
      </form>
      {formError && <ErrorBanner message={formError} />}
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <p className="fa-caption">Loading…</p>
      ) : (
        <div className="fa-card divide-y divide-line overflow-hidden">
          {items.length === 0 && <p className="fa-caption p-5">No questions yet.</p>}
          {items.map((question) => (
            <div key={question.id} className="flex items-start justify-between gap-4 p-4">
              <div>
                <div className="font-bold text-ink">{question.prompt}</div>
                <div className="fa-caption">
                  Lesson {question.lessonId} · {question.type} ·{" "}
                  {question.options.map((o) => o.text).join(" / ")}
                </div>
              </div>
              <RowActions onDelete={() => void remove(question.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Page shell ──────────────────────────────────────────────────────────────

const TABS = ["Classes", "Subjects", "Units", "Lessons", "Questions"] as const;
type Tab = (typeof TABS)[number];

const Admin: NextPage = () => {
  const sessionUser = useBoundStore((x) => x.sessionUser);
  const sessionStatus = useBoundStore((x) => x.sessionStatus);
  const [tab, setTab] = useState<Tab>("Classes");

  const isAdmin = sessionUser?.role === "ADMIN";

  if (sessionStatus === "loading" || sessionStatus === "idle") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas text-ink">
        <p className="fa-caption">Checking access…</p>
      </main>
    );
  }

  if (sessionStatus === "guest") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <div className="fa-card w-full max-w-md p-8 text-center">
          <h1 className="fa-h2 mb-2">Admin access</h1>
          <p className="fa-sub mb-6">Sign in with an administrator account to continue.</p>
          <Link href="/login?returnTo=/admin" className="fa-btn-primary">Sign in</Link>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <div className="fa-card w-full max-w-md p-8 text-center">
          <div className="fa-badge-neutral mx-auto mb-5 w-fit">403</div>
          <h1 className="fa-h2 mb-2">Admins only</h1>
          <p className="fa-sub mb-6">Your account does not have admin permissions.</p>
          <Link href="/learn" className="fa-btn-primary">Back to Learn</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fa-bg-aurora min-h-screen bg-canvas px-4 py-10 text-ink">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="fa-h1">Content admin</h1>
          <p className="fa-sub">Manage classes, subjects, units, lessons and questions.</p>
        </header>

        <nav className="fa-card flex flex-wrap gap-1 p-1.5" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={[
                "rounded-lg px-4 py-2 text-sm font-semibold transition",
                tab === t ? "bg-brand text-white shadow-btn" : "text-ink-muted hover:bg-canvas hover:text-ink",
              ].join(" ")}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === "Classes" && <ClassesSection />}
        {tab === "Subjects" && <SubjectsSection />}
        {tab === "Units" && <UnitsSection />}
        {tab === "Lessons" && <LessonsSection />}
        {tab === "Questions" && <QuestionsSection />}
      </div>
    </main>
  );
};

export default Admin;
