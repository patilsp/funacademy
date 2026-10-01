import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { GoogleLogoSvg } from "~/components/LoginScreen";
import { googleAuthUrl } from "~/lib/google";
import { Curio } from "~/components/Curio";

/**
 * Login screen — the front gate of CurioQuest.
 *
 * Flow: the learner enters email + password, we POST to /api/auth/login and
 * on success store the user in the Zustand session store, then bounce to
 * `?returnTo=…` (or /learn by default). Google sign-in is shown only when
 * GOOGLE_CLIENT_ID is configured server-side (googleAuthUrl returns "").
 */

// Floating emoji decorations around the card — purely visual sparkle.
const FLOATERS: { emoji: string; className: string; delay: string }[] = [
  { emoji: "⭐", className: "left-[8%] top-[18%]", delay: "0s" },
  { emoji: "📚", className: "right-[10%] top-[24%]", delay: "1.4s" },
  { emoji: "🚀", className: "left-[14%] bottom-[20%]", delay: "2.8s" },
  { emoji: "✨", className: "right-[12%] bottom-[26%]", delay: "4s" },
];

const Login: NextPage = () => {
  const router = useRouter();
  // Global session store — shared with TopBar, /learn and friends.
  const setSessionUser = useBoundStore((x) => x.setSessionUser);

  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only accept same-app paths as returnTo (prevents open redirects).
  const returnTo =
    typeof router.query.returnTo === "string" && router.query.returnTo.startsWith("/")
      ? router.query.returnTo
      : "/learn";

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? "Login failed. Please try again.");
        return;
      }
      setSessionUser(data.user);
      void router.push(returnTo);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Empty string when Google OAuth is not configured → we render a disabled
  // fallback button that explains what to set up.
  const googleHref = googleAuthUrl(returnTo);

  return (
    <main className="fa-bg-aurora fa-bg-dots relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-4 py-10 text-ink">
      {/* Ambient floating sparkles (hidden from screen readers + reduced-motion safe) */}
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

      {/* Mascot greeting — Curio waves hello above the card */}
      <div className="mb-1 flex flex-col items-center gap-1">
        <Curio mood="wave" className="h-20 w-20 drop-shadow-card" />
      </div>

      <Link
        href="/"
        className="mb-6 text-[26px] font-extrabold tracking-tight"
        aria-label="CurioQuest home"
      >
        <span className="text-brand">Curio</span>
        <span className="text-ink">Quest</span>
      </Link>

      <div className="fa-card w-full max-w-md p-8 sm:p-10">
        <h1 className="fa-h2 text-center">Welcome back, explorer!</h1>
        <p className="fa-sub mt-2 text-center">
          Your quests, streak and stars are waiting for you. 🌟
        </p>

        <form className="mt-8 flex flex-col gap-3" onSubmit={handleLogin}>
          {/* One shared error banner: server messages + Google OAuth failures */}
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong"
            >
              {error}
              {router.query.error === "google" && (
                <div className="mt-1 text-xs font-normal text-coral-strong/80">
                  Google sign-in failed. Please try again.
                </div>
              )}
            </div>
          )}

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
            <span className="sr-only">Email address</span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">🔒 Password</span>
            <input
              className="fa-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="sr-only">Password</span>
          </label>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-bold text-brand transition hover:text-brand-strong"
            >
              Forgot password?
            </Link>
          </div>

          {/* Big friendly CTA — pulses softly while idle, blocks double submits */}
          <button
            className="fa-btn-primary animate-pulse-soft mt-1"
            type="submit"
            disabled={loading}
          >
            {loading ? "Opening the nest…" : "Let's go! 🚀"}
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
            Continue with Google
          </a>
        ) : (
          <button
            className="fa-btn-secondary w-full"
            type="button"
            onClick={() => setError("Google sign-in is not configured yet.")}
          >
            <GoogleLogoSvg className="h-5 w-5" />
            Continue with Google
          </button>
        )}

        <p className="fa-caption mt-8 text-center">
          New explorer?{" "}
          <Link
            href="/signup"
            className="font-bold text-brand transition hover:text-brand-strong"
          >
            Join the quest
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

export default Login;
