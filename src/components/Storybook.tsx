import { useCallback, useEffect, useMemo, useState } from "react";

import { Curio } from "@/components/Curio";
import { useNarrator } from "@/hooks/useNarrator";
import { useBoundStore } from "@/hooks/useBoundStore";

export type StoryScene = { emoji: string; text: string };
export type Story = { title: string; scenes: StoryScene[] };

const SCENE_MS = 3600;

/**
 * Storybook — the 60-second animated story that opens every lesson.
 * Each scene shows a big emoji world while Curio narrates the text.
 * Kids can pause/replay; it auto-advances then hands over to the quiz.
 */
export const Storybook = ({
  story,
  onFinished,
  subjectEmoji = "📚",
}: {
  story: Story;
  onFinished: () => void;
  subjectEmoji?: string;
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const { speak, stop, speaking, supported } = useNarrator();
  const soundEffects = useBoundStore((x) => x.soundEffects);

  const scene = story.scenes[sceneIndex] ?? story.scenes[0];

  const advance = useCallback(() => {
    setSceneIndex((index) => {
      if (index + 1 >= story.scenes.length) {
        setDone(true);
        return index;
      }
      return index + 1;
    });
  }, [story.scenes.length]);

  // Speak each scene when it appears.
  useEffect(() => {
    if (!scene || paused) return;
    if (soundEffects && supported) {
      speak(`${scene.text}`);
    }
    const timer = setTimeout(advance, SCENE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIndex, paused]);

  useEffect(() => {
    if (done) onFinished();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const togglePause = () => {
    if (paused) {
      setPaused(false);
    } else {
      stop();
      setPaused(true);
    }
  };

  const replay = () => {
    setDone(false);
    setSceneIndex(0);
    setPaused(false);
  };

  const floatingEmojis = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        emoji: story.scenes[i % story.scenes.length]?.emoji.slice(0, 2) ?? "✨",
        left: `${8 + i * 13}%`,
        delay: `${i * 0.9}s`,
        duration: `${5.5 + (i % 3)}s`,
      })),
    [story.scenes],
  );

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center gap-6 px-4 py-8">
      {/* scene stage */}
      <div className="relative w-full max-w-xl">
        <div className="fa-card fa-bg-dots relative overflow-hidden rounded-3xl border-2 border-line p-8 text-center shadow-lift sm:p-12">
          {/* floating emoji sparkles */}
          {floatingEmojis.map((f, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-float-emoji pointer-events-none absolute bottom-4 select-none text-2xl opacity-60"
              style={{ left: f.left, animationDelay: f.delay, animationDuration: f.duration }}
            >
              {f.emoji}
            </span>
          ))}

          <div key={sceneIndex} className="animate-scene-pop select-none text-[86px] leading-none sm:text-[120px]">
            {scene?.emoji ?? subjectEmoji}
          </div>

          <p key={`text-${sceneIndex}`} className="animate-fade-in mt-6 text-xl font-bold leading-relaxed text-ink sm:text-2xl">
            {scene?.text}
          </p>
        </div>

        {/* Curio the storyteller */}
        <div className="absolute -bottom-6 -left-3 sm:-left-8">
          <Curio mood={speaking ? "excited" : "happy"} className="h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24" />
        </div>
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {story.scenes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                stop();
                setDone(false);
                setSceneIndex(i);
                setPaused(false);
              }}
              aria-label={`Scene ${i + 1}`}
              className={[
                "h-3 rounded-full transition-all",
                i === sceneIndex ? "w-8 bg-brand" : "w-3 bg-line-strong hover:bg-ink-faint",
              ].join(" ")}
            />
          ))}
        </div>
        <button
          onClick={togglePause}
          className="fa-press flex items-center gap-2 rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-bold text-ink-muted shadow-card transition hover:border-brand/40 hover:text-ink"
        >
          {paused ? "▶ Play" : "⏸ Pause"}
        </button>
        <button
          onClick={replay}
          className="fa-press rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-bold text-ink-muted shadow-card transition hover:border-brand/40 hover:text-ink"
        >
          ↺ Again
        </button>
      </div>

      <button
        onClick={() => {
          stop();
          onFinished();
        }}
        className="fa-btn-primary-lg mt-2 animate-pulse-soft"
      >
        {done ? "Let's practice! →" : "Skip story →"}
      </button>
    </div>
  );
};
