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
import { useAuth, useUser } from "@clerk/nextjs"; 

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useRouter } from "next/navigation";

const statusTypes = [
  { value: 'all', label: 'Total Complaints' },
  { value: 'Warranty', label: 'Warranty' },
  { value: 'Out Of Warranty', label: 'Out of Warranty' },
  { value: 'completed', label: 'Completed' },
];

export default function DashboardPage() {
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();
  const { isLoaded, userId, isSignedIn, user } = useUser();

  const userName = user?.fullName || "";

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/complaint");
      const data = await response.json();
      
      const transformedComplaints = data.map((complaint) => ({
        ...complaint,
        id: complaint._id.toString(),
      }));

      setAllComplaints(transformedComplaints);
      setFilteredComplaints(transformedComplaints);

      // Calculate counts
      const counts = {
        all: transformedComplaints.length,
        Warranty: transformedComplaints.filter(c => c.status === 'Warranty').length,
        'Out Of Warranty': transformedComplaints.filter(c => c.status === 'Out Of Warranty').length,
        canceled: transformedComplaints.filter(c => c.status === 'canceled').length,
        completed: transformedComplaints.filter(c => c.status === 'completed').length,
      };
      setStatusCounts(counts);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    if (status === 'all') {
      setFilteredComplaints(allComplaints);
    } else {
      setFilteredComplaints(allComplaints.filter(c => c.status === status));
    }
  };

  return (
    <>
      <div className="p-4 dark:bg-slate-900 dark:text-white">
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
                <TabsTrigger value="overview">Dashboard</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {statusTypes.map((statusType) => (
                    <Card key={statusType.value} className="rounded">
                      <div
                        className={`flex cursor-pointer items-center justify-between rounded border p-4 ${selectedStatus === statusType.value ? 'bg-primary text-white dark:bg-black' : 'bg-white dark:bg-slate-700'}`}
                        onClick={() => handleStatusClick(statusType.value)}
                      >    
                        <CardContent className="flex w-full items-center justify-between gap-3 pt-5">              
                          <h2 className="text-sm font-bold">{statusType.label}</h2>
                          <p className="text-xl font-bold text-muted-foreground">{statusCounts[statusType.value]}</p>
                        </CardContent>              
                      </div>
                    </Card>
                  ))}
                </div>

                {loading ? (
                  <div className="flex h-32 items-center justify-center">
                    <svg
                      className="size-8 animate-spin text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v0M12 22v0M22 12h0M2 12h0M4.2 4.2h0M19.8 19.8h0M4.2 19.8h0M19.8 4.2h0" />
                    </svg>
                  </div>
                ) : (
                  <DataTable data={filteredComplaints} columns={columns} />
                )}
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
