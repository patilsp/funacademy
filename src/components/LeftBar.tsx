import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import type { Tab } from "./BottomBar";
import { useBottomBarItems } from "./BottomBar";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { GlobeIconSvg, PodcastIconSvg } from "./Svgs";
import { useBoundStore } from "~/hooks/useBoundStore";

const LeftBarMoreMenuSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
      <circle
        cx="23"
        cy="23"
        r="19"
        className="fill-brand-soft stroke-brand-soft"
        strokeWidth="2"
      />
      <circle cx="15" cy="23" r="2" className="fill-brand" />
      <circle cx="23" cy="23" r="2" className="fill-brand" />
      <circle cx="31" cy="23" r="2" className="fill-brand" />
    </svg>
  );
};

export const LeftBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logOut = useBoundStore((x) => x.logOut);

  const [moreMenuShown, setMoreMenuShown] = useState(false);
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");

  const bottomBarItems = useBottomBarItems();

  return (
    <>
      <nav className="fixed bottom-0 left-0 top-0 z-20 hidden flex-col gap-5 border-r border-line bg-surface p-3 md:flex lg:w-64 lg:p-5">
        <Link
          href="/learn"
          className="mt-4 mb-2 hidden px-3 text-[22px] font-bold tracking-tight lg:block"
        >
          <span className="text-brand">fun</span>
          <span className="text-ink">academy</span>
        </Link>
        <ul className="flex flex-col items-stretch gap-1.5">
          {bottomBarItems.map((item) => {
            const active = item.name === selectedTab;
            return (
              <li key={item.href} className="flex flex-1">
                <Link
                  href={item.href}
                  className={[
                    "flex grow items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors duration-150",
                    active
                      ? "bg-brand-soft text-brand"
                      : "text-ink-muted hover:bg-canvas hover:text-ink",
                  ].join(" ")}
                >
                  <span className="h-7 w-7 [&>svg]:h-full [&>svg]:w-full">
                    {item.icon}
                  </span>
                  <span className="sr-only lg:not-sr-only">{item.name}</span>
                </Link>
              </li>
            );
          })}
          <div
            className="relative flex grow cursor-default items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
            onClick={() => setMoreMenuShown((x) => !x)}
            onMouseEnter={() => setMoreMenuShown(true)}
            onMouseLeave={() => setMoreMenuShown(false)}
            role="button"
            tabIndex={0}
          >
            <span className="h-7 w-7 [&>svg]:h-full [&>svg]:w-full">
              <LeftBarMoreMenuSvg />
            </span>
            <span className="hidden text-[15px] lg:inline">More</span>
            <div
              className={[
                "fa-card absolute left-full top-[-10px] z-30 min-w-[280px] p-2 text-left",
                moreMenuShown ? "block animate-scale-in" : "hidden",
              ].join(" ")}
            >
              <div className="flex flex-col">
                <Link
                  className="flex items-center gap-4 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-canvas"
                  href="https://schools.funacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeIconSvg className="h-8 w-8" />
                  Schools
                </Link>
                <Link
                  className="flex items-center gap-4 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-canvas"
                  href="https://podcast.funacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PodcastIconSvg className="h-8 w-8" />
                  Podcast
                </Link>
              </div>
              <div className="mt-1 flex flex-col border-t border-line pt-1">
                {!loggedIn && (
                  <button
                    className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-canvas"
                    onClick={() => setLoginScreenState("SIGNUP")}
                  >
                    Create a profile
                  </button>
                )}
                <Link
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-canvas"
                  href={loggedIn ? "/settings/account" : "/settings/sound"}
                >
                  Settings
                </Link>
                <Link
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-canvas"
                  href="https://support.funacademy.com/hc/en-us"
                >
                  Help
                </Link>
                {!loggedIn && (
                  <Link
                    className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-brand transition hover:bg-brand-soft"
                    href="/login"
                  >
                    Sign in
                  </Link>
                )}
                {loggedIn && (
                  <button
                    className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-coral transition hover:bg-coral-soft"
                    onClick={logOut}
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
        </ul>
      </nav>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};
