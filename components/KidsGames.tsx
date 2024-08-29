"use client";

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GameController, Search, Star } from "lucide-react"

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

export default function KidsGames() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredGames = gamesData.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || game.category === selectedCategory)
  )

  const categories = ["All", ...new Set(gamesData.map(game => game.category))]

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <GameController className="mr-2 size-8" />
        Kids Games
      </h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative grow">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
            className="w-full rounded-md border p-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map(game => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {game.name}
                <Badge variant="secondary">{game.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{game.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mr-2">Age: {game.ageRange}</Badge>
                  <Badge variant="outline">{game.difficulty}</Badge>
                </div>
                <Button size="sm">
                  <Star className="mr-2 size-4" />
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">No games found. Try a different search term or category.</p>
      )}
    </div>
  )
}