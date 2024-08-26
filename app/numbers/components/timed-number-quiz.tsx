"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

const TimedNumberQuiz = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleSelect = (number) => {
    setSelectedNumber(number);
    const utterance = new SpeechSynthesisUtterance(`You selected number ${number}`);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((number) => (
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          key={number} 
          className="bg-orange-300 p-4 rounded-lg flex items-center justify-center"
          onClick={() => handleSelect(number)}
        >
          <p className="text-2xl">{number}</p>
        </motion.div>
      ))}
      {selectedNumber && (
        <p className="col-span-4 mt-4 text-center text-2xl">You selected: {selectedNumber}</p>
      )}
    </div>
  );
};

export default TimedNumberQuiz;
