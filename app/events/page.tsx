"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";

function Events() {
   const currentDate = new Date();

   return (
     <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-200 to-blue-200">
       <main className="container mx-auto grow p-4">
         <h2 className="my-4 mb-10 text-center text-4xl font-extrabold text-blue-700">Welcome back, Young Explorer!</h2>

         <Card className="mb-8 rounded shadow">
           <CardHeader>
             <CardTitle className="text-3xl text-red-600">Quick Actions</CardTitle>
             <CardDescription className="text-gray-500">Jump right into the fun!</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-wrap gap-4">
             <Button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 hover:shadow-lg">
               <Star className="size-4" />
               <span>Start Learning</span>
             </Button>
             <Button variant="outline" className="flex items-center space-x-2 hover:bg-purple-100">
               <Star className="size-5" />
               <span>View Achievements</span>
             </Button>
             <Link href="/events" passHref>
               <Button variant="link" className="flex items-center space-x-2 text-blue-500 hover:underline">
                 <span>See All Events</span>
               </Button>
             </Link>
           </CardContent>
         </Card>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
           {/* Upcoming Events Card */}
           <Card className="rounded-lg shadow-lg">
             <CardHeader>
               <CardTitle className="text-2xl text-green-600">Upcoming Events</CardTitle>
               <CardDescription className="text-gray-500">Check out whats coming up!</CardDescription>
             </CardHeader>
             <CardContent>
               <Calendar
                 mode="single"
                 selected={currentDate}
                 className="w-full rounded-md border shadow"
               />
             </CardContent>
           </Card>

           {/* Featured Events Card */}
           <Card className="rounded-lg shadow-lg">
             <CardHeader>
               <CardTitle className="text-2xl text-orange-600">Featured Events</CardTitle>
               <CardDescription className="text-gray-500">Dont miss out on these exciting activities!</CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-4">
                 <li className="flex items-center space-x-4">
                   <Star className="size-6 text-pink-500" />
                   <div>
                     <p className="font-semibold">Art Workshop</p>
                     <p className="text-sm text-gray-500">Tomorrow, 2 PM</p>
                   </div>
                   <Badge variant="secondary">Creative</Badge>
                 </li>
                 <li className="flex items-center space-x-4">
                   <Star className="size-6 text-purple-500" />
                   <div>
                     <p className="font-semibold">Music Class</p>
                     <p className="text-sm text-gray-500">Wednesday, 3 PM</p>
                   </div>
                   <Badge variant="secondary">Music</Badge>
                 </li>
                 <li className="flex items-center space-x-4">
                   <Star className="size-6 text-blue-500" />
                   <div>
                     <p className="font-semibold">Coding for Kids</p>
                     <p className="text-sm text-gray-500">Friday, 4 PM</p>
                   </div>
                   <Badge variant="secondary">Tech</Badge>
                 </li>
               </ul>
             </CardContent>
           </Card>

           {/* Third Card - More Events */}
           <Card className="rounded-lg shadow-lg">
             <CardHeader>
               <CardTitle className="text-2xl text-indigo-600">More Events</CardTitle>
               <CardDescription className="text-gray-500">Explore more fun activities!</CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-4">
                 <li className="flex items-center space-x-4">
                   <Star className="size-6 text-yellow-500" />
                   <div>
                     <p className="font-semibold">Storytelling Hour</p>
                     <p className="text-sm text-gray-500">Monday, 11 AM</p>
                   </div>
                   <Badge variant="secondary">Reading</Badge>
                 </li>
                 <li className="flex items-center space-x-4">
                   <Star className="size-6 text-green-500" />
                   <div>
                     <p className="font-semibold">Science Experiments</p>
                     <p className="text-sm text-gray-500">Thursday, 10 AM</p>
                   </div>
                   <Badge variant="secondary">Science</Badge>
                 </li>
                 <li className="flex items-center space-x-4">
                   <Star className="size-6 text-red-500" />
                   <div>
                     <p className="font-semibold">Dance Class</p>
                     <p className="text-sm text-gray-500">Saturday, 5 PM</p>
                   </div>
                   <Badge variant="secondary">Dance</Badge>
                 </li>
               </ul>
             </CardContent>
           </Card>
         </div>
       </main>
     </div>
   );
}

export default Events;
