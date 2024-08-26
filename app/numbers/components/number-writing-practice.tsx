"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

const NumberWritingPractice = () => {
  const [drawnNumber, setDrawnNumber] = useState(null);

  const handleDraw = (number) => {
    setDrawnNumber(number);
    const utterance = new SpeechSynthesisUtterance(`You wrote number ${number}`);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4">
      <motion.div 
        className="bg-green-300 p-4 rounded-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        onClick={() => handleDraw(5)}
      >
        <p className="text-2xl">Draw here (simulate drawing number 5)</p>
      </motion.div>
      {drawnNumber && (
        <p className="mt-4 text-2xl">You wrote: {drawnNumber}</p>
      )}
    </div>
  );
};

export default NumberWritingPractice;
