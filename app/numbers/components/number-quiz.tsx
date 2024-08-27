"use client";

import React, { useState } from 'react';

// Types of math questions
const questionTypes = [
  { type: 'addition', question: '{a} + {b}' },
  { type: 'subtraction', question: '{a} - {b}' },
  { type: 'multiplication', question: '{a} * {b}' },
  { type: 'division', question: '{a} / {b}' },
];

// Generate random numbers for math questions
const generateNumbers = (type) => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b };
};

// Get the answer for the current question
const getAnswer = (type, a, b) => {
  switch (type) {
    case 'addition':
      return a + b;
    case 'subtraction':
      return a - b;
    case 'multiplication':
      return a * b;
    case 'division':
      return a / b;
    default:
      return null;
  }
};

// Speak text using Web Speech API
const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
};

const NumberQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [numbers, setNumbers] = useState(generateNumbers(questionTypes[0].type));
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const type = questionTypes[currentQuestion].type;
    const correctAnswer = getAnswer(type, numbers.a, numbers.b);

    if (parseFloat(userAnswer) === correctAnswer) {
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);

      if (newCorrectAnswers === 1) {
        speak('Correct! Good job.');
        setFeedback('Correct! Good job.');
      } else if (newCorrectAnswers > 1 && newCorrectAnswers <= 3) {
        speak('Correct again! Keep it up.');
        setFeedback('Correct again! Keep it up.');
      } else {
        speak('Excellent! You are doing great.');
        setFeedback('Excellent! You are doing great.');
      }

      // Move to the next question
      const nextQuestion = (currentQuestion + 1) % questionTypes.length;
      setCurrentQuestion(nextQuestion);
      setNumbers(generateNumbers(questionTypes[nextQuestion].type));
      setUserAnswer('');
    } else {
      speak('Incorrect, try again.');
      setFeedback('Incorrect, try again.');
    }
  };

  // Current question
  const { a, b } = numbers;
  const { question } = questionTypes[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-10 rounded-lg border bg-green-400 p-4 text-4xl font-bold shadow md:p-10">
        {question.replace('{a}', a).replace('{b}', b)}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="my-4 h-14 rounded-lg border p-2 text-2xl"
          required
        />
        <button type="submit" className="btn-warning">
          Next
        </button>
      </form>
      {feedback && <div className="mt-4 rounded-lg border bg-gray-100 p-1 px-4 text-lg font-semibold shadow">{feedback}</div>}
    </div>
  );
};

export default NumberQuiz;
