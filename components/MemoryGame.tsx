"use client";

import React, { useState, useEffect } from 'react';

// Function to generate shuffled cards
const generateCards = () => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const cards = [...values, ...values].sort(() => Math.random() - 0.5);
  return cards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs([...matchedPairs, cards[firstIndex]]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [cards, flippedIndices, matchedPairs]);

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index)) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  return (
    <div className="mb-12 grid grid-cols-3 gap-8 p-2 md:grid-cols-6 md:p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`aspect-w-1 aspect-h-1 relative flex size-24 cursor-pointer items-center justify-center rounded-lg text-3xl font-bold text-black transition-transform duration-300 md:size-40 md:text-6xl ${flippedIndices.includes(index) || matchedPairs.includes(card) ? 'bg-green-400' : 'bg-gray-200'} ${flippedIndices.includes(index) || matchedPairs.includes(card) ? 'scale-105' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          {flippedIndices.includes(index) || matchedPairs.includes(card) ? card : '?'}
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;
