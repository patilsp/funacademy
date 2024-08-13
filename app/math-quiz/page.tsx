"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function MathQuiz() {
  const { data: session, status } = useSession();
  const [userResults, setUserResults] = useState([]);
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const images = Array.from({ length: 10 }, (_, i) => `/images/quiz/${i + 1}.svg`);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchUserResults = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}/results`);
          if (!response.ok) {
            throw new Error('Failed to fetch user results');
          }
          const data = await response.json();
          setUserResults(data);
        } catch (error) {
          console.error('Error fetching user results:', error);
        }
      };

      fetchUserResults();
    }
  }, [session, status]);

  // Create a map of levelId to score for easy lookup
  const resultsMap = userResults.reduce((map, result) => {
    map[result.levelId] = result.score;
    return map;
  }, {});

  return (
    <div className="mb-16 mt-2 flex min-h-screen flex-col p-4 md:p-6">
      <h1 className="mb-8 text-center text-4xl font-bold text-orange-500">Math Quiz</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {levels.map((level, index) => (
          <Link key={level} href={`/math-quiz/level/${level}`}>
            <div className="relative flex flex-col items-center justify-center rounded-lg bg-white shadow transition-transform hover:scale-105 hover:shadow-xl dark:bg-slate-900 dark:text-white">
              <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-t-lg">
                <Image
                  src={images[index]}
                  className="size-full object-cover"
                  width={150}
                  height={150}
                  alt={`Level ${level} image`}
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-blue-700">Level {level}</h2>
                {resultsMap[level] !== undefined ? (
                  <p className="mt-2 text-gray-600">Completed with {resultsMap[level]} marks</p>
                ) : (
                  <p className="mt-2 text-gray-600">Lets Start</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
