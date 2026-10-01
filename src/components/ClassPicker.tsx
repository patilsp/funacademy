import { useState } from "react";

import { Curio } from "@/components/Curio";
import type { SessionUser } from "@/stores/createSessionStore";

/**
 * ClassPicker — the first thing a new kid sees after signing up.
 * Big tappable class buttons; Curio cheers when a class is chosen.
 */
export const ClassPicker = ({ onDone }: { onDone: (user: SessionUser) => void }) => {
  const [saving, setSaving] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const choose = async (grade: number) => {
    setSaving(grade);
    setError(null);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Could not save your class");
        setSaving(null);
        return;
      }
      const data = (await res.json()) as { user: SessionUser };
      onDone(data.user);
    } catch {
      setError("Network error. Try again!");
      setSaving(null);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 text-center">
        <Curio mood="wave" className="mx-auto h-28 w-28 animate-float-slow" />
        <h1 className="fa-h1 mt-3 text-3xl sm:text-4xl">Hi friend! 👋</h1>
        <p className="fa-sub mt-2 text-base sm:text-lg">
          I'm <b className="text-brand">Curio</b>. What class are you in?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((grade) => (
          <button
            key={grade}
            onClick={() => void choose(grade)}
            disabled={saving !== null}
            className={[
              "fa-press flex flex-col items-center gap-1 rounded-3xl border-2 p-5 transition-all",
              saving === grade
                ? "border-brand bg-brand text-white shadow-lift"
                : "border-line bg-surface shadow-card hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift",
            ].join(" ")}
          >
            <span className="text-3xl">{["🐣", "🐥", "🦊", "🐬", "🦉", "🦄", "🐉"][grade - 1]}</span>
            <span className="text-lg font-extrabold">Class {grade}</span>
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-coral-soft px-4 py-3 text-center text-sm font-bold text-coral-strong">
          {error}
        </p>
      )}

      <p className="fa-caption mt-6 text-center">
        You can change your class anytime from your profile.
      </p>
    </div>
  );
};
