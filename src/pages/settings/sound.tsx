import type { NextPage } from "next";
import React, { useState } from "react";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { TopBar } from "~/components/TopBar";
import { SettingsRightNav } from "~/components/SettingsRightNav";
import { useBoundStore } from "~/hooks/useBoundStore";

const Sound: NextPage = () => {
  const soundEffects = useBoundStore((x) => x.soundEffects);
  const setSoundEffects = useBoundStore((x) => x.setSoundEffects);
  const [localSoundEffects, setLocalSoundEffects] = useState(soundEffects);

  const speakingExercises = useBoundStore((x) => x.speakingExercises);
  const setSpeakingExercises = useBoundStore((x) => x.setSpeakingExercises);
  const [localSpeakingExercises, setLocalSpeakingExercises] =
    useState(speakingExercises);

  const listeningExercises = useBoundStore((x) => x.listeningExercises);
  const setListeningExercises = useBoundStore((x) => x.setListeningExercises);
  const [localListeningExercises, setLocalListeningExercises] =
    useState(listeningExercises);

  const soundOptions = [
    {
      title: "Sound effects",
      value: localSoundEffects,
      setValue: setLocalSoundEffects,
    },
    {
      title: "Speaking exercises",
      value: localSpeakingExercises,
      setValue: setLocalSpeakingExercises,
    },
    {
      title: "Listening exercises",
      value: localListeningExercises,
      setValue: setLocalListeningExercises,
    },
  ];

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab={null} />
      <BottomBar selectedTab={null} />
      <div className="fa-bg-aurora mx-auto flex min-h-screen flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="fa-h2">Sound</h1>
          <button
            className="fa-btn-primary-sm disabled:bg-panel disabled:text-ink-faint disabled:shadow-none"
            onClick={() => {
              setSoundEffects(localSoundEffects);
              setSpeakingExercises(localSpeakingExercises);
              setListeningExercises(localListeningExercises);
            }}
            disabled={
              localSoundEffects === soundEffects &&
              localSpeakingExercises === speakingExercises &&
              localListeningExercises === listeningExercises
            }
          >
            Save changes
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="fa-card flex w-full max-w-xl flex-col gap-6 p-6">
            {soundOptions.map(({ title, value, setValue }) => {
              return (
                <div
                  key={title}
                  className="flex items-center justify-between sm:justify-center sm:gap-10 sm:pl-6"
                >
                  <div className="text-sm font-bold uppercase tracking-wide text-ink-muted sm:w-1/2">
                    {title}
                  </div>
                  <label className="pr-5 sm:w-1/2 sm:pr-0">
                    <div
                      className={[
                        "relative h-6 w-12 cursor-pointer rounded-full transition-all duration-300",
                        value ? "bg-brand" : "bg-line-strong",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "absolute h-10 w-10 rounded-xl border-2 bg-surface shadow-card transition-all duration-300",
                          value ? "border-brand" : "border-line-strong",
                        ].join(" ")}
                        style={{
                          top: "calc(50% - 20px)",
                          left: value ? "calc(100% - 20px)" : "-20px",
                        }}
                      ></div>
                    </div>
                    <input
                      className="hidden"
                      type="checkbox"
                      checked={value}
                      onChange={() => setValue((x) => !x)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <SettingsRightNav selectedTab="Sound" />
        </div>
      </div>
    </div>
  );
};

export default Sound;
