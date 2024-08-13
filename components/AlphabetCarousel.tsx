"use client";

import React, { useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';

const letters = [
    { letter: 'A', name: 'Apple', sound: '/sounds/a.mp3' },
    { letter: 'B', name: 'Banana', sound: '/sounds/b.mp3' },
    { letter: 'C', name: 'Cat', sound: '/sounds/c.mp3' },
    { letter: 'D', name: 'Dog', sound: '/sounds/d.mp3' },
    { letter: 'E', name: 'Elephant', sound: '/sounds/e.mp3' },
    { letter: 'F', name: 'Fish', sound: '/sounds/f.mp3' },
    { letter: 'G', name: 'Giraffe', sound: '/sounds/g.mp3' },
    { letter: 'H', name: 'Horse', sound: '/sounds/h.mp3' },
    { letter: 'I', name: 'Ice Cream', sound: '/sounds/i.mp3' },
    { letter: 'J', name: 'Juice', sound: '/sounds/j.mp3' },
    { letter: 'K', name: 'Kite', sound: '/sounds/k.mp3' },
    { letter: 'L', name: 'Lion', sound: '/sounds/l.mp3' },
    { letter: 'M', name: 'Monkey', sound: '/sounds/m.mp3' },
    { letter: 'N', name: 'Nose', sound: '/sounds/n.mp3' },
    { letter: 'O', name: 'Owl', sound: '/sounds/o.mp3' },
    { letter: 'P', name: 'Penguin', sound: '/sounds/p.mp3' },
    { letter: 'Q', name: 'Queen', sound: '/sounds/q.mp3' },
    { letter: 'R', name: 'Rainbow', sound: '/sounds/r.mp3' },
    { letter: 'S', name: 'Sun', sound: '/sounds/s.mp3' },
    { letter: 'T', name: 'Tiger', sound: '/sounds/t.mp3' },
    { letter: 'U', name: 'Umbrella', sound: '/sounds/u.mp3' },
    { letter: 'V', name: 'Violin', sound: '/sounds/v.mp3' },
    { letter: 'W', name: 'Whale', sound: '/sounds/w.mp3' },
    { letter: 'X', name: 'Xylophone', sound: '/sounds/x.mp3' },
    { letter: 'Y', name: 'Yacht', sound: '/sounds/y.mp3' },
    { letter: 'Z', name: 'Zebra', sound: '/sounds/z.mp3' },
  ];
  
const AlphabetCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const playSound = (soundFile) => {
    const sound = new Howl({ src: [soundFile] });
    sound.play();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % letters.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + letters.length) % letters.length);
  };

  const { letter, image, name, sound } = letters[currentIndex];

  return (
    <div className="flex flex-col items-center p-4">
      <motion.div
        className="my-10 flex max-w-xl flex-col items-center md:max-w-48"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        
            <div className="mb-4 flex size-32 items-center justify-center rounded-lg border bg-lime-400 p-2 shadow hover:shadow-lg">
                <h1 className="text-[40px] font-bold">{letter}</h1>            
            </div>
            <h2 className="text-2xl font-semibold text-blue-500">{name}</h2>
      </motion.div>
      <div className="mt-4 flex">
        <button onClick={handlePrevious} className="rounded bg-violet-500 px-4 py-2 text-white">Previous</button>
        <button onClick={handleNext} className="ml-4 rounded bg-violet-500 px-4 py-2 text-white">Next</button>
      </div>
    </div>
  );
};

export default AlphabetCarousel;
