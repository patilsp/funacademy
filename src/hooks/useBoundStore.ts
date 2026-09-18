import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { GoalXpSlice } from "~/stores/createGoalXpStore";
import { createGoalXpSlice } from "~/stores/createGoalXpStore";
import type { LanguageSlice } from "~/stores/createLanguageStore";
import { createLanguageSlice } from "~/stores/createLanguageStore";
import type { LessonSlice } from "~/stores/createLessonStore";
import { createLessonSlice } from "~/stores/createLessonStore";
import type { LingotSlice } from "~/stores/createLingotStore";
import { createLingotSlice } from "~/stores/createLingotStore";
import type { SessionSlice } from "~/stores/createSessionStore";
import { createSessionSlice } from "~/stores/createSessionStore";
import type { SoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import type { ThemeSlice } from "~/stores/createThemeStore";
import { createSoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import type { StreakSlice } from "~/stores/createStreakStore";
import { createStreakSlice } from "~/stores/createStreakStore";
import type { UserSlice } from "~/stores/createUserStore";
import { createUserSlice } from "~/stores/createUserStore";
import type { XpSlice } from "~/stores/createXpStore";
import { createThemeSlice } from "~/stores/createThemeStore";
import { createXpSlice } from "~/stores/createXpStore";

type BoundState = GoalXpSlice &
  LanguageSlice &
  LessonSlice &
  LingotSlice &
  SessionSlice &
  SoundSettingsSlice &
  StreakSlice &
  ThemeSlice &
  UserSlice &
  XpSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createGoalXpSlice(...args),
  ...createLanguageSlice(...args),
  ...createLessonSlice(...args),
  ...createLingotSlice(...args),
  ...createSessionSlice(...args),
  ...createSoundSettingsSlice(...args),
  ...createThemeSlice(...args),
  ...createStreakSlice(...args),
  ...createUserSlice(...args),
  ...createXpSlice(...args),
}));
