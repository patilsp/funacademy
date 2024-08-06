"use client";

import React, { useState, useEffect } from 'react';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { LoaderCircle, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";


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
  const { data: session } = useSession();

  const [date, setDate] = useState(post.dateOfBirth ? new Date(post.dateOfBirth) : undefined);
  const [age, setAge] = useState(post.age || 1);
  


  useEffect(() => {
    if (date) {
      setPost((prevPost) => ({
        ...prevPost,
        dateOfBirth: format(date, "yyyy-MM-dd"),
      }));
    }
  }, [date, setPost]);

  useEffect(() => {
    if (age) {
      setPost((prevPost) => ({
        ...prevPost,
        age,
      }));
    }
  }, [age, setPost]);

  return (
    <section className="relative flex h-screen justify-center">
      <div className="absolute"></div>
      <div className="w-full max-w-3xl p-4">
        <div className="mt-10 py-10 md:p-4">
          <motion.form
            onSubmit={handleSubmit}
            className='mt-2 flex w-full flex-col gap-6 rounded-lg border bg-white p-8 text-slate-800 shadow dark:bg-black dark:text-white'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='my-2 text-center text-2xl font-bold'>
              Complete Student Registration
            </h1>


            <div className="block w-full gap-4 space-y-4">
              <div className="w-full gap-2">
                <Label htmlFor="username">Student Name</Label>
                <Input
                  id="username"
                  value={post.username}
                  onChange={(e) => setPost({ ...post, username: e.target.value })}
                  placeholder='Enter username'  
                  className='input border-white'
                />
              </div>

              <div className="w-full gap-2">
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                <DatePickerDemo date={date} setDate={setDate} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((ageOption) => (
                  <label key={ageOption} className="flex items-center">
                    <input
                      type="radio"
                      name="age"
                      value={ageOption}
                      checked={age === ageOption}
                      onChange={() => setAge(ageOption)}
                      className="mr-2"
                    />
                    {ageOption}
                  </label>
                ))}
              </div>
            </div>

            <div className='my-4 flex justify-center gap-4'>
              <Button
                type='submit'
                disabled={submitting}
                className='w-full max-w-60'
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
