import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { GoogleLogoSvg } from "~/components/LoginScreen";
import { googleAuthUrl } from "~/lib/google";

const Signup: NextPage = () => {
  const router = useRouter();
  const setSessionUser = useBoundStore((x) => x.setSessionUser);

  const [name, setNameState] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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
          ...(grade !== "" ? { grade: Number(grade) } : {}),
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
      void router.push(returnTo);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleHref = googleAuthUrl(returnTo);

  const fieldError = (field: string): string | null =>
    fieldErrors[field]?.[0] ?? null;

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

        <form className="mt-8 flex flex-col gap-3" onSubmit={handleSignup}>
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral-strong"
            >
              {error}
            </div>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Name</span>
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
            <span className="text-sm font-bold text-ink-muted">Username</span>
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
            {fieldError("email") && (
              <span className="text-xs font-semibold text-coral-strong">{fieldError("email")}</span>
            )}
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Password</span>
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
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-ink-muted">Class (optional)</span>
            <select
              className="fa-input"
              value={grade}
              onChange={(e) => setGrade(e.target.value === "" ? "" : Number(e.target.value))}
            >
              <option value="">Choose your class…</option>
              {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                <option key={g} value={g}>{`Class ${g}`}</option>
              ))}
            </select>
            {fieldError("grade") && (
              <span className="text-xs font-semibold text-coral-strong">{fieldError("grade")}</span>
            )}
          </label>
          <button className="fa-btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
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
    </main>
  );
};

export default Signup;
