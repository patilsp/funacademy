"use client";

import { useParams } from 'next/navigation';
import MathQuiz from '@/components/math-quiz';

export default function LevelPage() {
  const { levelId } = useParams();
  // Fallback to '1' if levelId is not provided
  const currentLevelId = levelId || '1';
  return (
    <div>
      <MathQuiz levelId={currentLevelId} />
    </div>
  );
}
