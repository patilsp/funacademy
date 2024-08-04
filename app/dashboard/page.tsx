"use client";

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"
import { CalendarDateRangePicker } from "@/app/dashboard/components/date-range-picker"
import { Overview } from "@/app/dashboard/components/overview"
import { ComplaintsCompleted } from "@/app/dashboard/components/complaints-completed"
import { Search } from "@/app/dashboard/components/search"
import TeamSwitcher from "@/app/dashboard/components/team-switcher"
import LinkCards from "@/app/dashboard/components/LinkCards"
import { useAuth, useUser } from "@clerk/nextjs"; 


import { PlusCircledIcon } from "@radix-ui/react-icons";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const router = useRouter();
  const { isLoaded, userId, isSignedIn, user } = useUser();

  const userName = user?.fullName || "";

  

  return (
    <>
      <div className="mb-10 p-4 dark:bg-black dark:text-white">
        <div className="flex flex-col md:flex-row">
          
          <div className="flex-1 space-y-4 p-1 pt-6 md:p-8">


          <div className="mb-2 border-b">
            <div className="flex h-16 w-full items-center justify-center">
            <div className="flex items-start ">
                <span className="text_primary text-2xl font-bold">Welcome Back {userName}</span>
            </div>
            </div>
          </div>
            <div className="flex items-center justify-between space-y-2 md:flex-row md:space-y-0">
              <h2 className="hidden text-2xl font-bold tracking-tight md:block md:text-3xl">Dashboard</h2>
              <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
                <Button>Download</Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="flex flex-wrap justify-center bg-transparent p-2">
                <TabsTrigger value="overview">Games</TabsTrigger>
                <TabsTrigger value="analytics">Dashboard</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="flex gap-4">
                  <LinkCards />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-3 md:col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>You made 265 sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ComplaintsCompleted />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
