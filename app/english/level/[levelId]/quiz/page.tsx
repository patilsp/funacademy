"use client";

import React, { useState } from 'react';
import { usePathname } from "next/navigation";
import { quizzes } from "@/app/english/data/quizData";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookCheck, CircleX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";

const Quiz = () => {
  const pathname = usePathname();
  const levelId = Number(pathname.split("/").slice(-2, -1)[0]);
  const quiz = quizzes[levelId];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  if (!quiz) {
    return <p>No quiz available for this level.</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setSelectedOption(null);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsQuizCompleted(true);
      }
    }, 2000); // Move to the next question after 2 seconds
  };

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="space-y-2 p-2 md:p-6 w-full max-h-screen max-w-xl text-center m-auto">
      <div className="flex justify-between gap-2 items-center">
        <Link href="/english" className="flex gap-2">
          <ArrowLeft className="size-8 rounded-full border bg-slate-100 dark:bg-slate-800 p-2 hover:shadow"/>
        </Link>
        <h1 className="text-xl font-bold text-orange-500">Quiz - <span className="text-black">Level {levelId}</span></h1>
        <h2 className="text-base font-bold text-green-400 bg-slate-100 px-4 rounded-lg tracking-tight">{quiz.difficulty}</h2>
      </div>

      {!isQuizCompleted ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="my-10 mb-4">
            <p className="text-2xl font-semibold">{currentQuestion.question}</p>
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
              <motion.button
                key={i}
                className={`p-4 rounded text-black text-xl font-semibold ${
                  selectedOption === option
                    ? option === currentQuestion.answer
                      ? "bg-green-500 text-white" // Correct answer
                      : "bg-red-500 text-white"   // Incorrect answer
                    : "bg-white shadow rounded-lg text-black hover:bg-slate-600 hover:text-white"
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          
          
          <div className="bg-white rounded-lg shadow-lg space-y-2 p-2">
          <div className="my-4 px-4">
            <h2 className="text-sm font-bold text-green-500 mb-4">Level {levelId} Passed!</h2>
          </div>

            <div className="flex w-full items-center justify-center overflow-hidden rounded-t-lg">
              <Image
                src="/images/trophy.svg"
                className="object-cover"
                width={180}
                height={180}
                alt="result image"
              />
            </div>
            <div className="bg-white rounded px-4 shadow mt-4">
              <p className="text-lg font-medium mb-2">Your Score: {correctAnswers} / {totalQuestions}</p>
              {/* <p className="text-lg font-medium mb-2">Incorrect: {incorrectAnswers}</p>
              <p className="text-lg font-medium mb-2">Total Questions: </p> */}
              <p className="text-lg font-medium mb-4">Percentage: {percentage}%</p>
            </div>
            <div className="mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Question Review</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-center text-black leading-none">Question Review</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    {quiz.questions.map((question, index) => (
                      <li
                        key={index}
                        className={`text-sm font-medium ${index < correctAnswers ? "text-green-500" : "text-red-500"}`}
                      >
                        Question {index + 1}: {question.question} - {index < correctAnswers ? "Correct" : "Incorrect"}
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Link href="/english" className="mb-4 m-auto max-w-sm flex justify-center items-center gap-2 rounded-full border bg-slate-100 dark:bg-slate-800">
            <ArrowLeft className="size-8 mt-1  p-2 hover:shadow"/> Back To Quiz
          </Link>
          </div>

       
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
