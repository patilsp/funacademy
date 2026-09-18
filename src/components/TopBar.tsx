import dayjs from "dayjs";
import Link from "next/link";
import type { ComponentProps, JSX } from "react";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { Calendar } from "./Calendar";
import { Flag } from "./Flag";
import {
  FireSvg,
  GemSvg,
  GlobeIconSvg,
  LingotsTreasureChestSvg,
  MoreOptionsSvg,
  PodcastIconSvg,
} from "./Svgs";

const EmptyFireTopBarSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="25" height="30" viewBox="0 0 25 30" fill="none" {...props}>
      <g className="opacity-25">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9697 2.91035C13.2187 1.96348 11.7813 1.96348 11.0303 2.91035L7.26148 7.66176L4.83362 6.36218C4.61346 6.24433 4.1221 6.09629 3.88966 6.05712C2.72329 5.86056 2.04098 6.78497 2.04447 8.03807L2.06814 16.5554C2.02313 16.9355 2 17.322 2 17.7137C2 23.2979 6.70101 27.8248 12.5 27.8248C18.299 27.8248 23 23.2979 23 17.7137C23 15.3518 22.1591 13.1791 20.7498 11.4581L13.9697 2.91035ZM11.7198 13.1888C12.0889 12.6861 12.8399 12.6861 13.209 13.1888L15.7324 16.6249C16.5171 17.4048 17 18.4679 17 19.6396C17 22.0329 14.9853 23.973 12.5 23.973C10.0147 23.973 8 22.0329 8 19.6396C8 18.6017 8.37893 17.649 9.01085 16.9029C9.0252 16.8668 9.04457 16.8315 9.06935 16.7978L11.7198 13.1888Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

const EmptyGemTopBarSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="24" height="30" viewBox="0 0 24 30" fill="none" {...props}>
      <g className="opacity-25">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.63705 7.31556C2.62104 7.92872 2 9.02888 2 10.2156V19.8818C2 21.0685 2.62104 22.1687 3.63705 22.7819L10.1117 26.6893C11.1881 27.3389 12.5356 27.3389 13.612 26.6894L20.087 22.7818C21.1031 22.1687 21.7241 21.0685 21.7241 19.8818V10.2156C21.7241 9.0289 21.1031 7.92872 20.087 7.31557L13.612 3.40806C12.5356 2.7585 11.1881 2.75851 10.1117 3.40809L3.63705 7.31556ZM11.8902 6.37281C11.8902 5.52831 10.9645 5.01055 10.2449 5.45256L4.91163 8.72852C4.24944 9.13527 4.22068 10.0873 4.85711 10.5332L7.24315 12.2053C7.59354 12.4508 8.05585 12.4663 8.42194 12.2449L11.3692 10.462C11.6926 10.2664 11.8902 9.91591 11.8902 9.53794V6.37281Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

const AddLanguageSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="36" height="29" viewBox="0 0 36 29" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g className="stroke-ink-faint">
          <path
            d="M7.743 3c-1.67 0-2.315.125-2.98.48A3.071 3.071 0 0 0 3.48 4.763c-.355.665-.48 1.31-.48 2.98v13.514c0 1.67.125 2.315.48 2.98.297.555.728.986 1.283 1.283.665.355 1.31.48 2.98.48h20.514c1.67 0 2.315-.125 2.98-.48a3.071 3.071 0 0 0 1.283-1.283c.355-.665.48-1.31.48-2.98V7.743c0-1.67-.125-2.315-.48-2.98a3.071 3.071 0 0 0-1.283-1.283c-.665-.355-1.31-.48-2.98-.48H7.743z"
            strokeWidth="2"
          />
          <g strokeLinecap="round" strokeWidth="3">
            <path d="M18 10v9M13.5 14.5h9" />
          </g>
        </g>
      </g>
    </svg>
  );
};

const SunSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="4.5" className="fill-amber" />
      <g className="stroke-amber" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4L19 19M19 5l-1.6 1.6M6.6 17.4L5 19" />
      </g>
    </svg>
  );
};

const MoonSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        className="fill-brand"
      />
    </svg>
  );
};

type MenuState = "HIDDEN" | "LANGUAGES" | "STREAK" | "GEMS" | "MORE";

