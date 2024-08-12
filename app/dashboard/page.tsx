"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Overview } from "@/app/dashboard/components/overview";
import { RecentCourses } from "@/app/dashboard/components/recent-courses";
import { Search } from "@/app/dashboard/components/search";
import LinkCards from "@/app/dashboard/components/LinkCards";
import {Input} from "@/components/ui/input"
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { DataTable } from "./components/data-table";
import { useRouter } from "next/navigation";

export default function Dashboard() {


  return (
    <>
      <div className="bg-light-blue-100 dark:bg-dark-blue-900 mb-10 dark:text-white sm:mb-20">
        <div className="flex flex-col md:flex-row">
          
          <div className="flex-1 space-y-4 p-4 md:p-8">
           
            {/* <div className="flex items-center justify-between space-y-2 md:flex-row md:space-y-0">
              <h2 className="text-xl font-bold tracking-tight text-green-400 md:text-3xl">
                Dashboard
              </h2>
              <div className="items-center space-x-2 md:flex">
              <div className="grid gap-3">
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  defaultValue="Search Here..."
                />
              </div>
              </div>
            </div> */}
            <Tabs defaultValue="overview" className="space-y-4 ">
              <TabsList className="flex flex-wrap justify-center bg-transparent p-2">
                <TabsTrigger value="overview">Dashboard</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 sm:mb-10">
              <div className="grid gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="size-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="size-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="size-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="size-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Courses</CardTitle>
                    <CardDescription>
                      You have completed 2 Course this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentCourses />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="activities" className="space-y-4 p-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/letter">
            <Card className="relative h-40 col-span-1 overflow-hidden bg-purple-200 cursor-pointer">
              <Image
                src="/images/award.png"
                alt="Top Scores"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen rounded-md bg-purple-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">English</CardTitle>
                <p>See how you rank among your peers in various quizzes.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/daily-quiz">
            <Card className="relative col-span-1 h-40 overflow-hidden bg-blue-200 cursor-pointer">
              <Image
                src="/images/award.png"
                alt="Daily Quiz"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen bg-blue-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">Daily Quiz</CardTitle>
                <p>Complete todays quiz to earn badges and rewards!</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/lessons-progress">
            <Card className="relative col-span-1 h-40 overflow-hidden bg-green-200 cursor-pointer">
              <Image
                src="/images/timeline.png"
                alt="Lessons Progress"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen bg-green-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">Lessons Progress</CardTitle>
                <p>Track your progress on recent lessons and activities.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/upcoming-events">
            <Card className="relative col-span-1 h-40 overflow-hidden bg-pink-200 cursor-pointer">
              <Image
                src="/images/counting.png"
                alt="Upcoming Events"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen bg-pink-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">Upcoming Events</CardTitle>
                <p>Check out the upcoming events and activities for more fun!</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </TabsContent>

      <TabsContent value="achievements" className="space-y-4 p-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/badges-earned">
            <Card className="relative h-40 col-span-1 overflow-hidden bg-blue-200 cursor-pointer">
              <Image
                src="/images/defence.png"
                alt="Badges Earned"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen bg-blue-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">Badges Earned</CardTitle>
                <p>View all the badges youve earned for your achievements.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/top-scores">
            <Card className="relative h-40 col-span-1 overflow-hidden bg-purple-200 cursor-pointer">
              <Image
                src="/images/award.png"
                alt="Top Scores"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen rounded-md bg-purple-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">Top Scores</CardTitle>
                <p>See how you rank among your peers in various quizzes.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
