'use client'

import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bell, Calendar, ChevronLeft, ChevronRight, HelpCircle, LayoutDashboard, MessageSquare, Settings, Users } from 'lucide-react'
import ChartComponent from '/app/admin/components/chartComponent';



export default function Dashboard() {
  const { data: session } = useSession()
  const today = new Date()

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <main className="space-y-8 lg:col-span-3">
          <header className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {session?.user?.name || 'Guest'}👋</h2>
              <p className="text-gray-500">Dont forget your homework</p>
            </div>
            <div className="flex w-full items-center space-x-4 lg:w-auto">
              <Input type="search" placeholder="Search class..." className="w-full lg:w-64" />
              {/* <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button> */}
            </div>
          </header>

          <Card className="bg-[#7C5CFC] text-white">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-6 lg:flex-row">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Quotes of the day</h3>
                <p className="mb-2 text-2xl font-bold">Anytime you ride against the best in the world, it becomes a learning process.</p>
                <p className="text-sm">-Bonnie Blair</p>
                <Button size="sm" variant="secondary" className="mt-4">Start learning</Button>
              </div>
              <Image src="/images/todo.png" width="245" height="245" alt="Illustration" className="object-contain" />
            </CardContent>
          </Card>

          <section>
            <h3 className="mb-4 text-xl font-bold">Your Courses</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Basic English", instructor: "Mr. John Keating", progress: 70, level: "Intermediate" },
                { title: "Basic Maths", instructor: "Ms. Erin Gruwell", progress: 25, level: "Beginner" },
                { title: "C Programming", instructor: "Mr. Walter White", progress: 50, level: "Beginner" },
              ].map((course, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <Image src={`/images/welcome3.jpg?height=150&width=300&text=Course+${index + 1}`} alt={course.title} className="mb-4 h-36 w-full rounded object-cover" />
                    <h4 className="mb-2 font-bold">{course.title}</h4>
                    <p className="mb-2 text-sm text-gray-500">{course.instructor}</p>
                    <Progress value={course.progress} className="mb-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{course.progress}/10</span>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-xl font-bold">Leader Board</h3>
            <Card>
              <CardContent className="overflow-x-auto p-5">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="pb-2">Rank</th>
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Class</th>
                      <th className="pb-2">Course done</th>
                      <th className="pb-2">Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, name: "User 1", class: "class 1", courseDone: "10 Course", point: "1,234 Point" },
                      { rank: 2, name: "User 2", class: "class 2", courseDone: "20 Course", point: "1,200 Point" },
                      { rank: 3, name: "User 3", class: "class 4", courseDone: "20 Course", point: "1,300 Point" },
                      { rank: 4, name: "User 4", class: "class 3", courseDone: "40 Course", point: "1,200 Point" },
                      { rank: 5, name: "User 5", class: "class 1", courseDone: "20 Course", point: "1,500 Point" },
                      { rank: 6, name: "User 6", class: "class 5", courseDone: "60 Course", point: "1,6200 Point" },
                      { rank: 7, name: "User 7", class: "class 7", courseDone: "70 Course", point: "1,700 Point" },
                     
                    ].map((student, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2">{student.rank}</td>
                        <td className="py-2">{student.name}</td>
                        <td className="py-2">{student.class}</td>
                        <td className="py-2">{student.courseDone}</td>
                        <td className="py-2 text-green-500">{student.point}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>
        </main>

        <aside className="space-y-8 lg:col-span-1">
        <section className="rounded-lg border bg-white p-2 shadow">
          <div className="flex flex-col items-center">
           
            <Avatar className="mb-2 size-20">
              <AvatarImage src={session?.user?.image || "/images/student.png.svg?height=80&width=80"} alt={session?.user?.name || "User"} />
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold">{session?.user?.name || "Guest User"}</h3>
            <p className="text-sm text-gray-500">@{session?.user?.name || "guest"}</p>
            <div className="mt-2 flex space-x-2">
              <Badge variant="secondary" className="bg-orange-200 pt-1">Trophy</Badge>
              <Badge variant="secondary" className="bg-indigo-200 pt-1">Medal</Badge>
              <Badge variant="secondary" className="bg-green-200 pt-1">Friends</Badge>
            </div>
          </div>  
        </section>


          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-sm font-medium">{format(today, 'MMMM yyyy')}</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon"><ChevronLeft className="size-4" /></Button>
                <Button variant="ghost" size="icon"><ChevronRight className="size-4" /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <div key={index} className="text-sm font-medium text-gray-500">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <Button 
                    key={date} 
                    variant="ghost" 
                    size="sm" 
                    className={`p-0 ${date === today.getDate() ? 'bg-blue-100 text-blue-600' : ''}`}
                  >
                    {date}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <section className="rounded-lg border bg-white p-2 shadow md:p-4">
            <h3 className="mb-4 font-bold">Todays schedule</h3>
            <div className="space-y-4">
              {[
                { icon: "👨‍🏫", title: "Learn to read Sanskrit letters", time: "09:00 - 10:00 With mr.surya" },
                { icon: "🚗", title: "Designing v90 car engine", time: "12:00 - 14:00 With mr.herman" },
                { icon: "🎮", title: "Learn e-sports strategy", time: "14:30 - 15:30 With mr.philip" },
              ].map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-lg">
                    {event.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border bg-white p-2 shadow md:p-4">
            <h3 className="mb-4 font-bold">Hours Spent</h3>
            <div className="flex h-40 items-end justify-between">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-6 bg-blue-500" style={{ height: `${Math.random() * 100}%` }}></div>
                  <span className="mt-2 text-xs">{day}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}