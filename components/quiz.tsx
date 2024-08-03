"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    question: "What color is the sky on a clear day?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Blue"
  },
  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    answer: "8"
  },
  {
    question: "What is the name of the toy cowboy in Toy Story?",
    options: ["Buzz Lightyear", "Woody", "Rex", "Mr. Potato Head"],
    answer: "Woody"
  },
  {
    question: "What do bees make?",
    options: ["Milk", "Honey", "Juice", "Bread"],
    answer: "Honey"
  }
];

export default function KidsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  const handleOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      setQuizEnded(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-md">
        {quizEnded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="mb-4 text-2xl font-bold">Quiz Completed!</h2>
            <p className="mb-4 text-xl">You scored {score} out of {questions.length}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Restart Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="mb-4 text-xl font-bold">{questions[currentQuestion].question}</h2>
            <div className="flex flex-col space-y-2">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`rounded p-2 ${
                    selectedOption === option
                      ? option === questions[currentQuestion].answer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={handleNextQuestion}
                className="rounded bg-blue-500 px-4 py-2 text-white"
                disabled={!selectedOption}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
