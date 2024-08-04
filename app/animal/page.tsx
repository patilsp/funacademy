"use client";

import { useState } from 'react';
import Animal from '@/components/animal';

const animals = [
  { name: 'cat', color: 'red' },
  { name: 'dog', color: 'blue' },
  // Add more animals
];

const IndexPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [message, setMessage] = useState('');

  const handleAnimalClick = (name) => {
    if (selectedColor === animals.find(a => a.name === name)?.color) {
      setMessage('Correct! Well done.');
    } else {
      setMessage('Try again!');
    }
    setSelectedColor(null); // Reset color after selection
  };

  return (
    <div className="game-board">
      <h1>Colorful Animal Match</h1>
      <div className="animals">
        {animals.map(animal => (
          <Animal
            key={animal.name}
            color={animal.color}
            name={animal.name}
            onClick={handleAnimalClick}
          />
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default IndexPage;
