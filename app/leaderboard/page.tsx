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

  // Get the top 3 users
  const topUsers = leaderboard.slice(0, 3);

  return (
    <div className="p-4">
      <Button
        onClick={() => router.push('/')}
        className="mt-4"
      >
        Back
      </Button>
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {topUsers.map((result, index) => (
          <div key={result._id} className="flex items-center justify-center p-4 border rounded-lg shadow-md">
            {index === 0 && (
              <svg className="w-12 h-12 text-yellow-500" viewBox="0 0 100 100">
                {/* Gold Medal SVG */}
                <path d="M0 0l33 33h20l-10-33z" fill="blue" />
                <path d="M100 0l-33 33h-20l10-33z" fill="#33f" />
                <g fill="gold" transform="translate(0 15)">
                  <clipPath id="medalMask">
                    <circle cx="50" cy="50" r="35" />
                  </clipPath>
                  <circle clipPath="url(#medalMask)" cx="50" cy="50" r="35" />
                  <circle clipPath="url(#medalMask)" cx="50" cy="50" r="35" fill="#000" opacity="0.2" />
                  <path clipPath="url(#medalMask)" d="M -10 90 L 0 100 L 100 0 L 90 -10" fill="#fff">
                    <animate id="shine" attributeName="d" values="M -10 90 L 0 100 L 100 0 L 90 -10; M 50 150 L 60 160 L 160 60 L 150 50" dur="1s" begin="0s;shine.end+5s" fill="freeze" />
                  </path>
                  <path clipPath="url(#medalMask)" d="M 0 0 V 100 L 100 0 Z" />
                  <path clipPath="url(#medalMask)" d="M 0 0 V 100 L 100 0 Z" fill="#fff" opacity="0.2" />
                  <circle cx="50" cy="50" r="30" />
                  <text x="50" y="52" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="bold" fill="#000" opacity="0.3"> {result.score}</text>
                  <path clipPath="url(#medalMask)" d="M 40 140 L 50 150 L 150 50 L 140 40" fill="#fff" opacity="0.8">
                    <animate attributeName="d" values="M 40 140 L 50 150 L 150 50 L 140 40; M -60 40 L -50 50 L 50 -50 L 40 -60" dur="1s" begin="0.5s;shine.end+5.5s" fill="freeze" />
                  </path>
                </g>
              </svg>
            )}
            {index === 1 && (
              <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100">
                {/* Silver Medal SVG */}
                <path d="M0 0l33 33h20l-10-33z" fill="blue" />
                <path d="M100 0l-33 33h-20l10-33z" fill="#33f" />
                <g fill="silver" transform="translate(0 15)">
                  <clipPath id="medalMask">
                    <circle cx="50" cy="50" r="35" />
                  </clipPath>
                  <circle clipPath="url(#medalMask)" cx="50" cy="50" r="35" />
                  <circle clipPath="url(#medalMask)" cx="50" cy="50" r="35" fill="#000" opacity="0.2" />
                  <path clipPath="url(#medalMask)" d="M -10 90 L 0 100 L 100 0 L 90 -10" fill="#fff">
                    <animate id="shine" attributeName="d" values="M -10 90 L 0 100 L 100 0 L 90 -10; M 50 150 L 60 160 L 160 60 L 150 50" dur="1s" begin="0s;shine.end+5s" fill="freeze" />
                  </path>
                  <path clipPath="url(#medalMask)" d="M 0 0 V 100 L 100 0 Z" />
                  <path clipPath="url(#medalMask)" d="M 0 0 V 100 L 100 0 Z" fill="#fff" opacity="0.2" />
                  <circle cx="50" cy="50" r="30" />
                  <text x="50" y="52" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="bold" fill="#000" opacity="0.3"> {result.score}</text>
                  <path clipPath="url(#medalMask)" d="M 40 140 L 50 150 L 150 50 L 140 40" fill="#fff" opacity="0.8">
                    <animate attributeName="d" values="M 40 140 L 50 150 L 150 50 L 140 40; M -60 40 L -50 50 L 50 -50 L 40 -60" dur="1s" begin="0.5s;shine.end+5.5s" fill="freeze" />
                  </path>
                </g>
              </svg>
            )}
            {index === 2 && (
              <svg className="w-12 h-12 text-orange-600" viewBox="0 0 100 100">
                {/* Bronze Medal SVG */}
                <path d="M0 0l33 33h20l-10-33z" fill="blue" />
                <path d="M100 0l-33 33h-20l10-33z" fill="#33f" />
                <g fill="rgb(185, 107, 30)" transform="translate(0 15)">
                  <clipPath id="medalMask">
                    <circle cx="50" cy="50" r="35" />
                  </clipPath>
                  <circle clipPath="url(#medalMask)" cx="50" cy="50" r="35" />
                  <circle clipPath="url(#medalMask)" cx="50" cy="50" r="35" fill="#000" opacity="0.2" />
                  <path clipPath="url(#medalMask)" d="M -10 90 L 0 100 L 100 0 L 90 -10" fill="#fff">
                    <animate id="shine" attributeName="d" values="M -10 90 L 0 100 L 100 0 L 90 -10; M 50 150 L 60 160 L 160 60 L 150 50" dur="1s" begin="0s;shine.end+5s" fill="freeze" />
                  </path>
                  <path clipPath="url(#medalMask)" d="M 0 0 V 100 L 100 0 Z" />
                  <path clipPath="url(#medalMask)" d="M 0 0 V 100 L 100 0 Z" fill="#fff" opacity="0.2" />
                  <circle cx="50" cy="50" r="30" />
                  <text x="50" y="52" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="bold" fill="#000" opacity="0.3"> {result.score}</text>
                  <path clipPath="url(#medalMask)" d="M 40 140 L 50 150 L 150 50 L 140 40" fill="#fff" opacity="0.8">
                    <animate attributeName="d" values="M 40 140 L 50 150 L 150 50 L 140 40; M -60 40 L -50 50 L 50 -50 L 40 -60" dur="1s" begin="0.5s;shine.end+5.5s" fill="freeze" />
                  </path>
                </g>
              </svg>
            )}

            <div className="ml-4">
              <div className="text-xl font-semibold">{result.name}</div>
              <div className="text-gray-500">{result.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
