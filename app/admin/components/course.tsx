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
  { id: 2, title: "Storytelling Adventures", category: "Arts", level: "Intermediate", duration: "6 weeks", image: "/images/quiz/2.svg?height=200&width=300&text=Storytelling+Adventures" },
  { id: 3, title: "Little Scientists", category: "Science", level: "Beginner", duration: "5 weeks", image: "/images/quiz/3.svg?height=200&width=300&text=Little+Scientists" },
  { id: 4, title: "World Explorer", category: "Social", level: "Intermediate", duration: "8 weeks", image: "/images/quiz/4.svg?height=200&width=300&text=World+Explorer" },
  { id: 5, title: "Coding for Kids", category: "Technology", level: "Beginner", duration: "6 weeks", image: "/images/quiz/5.svg?height=200&width=300&text=Coding+for+Kids" },
  { id: 6, title: "Art & Imagination", category: "Art", level: "All Levels", duration: "4 weeks", image: "/images/quiz/6.svg?height=200&width=300&text=Art+%26+Imagination" },
  { id: 7, title: "Music & Movement", category: "Music", level: "Beginner", duration: "5 weeks", image: "/images/quiz/7.svg?height=200&width=300&text=Music+%26+Movement" },
  { id: 8, title: "Nature Explorers", category: "Science", level: "Intermediate", duration: "6 weeks", image: "/images/quiz/8.svg?height=200&width=300&text=Nature+Explorers" },
]

const categories = ["All", "Math", "Arts", "Science", "Social", "Technology", "Art", "Music"]

export default function CoursePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || course.category === selectedCategory)
  )

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between gap-2">
      <h1 className="text-3xl font-bold mb-8">Explore Courses</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          type="search"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-64"
        />
        <Select className="border" value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="sm:w-48 border">
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
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No courses found. Try adjusting your search or category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader className="p-0">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <div className="flex justify-between gap-2">
                    <CardTitle className="text-sm mb-2">{course.title}</CardTitle>
                    <Badge className="mb-2 bg-green-400 text-white">{course.category}</Badge>
                </div>
                <p className="text-sm text-gray-500 mb-2">Level: {course.level}</p>
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