export const TopBar = () => {
  const [menu, setMenu] = useState<MenuState>("HIDDEN");
  const [now, setNow] = useState(dayjs());
  const streak = useBoundStore((x) => x.streak);
  const lingots = useBoundStore((x) => x.lingots);
  const language = useBoundStore((x) => x.language);
  const theme = useBoundStore((x) => x.theme);
  const toggleTheme = useBoundStore((x) => x.toggleTheme);
  return (
    <header className="fixed z-20 h-[60px] w-full">
      <div className="fa-glass relative flex h-full w-full items-center justify-between border-b border-line px-3 sm:px-4">
        <button
          className="fa-press rounded-xl p-1.5 hover:bg-canvas"
          onClick={() =>
            setMenu((x) => (x === "LANGUAGES" ? "HIDDEN" : "LANGUAGES"))
          }
        >
          <Flag language={language} width={42} />
          <span className="sr-only">See languages</span>
        </button>

        <button
          className="fa-press flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-bold tabular-nums text-amber hover:bg-amber-soft"
          onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
          aria-label="Toggle streak menu"
        >
          {streak > 0 ? <FireSvg /> : <EmptyFireTopBarSvg />}{" "}
          <span className="text-[15px]">{streak}</span>
        </button>
        <button
          className="fa-press flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-bold tabular-nums text-sky hover:bg-sky-soft"
          onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
          aria-label="Toggle lingot menu"
        >
          {lingots > 0 ? <GemSvg /> : <EmptyGemTopBarSvg />}{" "}
          <span className="text-[15px]">{lingots}</span>
        </button>
        <div className="flex items-center gap-1">
          <button
            className="fa-press rounded-xl p-2 text-ink-muted hover:bg-canvas hover:text-ink"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunSvg /> : <MoonSvg />}
          </button>
          <MoreOptionsSvg
            className="fa-press rounded-xl p-1 text-ink-muted hover:bg-canvas hover:text-ink"
            onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
            role="button"
            tabIndex={0}
            aria-label="Toggle more menu"
          />
        </div>

        <div
          className={[
            "absolute left-0 right-0 top-full transition duration-200",
            menu === "HIDDEN" ? "pointer-events-none opacity-0" : "opacity-100",
          ].join(" ")}
          aria-hidden={menu === "HIDDEN"}
        >
          {((): null | JSX.Element => {
            switch (menu) {
              case "LANGUAGES":
                return (
                  <div className="p-4">
                    <div className="fa-card animate-rise mx-auto flex max-w-md gap-5 p-5">
                      <div className="flex flex-col items-center justify-between gap-2">
                        <div className="rounded-2xl border-2 border-brand/60 p-1 shadow-glow">
                          <Flag language={language} width={72} />
                        </div>
                        <span className="text-sm font-bold">{language.name}</span>
                      </div>
                      <Link
                        className="fa-press flex flex-col items-center justify-between gap-2 rounded-2xl border-2 border-dashed border-line-strong p-2 hover:border-brand/50"
                        href="/register"
                      >
                        <div className="flex h-[76px] items-center px-4">
                          <AddLanguageSvg className="h-14 w-16" />
                        </div>
                        <span className="pb-1 text-sm font-bold text-ink-muted">
                          Courses
                        </span>
                      </Link>
                    </div>
                  </div>
                );

              case "STREAK":
                return (
                  <div className="p-4">
                    <div className="fa-card animate-rise mx-auto flex max-w-md grow flex-col items-center gap-3 p-5">
                      <h2 className="fa-h3">Streak</h2>
                      <p className="fa-caption text-center">
                        {`Practice each day so your streak won't reset!`}
                      </p>
                      <div className="self-stretch">
                        <Calendar now={now} setNow={setNow} />
                      </div>
                    </div>
                  </div>
                );

              case "GEMS":
                return (
                  <div className="p-4">
                    <div className="fa-card animate-rise mx-auto flex max-w-md items-center gap-4 p-5">
                      <LingotsTreasureChestSvg className="h-20 w-20 shrink-0" />
                      <div className="flex flex-col gap-2">
                        <h2 className="fa-h3">Lingots</h2>
                        <p className="fa-caption">
                          You have {lingots}{" "}
                          {lingots === 1 ? "lingot" : "lingots"}.
                        </p>
                        <Link
                          className="text-sm font-bold uppercase tracking-wide text-brand transition hover:text-brand-strong"
                          href="/shop"
                        >
                          Go to shop
                        </Link>
                      </div>
                    </div>
                  </div>
                );

              case "MORE":
                return (
                  <div className="p-4">
                    <div className="fa-card animate-rise mx-auto flex max-w-md flex-col overflow-hidden py-2">
                      <Link
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-ink transition hover:bg-canvas"
                        href="https://podcast.funacademy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PodcastIconSvg className="h-9 w-9" />
                        Podcast
                      </Link>
                      <Link
                        className="flex items-center gap-3 border-t border-line px-5 py-3 text-sm font-bold text-ink transition hover:bg-canvas"
                        href="https://schools.funacademy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GlobeIconSvg className="h-9 w-9" />
                        Schools
                      </Link>
                    </div>
                  </div>
                );

              case "HIDDEN":
                return null;
            }
          })()}
          <div
            className={[
              "fixed left-0 top-[60px] h-screen w-screen bg-ink/40 backdrop-blur-[2px] transition duration-200",
              menu === "HIDDEN" ? "pointer-events-none opacity-0" : "opacity-100",
            ].join(" ")}
            onClick={() => setMenu("HIDDEN")}
            aria-label="Hide menu"
            role="button"
          ></div>
        </div>
      </div>
    </header>
  );
};
