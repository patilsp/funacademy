"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    question: "Which body part helps you see?",
    options: ["Eyes", "Ears", "Nose", "Hands"],
    answer: "Eyes",
  },
  {
    question: "Which body part helps you hear?",
    options: ["Eyes", "Ears", "Nose", "Mouth"],
    answer: "Ears",
  },
  {
    question: "Which body part helps you smell?",
    options: ["Eyes", "Ears", "Nose", "Hands"],
    answer: "Nose",
  },
  {
    question: "Which body part helps you walk?",
    options: ["Legs", "Hands", "Eyes", "Nose"],
    answer: "Legs",
  },
  {
    question: "Which body part helps you taste food?",
    options: ["Tongue", "Ears", "Eyes", "Nose"],
    answer: "Tongue",
  },
  {
    question: "Which body part helps you touch and feel?",
    options: ["Hands", "Feet", "Eyes", "Nose"],
    answer: "Hands",
  },
  {
    question: "Which body part helps you run?",
    options: ["Legs", "Ears", "Eyes", "Mouth"],
    answer: "Legs",
  },
  {
    question: "Which body part helps you breathe?",
    options: ["Nose", "Tongue", "Hands", "Feet"],
    answer: "Nose",
  },
  {
    question: "Which body part helps you write?",
    options: ["Hands", "Legs", "Nose", "Feet"],
    answer: "Hands",
  },
  {
    question: "Which body part helps you think?",
    options: ["Brain", "Eyes", "Hands", "Legs"],
    answer: "Brain",
  },
  {
    question: "Which body part helps you chew food?",
    options: ["Teeth", "Ears", "Eyes", "Tongue"],
    answer: "Teeth",
  },
  {
    question: "Which body part helps you bend your arm?",
    options: ["Elbow", "Knee", "Foot", "Hand"],
    answer: "Elbow",
  },
  {
    question: "Which body part helps you bend your leg?",
    options: ["Knee", "Elbow", "Head", "Feet"],
    answer: "Knee",
  },
  {
    question: "Which body part helps you clap?",
    options: ["Hands", "Feet", "Nose", "Mouth"],
    answer: "Hands",
  },
  {
    question: "Which body part helps you balance while walking?",
    options: ["Feet", "Hands", "Eyes", "Nose"],
    answer: "Feet",
  },
  {
    question: "Which body part has fingers?",
    options: ["Hands", "Feet", "Eyes", "Nose"],
    answer: "Hands",
  },
  {
    question: "Which body part has toes?",
    options: ["Feet", "Hands", "Mouth", "Nose"],
    answer: "Feet",
  },
  {
    question: "Which body part helps you move your head?",
    options: ["Neck", "Legs", "Arms", "Eyes"],
    answer: "Neck",
  },
  {
    question: "Which body part helps you lift objects?",
    options: ["Arms", "Eyes", "Feet", "Mouth"],
    answer: "Arms",
  },
  {
    question: "Which body part helps you hear music?",
    options: ["Ears", "Eyes", "Nose", "Hands"],
    answer: "Ears",
  },
  {
    question: "Which body part helps you run fast?",
    options: ["Legs", "Hands", "Nose", "Mouth"],
    answer: "Legs",
  },
  {
    question: "Which body part holds your brain?",
    options: ["Head", "Hands", "Feet", "Neck"],
    answer: "Head",
  },
  {
    question: "Which body part helps you pick up things?",
    options: ["Hands", "Legs", "Feet", "Mouth"],
    answer: "Hands",
  },
  {
    question: "Which body part helps you smile?",
    options: ["Mouth", "Nose", "Hands", "Eyes"],
    answer: "Mouth",
  },
  {
    question: "Which body part helps you kick a ball?",
    options: ["Feet", "Hands", "Head", "Eyes"],
    answer: "Feet",
  }
];

const BodyPartsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  // Animation variant for the question container
  const questionVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  // Function to handle option click
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg">
        {showScore ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold">Quiz Complete!</h2>
            <p className="text-xl mt-4">You scored {score} out of {questions.length}</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={questionVariant}
          >
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h1>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer)}
                    className="py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BodyPartsQuiz;
