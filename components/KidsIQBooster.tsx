"use client";

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Puzzle, Book, Music, Palette, Dumbbell } from "lucide-react"

const activities = [
  {
    id: 1,
    name: "Puzzle Solving",
    description: "Engage in various puzzles to enhance problem-solving skills and spatial awareness.",
    icon: Puzzle,
    color: "text-purple-500",
  },
  {
    id: 2,
    name: "Reading Adventures",
    description: "Explore new worlds through books to improve language skills and imagination.",
    icon: Book,
    color: "text-blue-500",
  },
  {
    id: 3,
    name: "Music and Rhythm",
    description: "Learn an instrument or engage in rhythmic activities to boost mathematical thinking and creativity.",
    icon: Music,
    color: "text-green-500",
  },
  {
    id: 4,
    name: "Art and Creativity",
    description: "Express yourself through drawing, painting, or crafts to enhance visual-spatial intelligence.",
    icon: Palette,
    color: "text-yellow-500",
  },
  {
    id: 5,
    name: "Physical Exercise",
    description: "Participate in sports or physical activities to improve coordination and boost overall brain function.",
    icon: Dumbbell,
    color: "text-red-500",
  },
  {
    id: 6,
    name: "Memory Games",
    description: "Play memory-enhancing games to improve recall and cognitive processing speed.",
    icon: Brain,
    color: "text-indigo-500",
  },
]

export default function KidsIQBooster() {
  const [selectedActivity, setSelectedActivity] = useState(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Boost Your Brain Power!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <activity.icon className={`size-6 ${activity.color}`} />
                {activity.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{activity.description}</p>
              <Button onClick={() => setSelectedActivity(activity)}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedActivity && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <selectedActivity.icon className={`size-6 ${selectedActivity.color}`} />
                {selectedActivity.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{selectedActivity.description}</p>
              <h3 className="mb-2 font-semibold">How it boosts IQ:</h3>
              <ul className="mb-4 list-inside list-disc">
                <li>Enhances cognitive processing</li>
                <li>Improves problem-solving skills</li>
                <li>Boosts creativity and critical thinking</li>
                <li>Develops better focus and concentration</li>
              </ul>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Recommended: 15-30 min daily</Badge>
                <Button onClick={() => setSelectedActivity(null)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}