import type { ComponentProps } from "react";

/**
 * Curio — the friendly owl mascot. Pure SVG so it animates crisply,
 * scales anywhere and adds zero image weight. The `mood` prop swaps
 * expressions for celebrations, encouragement and thinking moments.
 */
export type Mood = "happy" | "excited" | "thinking" | "sad" | "wave";

export const Curio = ({
  mood = "happy",
  className = "",
  ...props
}: { mood?: Mood } & ComponentProps<"svg">) => {
  const wingClass =
    mood === "excited" ? "animate-curious-flap" : mood === "wave" ? "animate-curious-wave" : "";
  const blink = mood === "happy" || mood === "excited" ? "animate-curious-blink" : "";

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Curio the owl"
      {...props}
    >
      {/* shadow */}
      <ellipse cx="60" cy="112" rx="30" ry="5" className="fill-ink/10" />
      {/* body */}
      <path
        d="M60 14c-26 0-42 20-42 46 0 26 18 46 42 46s42-20 42-46c0-26-16-46-42-46Z"
        className="fill-brand"
      />
      {/* belly */}
      <path
        d="M60 52c-16 0-27 14-27 30 0 14 12 24 27 24s27-10 27-24c0-16-11-30-27-30Z"
        className="fill-brand-soft"
      />
      {/* belly feather lines */}
      <g className="stroke-brand/20" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M46 78c3 3 8 3 11 0M63 78c3 3 8 3 11 0M46 90c3 3 8 3 11 0M63 90c3 3 8 3 11 0" />
      </g>
      {/* wings */}
      <path
        d="M18 52c-6 10-6 26 2 36 4 5 10 6 12 2 2-5-2-8-4-14-2-7-2-16-2-24h-8Z"
        className={`fill-brand-strong ${wingClass}`}
        style={{ transformOrigin: "20px 60px" }}
      />
      <path
        d="M102 52c6 10 6 26-2 36-4 5-10 6-12 2-2-5 2-8 4-14 2-7 2-16 2-24h-8Z"
        className={`fill-brand-strong ${wingClass}`}
        style={{ transformOrigin: "100px 60px" }}
      />
      {/* eyes */}
      <circle cx="45" cy="44" r="17" className="fill-white" />
      <circle cx="75" cy="44" r="17" className="fill-white" />
      <g className={blink} style={{ transformOrigin: "60px 44px" }}>
        <circle cx="45" cy="44" r="8" className="fill-ink" />
        <circle cx="75" cy="44" r="8" className="fill-ink" />
        <circle cx="48" cy="41" r="2.5" className="fill-white" />
        <circle cx="78" cy="41" r="2.5" className="fill-white" />
      </g>
      {/* brows by mood */}
      {mood === "thinking" && (
        <g className="stroke-brand-strong" strokeWidth="3" strokeLinecap="round">
          <path d="M36 28l14 4M84 28l-14 4" />
        </g>
      )}
      {mood === "excited" && (
        <g className="stroke-amber" strokeWidth="3" strokeLinecap="round">
          <path d="M34 22l6-6M86 22l-6-6M60 16v-8" />
        </g>
      )}
      {mood === "sad" && (
        <g className="stroke-brand-strong" strokeWidth="3" strokeLinecap="round">
          <path d="M38 30l12 2M82 30l-12 2" />
        </g>
      )}
      {/* beak */}
      <path d="M60 50l8 10-8 8-8-8 8-10Z" className={mood === "excited" ? "fill-amber-strong" : "fill-amber"} />
      {/* ear tufts */}
      <path d="M30 20l4-14 14 8-18 6ZM90 20l-4-14-14 8 18 6Z" className="fill-brand-strong" />
    </svg>
  );
};
