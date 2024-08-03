"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const animations = ['bounce', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello'];

const speak = (text) => {
  const voices = window.speechSynthesis.getVoices();
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;

  // Improve clarity by adjusting voice attributes if needed
  msg.volume = 1; // Volume: 0 (silent) to 1 (loudest)
  msg.rate = 1; // Speed: 0.1 (slowest) to 10 (fastest)
  msg.pitch = 1; // Pitch: 0 (lowest) to 2 (highest)

  msg.voice = voices.find(voice => voice.name.includes("Google")); // Adjust based on available voices
  window.speechSynthesis.speak(msg);
};

const LetterCards = () => {
  useEffect(() => {
    const letters = document.getElementsByClassName('letter-card');
    for (let i = 0; i < letters.length; i++) {
      letters[i].addEventListener('mousedown', function(e) {
        // Cancel existing speech in progress
        window.speechSynthesis.cancel();
        // Read this letter
        speak(this.innerText);
        // Remove existing animation classes
        this.classList.remove(...animations);
        // Add a random animation
        this.classList.add(
          animations[Math.floor(Math.random() * animations.length)],
          'animated'
        );
      });
    }
  }, []);

  return (
    <div className="letter-cards-container">
      {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => (
        <motion.div
          key={letter}
          className="letter-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {letter}
        </motion.div>
      ))}
    </div>
  );
};

export default LetterCards;
