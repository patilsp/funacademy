import React from 'react';
import Link from "next/link";
import MemoryGames from '@/components/MemoryGame';
import LetterCards from '@/components/LetterCards';
import AlphabetCarousel from '@/components/AlphabetCarousel';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function Page() {
  return (
    <div className="relative min-h-screen p-0 md:p-4">
      <Tabs defaultValue="Letter" className="space-y-2">
        <TabsList
          className="scrollbar-hide mb-4 flex flex-wrap justify-center overflow-auto bg-transparent"
        >
          <TabsTrigger
            value="Letter"
            className="text-sm font-semibold md:px-4"
          >
            Letter
          </TabsTrigger>
          <TabsTrigger
            value="Guess"
            className="text-sm font-semibold md:px-4"
          >
            Guess The Letter
          </TabsTrigger>
          <TabsTrigger
            value="flip"
            className="text-sm font-semibold md:px-4"
          >
            Worlds
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Letter" className="space-y-4">
          <div className="flex justify-center gap-4">
            <LetterCards />
          </div>
        </TabsContent>
        <TabsContent value="Guess" className="space-y-4">
          <div className="container relative z-10 mx-auto p-4 md:py-6 lg:p-8">
            <h1 className="text-center text-3xl font-bold text-black">
              Guess the Letter
            </h1>
            <MemoryGames />
          </div>
        </TabsContent>
        <TabsContent value="flip" className="space-y-4">
          <div className="container relative z-10 mx-auto p-4 md:py-6 lg:p-8">
            <h1 className="text-center text-3xl font-bold text-black">
              Letter Game
            </h1>
            <AlphabetCarousel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
