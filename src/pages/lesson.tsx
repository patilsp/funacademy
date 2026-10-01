import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { Curio } from "@/components/Curio";
import { Storybook, type Story } from "@/components/Storybook";
import { useNarrator } from "@/hooks/useNarrator";
import { useBoundStore } from "@/hooks/useBoundStore";

// ─── API types (answers stripped server-side) ────────────────────────────────

type ApiOption = { id: number; order: number; text: string; emoji: string | null };
type ApiQuestion = {
  id: number;
  order: number;
  type: string;
  prompt: string;
  emoji: string | null;
  speak: boolean;
  options: ApiOption[];
};
type ApiLesson = {
  id: number;
  title: string;
  type: string;
  xpReward: number;
  story: Story | null;
  mission: string | null;
  missionXp: number;
  unit: { title: string; subject: { name: string; emoji: string; color: string; track: string } };
  questions: ApiQuestion[];
};

type Stage = "LOADING" | "STORY" | "QUIZ" | "WON" | "MISSION";

const Lesson: NextPage = () => {
  const router = useRouter();
  const lessonId = Number(router.query.id);

  const [stage, setStage] = useState<Stage>("LOADING");
  const [lesson, setLesson] = useState<ApiLesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(lessonId) || lessonId <= 0) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/lessons/${lessonId}`, { cache: "no-store" });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Lesson not found");
        }
        const data = (await res.json()) as { lesson: ApiLesson };
        if (cancelled) return;
        setLesson(data.lesson);
        setStage(data.lesson.story ? "STORY" : "QUIZ");
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load lesson");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  if (stage === "LOADING") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas text-ink">
        <div className="flex flex-col items-center gap-4">
          <Curio mood="thinking" className="h-24 w-24 animate-float-slow" />
          <p className="fa-caption font-bold">Opening your quest…</p>
        </div>
      </main>
    );
  }

  if (error || !lesson) {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <div className="fa-card w-full max-w-md p-8 text-center">
          <Curio mood="sad" className="mx-auto h-24 w-24" />
          <h1 className="fa-h3 mt-4">Oops!</h1>
          <p className="fa-sub mt-2">{error ?? "Lesson not found"}</p>
          <Link href="/learn" className="fa-btn-primary mt-6 w-full">Back to quests</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fa-bg-aurora min-h-screen bg-canvas text-ink">
      {stage === "STORY" && lesson.story && (
        <Storybook
          story={lesson.story}
          subjectEmoji={lesson.unit.subject.emoji}
          onFinished={() => setStage("QUIZ")}
        />
      )}

      {stage === "QUIZ" && lesson.questions.length > 0 && (
        <QuizStage lesson={lesson} onWon={() => setStage("WON")} />
      )}

      {stage === "QUIZ" && lesson.questions.length === 0 && (
        <EmptyLesson onBack={() => void router.push("/learn")} />
      )}

      {stage === "WON" && (
        <Celebration lesson={lesson} onNext={() => setStage("MISSION")} onFinish={() => void router.push("/learn")} />
      )}

      {stage === "MISSION" && lesson.mission && (
        <MissionCard
          lessonId={lesson.id}
          mission={lesson.mission}
          missionXp={lesson.missionXp}
          onDone={() => void router.push("/learn")}
        />
      )}

      {stage === "MISSION" && !lesson.mission && (
        <Celebration lesson={lesson} onNext={() => undefined} onFinish={() => void router.push("/learn")} />
      )}
    </main>
  );
};

export default Lesson;

// ─── Empty lesson (admin hasn't added questions yet) ─────────────────────────

const EmptyLesson = ({ onBack }: { onBack: () => void }) => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <Curio mood="thinking" className="h-24 w-24" />
    <h1 className="fa-h3 mt-4">This quest is being written!</h1>
    <p className="fa-sub mt-2">Come back soon — Curio is working on it.</p>
    <button onClick={onBack} className="fa-btn-primary mt-6 w-full max-w-xs">
      Back to quests
    </button>
  </div>
);

// ─── Quiz stage ──────────────────────────────────────────────────────────────

const QuizStage = ({ lesson, onWon }: { lesson: ApiLesson; onWon: () => void }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [pickedTiles, setPickedTiles] = useState<number[]>([]);
  const [checked, setChecked] = useState<null | boolean>(null);
  const [checking, setChecking] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const { speak, supported } = useNarrator();
  const soundEffects = useBoundStore((x) => x.soundEffects);

  const question = lesson.questions[index];
  const total = lesson.questions.length;
  const isLast = index + 1 >= total;

  const hasAnswer = question?.type === "WORD_TILES" ? pickedTiles.length > 0 : selected !== null;

  const check = async () => {
    if (!hasAnswer || checking || !question) return;
    setChecking(true);
    try {
      const response =
        question.type === "WORD_TILES" ? pickedTiles : (selected as number);
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, response }),
      });
      const data = (await res.json()) as { correct: boolean };
      setChecked(data.correct);
      if (!data.correct) setMistakes((m) => m + 1);
      if (data.correct) {
        if (soundEffects && supported) speak("Great job!", { rate: 1 });
      } else if (soundEffects && supported) {
        speak("Almost! Try again.", { rate: 0.95 });
      }
    } catch {
      setChecked(true); // fail open: don't punish kids for network hiccups
    } finally {
      setChecking(false);
    }
  };

  const next = () => {
    if (checked === false) {
      // retry the same question
      setChecked(null);
      setSelected(null);
      setPickedTiles([]);
      return;
    }
    if (isLast) {
      onWon();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setPickedTiles([]);
    setChecked(null);
  };

  if (!question) return null;

  const readPrompt = () => {
    if (soundEffects && supported) speak(question.prompt, { rate: 0.9 });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 pb-40 pt-6">
      {/* progress header */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/learn" aria-label="Exit lesson" className="fa-press rounded-xl p-2 text-ink-faint hover:text-ink">
          ✕
        </Link>
        <div className="h-4 grow overflow-hidden rounded-full bg-panel">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-sky transition-all duration-500"
            style={{ width: `${((index + (checked === false ? 0 : 1)) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold tabular-nums text-ink-faint">
          {index + 1}/{total}
        </span>
      </div>

      {/* prompt */}
      <div className="mb-6 flex items-start gap-3">
        <Curio
          mood={checked === false ? "sad" : checked ? "excited" : "happy"}
          className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
        />
        <div className="fa-card relative grow rounded-3xl p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-extrabold leading-snug sm:text-2xl">{question.prompt}</h1>
            <button
              onClick={readPrompt}
              aria-label="Read question aloud"
              className="fa-press shrink-0 rounded-full border-2 border-line bg-surface p-2.5 text-xl shadow-card transition hover:border-brand/40"
            >
              🔊
            </button>
          </div>
          {question.emoji && (
            <div className="mt-3 select-none text-5xl sm:text-6xl">{question.emoji}</div>
          )}
        </div>
      </div>

      {/* answers */}
      {question.type === "WORD_TILES" ? (
        <WordTiles
          tiles={question.options}
          picked={pickedTiles}
          onPick={(id) =>
            setPickedTiles((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
          }
          disabled={checked !== null || checking}
        />
      ) : (
        <div
          className={[
            "grid gap-3",
            question.options.some((o) => o.emoji) ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2",
          ].join(" ")}
          role="radiogroup"
          aria-label="Answer choices"
        >
          {question.options.map((option) => {
            const isSel = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                role="radio"
                aria-checked={isSel}
                disabled={checked !== null || checking}
                className={[
                  "fa-press flex flex-col items-center justify-center gap-2 rounded-3xl border-2 p-5 transition-all",
                  isSel
                    ? "border-brand bg-brand-soft shadow-glow"
                    : "border-line bg-surface hover:border-brand/40 hover:shadow-card",
                ].join(" ")}
              >
                {option.emoji && <span className="select-none text-5xl sm:text-6xl">{option.emoji}</span>}
                {option.text && <span className="text-sm font-bold sm:text-base">{option.text}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* footer bar */}
      <div
        className={[
          "fixed bottom-0 left-0 right-0 border-t-2 p-4 transition-colors duration-300",
          checked === null
            ? "border-line bg-surface"
            : checked
              ? "border-emerald/40 bg-emerald-soft"
              : "border-coral/40 bg-coral-soft",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          {checked !== null && (
            <div className="grow font-extrabold">
              {checked ? (
                <span className="text-emerald-strong">Amazing! 🎉</span>
              ) : (
                <span className="text-coral-strong">Almost! Try once more 💪</span>
              )}
            </div>
          )}
          {checked === null ? (
            <button
              onClick={() => void check()}
              disabled={!hasAnswer || checking}
              className={[
                "fa-btn-primary w-full sm:w-44",
                !hasAnswer ? "bg-panel text-ink-faint" : "animate-pulse-soft",
              ].join(" ")}
            >
              {checking ? "Checking…" : "Check"}
            </button>
          ) : (
            <button
              onClick={next}
              className={[
                "fa-btn-md w-full sm:w-44",
                checked
                  ? "bg-emerald text-white hover:bg-emerald-strong"
                  : "bg-coral-strong text-white hover:bg-coral",
              ].join(" ")}
            >
              {checked ? (isLast ? "Finish 🏁" : "Continue →") : "Retry"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Word tiles ──────────────────────────────────────────────────────────────

const WordTiles = ({
  tiles,
  picked,
  onPick,
  disabled,
}: {
  tiles: ApiOption[];
  picked: number[];
  onPick: (id: number) => void;
  disabled: boolean;
}) => (
  <div>
    {/* answer tray */}
    <div className="mb-4 flex min-h-[64px] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-line-strong bg-surface/60 p-3">
      {picked.length === 0 && <span className="fa-caption px-1">Tap the words in order…</span>}
      {picked.map((id) => {
        const tile = tiles.find((t) => t.id === id);
        return (
          <button
            key={id}
            onClick={() => !disabled && onPick(id)}
            className="rounded-xl border border-line-strong bg-surface px-3 py-2 text-sm font-bold text-ink shadow-card"
          >
            {tile?.text}
          </button>
        );
      })}
    </div>
    {/* tiles */}
    <div className="flex flex-wrap justify-center gap-2">
      {tiles.map((tile) => (
        <button
          key={tile.id}
          onClick={() => onPick(tile.id)}
          disabled={disabled || picked.includes(tile.id)}
          className={[
            "rounded-xl border-2 px-4 py-2.5 text-base font-bold transition-all",
            picked.includes(tile.id)
              ? "border-line bg-panel text-ink-faint opacity-50"
              : "border-line-strong bg-surface text-ink shadow-card hover:-translate-y-0.5 hover:border-brand/40",
          ].join(" ")}
        >
          {tile.text}
        </button>
      ))}
    </div>
  </div>
);

// ─── Celebration ─────────────────────────────────────────────────────────────

const Celebration = ({
  lesson,
  onNext,
  onFinish,
}: {
  lesson: ApiLesson;
  onNext: () => void;
  onFinish: () => void;
}) => {
  const [xp, setXp] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: lesson.id,
            accuracy: 100,
            score: lesson.questions.length,
            totalQuestions: lesson.questions.length,
            xpEarned: lesson.xpReward,
          }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as { xpAwarded: number };
        if (!cancelled) {
          setXp(data.xpAwarded);
          setSaved(true);
        }
      } catch {
        // kid still sees the win even if save fails
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lesson.id, lesson.questions.length, lesson.xpReward, saved]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 10) * 0.18}s`,
        duration: `${2.6 + (i % 5) * 0.4}s`,
        emoji: ["🎉", "⭐", "🌟", "✨", "🎊", "💛"][i % 6] ?? "⭐",
        size: `${16 + (i % 4) * 8}px`,
      })),
    [],
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
      {confetti.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-confetti pointer-events-none absolute top-0 select-none"
          style={{ left: c.left, animationDelay: c.delay, animationDuration: c.duration, fontSize: c.size }}
        >
          {c.emoji}
        </span>
      ))}

      <Curio mood="excited" className="h-36 w-36 animate-float-slow sm:h-44 sm:w-44" />
      <h1 className="fa-h1 mt-4 text-amber-strong">Quest Complete!</h1>
      <p className="fa-sub mt-1 text-lg">
        {lesson.title} · {lesson.unit.subject.emoji} {lesson.unit.subject.name}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="fa-card animate-star-pop min-w-[130px] overflow-hidden p-0">
          <h2 className="bg-amber py-1.5 text-xs font-bold uppercase tracking-wide text-white">XP earned</h2>
          <div className="fa-h2 py-4 text-amber-strong">+{xp ?? lesson.xpReward}</div>
        </div>
        <div className="fa-card animate-star-pop min-w-[130px] overflow-hidden p-0" style={{ animationDelay: "0.15s" }}>
          <h2 className="bg-sky py-1.5 text-xs font-bold uppercase tracking-wide text-white">Questions</h2>
          <div className="fa-h2 py-4 text-sky">{lesson.questions.length}</div>
        </div>
      </div>

      <div className="mt-10 flex w-full max-w-md flex-col gap-3">
        {lesson.mission && (
          <button onClick={onNext} className="fa-btn-primary-lg w-full">
            🎯 See your real-world mission
          </button>
        )}
        <button onClick={onFinish} className="fa-btn-secondary w-full">
          Back to quests
        </button>
      </div>
    </div>
  );
};

// ─── Offline mission card ────────────────────────────────────────────────────

const MissionCard = ({
  lessonId,
  mission,
  missionXp,
  onDone,
}: {
  lessonId: number;
  mission: string;
  missionXp: number;
  onDone: () => void;
}) => {
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);

  const confirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch("/api/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) {
        const data = (await res.json()) as { xpAwarded: number };
        setXpAwarded(data.xpAwarded);
      }
      setConfirmed(true);
    } catch {
      setConfirmed(true);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">
      <div className="fa-card fa-bg-dots w-full max-w-md rounded-[2rem] border-2 border-amber/50 p-8 shadow-lift">
        <div className="text-6xl">🎯</div>
        <h1 className="fa-h2 mt-3">Real-World Mission</h1>
        <p className="mt-4 rounded-2xl bg-amber-soft px-5 py-4 text-lg font-bold leading-relaxed text-amber-strong">
          {mission}
        </p>
        <p className="fa-caption mt-3">
          Do it with a grown-up, then tap the button for <b>+{missionXp} XP</b>!
        </p>

        {confirmed ? (
          <div className="mt-6 flex flex-col items-center gap-3">
            <Curio mood="excited" className="h-20 w-20" />
            <p className="text-lg font-extrabold text-emerald-strong">
              Mission done! +{xpAwarded} XP 🌟
            </p>
            <button onClick={onDone} className="fa-btn-primary w-full">
              Back to quests
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={() => void confirm()} disabled={confirming} className="fa-btn-primary-lg w-full">
              {confirming ? "Saving…" : "✅ I did it! (with a grown-up)"}
            </button>
            <button onClick={onDone} className="text-sm font-bold text-ink-faint hover:text-ink">
              I'll do it later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
