"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
  { question: "What color is the sky?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Blue" },
  { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
  { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
];

export default function Games() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (option) => {
    if (questions[currentQuestion].answer === option) {
      setScore(score + 1);
      setAnswers([...answers, true]);
    } else {
      setAnswers([...answers, false]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-4">
      <h1 className="mb-4 text-4xl font-bold text-blue-900">Quiz Game</h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
      >
        {!showResults ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="mb-4 text-2xl font-semibold text-blue-800">{questions[currentQuestion].question}</h2>
            <div className="flex w-full flex-col space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="rounded-lg border border-blue-300 bg-blue-500 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-600"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <h2 className="mb-4 text-2xl font-semibold text-green-700">Congratulations!</h2>
            <p className="mb-4 text-lg text-gray-700">You got {score} out of {questions.length} correct.</p>
            <div className="mt-4 flex flex-col space-y-2">
              {answers.map((correct, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {correct ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                  <span className="text-lg text-gray-800">Question {index + 1}: {correct ? "Correct" : "Incorrect"}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setCurrentQuestion(0); setScore(0); setAnswers([]); setShowResults(false); }}
              className="mt-4 rounded-lg border border-green-300 bg-green-500 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-green-600"
            >
              Restart Quiz
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
