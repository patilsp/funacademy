"use client";

import React from 'react';
import { useRouter } from "next/navigation";

const levels = Array.from({ length: 10 }, (_, index) => index + 1);

export const EnglishLevels = () => {
//   const router = useRouter();

//   const handleLevelClick = (levelId: number) => {
//     router.push(`/english/level/${levelId}`);
//   };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Select a Level</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {levels.map(levelId => (
          <div
            key={levelId}
            className="flex cursor-pointer items-center justify-center rounded-lg border p-4 hover:bg-gray-100"
            onClick={() => handleLevelClick(levelId)}
          >
            <p className="text-lg font-medium">Level {levelId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
