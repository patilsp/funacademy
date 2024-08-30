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
import NumberTable from "@/app/numbers/components/number-table";
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

            <TabsList className="flex w-full justify-center gap-2 px-1">
              <TabsTrigger value="numbers">Numbers</TabsTrigger>
              <TabsTrigger value="numbers-table">Numbers Table </TabsTrigger>
              <TabsTrigger value="number-quiz">Number Quiz</TabsTrigger>
            </TabsList>

              {/* <BookCheck className="size-8 rounded-full border bg-red-200 p-2 hover:shadow dark:bg-slate-800"/> */}
            </div>


          {/* Tab Content for Numbers */}
          <TabsContent value="numbers" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Learn Numbers</CardTitle>
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
          <TabsContent value="numbers-table" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Number Table</CardTitle>
                <CardDescription>
                  Multiplication Table (1 to 10)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <NumberTable />
              </CardContent>
            </Card>
          </TabsContent>

         
          {/* Tab Content for Timed Quiz */}
          <TabsContent value="number-quiz" className="w-full">
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Number Quiz</CardTitle>
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
