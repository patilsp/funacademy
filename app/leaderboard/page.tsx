"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/users/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Rank</th>
              <th className="border-b px-4 py-2">User ID</th>
              <th className="border-b px-4 py-2">Level</th>
              <th className="border-b px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((result, index) => (
              <tr className="text-center" key={result._id}>
                <td className="border-b px-4 py-2">{index + 1}</td>
                <td className="border-b px-4 py-2">{result.userId}</td>
                <td className="border-b px-4 py-2">{result.levelId}</td>
                <td className="border-b px-4 py-2">{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        onClick={() => router.push('/')}
        className="mt-4"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Leaderboard;
