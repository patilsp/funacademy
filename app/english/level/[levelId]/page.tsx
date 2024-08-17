"use client";

import { useRouter } from 'next/router';
import React from 'react';

const LevelPage = () => {
  const router = useRouter();
  const { levelId } = router.query; // Get the level ID from the query parameters

  // Fetch or define content based on the level ID
  const content = getContentForLevel(Number(levelId));

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold tracking-tight">Level {levelId}</h2>
      <p className="text-muted-foreground">
        {content.description}
      </p>
      <div>
        {/* Render words, games, or stories */}
        {content.items.map((item, index) => (
          <div key={index} className="mb-4 rounded-lg border p-4">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Example function to get content based on level ID
const getContentForLevel = (levelId: number) => {
  // Replace with your actual content fetching logic
  return {
    description: `Content for Level ${levelId}`,
    items: [`Item ${levelId} - 1`, `Item ${levelId} - 2`],
  };
};

export default LevelPage;
