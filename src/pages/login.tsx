import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { GoogleLogoSvg } from "~/components/LoginScreen";
import { googleAuthUrl } from "~/lib/google";

const Login: NextPage = () => {
  const router = useRouter();
  const setSessionUser = useBoundStore((x) => x.setSessionUser);

  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const googleHref = googleAuthUrl(returnTo);

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
        <h1 className="fa-h2 text-center">Welcome back</h1>
        <p className="fa-sub mt-2 text-center">
          Log in to continue your learning streak.
        </p>

        <form className="mt-8 flex flex-col gap-3" onSubmit={handleLogin}>
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong"
            >
              {error}
              {typeof router.query.error === "string" && router.query.error === "google" && (
                <div className="mt-1 text-xs font-normal text-coral-strong/80">
                  Google sign-in failed. Please try again.
                </div>
            )}
            </div>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Email</span>
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
            <span className="text-sm font-bold text-ink-muted">Password</span>
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
          <button className="fa-btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px grow bg-line" />
          <span className="text-xs font-bold uppercase tracking-wide text-ink-faint">or</span>
          <div className="h-px grow bg-line" />
        </div>

        {googleHref ? (
          <a
            className="fa-btn-secondary w-full"
            href={googleHref}
            rel="noopener"
          >
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
          New to FunAcademy?{" "}
          <Link
            href="/signup"
            className="font-bold text-brand transition hover:text-brand-strong"
          >
            Create an account
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
