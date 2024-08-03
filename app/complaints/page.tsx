"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";

const statusTypes = [
  { value: 'all', label: 'Total Complaints' },
  { value: 'Warranty', label: 'Warranty' },
  { value: 'Out Of Warranty', label: 'Out of Warranty' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Completed', label: 'Completed' },
];

export default function CustomerPage() {  
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

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
      
      const counts = {
        all: transformedComplaints.length,
        Warranty: transformedComplaints.filter(c => c.status === 'Warranty').length,
        'Out Of Warranty': transformedComplaints.filter(c => c.status === 'Out Of Warranty').length,
        Cancelled: transformedComplaints.filter(c => c.status === 'Cancelled').length,
        Completed: transformedComplaints.filter(c => c.status === 'Completed').length,
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
    <div className="h-full flex-1 flex-col space-y-8 p-4 dark:bg-slate-900 dark:text-white md:p-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">Welcome back!</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Heres a list of your complaints for this month!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href='create-complaint' className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
            <PlusCircledIcon className="mr-2 size-4" />
            Add Complaint
          </Link>
        </div>
      </div>

      <div className="flex-col space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {statusTypes.map((statusType) => (
            <Card key={statusType.value} className="rounded-md shadow-sm dark:bg-slate-700">
              <div
                className={`cursor-pointer rounded p-4 ${selectedStatus === statusType.value ? 'bg-primary text-white' : 'bg-white dark:bg-slate-700'}`}
                onClick={() => handleStatusClick(statusType.value)}
              >
                <CardContent className="flex items-center justify-between">
                  <h2 className="text-sm font-bold">{statusType.label}</h2>
                  <p className="text-lg font-bold text-muted-foreground">{statusCounts[statusType.value]}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
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
        <div className="mt-6">
          <DataTable data={filteredComplaints} columns={columns} />
        </div>
      )}
    </div>
  );
}
