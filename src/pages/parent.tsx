import type { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

import { useBoundStore } from "~/hooks/useBoundStore";
import { Curio } from "~/components/Curio";

/**
 * Family HQ — the parent dashboard.
 *
 * Parents (and admins) see one card per linked child: XP totals, streak,
 * lessons/missions done, a 7-day XP chart and recent activity. Children are
 * linked by username via /api/parent/link.
 */

type ChildOverview = {
  id: string;
  name: string;
  username: string;
  grade: number | null;
  avatar: string;
  totalXp: number;
  lessonsCompleted: number;
  missionsDone: number;
  streak: number;
  xpLast7: { date: string; xp: number }[];
  recentLessons: {
    lessonId: number;
    title: string;
    subjectName: string;
    subjectEmoji: string;
    completedAt: string;
    bestAccuracy: number | null;
  }[];
  recentMissions: {
    mission: string;
    lessonTitle: string;
    xpEarned: number;
    createdAt: string;
  }[];
};

const WEEKDAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

/** Small end-aligned bar chart of XP earned over the last 7 days. */
const XpChart = ({ data }: { data: { date: string; xp: number }[] }) => {
  const max = Math.max(10, ...data.map((d) => d.xp));
  return (
    <div className="flex items-end gap-1.5" aria-label="XP earned in the last 7 days">
      {data.map((day) => {
        const d = new Date(`${day.date}T00:00:00Z`);
        return (
          <div key={day.date} className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-6 items-end overflow-hidden rounded-md bg-canvas">
              <div
                className="w-full rounded-md bg-brand transition-all"
                style={{ height: `${Math.max(6, (day.xp / max) * 100)}%` }}
                title={`${day.xp} XP`}
              />
            </div>
            <span className="text-[10px] font-bold text-ink-faint">
              {WEEKDAY_LETTERS[d.getUTCDay()]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const StatChip = ({ emoji, value, label }: { emoji: string; value: number; label: string }) => (
  <div className="flex items-center gap-2 rounded-xl bg-canvas px-3 py-2">
    <span className="text-lg" aria-hidden>{emoji}</span>
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-extrabold tabular-nums text-ink">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">{label}</span>
    </div>
  </div>
);

const formatWhen = (iso: string): string => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const ChildCard = ({
  child,
  onUnlink,
}: {
  child: ChildOverview;
  onUnlink: (studentId: string) => void;
}) => (
  <section className="fa-card overflow-hidden">
    {/* Header: avatar, name, class badge, unlink */}
    <div className="flex flex-wrap items-center gap-3 border-b border-line p-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-2xl" aria-hidden>
        {child.avatar}
      </span>
      <div className="grow">
        <h2 className="text-lg font-extrabold text-ink">{child.name}</h2>
        <p className="fa-caption">
          @{child.username}
          {child.grade ? ` · Class ${child.grade}` : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onUnlink(child.id)}
        className="rounded-lg px-3 py-1.5 text-xs font-bold text-ink-faint transition hover:bg-coral-soft hover:text-coral-strong"
      >
        Unlink
      </button>
    </div>

    {/* Stat chips */}
    <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-4">
      <StatChip emoji="⭐" value={child.totalXp} label="XP" />
      <StatChip emoji="📚" value={child.lessonsCompleted} label="Lessons" />
      <StatChip emoji="🏅" value={child.missionsDone} label="Missions" />
      <StatChip emoji="🔥" value={child.streak} label="Day streak" />
    </div>

    <div className="grid gap-5 px-5 pb-5 md:grid-cols-2">
      {/* 7-day XP chart */}
      <div className="rounded-xl border border-line p-4">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
          XP this week
        </h3>
        <XpChart data={child.xpLast7} />
      </div>

      {/* Recent quests */}
      <div className="rounded-xl border border-line p-4">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
          Recent quests
        </h3>
        {child.recentLessons.length === 0 ? (
          <p className="fa-caption">No quests finished yet. 🌱</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {child.recentLessons.map((lesson) => (
              <li key={lesson.lessonId} className="flex items-center gap-2.5">
                <span className="text-lg" aria-hidden>{lesson.subjectEmoji}</span>
                <div className="grow leading-tight">
                  <div className="truncate text-sm font-bold text-ink">{lesson.title}</div>
                  <div className="fa-caption">
                    {lesson.subjectName} · {formatWhen(lesson.completedAt)}
                  </div>
                </div>
                {lesson.bestAccuracy !== null && (
                  <span className="rounded-full bg-emerald-soft px-2 py-0.5 text-xs font-bold text-emerald-strong">
                    {lesson.bestAccuracy}%
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Real-world missions the kid confirmed */}
    {child.recentMissions.length > 0 && (
      <div className="mx-5 mb-5 rounded-xl bg-amber-soft p-4">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-strong">
          🏅 Real-world missions
        </h3>
        <ul className="flex flex-col gap-1.5">
          {child.recentMissions.map((m, i) => (
            <li key={i} className="text-sm font-semibold text-ink">
              “{m.mission}”{" "}
              <span className="fa-caption">— {m.lessonTitle} · +{m.xpEarned} XP</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);

const Parent: NextPage = () => {
  const sessionUser = useBoundStore((x) => x.sessionUser);
  const sessionStatus = useBoundStore((x) => x.sessionStatus);

  const [children, setChildren] = useState<ChildOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [linkError, setLinkError] = useState<string | null>(null);
  const [linking, setLinking] = useState(false);

  const isGrownUp = sessionUser?.role === "PARENT" || sessionUser?.role === "ADMIN";

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/parent/overview", { cache: "no-store" });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? "Failed to load your family dashboard");
        setChildren([]);
        return;
      }
      setChildren(data.children as ChildOverview[]);
    } catch {
      setError("Network error while loading");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated" && isGrownUp) void refresh();
  }, [sessionStatus, isGrownUp, refresh]);

  // Link a child by username, then reload the overview.
  const linkChild = async (event: React.FormEvent) => {
    event.preventDefault();
    setLinkError(null);
    setLinking(true);
    try {
      const response = await fetch("/api/parent/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setLinkError(data?.error ?? "Could not link that learner");
        return;
      }
      setUsername("");
      await refresh();
    } catch {
      setLinkError("Network error. Please try again.");
    } finally {
      setLinking(false);
    }
  };

  const unlinkChild = async (studentId: string) => {
    await fetch(`/api/parent/link?studentId=${encodeURIComponent(studentId)}`, {
      method: "DELETE",
    });
    await refresh();
  };

  // ── Gate: session states ──
  if (sessionStatus === "loading" || sessionStatus === "idle") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas text-ink">
        <p className="fa-caption">Opening the Family HQ…</p>
      </main>
    );
  }

  if (sessionStatus === "guest") {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <div className="fa-card w-full max-w-md p-8 text-center">
          <Curio mood="thinking" className="mx-auto h-20 w-20" />
          <h1 className="fa-h2 mb-2 mt-3">Family HQ</h1>
          <p className="fa-sub mb-6">Sign in as a parent to follow your child's quests.</p>
          <Link href="/login?returnTo=/parent" className="fa-btn-primary">
            Parent sign in
          </Link>
        </div>
      </main>
    );
  }

  if (!isGrownUp) {
    return (
      <main className="fa-bg-aurora flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
        <div className="fa-card w-full max-w-md p-8 text-center">
          <Curio mood="happy" className="mx-auto h-20 w-20" />
          <h1 className="fa-h2 mb-2 mt-3">Grown-ups only! 🙈</h1>
          <p className="fa-sub mb-6">
            The Family HQ is where parents follow your quests. Keep exploring — Curio is waiting!
          </p>
          <Link href="/learn" className="fa-btn-primary">
            Back to my quests
          </Link>
        </div>
      </main>
    );
  }

  // ── Dashboard body ──
  return (
    <main className="fa-bg-aurora min-h-screen bg-canvas px-4 py-10 pb-24 text-ink">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex items-center gap-4">
          <Curio mood="happy" className="h-16 w-16 shrink-0" />
          <div>
            <h1 className="fa-h1">Family HQ 🏡</h1>
            <p className="fa-sub">
              Follow your child's quests, stars and real-world missions.
            </p>
          </div>
        </header>

        {/* Link-a-child form */}
        <form className="fa-card flex flex-col gap-3 p-5 sm:flex-row sm:items-end" onSubmit={linkChild}>
          <label className="flex grow flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">
              🔗 Link your child (their username)
            </span>
            <input
              className="fa-input"
              type="text"
              placeholder="e.g. kid1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              pattern="[a-zA-Z0-9-]+"
              title="Letters, numbers and dashes only"
            />
          </label>
          <button className="fa-btn-primary" type="submit" disabled={linking}>
            {linking ? "Linking…" : "Link child"}
          </button>
        </form>
        {linkError && (
          <div role="alert" className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong">
            {linkError}
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong">
            {error}
          </div>
        )}

        {loading ? (
          <p className="fa-caption">Loading your explorers…</p>
        ) : children.length === 0 ? (
          <div className="fa-card flex flex-col items-center gap-3 p-8 text-center">
            <Curio mood="thinking" className="h-20 w-20" />
            <h2 className="fa-h3">No explorers linked yet</h2>
            <p className="fa-sub max-w-sm">
              Ask your child for their explorer username (they can find it in their
              profile), type it above, and their quests will appear here.
            </p>
          </div>
        ) : (
          children.map((child) => (
            <ChildCard key={child.id} child={child} onUnlink={(id) => void unlinkChild(id)} />
          ))
        )}
      </div>
    </main>
  );
};

export default Parent;
