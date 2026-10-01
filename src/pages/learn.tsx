import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Curio } from "@/components/Curio";
import { TopBar } from "@/components/TopBar";
import { LeftBar } from "@/components/LeftBar";
import { BottomBar, type Tab } from "@/components/BottomBar";
import { ClassPicker } from "@/components/ClassPicker";
import { useBoundStore } from "@/hooks/useBoundStore";
import type { SessionUser } from "@/stores/createSessionStore";

// ─── Types mirroring /api/learn-map ──────────────────────────────────────────

type MapLesson = {
  id: number;
  order: number;
  title: string;
  type: string;
  xpReward: number;
  completed: boolean;
  hasMission: boolean;
};
type MapUnit = {
  id: number;
  order: number;
  title: string;
  description: string | null;
  lessons: MapLesson[];
};
type MapSubject = {
  id: number;
  code: string;
  name: string;
  emoji: string;
  color: string;
  unitCount: number;
  lessonCount: number;
  doneCount: number;
  units: MapUnit[];
};
type TrackKey = "MIND" | "TOOLS" | "CREATE";
type LearnMap = {
  class: { id: number; grade: number; name: string };
  tracks: Record<TrackKey, MapSubject[]>;
  completedCount: number;
};

// ─── Track identity ──────────────────────────────────────────────────────────

const TRACKS: {
  key: TrackKey;
  title: string;
  tagline: string;
  emoji: string;
  gradient: string;
  chip: string;
  ring: string;
}[] = [
  {
    key: "MIND",
    title: "Mind Quests",
    tagline: "Numbers, words and wonderful science",
    emoji: "🧠",
    gradient: "from-brand to-sky",
    chip: "bg-brand-soft text-brand",
    ring: "border-brand",
  },
  {
    key: "TOOLS",
    title: "Toolbox Quests",
    tagline: "How computers and technology work",
    emoji: "🧰",
    gradient: "from-coral to-amber",
    chip: "bg-coral-soft text-coral-strong",
    ring: "border-coral",
  },
  {
    key: "CREATE",
    title: "Create Quests",
    tagline: "Art, music, making and doing",
    emoji: "🎨",
    gradient: "from-emerald to-sky",
    chip: "bg-emerald-soft text-emerald-strong",
    ring: "border-emerald",
  },
];

const subjectBarColor: Record<string, string> = {
  brand: "bg-brand",
  sky: "bg-sky",
  emerald: "bg-emerald",
  amber: "bg-amber",
  violet: "bg-violet",
  coral: "bg-coral",
};

// ─── Page ────────────────────────────────────────────────────────────────────

