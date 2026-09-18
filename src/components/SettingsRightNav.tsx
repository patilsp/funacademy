import Link from "next/link";
import React from "react";
import { useBoundStore } from "~/hooks/useBoundStore";

type SettingsTitle = ReturnType<typeof useSettingsPages>[number]["title"];

const useSettingsPages = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  return loggedIn
    ? ([
        { title: "Account", href: "/settings/account" },
        { title: "Sound", href: "/settings/sound" },
        { title: "Edit Daily Goal", href: "/settings/coach" },
      ] as const)
    : ([
        { title: "Sound", href: "/settings/sound" },
        { title: "Edit Daily Goal", href: "/settings/coach" },
      ] as const);
};

export const SettingsRightNav = ({
  selectedTab,
}: {
  selectedTab: SettingsTitle;
}) => {
  const settingsPages = useSettingsPages();
  return (
    <div className="fa-card hidden h-fit w-80 flex-col gap-1 p-3 lg:flex">
      {settingsPages.map(({ title, href }) => {
        return (
          <Link
            key={title}
            href={href}
            className={[
              "rounded-xl p-4 text-sm font-bold transition-colors hover:bg-canvas",
              title === selectedTab
                ? "bg-brand-soft text-brand"
                : "text-ink-muted",
            ].join(" ")}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};
