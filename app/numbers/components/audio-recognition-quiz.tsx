"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

const AudioRecognitionQuiz = () => {
  const [question, setQuestion] = useState(2);

  const playNumber = () => {
    const utterance = new SpeechSynthesisUtterance(`What number is this? ${question}`);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      <button onClick={playNumber} className="bg-purple-300 p-4 rounded-lg">
        Play Number
      </button>
      {[1, 2, 3].map((number) => (
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          key={number} 
          className="bg-red-300 p-4 rounded-lg flex items-center justify-center"
          onClick={() => {
            const utterance = new SpeechSynthesisUtterance(number === question ? "Correct" : "Try again");
            speechSynthesis.speak(utterance);
          }}
        >
          <p className="text-2xl">{number}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AudioRecognitionQuiz;
