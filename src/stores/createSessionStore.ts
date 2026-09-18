import type { BoundStateCreator } from "@/hooks/useBoundStore";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  pictureUrl: string | null;
  role: "STUDENT" | "PARENT" | "TEACHER" | "ADMIN";
  classId: number | null;
};

export type SessionSlice = {
  sessionUser: SessionUser | null;
  sessionStatus: "idle" | "loading" | "authenticated" | "guest";
  setSessionUser: (user: SessionUser | null) => void;
  initSession: () => Promise<void>;
};

export const createSessionSlice: BoundStateCreator<SessionSlice> = (set) => ({
  sessionUser: null,
  sessionStatus: "idle",
  setSessionUser: (user) =>
    set({
      sessionUser: user,
      sessionStatus: user ? "authenticated" : "guest",
    }),
  initSession: async () => {
    set({ sessionStatus: "loading" });
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      if (!response.ok) {
        set({ sessionUser: null, sessionStatus: "guest" });
        return;
      }
      const data = (await response.json()) as { user: SessionUser | null };
      set({
        sessionUser: data.user,
        sessionStatus: data.user ? "authenticated" : "guest",
      });
    } catch {
      set({ sessionUser: null, sessionStatus: "guest" });
    }
  },
});
