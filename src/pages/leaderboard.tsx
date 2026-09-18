import type { NextPage } from "next";
import React, { useEffect } from "react";
import { LeftBar } from "~/components/LeftBar";
import { BottomBar } from "~/components/BottomBar";
import { useBoundStore } from "~/hooks/useBoundStore";
import Link from "next/link";
import {
  BronzeLeagueSvg,
  FirstPlaceSvg,
  LeaderboardBannerSvg,
  LeaderboardExplanationSvg,
  LockedLeaderboardSvg,
  LockedLeagueSvg,
  SecondPlaceSvg,
  ThirdPlaceSvg,
} from "~/components/Svgs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useLeaderboardUsers } from "~/hooks/useLeaderboard";
import Image from "next/image";

const LeaderboardExplanationSection = () => {
  return (
    <article className="fa-card fa-bg-dots relative hidden h-fit w-96 shrink-0 gap-5 p-6 xl:flex">
      <div className="flex flex-col gap-5">
        <h2 className="fa-caption font-bold uppercase tracking-wide text-ink-faint">
          What are leaderboards?
        </h2>
        <p className="font-bold text-ink">Do lessons. Earn XP. Compete.</p>
        <p className="fa-caption">
          Earn XP through lessons, then compete with players in a weekly
          leaderboard
        </p>
      </div>

      <div className="w-10 shrink-0"></div>

      <LeaderboardExplanationSvg />
    </article>
  );
};

type TimeLeftUnit = "days" | "hours" | "minutes";

const timeUntilStartOfWeek = (units: TimeLeftUnit): number => {
  const startOfWeekDay = 0;
  const startOfWeekHour = 20;
  const daysAhead =
    dayjs().day() === startOfWeekDay && dayjs().hour() < startOfWeekHour
      ? 0
      : 7 - dayjs().day();
  const startOfWeek = dayjs()
    .startOf("day")
    .add(startOfWeekHour, "hours")
    .add(daysAhead, "day");
  return startOfWeek.diff(dayjs(), units);
};

const timeLeft = (): `${number} ${TimeLeftUnit}` => {
  if (timeUntilStartOfWeek("days") > 0) {
    return `${timeUntilStartOfWeek("days")} days`;
  }
  if (timeUntilStartOfWeek("hours") > 0) {
    return `${timeUntilStartOfWeek("hours")} hours`;
  }
  return `${timeUntilStartOfWeek("minutes")} minutes`;
};

const defaultPicture = "https://placekitten.com/100/100";

const LeaderboardProfile = ({
  place,
  name,
  xp,
  isCurrentUser,
}: {
  place: number;
  name: string;
  xp: number;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={[
        "flex items-center gap-5 rounded-2xl px-5 py-2 transition-colors hover:bg-canvas md:mx-0",
        isCurrentUser ? "bg-brand-soft" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        {place === 1 ? (
          <FirstPlaceSvg />
        ) : place === 2 ? (
          <SecondPlaceSvg />
        ) : place === 3 ? (
          <ThirdPlaceSvg />
        ) : (
          <div className="fa-tabular flex h-10 w-10 items-center justify-center font-bold text-brand">
            {place}
          </div>
        )}
        <Image
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border border-line object-cover"
          src={defaultPicture}
          alt=""
        />
      </div>
      <div className="grow overflow-hidden overflow-ellipsis font-bold">
        {name}
      </div>
      <div className="fa-tabular shrink-0 text-ink-muted">{`${xp} XP`}</div>
    </div>
  );
};

const Leaderboard: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  const lessonsToUnlockLeaderboard = 10;
  const lessonsRemainingToUnlockLeaderboard =
    lessonsToUnlockLeaderboard - lessonsCompleted;
  const leaderboardIsUnlocked = lessonsCompleted >= lessonsToUnlockLeaderboard;

  const leaderboardLeague = "Bronze League";

  const leaderboardUsers = useLeaderboardUsers();

  return (
    <div>
      <LeftBar selectedTab="Leaderboards" />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          {!leaderboardIsUnlocked && (
            <>
              <LeaderboardBannerSvg />
              <h1 className="fa-h1 text-center">Unlock Leaderboards!</h1>
              <p className="fa-sub text-center text-lg">
                Complete {lessonsRemainingToUnlockLeaderboard} more lesson
                {lessonsRemainingToUnlockLeaderboard === 1 ? "" : "s"} to start
                competing
              </p>
              <Link
                href="/lesson?practice"
                className="fa-btn-secondary w-fit px-16"
              >
                Start a lesson
              </Link>
              <div className="h-5"></div>
              <LockedLeaderboardSvg />
            </>
          )}
          {leaderboardIsUnlocked && (
            <>
              <div className="fa-glass sticky top-0 -mt-14 flex w-full flex-col items-center gap-5 pt-14">
                <div className="flex items-center gap-5">
                  <BronzeLeagueSvg className="h-fit w-20" />
                  <LockedLeagueSvg />
                  <LockedLeagueSvg />
                  <LockedLeagueSvg />
                  <LockedLeagueSvg />
                </div>
                <h1 className="fa-h2">{leaderboardLeague}</h1>
                <div className="flex w-full flex-col items-center gap-1 pb-5">
                  <p className="fa-sub text-lg">
                    Top 20 advance to the next league
                  </p>
                  <time className="fa-tabular font-bold text-amber-strong">
                    {timeLeft()}
                  </time>
                </div>
                <div className="w-full border-b border-line"></div>
              </div>
              <div className="w-full">
                {leaderboardUsers.map((user, i) => {
                  return (
                    <LeaderboardProfile
                      key={user.name}
                      place={i + 1}
                      name={user.name}
                      xp={user.xp}
                      isCurrentUser={user.isCurrentUser}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        {!leaderboardIsUnlocked && <LeaderboardExplanationSection />}
      </div>
      <BottomBar selectedTab="Leaderboards" />
    </div>
  );
};

export default Leaderboard;
