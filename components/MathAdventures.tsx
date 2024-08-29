'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Star } from 'lucide-react'

const levels = [
  { id: 1, title: "Counting Fun", unlocked: true },
  { id: 2, title: "Addition Adventure", unlocked: false },
  { id: 3, title: "Subtraction Safari", unlocked: false },
  { id: 4, title: "Multiplication Mania", unlocked: false },
  { id: 5, title: "Division Discovery", unlocked: false },
]

export default function MathAdventures() {
  const [currentLevel, setCurrentLevel] = useState(1)

  const handleLevelClick = (levelId: number) => {
    if (levels[levelId - 1].unlocked) {
      setCurrentLevel(levelId)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-600">Math Adventures</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Course Details Card */}
        <Card className="bg-gradient-to-b from-yellow-100 to-orange-100 shadow-lg md:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600">Course Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-lg">Join our exciting Math Adventures! Learn math through fun games and activities.</p>
            <ul className="list-inside list-disc space-y-2">
              <li>5 Interactive Levels</li>
              <li>Fun Animations</li>
              <li>Progress Tracking</li>
              <li>Earn Stars and Badges</li>
            </ul>
          </CardContent>
        </Card>

        {/* Levels */}
        <div className="flex flex-col space-y-4 md:col-span-1">
          {levels.map((level) => (
            <Button
              key={level.id}
              onClick={() => handleLevelClick(level.id)}
              className={`h-16 text-lg font-semibold ${
                level.unlocked 
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600' 
                  : 'cursor-not-allowed bg-gray-300'
              } ${currentLevel === level.id ? 'ring-4 ring-yellow-400' : ''}`}
              disabled={!level.unlocked}
            >
              {level.unlocked ? (
                <Unlock className="mr-2 size-6" />
              ) : (
                <Lock className="mr-2 size-6" />
              )}
              {level.title}
            </Button>
          ))}
        </div>

        {/* Start Learning Card */}
        <Card className="bg-gradient-to-b from-green-100 to-blue-100 shadow-lg md:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">
              Level {currentLevel}: {levels[currentLevel - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-lg">Are you ready for an exciting math adventure?</p>
            <div className="mb-4 flex justify-center space-x-2">
              {[1, 2, 3,4,5].map((star) => (
                <Star key={star} className="size-8 text-yellow-400" fill={star <= currentLevel ? "currentColor" : "none"} />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="h-12 w-full">
              Start Learning!
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}