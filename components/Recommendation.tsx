"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";


const questions = [
  {
    question: "How old are you?",
    options: ["5-7 years", "8-10 years", "11-13 years", "14+ years"]
  },
  {
    question: "What are you interested in learning?",
    options: ["Math", "Science", "Art", "Sports"]
  },
  {
    question: "Do you like to read books?",
    options: ["Yes, a lot", "Sometimes", "Not really", "Not at all"]
  },
  {
    question: "Which type of activities do you prefer?",
    options: ["Outdoor", "Indoor", "Creative", "Technological"]
  },
  {
    question: "How do you prefer to study?",
    options: ["With videos", "With games", "With books", "With friends"]
  },
  {
    question: "What is your favorite hobby?",
    options: ["Drawing", "Coding", "Playing sports", "Reading"]
  },
  {
    question: "How much time do you spend learning each day?",
    options: ["Less than 1 hour", "1-2 hours", "2-3 hours", "More than 3 hours"]
  },
  {
    question: "Which of these skills would you like to improve?",
    options: ["Math", "Problem-solving", "Creativity", "Leadership"]
  },
  {
    question: "Do you like learning with others or by yourself?",
    options: ["With others", "By myself", "A bit of both", "Not sure"]
  },
  {
    question: "Which of these activities sounds like fun to you?",
    options: ["Building projects", "Solving puzzles", "Writing stories", "Playing games"]
  },
];


export default function Recommendation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);
  

  const handleOptionChange = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = index;
    setSelectedOptions(newSelectedOptions);
  };

  const handleContinue = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      await saveResponses();
    }
  };

  const saveResponses = async () => {
    try {
      const response = await fetch("/api/questions/response", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          questions,
          selectedOptions,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Responses saved successfully!");
      } else {
        throw new Error("Failed to save responses");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      {!isComplete ? (
        <>
          {/* Top Bar */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold">Study Personalization</p>
            <span className="text-sm">{`Question ${currentQuestion + 1} of ${questions.length}`}</span>
          </div>

          {/* Progress Bar */}
          <Progress value={(currentQuestion + 1) * (100 / questions.length)} className="mb-4" />

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 mt-6 text-center"
          >
            <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
          </motion.div>

          {/* Options */}
          <motion.div
            key={`options-${currentQuestion}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 grid grid-cols-1 gap-3"
          >
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestion] === index;
              return (
                <motion.label
                  key={index}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all duration-300 ${
                    isSelected ? 'border-orange-400 bg-orange-50 dark:border-white dark:bg-gray-700 dark:text-white' : 'border-white bg-white shadow-lg dark:bg-slate-950'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleOptionChange(index)}
                >
                  <span className="text-lg font-medium">{option}</span>
                  <motion.input
                    type="checkbox"
                    checked={isSelected}
                    className={`form-checkbox size-6 ${
                      isSelected ? 'text-orange-400' : 'text-gray-500'
                    }`}
                    readOnly
                  />
                </motion.label>
              );
            })}
          </motion.div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={selectedOptions[currentQuestion] === null}
            className="btn-primary mt-6 w-full cursor-pointer rounded-xl  py-3 text-xl font-bold text-black shadow-lg dark:text-white"
          >
            Continue
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Image
            src="/images/abc.jpg"
            height={500}
            width={800}
            alt="Welcome"
            className="mx-auto mb-6 rounded-lg  object-contain"
          />
          <h2 className="mb-4 text-2xl font-bold">Awesome! Good Job!</h2>
          <p className="mb-4 font-semibold">
            Your answers will help us create a personalized plan just for you.
          </p>

          <button className="btn btn-warning">
            <Link href='/category'>
              <span className="button-text text-black">Start Learning</span>
            </Link>
          </button>
        </motion.div>
      )}
    </div>
  );
}
