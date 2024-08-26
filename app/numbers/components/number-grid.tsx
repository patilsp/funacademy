"use client";

import { motion } from "framer-motion";

const NumberGrid = () => {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const speakNumber = (number) => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex w-full justify-center p-2">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-10 lg:grid-cols-10">
        {numbers.map((number) => (
          <motion.div
            key={number}
            className="flex size-20 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: number * 0.02 }}
            onClick={() => speakNumber(number)}
          >
            {number}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NumberGrid;
