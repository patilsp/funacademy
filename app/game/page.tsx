"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is 5 - 3?", options: ["1", "2", "3", "4"], answer: "2" },
  { question: "What is 3 × 3?", options: ["6", "7", "8", "9"], answer: "9" },
  { question: "What is 10 ÷ 2?", options: ["3", "4", "5", "6"], answer: "5" },
  { question: "What is 7 + 6?", options: ["12", "13", "14", "15"], answer: "13" },
  { question: "What is 9 - 4?", options: ["4", "5", "6", "7"], answer: "5" },
  { question: "What is 8 × 2?", options: ["14", "15", "16", "17"], answer: "16" },
  { question: "What is 12 ÷ 4?", options: ["2", "3", "4", "5"], answer: "3" },
  { question: "What is 15 + 5?", options: ["18", "19", "20", "21"], answer: "20" },
  { question: "What is 6 - 2?", options: ["2", "3", "4", "5"], answer: "4" },
  { question: "What is 5 × 5?", options: ["20", "22", "24", "25"], answer: "25" },
  { question: "What is 14 ÷ 2?", options: ["6", "7", "8", "9"], answer: "7" },
  { question: "What is 3 + 7?", options: ["9", "10", "11", "12"], answer: "10" },
  { question: "What is 4 - 1?", options: ["2", "3", "4", "5"], answer: "3" },
  { question: "What is 7 × 3?", options: ["20", "21", "22", "23"], answer: "21" },
  { question: "What is 18 ÷ 3?", options: ["5", "6", "7", "8"], answer: "6" },
  { question: "What is 11 + 9?", options: ["18", "19", "20", "21"], answer: "20" },
  { question: "What is 8 - 5?", options: ["2", "3", "4", "5"], answer: "3" },
  { question: "What is 9 × 1?", options: ["8", "9", "10", "11"], answer: "9" },
  { question: "What is 20 ÷ 4?", options: ["4", "5", "6", "7"], answer: "5" },
  { question: "What is 13 + 7?", options: ["19", "20", "21", "22"], answer: "20" },
  { question: "What is 10 - 6?", options: ["2", "3", "4", "5"], answer: "4" },
  { question: "What is 4 × 4?", options: ["12", "14", "16", "18"], answer: "16" },
  { question: "What is 24 ÷ 6?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is 15 + 8?", options: ["22", "23", "24", "25"], answer: "23" },
  { question: "What is 7 - 3?", options: ["2", "3", "4", "5"], answer: "4" },
  { question: "What is 5 × 6?", options: ["28", "30", "32", "34"], answer: "30" },
  { question: "What is 30 ÷ 5?", options: ["5", "6", "7", "8"], answer: "6" }
];

export default function Games() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState({ option: null, isCorrect: false });

  useEffect(() => {
    if (feedback.option !== null) {
      const timer = setTimeout(() => {
        setFeedback({ option: null, isCorrect: false });
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResults(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleOptionClick = (option) => {
    const isCorrect = questions[currentQuestion].answer === option;
    setFeedback({ option, isCorrect });
    if (isCorrect) {
      setScore(score + 1);
      setAnswers([...answers, true]);
    } else {
      setAnswers([...answers, false]);
    }
  };

  const getOptionClass = (option) => {
    if (feedback.option === option) {
      return feedback.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
    }
    return 'bg-blue-500 text-white';
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-4">
      <h1 className="mb-4 text-4xl font-bold text-blue-900">Quiz Game</h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-lg rounded-lg p-6 shadow-lg ${
          feedback.option ? (feedback.isCorrect ? 'bg-green-100' : 'bg-red-100') : 'bg-white'
        }`}
      >
        {!showResults ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="mb-4 text-2xl font-semibold text-blue-800">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-2 items-center gap-5">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-40 rounded-lg border border-blue-300 p-4 shadow-md transition-transform hover:scale-105 ${getOptionClass(option)}`}
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
            <p className="mb-4 text-xl font-semibold text-gray-700">You got {score} out of {questions.length} correct.</p>
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
