"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

const NumberMatchingGame = () => {
  const [matches, setMatches] = useState({});
  
  const handleMatch = (number, match) => {
    const utterance = new SpeechSynthesisUtterance(`You matched number ${number}`);
    speechSynthesis.speak(utterance);
    setMatches({ ...matches, [number]: match });
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5].map((number) => (
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          key={number} 
          className="bg-yellow-300 p-4 rounded-lg flex items-center justify-center"
          onClick={() => handleMatch(number, true)}
        >
          <p className="text-2xl">{number}</p>
        </motion.div>
      ))}
      <div className="grid grid-cols-3 gap-4">
        {/* Example of images, could replace with real ones */}
        {[1, 2, 3, 4, 5].map((number) => (
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            key={number} 
            className="bg-green-300 p-4 rounded-lg flex items-center justify-center"
            onClick={() => handleMatch(number, true)}
          >
            <p className="text-2xl">{`Image ${number}`}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NumberMatchingGame;
