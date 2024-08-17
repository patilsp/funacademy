"use client"
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import React, { useState } from 'react';

function AnimatedBox({ position, color, onClick }) {
  const ref = React.useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Example animation
    }
  });

  return (
    <Box ref={ref} position={position} onClick={onClick}>
      <meshStandardMaterial attach="material" color={color} />
    </Box>
  );
}

export default function Scene() {
  const [pieces, setPieces] = useState([
    { position: [0, 0, 0], color: 'red' },
    { position: [1, 0, 0], color: 'green' },
    { position: [0, 1, 0], color: 'blue' },
    { position: [1, 1, 0], color: 'yellow' },
  ]);

  const handlePieceClick = (index) => {
    const newPieces = [...pieces];
    newPieces[index].position = [Math.random(), Math.random(), 0];
    setPieces(newPieces);
  };

  return (
    <Canvas className="size-32">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {pieces.map((piece, index) => (
        <AnimatedBox
          key={index}
          position={piece.position}
          color={piece.color}
          onClick={() => handlePieceClick(index)}
        />
      ))}
    </Canvas>
  );
}
