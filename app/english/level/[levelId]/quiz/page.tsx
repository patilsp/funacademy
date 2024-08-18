"use client";

import React, { useState } from 'react';
import { usePathname } from "next/navigation";
import { quizzes } from "@/app/english/data/quizData";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const QuizPage = () => {
  const pathname = usePathname();
  const levelId = Number(pathname.split("/").slice(-2, -1)[0]);
  const quiz = quizzes[levelId];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!quiz) {
    return <p>No quiz available for this level.</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setSelectedOption(null);
      setCurrentQuestionIndex(prev => (prev + 1) % quiz.questions.length);
    }, 2000); // Move to the next question after 2 seconds
  };

  return (
    <div className="space-y-6 p-4 w-full max-w-xl text-center m-auto">
      <div className="flex justify-between gap-2 items-center">
        <Link href="/english" className="flex gap-2"> 
          <ArrowLeft className="size-8 rounded-full border bg-slate-100 dark:bg-slate-800 p-2 hover:shadow"/> 
        </Link>
        <h1 className="text-xl font-bold text-orange-500">Quiz - <span className="text-black">Level {levelId}</span></h1>
        <h2 className="text-base font-bold text-green-400 bg-slate-100 px-4 rounded-lg tracking-tight">{quiz.difficulty}</h2>
      </div>

      <div className="space-y-4">
        <div className="mb-4">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
        </div>

        <div className="mb-4">
          <img 
            src={`/images/quiz/${levelId}.svg`} 
            alt={`Question illustration for level ${levelId}`} 
            className="w-full max-w-xs mx-auto" 
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              className={`p-4 rounded text-black ${
                selectedOption === null
                  ? "bg-white shadow rounded-lg text-black text-2xl  hover:text-white hover:bg-gray-600"
                  : option === currentQuestion.answer
                  ? "bg-green-500"
                  : option === selectedOption
                  ? "bg-red-500"
                  : "bg-gray-300" // neutral color for other options
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
