"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";


const quizData = {
    1: {
      level: "easy",
      questions: [
        { question: "What letter comes after A?", options: ["B", "C", "D"], answer: "B" },
        { question: "What letter comes after B?", options: ["A", "C", "D"], answer: "C" },
      ],
    },
    2: {
      level: "medium",
      questions: [
        { question: "What letter comes before M?", options: ["L", "N", "O"], answer: "L" },
        { question: "What letter comes after P?", options: ["O", "Q", "R"], answer: "Q" },
      ],
    },
    3: {
      level: "hard",
      questions: [
        { question: "What letter is the 20th letter of the alphabet?", options: ["T", "U", "S"], answer: "T" },
        { question: "What letter comes before Y?", options: ["X", "Z", "W"], answer: "X" },
      ],
    },
    // Add more levels as needed...
  };

  
  
const QuizComponent = ({ levelId }) => {
  const quiz = quizData[levelId];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quiz.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p>Your Score: {score} / {quiz.questions.length}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{`Level ${levelId} Quiz (${quiz.level})`}</h2>
      <p>{quiz.questions[currentQuestionIndex].question}</p>
      <div className="space-y-2">
        {quiz.questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className="block w-full rounded-lg border p-4 hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;
