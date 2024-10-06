"use client";

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const courses = [
  { id: 1, title: "Fun with Numbers", category: "Math", level: "Beginner", duration: "4 weeks", image: "/images/quiz/1.svg?height=200&width=300&text=Fun+with+Numbers" },
  { id: 2, title: "Storytelling Adventures", category: "Language Arts", level: "Intermediate", duration: "6 weeks", image: "/images/quiz/2.svg?height=200&width=300&text=Storytelling+Adventures" },
  { id: 3, title: "Little Scientists", category: "Science", level: "Beginner", duration: "5 weeks", image: "/images/quiz/3.svg?height=200&width=300&text=Little+Scientists" },
  { id: 4, title: "World Explorer", category: "Social Studies", level: "Intermediate", duration: "8 weeks", image: "/images/quiz/4.svg?height=200&width=300&text=World+Explorer" },
  { id: 5, title: "Coding for Kids", category: "Technology", level: "Beginner", duration: "6 weeks", image: "/images/quiz/5.svg?height=200&width=300&text=Coding+for+Kids" },
  { id: 6, title: "Art & Imagination", category: "Art", level: "All Levels", duration: "4 weeks", image: "/images/quiz/6.svg?height=200&width=300&text=Art+%26+Imagination" },
  { id: 7, title: "Music & Movement", category: "Music", level: "Beginner", duration: "5 weeks", image: "/images/quiz/7.svg?height=200&width=300&text=Music+%26+Movement" },
  { id: 8, title: "Nature Explorers", category: "Science", level: "Intermediate", duration: "6 weeks", image: "/images/quiz/8.svg?height=200&width=300&text=Nature+Explorers" },
]

const categories = ["All", "Math", "Language Arts", "Science", "Social Studies", "Technology", "Art", "Music"]

export default function CoursePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || course.category === selectedCategory)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Explore Courses for Kids</h1>
      
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Input
          type="search"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-64"
        />
        <Select className="border-2" value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border sm:w-48 ">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="mt-8 text-center text-base text-red-500">No courses found. Try adjusting your search or category.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="flex flex-col hover:border-blue-400">
              <CardHeader className="p-0">
                <img src={course.image} alt="title" className="h-48 w-full rounded-t-lg object-cover" />
              </CardHeader>
              <CardContent className="grow p-4 border-t">
                <CardTitle className="mb-2 text-sm">{course.title}</CardTitle>
                <Badge className="mb-2">{course.category}</Badge>
                <p className="mb-2 text-sm text-gray-500">Level: {course.level}</p>
                <p className="text-sm text-gray-500">Duration: {course.duration}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}