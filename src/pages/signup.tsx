import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { GoogleSignInButton } from "~/components/GoogleSignInButton";

const Signup: NextPage = () => {
  const router = useRouter();
  const logIn = useBoundStore((x) => x.logIn);
  const setName = useBoundStore((x) => x.setName);
  const setUsername = useBoundStore((x) => x.setUsername);
  const setEmail = useBoundStore((x) => x.setEmail);
  const theme = useBoundStore((x) => x.theme);

  const [name, setNameState] = useState("");
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLegacySignup = () => {
    const displayEmail = email.trim() || "new.learner@example.com";
    const displayName = name.trim() || displayEmail.split("@")[0] || "learner";
    setLoading(true);
    setEmail(displayEmail);
    setName(displayName);
    setUsername(displayName.replace(/\s+/g, "-").toLowerCase());
    logIn();
    setTimeout(() => void router.push("/learn"), 400);
  };

  return (
    <main className="fa-bg-aurora fa-bg-dots flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-10 text-ink">
      <Link
        href="/"
        className="mb-8 text-[26px] font-bold tracking-tight"
        aria-label="FunAcademy home"
      >
        <span className="text-brand">Fun</span>
        <span className="text-ink">Academy</span>
      </Link>

      <div className="fa-card w-full max-w-md p-8 sm:p-10">
        <h1 className="fa-h2 text-center">Create your account</h1>
        <p className="fa-sub mt-2 text-center">
          Start learning in less than a minute.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <GoogleSignInButton mode="signup" />
          <div className="my-1 flex items-center gap-3">
            <div className="h-px grow bg-line" />
            <span className="text-xs font-bold uppercase tracking-wide text-ink-faint">
              or
            </span>
            <div className="h-px grow bg-line" />
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Name</span>
            <input
              className="fa-input"
              type="text"
              autoComplete="name"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setNameState(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Email</span>
            <input
              className="fa-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Password</span>
            <input
              className="fa-input"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="fa-btn-primary"
            onClick={handleLegacySignup}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </div>

        <p className="fa-caption mt-8 text-center">
          Already have an account?{" "}
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
      <span className="sr-only" data-theme={theme}>
        Theme: {theme}
      </span>
    </main>
  );
};

export default Signup;
