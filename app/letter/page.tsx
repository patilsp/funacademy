import React from 'react';
import MemoryGames from '@/components/MemoryGame';
// import LetterCards from '@/components/LetterCards';

function Page() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/guess.jpg)' }}
    >
      <div className="container mx-auto rounded-lg  p-4">
        <h1 className="mb-4 text-center text-3xl font-bold">Click a Letter</h1>
        <MemoryGames />
      </div>
    </div>
  );
}

export default Page;
