import type { NextPage } from "next";
import React, { useState } from "react";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { TopBar } from "~/components/TopBar";
import { SettingsRightNav } from "~/components/SettingsRightNav";
import { useBoundStore } from "~/hooks/useBoundStore";

const Account: NextPage = () => {
  const name = useBoundStore((x) => x.name);
  const setName = useBoundStore((x) => x.setName);
  const [localName, setLocalName] = useState(name);

  const username = useBoundStore((x) => x.username);
  const setUsername = useBoundStore((x) => x.setUsername);
  const [localUsername, setLocalUsername] = useState(username);

  const accountOptions = [
    { title: "Name", value: localName, setValue: setLocalName },
    { title: "Username", value: localUsername, setValue: setLocalUsername },
  ];

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab={null} />
      <BottomBar selectedTab={null} />
      <div className="fa-bg-aurora mx-auto flex min-h-screen flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="fa-h2">Account</h1>
          <button
            className="fa-btn-primary-sm disabled:bg-panel disabled:text-ink-faint disabled:shadow-none"
            onClick={() => {
              setName(localName);
              setUsername(localUsername);
            }}
            disabled={name === localName && username === localUsername}
          >
            Save changes
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="fa-card flex w-full max-w-xl flex-col gap-6 p-6">
            {accountOptions.map(({ title, value, setValue }) => {
              return (
                <div
                  key={title}
                  className="flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:pl-6"
                >
                  <div className="text-sm font-bold uppercase tracking-wide text-ink-muted sm:w-1/6">
                    {title}
                  </div>
                  <input
                    className="fa-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <SettingsRightNav selectedTab="Account" />
        </div>
      </div>
    </div>
  );
};

export default Account;
