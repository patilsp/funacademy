import React from 'react';
import Link from "next/link"
import MemoryGames from '@/components/MemoryGame';
import LetterCards from '@/components/LetterCards';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

function Page() {
  return (

    <div
    className="relative min-h-screen bg-cover bg-center"
    style={{ backgroundImage: 'url(/images/guess.jpg)' }}
  >
    <div className="absolute"></div> 

    <Tabs defaultValue="overview" className="space-y-2">
          <TabsList className="flex flex-wrap justify-center bg-transparent p-2">
            <TabsTrigger value="overview">Letter</TabsTrigger>
            <TabsTrigger value="analytics">Guess The Letter</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="flex gap-4">
              <LetterCards />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="">
           
                <div className="container relative z-10 mx-auto p-4 md:py-6 lg:p-8">
                  <div className="flex items-center justify-end">
                    <Link href="/dashboard" passHref>
                      <p className="rounded bg-zinc-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900">
                        Back
                      </p>
                    </Link>
                  </div>
                  <div>
                    <h1 className="text-center text-3xl font-bold text-green-500">
                      Guess the Letter
                    </h1>
                  </div>
                  <MemoryGames />
                </div>
             
              
            </div>
          </TabsContent>
        </Tabs>



    </div>



   
  );
}

export default Page;