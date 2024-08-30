import React from 'react';
import Link from "next/link";
import MemoryGames from '@/components/MemoryGame';
import LetterCards from '@/components/LetterCards';
import AlphabetCarousel from '@/components/AlphabetCarousel';
import { ArrowLeft, Bookmark, CheckCircle, XCircle } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function Page() {
  return (
    <div className="relative min-h-screen p-0 md:p-4">

      
      <Tabs defaultValue="Letter" className="w-full p-1">
        <TabsList
          className="scrollbar-hide mb-4 flex flex-wrap justify-center overflow-auto bg-transparent"
        >

      <div className="flex w-full items-center justify-between gap-2">
        <Link href="/category" className="rounded-full bg-gray-100"> <ArrowLeft className="size-8 p-2"/> </Link>
        <TabsTrigger
            value="Letter"
            className="text-sm font-semibold md:px-4"
          >
            Letter
          </TabsTrigger>
          <TabsTrigger
            value="flip"
            className="text-sm font-semibold md:px-4"
          >
            Worlds
          </TabsTrigger>
          <TabsTrigger
            value="Guess"
            className="text-sm font-semibold md:px-4"
          >
            Guess The Letter
          </TabsTrigger>
       
        {/* <Link href="#" className="rounded-full bg-gray-100"> <Bookmark className="size-8 p-2"/> </Link> */}
      </div>


    
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
