"use client";

import Image from "next/image";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, CheckCircle, XCircle } from 'lucide-react';
import { levelQuestions } from '@/constants/questions';

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface GamesProps {
  levelId: string;
  userId?: string;
}

export default function MathQuiz({ levelId, userId }: GamesProps) {
  const router = useRouter();
  const { data: session } = useSession();
  
  // Use session userId if available, otherwise fall back to prop
  const currentUserId = session?.user.id || userId;

  const questions = levelQuestions[levelId] || [];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<{ option: string | null; isCorrect: boolean }>({ option: null, isCorrect: false });

  useEffect(() => {
    if (feedback.option !== null) {
      const timer = setTimeout(() => {
        setFeedback({ option: null, isCorrect: false });
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResults(true);
          saveResult();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleOptionClick = (option: string) => {
    const isCorrect = questions[currentQuestion].answer === option;
    setFeedback({ option, isCorrect });
    if (isCorrect) {
      setScore(score + 1);
      setAnswers([...answers, true]);
    } else {
      setAnswers([...answers, false]);
    }
  };

  const getOptionClass = (option: string) => {
    if (feedback.option === option) {
      return feedback.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
    }
    return 'bg-blue-500 text-white';
  };

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const saveResult = async () => {
    if (!currentUserId) {
      toast.error('User ID is missing');
      return;
    }

    try {
      const response = await fetch(`/api/users/${currentUserId}/math-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, levelId, score: percentage }),
      });

      if (!response.ok) {
        throw new Error('Failed to save result');
      }

      toast.success('Result saved successfully!');
    } catch (error) {
      toast.error('Failed to save result');
    }
  };

  return (
    <div className="mb-16 flex flex-col items-center justify-center space-y-6 p-4">

      <div className="flex w-full items-center justify-between gap-2">
        <Link href="/math-quiz" className="rounded-full bg-gray-100"> <ArrowLeft className="size-8 p-2"/> </Link>
        <h1 className="text-xl font-bold text-blue-700">Math Quiz - Level {levelId}</h1>
        <Link href="#" className="rounded-full bg-gray-100"> <Bookmark className="size-8 p-2"/> </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-0 md:p-6">
        {!showResults ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="q_box my-10">
              <h2 className="text-4xl font-bold text-white">{questions[currentQuestion]?.question}</h2>
            </div>
            <div className="mt-10 grid w-full grid-cols-2 items-center gap-6">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`h-12 rounded-lg border p-1 text-xl text-black shadow-md transition-transform hover:scale-105 ${getOptionClass(option)}`}
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
            className="flex flex-col items-center space-y-4 rounded-md bg-white px-4 py-10 shadow-md"
          >
            <p className="mb-4 text-center text-lg text-gray-700">You’ve successfully completed the level. Keep up the great work!</p>
            <p className="mb-1 text-2xl font-semibold text-gray-700">You got {score} out of {questions.length} correct.</p>
            <div className="flex w-full flex-col items-center justify-center rounded-lg bg-[#ff5722] p-2 text-center shadow">
              <Image
                src="/images/congrats.svg"
                className="object-contain"
                width={150}
                height={150}
                alt="Congratulations"
              />
              <h1 className="mb-4 text-xl font-bold">Final Results!</h1>
              <div className="relative mb-4 flex w-full items-center justify-center">             
                <div className="flex size-28 items-center justify-center rounded-full bg-yellow-500 text-4xl font-bold text-gray-800">
                  {percentage}%
                </div>
              </div>
            </div>

            <Sheet>
              <div className="mx-auto max-w-sm p-8">
                <div className="text-center">
                  <SheetTrigger asChild>
                    <Button variant="outline">Check Correct Answer</Button>
                  </SheetTrigger>
                </div>
              </div>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-4 text-2xl font-semibold text-green-700">Congratulations!</SheetTitle>
                </SheetHeader>
                <div className="mb-10 grid gap-4 py-2">
                  <p className="mb-1 text-xl font-semibold text-gray-700">You got {score} out of {questions.length} correct.</p>
                  <div className="mt-1 flex flex-col space-y-2 overflow-x-auto">
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
                </div>
              </SheetContent>
            </Sheet>

            <Button
              onClick={() => { setCurrentQuestion(0); setScore(0); setAnswers([]); setShowResults(false); }}
              className="mt-2 w-full rounded-lg border shadow-md transition-transform hover:scale-105 hover:bg-green-600"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
