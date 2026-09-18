import type { NextPage } from "next";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import {
  BronzeLeagueSvg,
  EditPencilSvg,
  EmptyFireSvg,
  FireSvg,
  LightningProgressSvg,
  EmptyMedalSvg,
  ProfileFriendsSvg,
  ProfileTimeJoinedSvg,
  SettingsGearSvg,
} from "~/components/Svgs";
import Link from "next/link";
import { Flag } from "~/components/Flag";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  return (
    <div>
      <ProfileTopBar />
      <LeftBar selectedTab="Profile" />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
          <ProfileStatsSection />
          <ProfileFriendsSection />
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Profile" />
    </div>
  );
};

export default Profile;

const ProfileTopBar = () => {
  return (
    <div className="fa-glass fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b border-line px-5 text-lg font-bold text-ink-faint md:hidden">
      <div className="invisible" aria-hidden={true}>
        <SettingsGearSvg />
      </div>
      <span className="text-ink-muted">Profile</span>
      <Link href="/settings/account">
        <SettingsGearSvg />
        <span className="sr-only">Settings</span>
      </Link>
    </div>
  );
};

const ProfileTopSection = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const name = useBoundStore((x) => x.name);
  const username = useBoundStore((x) => x.username);
  const joinedAt = useBoundStore((x) => x.joinedAt).format("MMMM YYYY");
  const followingCount = 0;
  const followersCount = 0;
  const language = useBoundStore((x) => x.language);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  return (
    <section className="flex flex-row-reverse border-b border-line pb-8 md:flex-row md:gap-8">
      <div className="fa-bg-dots flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-line-strong bg-brand-soft text-3xl font-bold text-brand md:h-44 md:w-44 md:text-7xl">
        {username.charAt(0).toUpperCase()}
      </div>
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="fa-h2">{name}</h1>
            <div className="fa-caption">{username}</div>
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeJoinedSvg />
            <span className="fa-caption">{`Joined ${joinedAt}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <ProfileFriendsSvg />
            <span className="fa-caption">{`${followingCount} Following / ${followersCount} Followers`}</span>
          </div>
        </div>

        <Flag language={language} width={40} />
      </div>
      <Link
        href="/settings/account"
        className="fa-btn-primary hidden items-center gap-2 self-start md:flex"
      >
        <EditPencilSvg />
        Edit profile
      </Link>
    </section>
  );
};

const ProfileStatsSection = () => {
  const streak = useBoundStore((x) => x.streak);
  const totalXp = 125;
  const league = "Bronze";
  const top3Finishes = 0;

  return (
    <section>
      <h2 className="fa-h2 mb-5">Statistics</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="fa-card flex gap-2 p-3 md:gap-3 md:px-6 md:py-4">
          {streak === 0 ? <EmptyFireSvg /> : <FireSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "fa-tabular text-xl font-bold",
                streak === 0 ? "text-ink-faint" : "",
              ].join(" ")}
            >
              {streak}
            </span>
            <span className="fa-caption md:text-[15px]">
              Day streak
            </span>
          </div>
        </div>
        <div className="fa-card flex gap-2 p-3 md:gap-3 md:px-6 md:py-4">
          <LightningProgressSvg size={35} />
          <div className="flex flex-col">
            <span className="fa-tabular text-xl font-bold">{totalXp}</span>
            <span className="fa-caption md:text-[15px]">Total XP</span>
          </div>
        </div>
        <div className="fa-card flex gap-2 p-3 md:gap-3 md:px-6 md:py-4">
          <BronzeLeagueSvg width={25} height={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{league}</span>
            <span className="fa-caption md:text-[15px]">
              Current league
            </span>
          </div>
        </div>
        <div className="fa-card flex gap-2 p-3 md:gap-3 md:px-6 md:py-4">
          {top3Finishes === 0 ? <EmptyMedalSvg /> : <EmptyMedalSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "fa-tabular text-xl font-bold",
                top3Finishes === 0 ? "text-ink-faint" : "",
              ].join(" ")}
            >
              {top3Finishes}
            </span>
            <span className="fa-caption md:text-[15px]">
              Top 3 finishes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileFriendsSection = () => {
  const [state, setState] = useState<"FOLLOWING" | "FOLLOWERS">("FOLLOWING");
  return (
    <section>
      <h2 className="fa-h2 mb-5">Friends</h2>
      <div className="fa-card overflow-hidden">
        <div className="flex">
          <button
            className={[
              "flex w-1/2 items-center justify-center border-b-2 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
              state === "FOLLOWING"
                ? "border-brand text-brand"
                : "border-line text-ink-faint hover:text-ink",
            ].join(" ")}
            onClick={() => setState("FOLLOWING")}
          >
            Following
          </button>
          <button
            className={[
              "flex w-1/2 items-center justify-center border-b-2 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
              state === "FOLLOWERS"
                ? "border-brand text-brand"
                : "border-line text-ink-faint hover:text-ink",
            ].join(" ")}
            onClick={() => setState("FOLLOWERS")}
          >
            Followers
          </button>
        </div>
        <div className="flex items-center justify-center py-10 text-center fa-caption">
          {state === "FOLLOWING"
            ? "Not following anyone yet"
            : "No followers yet"}
        </div>
      </div>
    </section>
  );
};
