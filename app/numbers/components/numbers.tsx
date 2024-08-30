"use client";

import React from 'react'
import { motion } from 'framer-motion'

const colors = [
  'bg-red-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-pink-400',
]

const getLevelColor = (level: number) => colors[level % colors.length]

interface SnakeSegmentProps {
  level: number
}

const SnakeSegment: React.FC<SnakeSegmentProps> = ({ level }) => (
  <motion.div
    className={`size-16 rounded-full ${getLevelColor(level)} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {level}
  </motion.div>
)

export default function Numbers() {
  const levels = 10

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-green-800">Snake Puzzle Adventure</h1>
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-4">
        {Array.from({ length: levels }, (_, i) => (
          <SnakeSegment key={i} level={i + 1} />
        ))}
      </div>
    </div>
  )
}