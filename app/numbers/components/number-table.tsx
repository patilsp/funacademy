"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function NumberTable() {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1)
  const colors = [
    'bg-red-200', 'bg-orange-200', 'bg-yellow-200', 'bg-green-200',
    'bg-teal-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200',
    'bg-pink-200', 'bg-gray-200'
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="grid col-span-1 md:grid-cols-10 gap-4">
        {numbers.map((colNumber) => (
          <div key={colNumber} className="flex flex-col items-center space-y-2">
            {numbers.map((rowNumber) => (
              <motion.div
                key={`${colNumber}-${rowNumber}`}
                className={`flex items-center justify-center h-16 w-full text-lg font-semibold text-green-900 rounded-lg shadow ${colors[colNumber % colors.length]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: rowNumber * 0.05 }}
              >
                {`${colNumber} * ${rowNumber} = ${colNumber * rowNumber}`}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
