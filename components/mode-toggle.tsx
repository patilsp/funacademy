"use client";

import * as React from "react";
import { MoonIcon, SunIcon, LaptopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex w-full items-center justify-between mt-1 p-1">
      <span className="text-sm font-medium">Change Theme</span>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className={`${
            theme === "light" ? "bg-gray-200" : ""
          } p-2`}
          onClick={() => setTheme("light")}
        >
          <SunIcon className="size-[1.2rem]" />
        </Button>
        <Button
          variant="ghost"
          className={`${
            theme === "dark" ? "bg-gray-200" : ""
          } p-2`}
          onClick={() => setTheme("dark")}
        >
          <MoonIcon className="size-[1.2rem]" />
        </Button>
        <Button
          variant="ghost"
          className={`${
            theme === "system" ? "bg-gray-200" : ""
          } p-2`}
          onClick={() => setTheme("system")}
        >
          <LaptopIcon className="size-[1.2rem]" />
        </Button>
      </div>
    </div>
  );
}
