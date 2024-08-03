"use client";

import React, { useState, useEffect } from 'react';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { motion } from 'framer-motion';
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york/ui/popover";
import { Calendar } from "@/registry/new-york/ui/calendar";
import { useAuth, useUser } from '@clerk/nextjs';
import { LoaderCircle, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export function DatePickerDemo({ date, setDate }) {
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

const UserForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [date, setDate] = useState(post.dateOfBirth ? new Date(post.dateOfBirth) : undefined);

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const username = user?.fullName || "";
  const phone = user?.phoneNumber || "";
  const email = user?.emailAddress || "";

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      setPost((prevPost) => ({
        ...prevPost,
        userId,
        username: prevPost.username || username,
        email: prevPost.email || email,
        phone: prevPost.phone || phone,
      }));
    }
  }, [isLoaded, isSignedIn, userId, username, email, phone, setPost]);

  useEffect(() => {
    if (date) {
      setPost((prevPost) => ({
        ...prevPost,
        dateOfBirth: format(date, "yyyy-MM-dd"),
      }));
    }
  }, [date, setPost]);

  const handleRoleChange = (value) => {
    setPost({ ...post, role: value });
  };


  
  return (
    <section className="relative flex h-screen justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/banner1.jpg)' }}>
      <div className="absolute inset-0 opacity-50"></div>
      <div className="w-full p-4 md:w-1/2">
        <div className="mt-10 p-4">
          <motion.form
            onSubmit={handleSubmit}
            className='glassmorphism mt-2 flex w-full flex-col gap-6 rounded-lg border bg-transparent p-8 text-slate-800 shadow dark:bg-slate-900 dark:text-white'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='my-2 text-center text-2xl font-bold'>
              Complete User Registration
            </h1>

            <div className="grid gap-2">
              <Label htmlFor="username">User Full Name</Label>
              <Input
                id="username"
                value={post.username}
                onChange={(e) => setPost({ ...post, username: e.target.value })}
                placeholder='Enter username'  
                className='input border-white'
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              <div className="grid w-full gap-2">
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  value={post.email}
                  onChange={(e) => setPost({ ...post, email: e.target.value })}
                  placeholder='Enter email'
                 className='input border-white'
                />
              </div>

              <div className="grid w-full gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type='tel'
                  pattern='[0-9]*'
                  value={post.phone}
                  onChange={(e) => setPost({ ...post, phone: e.target.value })}
                  placeholder='Enter phone number'
                  className='input border-white'
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              <div className="grid w-full gap-2">
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                <DatePickerDemo date={date} setDate={setDate} />
              </div>

              <div className="grid w-full gap-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={post.role || "User"} onValueChange={handleRoleChange}>
                  <SelectTrigger className="line-clamp-1 w-full truncate border-white">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='my-4 flex justify-center gap-4'>
              <Button
                type='submit'
                disabled={submitting}
                className='w-full max-w-60 rounded px-5 py-1.5 text-sm text-white'
              >
                <Users className="mr-2 size-4" /> {submitting ? `${type}ing...` : type}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default UserForm;
