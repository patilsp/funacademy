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
        <div className="">
{/* 
            <div className="flex items-center gap-2">
              <button
                className="group relative inline-flex h-9 items-center justify-start gap-2 rounded-md bg-white px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <svg
                  className="lucide lucide-arrow-left"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                <span className="origin-left scale-0 transition-transform group-hover:scale-100"
                  >Back</span
                >
              </button>
              <button
                className="relative inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-[#F5F5F5] hover:text-[#06B6D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <svg
                  className="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="#06B6D4"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
                  ></path>
                  <path
                    d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
                  ></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
                Dashboard
              </button>
              <button
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3"
              >
                <svg
                  className="lucide lucide-newspaper text-blue-400 dark:text-blue-600"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="#60A5FA"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
                  ></path>
                  <path d="M18 14h-8"></path>
                  <path d="M15 18h-5"></path>
                  <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
                Articles
              </button>
              <button
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#FACC14] h-9 rounded-md px-3"
              >
                <svg
                  className="lucide lucide-sticky-note text-yellow-400 dark:text-yellow-600"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="#FACC14"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"
                  ></path>
                  <path d="M15 3v6h6"></path>
                </svg>
                Notes
              </button>
              <button
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#FB923C] h-9 rounded-md px-3"
              >
                <svg
                  className="lucide lucide-star text-orange-400 dark:text-orange-600"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="#FB923C"
                  fill="#FB923C"
                  viewBox="0 0 24 24"
                  height="22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  ></polygon>
                </svg>
                Reviews
              </button>
            </div> */}

          
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

            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="m-auto flex w-full max-w-xl flex-wrap items-center justify-center bg-gray-100">
                <TabsTrigger value="overview">Dashboard</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 sm:mb-10">
              <div className="dashboard">

                  <div className="profile">
                    <h2>Good Morning Champ!</h2>
                    <p>Time to seize the day 🌞</p>
                  </div>

                  <div className="schedule-table">
                    <h2>Weekly Schedule</h2>
                    <table>
                      <tr>
                        <td className="day">Mon</td>
                        <td>Running</td>
                        <td>6:00 AM</td>
                      </tr>
                      <tr>
                        <td className="day">Tues</td>
                        <td>Swimming</td>
                        <td>7:00 AM</td>
                      </tr>
                      <tr>
                        <td className="day">Wed</td>
                        <td>Cycling</td>
                        <td>6:30 AM</td>
                      </tr>
                      <tr>
                        <td className="day">Thur</td>
                        <td>Yoga</td>
                        <td>6:00 AM</td>
                      </tr>
                      <tr>
                        <td className="day">Fri</td>
                        <td>Weight Training</td>
                        <td>8:00 AM</td>
                      </tr>
                    </table>
                  </div>

                  <div className="exercise-table">
                    <h2>Last 5 Exercises</h2>


                    <li>
                      <i className="fa-solid fa-person-running"></i>
                      <span>Running</span>
                      <span>30 min</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-person-swimming"></i>
                      <span>Swimming</span>
                      <span>45 min</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-person-biking"></i>
                      <span>Cycling</span>
                      <span>60 min</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-brain"></i>
                      <span>Yoga</span>
                      <span>40 min</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-weight-scale"></i>
                      <span>Weight Training</span>
                      <span>50 min</span>
                    </li>

                  </div>

                  <div className="calories">
                    <h2>Active Calories</h2>
                    <div><strong>500</strong>
                      <p>Today</p>
                    </div>
                    <div><strong>3500</strong>
                      <p>This Week</p>
                    </div>
                    <div><strong>14000</strong>
                      <p> This Month</p>
                    </div>
                  </div>

                  <div className="personal-bests">
                    <h2>Personal Bests</h2>
                    <ul>
                      <li><i className="fa-solid fa-trophy"></i><b>Fastest 5K Run</b>
                        22 min
                      </li>
                      <li><i className="fa-solid fa-trophy"></i><b>Heaviest Deadlift</b>
                        <p>250 lbs</p>
                      </li>
                      <li><i className="fa-solid fa-trophy"></i><b>Longest Plank</b>
                        <p> 3 min</p>
                      </li>
                    </ul>
                  </div>

                  <div className="challenges">
                    <h2>Challenges</h2>
                    <ul>
                      <li>30-Day Running Streak</li>
                      <li>1000 Pushups in a Month</li>
                      <li>Swim 20km in a Month</li>

                    </ul>
                  </div>

                  <div className="activity-feed">
                    <h2>Friends Activity</h2>
                    <ul>
                      <li>
                        <i className="fa-solid fa-user"></i><span>Jane</span>
                        <p>just set a new record in cycling: 30 miles!</p>
                      </li>
                      <li><i className="fa-solid fa-user"></i><span>Mike</span>
                        <p>completed the 30-Day Running Streak Challenge!</p>
                      </li>
                      <li><i className="fa-solid fa-user"></i><span>Anna</span>
                        <p> shared a new workout: Hill Sprints Interval</p>.
                      </li>
                    </ul>
                  </div>

                  </div>


              </TabsContent>

              <TabsContent value="1overview1" className="space-y-4 sm:mb-10">
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
        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/letter">
            <Card className="relative col-span-1 h-40 cursor-pointer overflow-hidden bg-purple-200">
              <Image
                src="/images/A.svg"
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

          <Link href="/math-quiz">
            <Card className="relative col-span-1 h-40 cursor-pointer overflow-hidden bg-blue-200">
              <Image
                src="/images/award.png"
                alt="Daily Quiz"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <CardContent className="relative min-h-screen bg-orange-500 bg-opacity-70 p-4 text-white">
                <CardTitle className="text-xl font-bold">Math Quiz</CardTitle>
                <p>Complete todays quiz to earn badges and rewards!</p>
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
