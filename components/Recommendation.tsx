"use client"

import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

const questions = [
  {
    question: "How old are you?",
    options: ["5-7 years", "8-10 years", "11-13 years", "14+ years"]
  },
  {
    question: "What are you interested in learning?",
    options: ["Math", "Science", "Art", "Sports"]
  },
  // ... (other questions)
]

export default function Recommendation() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(null))

  const handleOptionChange = (index) => {
    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions[currentQuestion] = index
    setSelectedOptions(newSelectedOptions)
  }

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      alert("You've completed all the questions!")
    }
  }

  return (
    <div className="flex flex-col justify-between bg-gradient-to-b from-blue-100 to-green-100 p-4 dark:from-blue-900 dark:to-green-900 dark:text-white">
      <div>
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold">Study Personalization</p>
          <span>{`Question ${currentQuestion + 1} of ${questions.length}`}</span>
        </div>

        {/* Progress Bar */}
        <Progress value={(currentQuestion + 1) * (100 / questions.length)} className="mb-4" />

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
        </motion.div>

        {/* Options */}
        <motion.div
          key={`options-${currentQuestion}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedOptions[currentQuestion] === index
            return (
              <motion.label
                key={index}
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  isSelected ? 'border-blue-600 bg-blue-100 dark:bg-blue-800' : 'border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleOptionChange(index)}
              >
                <span className="text-lg font-medium">{option}</span>
                <motion.input
                  type="checkbox"
                  checked={isSelected}
                  className={`form-checkbox h-6 w-6 ${
                    isSelected ? 'text-blue-600' : 'text-gray-500'
                  }`}
                  readOnly
                />
              </motion.label>
            )
          })}
        </motion.div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={selectedOptions[currentQuestion] === null}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg"
      >
        Continue
      </Button>
    </div>
  )
}
