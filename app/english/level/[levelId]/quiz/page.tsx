"use client";

import React, { useState } from 'react';
import { usePathname } from "next/navigation";
import { quizzes } from "@/app/english/data/quizData";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";

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
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
        <Image
          src="/images/banner.png"
          alt="Quiz Not Found"
          width={200}
          height={200}
          className="object-contain"
        />
        <p className="rounded-lg border bg-red-400 p-1 text-lg font-semibold text-white shadow">
          No quiz available for this level.
        </p>
        <Link href="/english" className="flex items-center rounded-lg border bg-primary p-2 px-6 text-white shadow ">
          <ArrowLeft className="mr-2 size-4" /> Go Back
        </Link>
      </div>
    );
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
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsQuizCompleted(true);
      }
    }, 2000);
  };

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <motion.div
      className="m-auto max-h-screen w-full max-w-xl space-y-2 p-2 text-center md:p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-2">
        <Link href="/english" className="flex gap-2">
          <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow dark:bg-slate-800" />
        </Link>
        <h1 className="text-xl font-bold text-orange-500">
          Quiz - <span className="text-black">Level {levelId}</span>
        </h1>
        <h2 className="rounded-lg bg-slate-100 px-5 text-base font-bold tracking-tight text-green-400">
          {quiz.level}
        </h2>
      </div>

      {!isQuizCompleted ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative my-10 mb-20 overflow-hidden rounded-lg p-6"
            style={{
              backgroundImage: "url('/images/bg2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <p className="relative z-10 text-2xl font-semibold text-white">
              {currentQuestion.question}
            </p>
          </div>

          {/* <div className="mb-4">
            <img
              src={`/images/quiz/${levelId}.svg`}
              alt={`Question illustration for level ${levelId}`}
              className="w-full max-w-xs mx-auto"
            />
          </div> */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentQuestion.options.map((option, i) => (
              <motion.button
                key={i}
                className={`rounded p-4 text-xl font-semibold text-black ${
                  selectedOption === option
                    ? option === currentQuestion.answer
                      ? "bg-green-500 text-white" // Correct answer
                      : "bg-red-500 text-white"   // Incorrect answer
                    : "rounded border bg-white text-black shadow-lg"
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="my-4 p-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2 rounded-lg bg-white p-2 shadow-lg">
            <div className="my-4 px-4">
              <h2 className="mb-10 rounded-lg bg-green-400 p-2 text-sm font-bold text-white">
                Level {levelId} Passed!
              </h2>
            </div>

            <div className="flex w-full items-center justify-center overflow-hidden ">
              <Image
                src="/images/trophy-icon.png"
                className="mb-4 object-cover"
                width={180}
                height={180}
                alt="result image"
              />
            </div>

            <div className="relative mb-4 flex w-full items-center justify-center">
              <div className="mt-4 flex w-36 justify-center rounded bg-indigo-300 px-4 text-white shadow">
                <p className="mb-2 text-lg font-medium">
                  Your Score: {percentage} %
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    Review Score: {correctAnswers} / {totalQuestions}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="text-center font-medium leading-none text-black">
                        Question Review
                      </h4>
                    </div>
                    <ul className="list-inside list-disc space-y-2">
                      {quiz.questions.map((question, index) => (
                        <li
                          key={index}
                          className={`text-sm font-medium ${
                            index < correctAnswers
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Question {index + 1}: {question.question} -{" "}
                          {index < correctAnswers ? "Correct" : "Incorrect"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Link
              href="/english"
              className="m-auto mb-4 flex max-w-sm items-center justify-center gap-2 rounded-full border bg-slate-100 dark:bg-slate-800"
            >
              <ArrowLeft className="mt-1 size-8  p-2 hover:shadow" /> Back To
              Quiz
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Quiz;
