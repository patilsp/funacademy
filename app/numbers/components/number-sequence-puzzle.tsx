"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

const NumberSequencePuzzle = () => {
  const sequence = [1, 2, null, 4, 5];
  const [filledSequence, setFilledSequence] = useState(sequence);

  const handleDrop = (number) => {
    const newSequence = filledSequence.map((item, index) => 
      item === null ? number : item
    );
    const utterance = new SpeechSynthesisUtterance(`You filled number ${number}`);
    speechSynthesis.speak(utterance);
    setFilledSequence(newSequence);
  };

  return (
    <div className="p-4 grid grid-cols-5 gap-4">
      {filledSequence.map((number, index) => (
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          key={index} 
          className="bg-blue-300 p-4 rounded-lg flex items-center justify-center"
          onClick={() => number === null && handleDrop(index + 3)}
        >
          <p className="text-2xl">{number || '___'}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default NumberSequencePuzzle;
