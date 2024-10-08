"use client";

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Star } from "lucide-react"


const gamesData = [
  {
    id: 1,
    name: "Colorful Matching",
    description: "A fun memory game where kids match pairs of colorful cards.",
    ageRange: "3-6",
    difficulty: "Easy",
    category: "Memory"
  },
  {
    id: 2,
    name: "Math Adventure",
    description: "An exciting journey through a world of numbers and basic arithmetic.",
    ageRange: "6-9",
    difficulty: "Medium",
    category: "Educational"
  },
  {
    id: 3,
    name: "Spelling Bee",
    description: "Improve spelling skills with this engaging word game.",
    ageRange: "7-12",
    difficulty: "Medium",
    category: "Language"
  },
  {
    id: 4,
    name: "Puzzle Quest",
    description: "A collection of various puzzles to challenge young minds.",
    ageRange: "8-12",
    difficulty: "Hard",
    category: "Puzzle"
  },
  {
    id: 5,
    name: "Animal Trivia",
    description: "Learn interesting facts about animals in this fun trivia game.",
    ageRange: "5-10",
    difficulty: "Easy",
    category: "Educational"
  },
  {
    id: 6,
    name: "Doodle Artist",
    description: "Unleash creativity with this digital drawing and coloring game.",
    ageRange: "4-12",
    difficulty: "Easy",
    category: "Art"
  }
]


function Games() {

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredGames = gamesData.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || game.category === selectedCategory)
  )

  const categories = ["All", ...new Set(gamesData.map(game => game.category))]

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text1 flex items-center text-3xl font-bold">       
          Play Games
        </h1>
        <div className="flex justify-between gap-2"> 
          <div className="relative ">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="shrink-0">
            <Label htmlFor="category-select" className="sr-only">Select Category</Label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map(game => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <h1 className="text-base font-semibold">{game.name}</h1>
                <Badge variant="secondary">{game.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="my-5 mb-4 text-sm md:text-base">{game.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mr-2">Age: {game.ageRange}</Badge>
                  <Badge variant="outline">{game.difficulty}</Badge>
                </div>
                <Button size="sm">
                  <Star className="mr-2 size-4 hover:fill-primary" />
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <p className="mt-8 text-center text-base text-red-400">No games found. Try a different search term or category.</p>
      )}
    </div>
  )
}

export default Games
