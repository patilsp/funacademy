"use client";

import React, { useState, useEffect } from 'react';

const generateCards = () => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
    <div className="memory-game">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${flippedIndices.includes(index) || matchedPairs.includes(card) ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          {flippedIndices.includes(index) || matchedPairs.includes(card) ? card : '?'}
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;
