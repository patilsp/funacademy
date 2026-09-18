import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "funacademy.theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeClass(theme: ThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export type ThemeSlice = {
  theme: ThemeMode;
  /** Must be called once from a client effect after hydration. */
  initTheme: () => void;
  toggleTheme: () => void;
};

export const createThemeSlice: BoundStateCreator<ThemeSlice> = (set) => ({
  theme: "light",
  initTheme: () =>
    set(() => {
      const theme = getInitialTheme();
      applyThemeClass(theme);
      return { theme };
    }),
  toggleTheme: () =>
    set((state) => {
      const theme: ThemeMode = state.theme === "dark" ? "light" : "dark";
      applyThemeClass(theme);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        /* storage unavailable — theme still applies for this session */
      }
      return { theme };
    }),
});
