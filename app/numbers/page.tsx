import Link from "next/link"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ArrowLeft, BookCheck, CircleX } from 'lucide-react';


// Import all the number learning components
import NumberGrid from "@/app/numbers/components/number-grid";
import NumberMatchingGame from "@/app/numbers/components/number-matching-game";
import NumberSequencePuzzle from "@/app/numbers/components/number-sequence-puzzle";
import AudioRecognitionQuiz from "@/app/numbers/components/audio-recognition-quiz";
import NumberWritingPractice from "@/app/numbers/components/number-writing-practice";
import NumberQuiz from "@/app/numbers/components/number-quiz";

const Numbers = () => {
  return (
    <div className="space-y-6 p-2 pb-16 sm:mb-20 md:mb-1 md:block md:p-4">
      <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        
      
        <Tabs defaultValue="numbers" className="w-full">
        <div className="flex items-center justify-between gap-2">
            <Link href="/category" className="flex gap-2">
              <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow dark:bg-slate-800"/>
            </Link>

            <TabsList className="flex w-full justify-center gap-2 space-x-2 px-1">
              <TabsTrigger value="numbers">Learn Numbers</TabsTrigger>
              {/* <TabsTrigger value="matching">Matching </TabsTrigger>
              <TabsTrigger value="sequence">Sequence</TabsTrigger>
              <TabsTrigger value="audio">Audio Quiz</TabsTrigger> */}
              {/* <TabsTrigger value="writing">Writing Practice</TabsTrigger> */}
              <TabsTrigger value="timed">Number Quiz</TabsTrigger>
            </TabsList>

              {/* <BookCheck className="size-8 rounded-full border bg-red-200 p-2 hover:shadow dark:bg-slate-800"/> */}
            </div>


          {/* Tab Content for Numbers */}
          <TabsContent value="numbers" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Numbers</CardTitle>
                <CardDescription>
                  Explore and learn numbers by clicking on them.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <NumberGrid />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content for Matching Game */}
          <TabsContent value="matching" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Number Matching Game</CardTitle>
                <CardDescription>
                  Match numbers with their corresponding images.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <NumberMatchingGame />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content for Sequence Puzzle */}
          <TabsContent value="sequence" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Number Sequence Puzzle</CardTitle>
                <CardDescription>
                  Fill in the missing numbers in the sequence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <NumberSequencePuzzle />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content for Audio Quiz */}
          <TabsContent value="audio" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Audio Recognition Quiz</CardTitle>
                <CardDescription>
                  Recognize numbers based on audio cues.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <AudioRecognitionQuiz />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content for Writing Practice */}
          <TabsContent value="writing" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Number Writing Practice</CardTitle>
                <CardDescription>
                  Practice writing numbers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <NumberWritingPractice />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content for Timed Quiz */}
          <TabsContent value="timed" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Timed Number Quiz</CardTitle>
                <CardDescription>
                  Select the correct number under time pressure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <NumberQuiz />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Numbers;