const Learn: NextPage = () => {
  const sessionUser = useBoundStore((x) => x.sessionUser);
  const sessionStatus = useBoundStore((x) => x.sessionStatus);
  const setSessionUser = useBoundStore((x) => x.setSessionUser);

  const [map, setMap] = useState<LearnMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState<TrackKey>("MIND");
  const [openSubject, setOpenSubject] = useState<number | null>(null);

  const loadMap = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/learn-map", { cache: "no-store" });
      if (res.status === 409) {
        setMap(null);
        return;
      }
      const data = (await res.json()) as LearnMap;
      setMap(data);
    } catch {
      setMap(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated") void loadMap();
  }, [sessionStatus, sessionUser?.classId, loadMap]);

  const needsClass = sessionStatus === "authenticated" && map === null && !loading;

  const handleClassChosen = (user: SessionUser) => {
    setSessionUser(user);
    void loadMap();
  };

  if (sessionStatus === "loading" || sessionStatus === "idle") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas text-ink">
        <div className="flex flex-col items-center gap-4">
          <Curio mood="thinking" className="h-24 w-24 animate-float-slow" />
          <p className="fa-caption font-bold">Curio is getting your quests ready…</p>
        </div>
      </main>
    );
  }

  if (sessionStatus === "guest") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <div className="fa-card w-full max-w-md p-8 text-center">
          <Curio mood="wave" className="mx-auto h-28 w-28" />
          <h1 className="fa-h2 mb-2 mt-4">Join the quest!</h1>
          <p className="fa-sub mb-6">Sign in to start learning with Curio.</p>
          <Link href="/login?returnTo=/learn" className="fa-btn-primary w-full">
            Sign in
          </Link>
          <Link href="/register" className="mt-3 block text-sm font-bold text-brand hover:text-brand-strong">
            New here? Create a free account
          </Link>
        </div>
      </main>
    );
  }

  if (needsClass) {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <ClassPicker onDone={handleClassChosen} />
      </main>
    );
  }

  return (
    <>
      <TopBar />
      <LeftBar selectedTab={"Learn" as Tab} />
      <div className="fa-bg-aurora min-h-screen bg-canvas pt-16 text-ink md:ml-24 lg:ml-64">
        <div className="mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6">
          {/* Greeting hero */}
          <header className="mb-6 flex items-center gap-4">
            <Curio mood="excited" className="h-16 w-16 shrink-0 animate-float-slow sm:h-20 sm:w-20" />
            <div>
              <h1 className="fa-h2 leading-tight">
                Hi {sessionUser?.name?.split(" ")[0] ?? "friend"}! <span className="inline-block animate-wiggle">👋</span>
              </h1>
              <p className="fa-sub text-sm sm:text-base">
                {map
                  ? `Class ${map.class.grade} · ${map.completedCount} quests done — keep going!`
                  : "Loading your quests…"}
              </p>
            </div>
          </header>

          {loading && !map ? (
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="fa-card h-24 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : map ? (
            <>
              {/* Track switcher */}
              <nav className="mb-6 grid grid-cols-3 gap-2 sm:gap-3" aria-label="Quest tracks">
                {TRACKS.map((track) => {
                  const subjects = map.tracks[track.key] ?? [];
                  const total = subjects.reduce((s, sub) => s + sub.lessonCount, 0);
                  const done = subjects.reduce((s, sub) => s + sub.doneCount, 0);
                  const active = activeTrack === track.key;
                  return (
                    <button
                      key={track.key}
                      onClick={() => setActiveTrack(track.key)}
                      aria-current={active ? "true" : undefined}
                      className={[
                        "fa-press flex flex-col items-center gap-1 rounded-2xl border-2 p-3 text-center transition-all sm:p-4",
                        active
                          ? `border-transparent bg-gradient-to-br ${track.gradient} text-white shadow-lift`
                          : "border-line bg-surface hover:border-line-strong hover:shadow-card",
                      ].join(" ")}
                    >
                      <span className="text-2xl sm:text-3xl">{track.emoji}</span>
                      <span className={`text-xs font-bold sm:text-sm ${active ? "" : "text-ink"}`}>
                        {track.title.split(" ")[0]}
                      </span>
                      <span className={`text-[10px] font-semibold tabular-nums sm:text-xs ${active ? "text-white/85" : "text-ink-faint"}`}>
                        {done}/{total}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Track intro */}
              <div className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ${TRACKS.find((t) => t.key === activeTrack)?.chip}`}>
                {TRACKS.find((t) => t.key === activeTrack)?.emoji}{" "}
                {TRACKS.find((t) => t.key === activeTrack)?.tagline}
              </div>

              {/* Subject accordions */}
              <div className="flex flex-col gap-3">
                {(map.tracks[activeTrack] ?? []).map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    open={openSubject === subject.id || (openSubject === null && subject.doneCount < subject.lessonCount)}
                    onToggle={() =>
                      setOpenSubject((cur) => (cur === subject.id ? null : subject.id))
                    }
                  />
                ))}
                {(map.tracks[activeTrack] ?? []).length === 0 && (
                  <div className="fa-card flex flex-col items-center gap-3 rounded-3xl p-8 text-center">
                    <Curio mood="thinking" className="h-16 w-16" />
                    <p className="fa-sub">
                      New quests are being written for this track. Try another one!
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <BottomBar selectedTab={"Learn" as Tab} />
    </>
  );
};

export default Learn;

// ─── Subject card (accordion) ────────────────────────────────────────────────

const SubjectCard = ({
  subject,
  open,
  onToggle,
}: {
  subject: MapSubject;
  open: boolean;
  onToggle: () => void;
}) => {
  const pct = subject.lessonCount === 0 ? 0 : Math.round((subject.doneCount / subject.lessonCount) * 100);
  const isComplete = subject.doneCount >= subject.lessonCount && subject.lessonCount > 0;

  return (
    <section className="fa-card overflow-hidden rounded-3xl shadow-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-canvas/50 sm:p-5"
        aria-expanded={open}
      >
        <div
          className={[
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-card",
            open ? "scale-110" : "",
            "transition-transform",
          ].join(" ")}
        >
          {subject.emoji}
        </div>
        <div className="min-w-0 grow">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-bold sm:text-lg">{subject.name}</h2>
            {isComplete && <span className="animate-star-pop text-lg">🏆</span>}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-2.5 grow overflow-hidden rounded-full bg-canvas">
              <div
                className={`h-full rounded-full transition-all duration-500 ${subjectBarColor[subject.color] ?? "bg-brand"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-bold tabular-nums text-ink-faint">
              {subject.doneCount}/{subject.lessonCount}
            </span>
          </div>
        </div>
        <span
          className={`shrink-0 text-ink-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="animate-fade-in border-t border-line px-4 pb-5 pt-4 sm:px-5">
          {subject.units.map((unit) => (
            <UnitPath key={unit.id} unit={unit} subjectName={subject.name} />
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Winding lesson path inside a subject ────────────────────────────────────

const UnitPath = ({ unit, subjectName }: { unit: MapUnit; subjectName: string }) => {
  const firstIncomplete = useMemo(() => {
    const idx = unit.lessons.findIndex((l) => !l.completed);
    return idx === -1 ? unit.lessons.length : idx;
  }, [unit.lessons]);

  // zig-zag offsets like a board-game path
  const offsets = [0, 48, 64, 48, 0, -48, -64, -48];

  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-lg bg-brand-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand">
          Unit {unit.order}
        </span>
        <h3 className="truncate text-sm font-bold text-ink">{unit.title}</h3>
      </div>

      <div className="relative flex flex-col items-center gap-1">
        {/* dotted trail */}
        <div className="absolute bottom-8 left-1/2 top-8 w-1 -translate-x-1/2 border-l-3 border-dashed border-line-strong" aria-hidden style={{ borderLeftWidth: 3 }} />

        {unit.lessons.map((lesson, i) => {
          const locked = i > firstIncomplete;
          const isNext = i === firstIncomplete;
          const offset = offsets[i % offsets.length] ?? 0;
          return (
            <div
              key={lesson.id}
              className="relative z-10"
              style={{ transform: `translateX(${offset}px)` }}
            >
              <LessonNode
                lesson={lesson}
                state={lesson.completed ? "DONE" : isNext ? "ACTIVE" : locked ? "LOCKED" : "ACTIVE"}
                subjectName={subjectName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LessonNode = ({
  lesson,
  state,
  subjectName,
}: {
  lesson: MapLesson;
  state: "DONE" | "ACTIVE" | "LOCKED";
  subjectName: string;
}) => {
  const [popped, setPopped] = useState(false);

  const node =
    state === "DONE" ? (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-b-4 border-emerald-strong bg-emerald text-2xl text-white shadow-card">
        ✓
      </div>
    ) : state === "LOCKED" ? (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-b-4 border-line-strong bg-panel text-2xl opacity-70">
        🔒
      </div>
    ) : (
      <button
        onClick={() => {
          setPopped(true);
          setTimeout(() => setPopped(false), 1200);
        }}
        className="fa-press flex h-16 w-16 animate-pulse-soft items-center justify-center rounded-full border-b-4 border-brand-strong bg-brand text-2xl text-white shadow-lift"
        aria-label={`Start ${lesson.title}`}
      >
        ▶
      </button>
    );

  return (
    <div className="relative flex flex-col items-center">
      {popped && (
        <div className="fa-card animate-scale-in absolute -top-12 z-30 w-max max-w-[220px] rounded-2xl border-2 border-brand/30 p-3 text-center shadow-lift">
          <div className="text-sm font-bold">{lesson.title}</div>
          <div className="fa-caption mt-0.5">
            {lesson.type === "TEST" ? "Unit review · " : ""}
            {lesson.hasMission ? "Has a real-world mission · " : ""}
            {lesson.xpReward} XP
          </div>
        </div>
      )}
      {state === "ACTIVE" && !popped && (
        <span className="pointer-events-none absolute -top-9 z-20 whitespace-nowrap rounded-xl border border-line bg-surface px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand shadow-card">
          Start
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-surface" />
        </span>
      )}
      <Link
        href={state === "LOCKED" ? "#" : `/lesson?id=${lesson.id}`}
        onClick={(e) => state === "LOCKED" && e.preventDefault()}
        className="flex flex-col items-center gap-1"
        aria-disabled={state === "LOCKED"}
      >
        {node}
        <span
          className={[
            "mt-1 max-w-[140px] text-center text-xs font-bold leading-tight",
            state === "LOCKED" ? "text-ink-faint" : "text-ink",
          ].join(" ")}
        >
          {lesson.title}
        </span>
        <span className="sr-only">{subjectName}</span>
      </Link>
    </div>
  );
};
