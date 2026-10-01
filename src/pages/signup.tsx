import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { GoogleLogoSvg } from "~/components/LoginScreen";
import { googleAuthUrl } from "~/lib/google";
import { Curio } from "~/components/Curio";

/**
 * Signup screen — where a new explorer joins CurioQuest.
 *
 * Collects name/username/email/password plus an optional class (1–7) which
 * the API turns into a classId. Field-level validation errors from the server
 * (zod details.fieldErrors) are shown under the matching inputs.
 */

// Classroom animals matching the /learn class picker (🐣 Class 1 … 🐉 Class 7).
const CLASS_ANIMALS = ["🐣", "🐥", "🦊", "🐼", "🦄", "🦁", "🐉"];

// Floating emoji decorations — same sparkle kit as the login page.
const FLOATERS: { emoji: string; className: string; delay: string }[] = [
  { emoji: "🌟", className: "left-[9%] top-[16%]", delay: "0s" },
  { emoji: "🎈", className: "right-[11%] top-[22%]", delay: "1.6s" },
  { emoji: "🎨", className: "left-[13%] bottom-[18%]", delay: "3s" },
  { emoji: "🧩", className: "right-[13%] bottom-[28%]", delay: "4.4s" },
];

const Signup: NextPage = () => {
  const router = useRouter();
  const setSessionUser = useBoundStore((x) => x.setSessionUser);

  const [name, setNameState] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  // Learners play quests; parents get the Family HQ dashboard (/parent).
  const [role, setRole] = useState<"STUDENT" | "PARENT">("STUDENT");
  const [grade, setGrade] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Server-side zod errors keyed by field name, e.g. { username: ["taken"] }
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Same guarded returnTo as /login — never redirect off-site.
  const returnTo =
    typeof router.query.returnTo === "string" && router.query.returnTo.startsWith("/")
      ? router.query.returnTo
      : "/learn";

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role,
          // Grade is optional — the /learn ClassPicker can set it later.
          ...(role === "STUDENT" && grade !== "" ? { grade: Number(grade) } : {}),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? "Sign up failed. Please try again.");
        if (data?.details?.fieldErrors) {
          setFieldErrors(data.details.fieldErrors as Record<string, string[]>);
        }
        return;
      }
      setSessionUser(data.user);
      // Parents land straight in the Family HQ dashboard.
      void router.push(role === "PARENT" ? "/parent" : returnTo);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Empty string when Google OAuth is not configured server-side.
  const googleHref = googleAuthUrl(returnTo);

  // First validation message for a field, or null.
  const fieldError = (field: string): string | null =>
    fieldErrors[field]?.[0] ?? null;

  return (
    <main className="fa-bg-aurora fa-bg-dots relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-4 py-10 text-ink">
      {/* Ambient floating sparkles */}
      {FLOATERS.map((f) => (
        <span
          key={f.emoji}
          aria-hidden
          className={`animate-float-emoji pointer-events-none absolute text-3xl ${f.className}`}
          style={{ animationDelay: f.delay }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Curio is excited to meet a new explorer */}
      <Curio mood="excited" className="h-20 w-20 drop-shadow-card" />

      <Link
        href="/"
        className="mb-6 mt-1 text-[26px] font-extrabold tracking-tight"
        aria-label="CurioQuest home"
      >
        <span className="text-brand">Curio</span>
        <span className="text-ink">Quest</span>
      </Link>

      <div className="fa-card w-full max-w-md p-8 sm:p-10">
        <h1 className="fa-h2 text-center">Join the quest!</h1>
        <p className="fa-sub mt-2 text-center">
          Create your explorer pass in less than a minute. 🎟️
        </p>

        {/* Learner / parent chooser — two big friendly cards */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          {(
            [
              { key: "STUDENT", emoji: "🎒", title: "I'm a learner", hint: "Play quests" },
              { key: "PARENT", emoji: "👨‍👩‍👧", title: "I'm a parent", hint: "Follow progress" },
            ] as const
          ).map((opt) => {
            const selected = role === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setRole(opt.key)}
                className={[
                  "fa-press flex flex-col items-center gap-0.5 rounded-xl border-2 px-2 py-3 transition",
                  selected
                    ? "border-brand bg-brand-soft text-brand-strong"
                    : "border-line bg-canvas text-ink-muted hover:border-brand/40 hover:text-ink",
                ].join(" ")}
              >
                <span className="text-2xl" aria-hidden>{opt.emoji}</span>
                <span className="text-sm font-bold">{opt.title}</span>
                <span className="text-xs font-semibold opacity-70">{opt.hint}</span>
              </button>
            );
          })}
        </div>

        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSignup}>
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong"
            >
              {error}
            </div>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">🧑‍🚀 Your name</span>
            <input
              className="fa-input"
              type="text"
              autoComplete="name"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setNameState(e.target.value)}
              required
            />
            {fieldError("name") && (
              <span className="text-xs font-semibold text-coral-strong">{fieldError("name")}</span>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">🏷️ Username</span>
            <input
              className="fa-input"
              type="text"
              autoComplete="username"
              placeholder="alex-johnson"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              pattern="[a-zA-Z0-9-]+"
              title="Letters, numbers and dashes only"
            />
            {fieldError("username") && (
              <span className="text-xs font-semibold text-coral-strong">{fieldError("username")}</span>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">📧 Email</span>
            <input
              className="fa-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
              required
            />
            {fieldError("email") && (
              <span className="text-xs font-semibold text-coral-strong">{fieldError("email")}</span>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">🔒 Secret password</span>
            <input
              className="fa-input"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            {fieldError("password") && (
              <span className="text-xs font-semibold text-coral-strong">{fieldError("password")}</span>
            )}
          </label>

          {/* Class picker as a friendly grid — only for learners */}
          {role === "STUDENT" && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-ink-muted">🎒 Your class (optional)</span>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((g) => {
                  const selected = grade === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setGrade(selected ? "" : g)}
                      className={[
                        "fa-press flex flex-col items-center gap-0.5 rounded-xl border-2 px-1 py-2 text-sm font-bold transition",
                        selected
                          ? "border-brand bg-brand-soft text-brand-strong"
                          : "border-line bg-canvas text-ink-muted hover:border-brand/40 hover:text-ink",
                      ].join(" ")}
                    >
                      <span className="text-xl" aria-hidden>
                        {CLASS_ANIMALS[g - 1]}
                      </span>
                      <span>{g}</span>
                    </button>
                  );
                })}
              </div>
              {fieldError("grade") && (
                <span className="text-xs font-semibold text-coral-strong">{fieldError("grade")}</span>
              )}
            </div>
          )}

          {role === "PARENT" && (
            <p className="rounded-xl bg-sky-soft px-4 py-3 text-xs font-semibold text-sky-strong">
              After signing up you can link your child by their username and
              follow their quests in the Family HQ. 🏡
            </p>
          )}

          <button
            className="fa-btn-primary animate-pulse-soft mt-1"
            type="submit"
            disabled={loading}
          >
            {loading ? "Making your pass…" : "Start my quest! ✨"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px grow bg-line" />
          <span className="text-xs font-bold uppercase tracking-wide text-ink-faint">or</span>
          <div className="h-px grow bg-line" />
        </div>

        {googleHref ? (
          <a className="fa-btn-secondary w-full" href={googleHref} rel="noopener">
            <GoogleLogoSvg className="h-5 w-5" />
            Sign up with Google
          </a>
        ) : (
          <button
            className="fa-btn-secondary w-full"
            type="button"
            onClick={() => setError("Google sign-up is not configured yet.")}
          >
            <GoogleLogoSvg className="h-5 w-5" />
            Sign up with Google
          </button>
        )}

        <p className="fa-caption mt-8 text-center">
          Already an explorer?{" "}
          <Link
            href="/login"
            className="font-bold text-brand transition hover:text-brand-strong"
          >
            Log in
          </Link>
        </p>
      </div>

      <p className="fa-caption mt-6 text-center">
        <Link href="/" className="transition hover:text-ink">
          ← Back to home
        </Link>
      </p>
    </main>
  );
};

export default Signup;
