import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--rgb-canvas) / <alpha-value>)",
        surface: "rgb(var(--rgb-surface) / <alpha-value>)",
        panel: "rgb(var(--rgb-panel) / <alpha-value>)",
        line: {
          DEFAULT: "rgb(var(--rgb-line) / <alpha-value>)",
          strong: "rgb(var(--rgb-line-strong) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--rgb-ink) / <alpha-value>)",
          muted: "rgb(var(--rgb-ink-muted) / <alpha-value>)",
          faint: "rgb(var(--rgb-ink-faint) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--rgb-brand) / <alpha-value>)",
          strong: "rgb(var(--rgb-brand-strong) / <alpha-value>)",
          soft: "rgb(var(--rgb-brand-soft) / <alpha-value>)",
        },
        sky: {
          DEFAULT: "rgb(var(--rgb-sky) / <alpha-value>)",
          strong: "rgb(var(--rgb-sky-strong) / <alpha-value>)",
          soft: "rgb(var(--rgb-sky-soft) / <alpha-value>)",
        },
        violet: {
          DEFAULT: "rgb(var(--rgb-violet) / <alpha-value>)",
          strong: "rgb(var(--rgb-violet-strong) / <alpha-value>)",
          soft: "rgb(var(--rgb-violet-soft) / <alpha-value>)",
        },
        amber: {
          DEFAULT: "rgb(var(--rgb-amber) / <alpha-value>)",
          strong: "rgb(var(--rgb-amber-strong) / <alpha-value>)",
          soft: "rgb(var(--rgb-amber-soft) / <alpha-value>)",
        },
        emerald: {
          DEFAULT: "rgb(var(--rgb-emerald) / <alpha-value>)",
          strong: "rgb(var(--rgb-emerald-strong) / <alpha-value>)",
          soft: "rgb(var(--rgb-emerald-soft) / <alpha-value>)",
        },
        coral: {
          DEFAULT: "rgb(var(--rgb-coral) / <alpha-value>)",
          strong: "rgb(var(--rgb-coral-strong) / <alpha-value>)",
          soft: "rgb(var(--rgb-coral-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgb(16 24 40 / 0.04), 0 4px 16px -8px rgb(16 24 40 / 0.10)",
        lift: "0 2px 4px rgb(16 24 40 / 0.05), 0 16px 32px -16px rgb(16 24 40 / 0.18)",
        btn: "0 1px 2px rgb(16 24 40 / 0.10), inset 0 1px 0 rgb(255 255 255 / 0.08)",
        glow: "0 0 0 1px rgb(var(--rgb-brand) / 0.10), 0 12px 40px -12px rgb(var(--rgb-brand) / 0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease both",
        rise: "rise 0.35s ease both",
        "scale-in": "scale-in 0.2s ease both",
        shimmer: "shimmer 1.8s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
