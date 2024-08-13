"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Howl } from 'howler'; // Ensure howler is installed

const letters = [
  { letter: 'A', image: '/images/letter/a.png', name: 'Apple' },
  { letter: 'B', image: '/images/letter/b.png', name: 'Banana' },
  { letter: 'C', image: '/images/letter/c.png', name: 'Cat' },
  { letter: 'D', image: '/images/letter/d.png', name: 'Dog' },
  { letter: 'E', image: '/images/letter/e.png', name: 'Elephant' },
  { letter: 'F', image: '/images/letter/f.png', name: 'Fish' },
  { letter: 'G', image: '/images/letter/g.png', name: 'Giraffe' },
  { letter: 'H', image: '/images/letter/h.png', name: 'Horse' },
  { letter: 'I', image: '/images/letter/i.png', name: 'Ice Cream' },
  { letter: 'J', image: '/images/letter/j.png', name: 'Juice' },
  { letter: 'K', image: '/images/letter/k.png', name: 'Kite' },
  { letter: 'L', image: '/images/letter/l.png', name: 'Lion' },
  { letter: 'M', image: '/images/letter/m.png', name: 'Monkey' },
  { letter: 'N', image: '/images/letter/n.png', name: 'Nose' },
  { letter: 'O', image: '/images/letter/o.png', name: 'Owl' },
  { letter: 'P', image: '/images/letter/p.png', name: 'Penguin' },
  { letter: 'Q', image: '/images/letter/q.png', name: 'Queen' },
  { letter: 'R', image: '/images/letter/r.png', name: 'Rainbow' },
  { letter: 'S', image: '/images/letter/s.png', name: 'Sun' },
  { letter: 'T', image: '/images/letter/t.png', name: 'Tiger' },
  { letter: 'U', image: '/images/letter/u.png', name: 'Umbrella' },
  { letter: 'V', image: '/images/letter/v.png', name: 'Violin' },
  { letter: 'W', image: '/images/letter/w.png', name: 'Whale' },
  { letter: 'X', image: '/images/letter/x.png', name: 'Xylophone' },
  { letter: 'Y', image: '/images/letter/y.png', name: 'Yacht' },
  { letter: 'Z', image: '/images/letter/z.png', name: 'Zebra' },
];

const Alphabet = () => {
  const [playingSound, setPlayingSound] = useState(null);

  const playSound = (soundFile) => {
    console.log(`Playing sound: ${soundFile}`); 
    
    if (playingSound) playingSound.stop();
    const sound = new Howl({ src: [soundFile] });
    sound.play();
    sound.on('playerror', (id, error) => {
      console.error('Playback error:', error);
    });
    setPlayingSound(sound);
  };

  return (
    <div className="p-0 md:p-2">
      <h2 className="mb-4 text-2xl font-bold tracking-tight">Learn Alphabets</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {letters.map(({ letter, image, name }) => (
          <motion.div
            key={letter}
            className="flex h-32 w-40 flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => playSound(`/sounds/${letter}.mp3`)}
          >
            <img src={image} alt={name} className="mb-2 size-16" />
            <p className="text-2xl font-semibold">{letter}</p>
            <p className="text-sm text-gray-600">{name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alphabet;
