"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { levelQuestions } from '@/constants/questions';

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface GamesProps {
  levelId: string;
}

export default function Games({ levelId }: GamesProps) {
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

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <h1 className="mb-4 text-4xl font-bold text-blue-900">Math Quiz - Level {levelId}</h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-6">
        {!showResults ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="mb-4 text-2xl font-semibold text-black">{questions[currentQuestion]?.question}</h2>
            <div className="grid grid-cols-2 items-center gap-6">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-28 rounded-lg border p-4 text-xl shadow-md transition-transform hover:scale-105 ${getOptionClass(option)}`}
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
            <p className="mb-4 text-lg text-gray-700">Youve successfully completed the level. Keep up the great work!</p>
            <p className="mb-1 text-2xl font-semibold text-gray-700">You got {score} out of {questions.length} correct.</p>
            <div className="w-full rounded-lg bg-indigo-300 p-2 text-center shadow">
            <h2 className="mb-4 text-xl font-bold text-orange-400">Congratulations!</h2>
            <div className="relative mb-4 flex w-full items-center justify-center">
              {/* <img 
                src="/images/quiz/1.svg" 
                alt="Celebration" 
                height={300}
                width={300}
                className="absolute right-0 top-0 -z-10 w-1/2 rounded-lg shadow-lg md:block"
              /> */}
              
              <div className="flex size-40 items-center justify-center rounded-full bg-yellow-300 text-4xl font-bold text-gray-800">
                {score}
              </div>
            </div>
            </div>
            <Sheet>
              <div className="mx-auto max-w-sm p-8">
                
                <div className="text-center">
                  <SheetTrigger asChild>
                    <Button variant="outline">Results</Button>
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

            <button
              onClick={() => { setCurrentQuestion(0); setScore(0); setAnswers([]); setShowResults(false); }}
              className="mt-4 rounded-lg border border-green-300 bg-green-500 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-green-600"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
