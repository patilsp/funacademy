"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york/ui/popover";
import { Calendar } from "@/registry/new-york/ui/calendar";
import { useAuth, useUser } from '@clerk/nextjs';

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

const CustomerForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [date, setDate] = useState(post.dateofbirth ? new Date(post.dateofbirth) : undefined);
  const { isLoaded, userId } = useAuth();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      setPost((prevPost) => ({ ...prevPost, userId }));
    }
  }, [isLoaded, isSignedIn, setPost, userId]);

  useEffect(() => {
    if (post.dateofbirth) {
      setDate(new Date(post.dateofbirth));
    }
  }, [post.dateofbirth]);

  useEffect(() => {
    if (date) {
      setPost((prevPost) => ({
        ...prevPost,
        dateofbirth: format(date, "yyyy-MM-dd"),
      }));
    }
  }, [date, setPost]);

  const handleStatusChange = (value) => {
    setPost({ ...post, status: value });
  };

  return (
    <section className='mb-5 flex w-full max-w-full flex-col items-center justify-center px-4 py-2'>
      <h1 className='head_text mt-4 text-center text-xl text-indigo-500'>
        {type} Customer
      </h1>
      <form
        onSubmit={handleSubmit}
        className='glassmorphism mt-5 flex w-full max-w-2xl flex-col gap-4 rounded-lg border border-gray-200 p-8 shadow-lg dark:bg-slate-900 dark:text-white md:w-3/4 lg:w-1/2'
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder='Enter customer Name'
            required
            className='input'
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="grid w-full gap-2">
            <Label htmlFor="email">Email ID</Label>
            <Input
              value={post.email}
              onChange={(e) => setPost({ ...post, email: e.target.value })}
              placeholder='Enter customer email id'
              required
              className='input'
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type='tel'
              pattern='[0-9]*'
              value={post.phone}
              onChange={(e) => setPost({ ...post, phone: e.target.value })}
              placeholder='Enter customer phone number'
              required
              className='input'
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="grid w-full gap-2">
            <Label htmlFor="dateofbirth">Date Of Birth</Label>
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={post.status || "Active"} onValueChange={handleStatusChange}>
              <SelectTrigger className="line-clamp-1 w-full truncate">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Active">In Active</SelectItem>
                <SelectItem value="Warranty">Warranty</SelectItem>
                <SelectItem value="Out Of Warranty">Out Of Warranty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="grid w-full gap-2">
            <Label htmlFor="area">Place</Label>
            <Input
              value={post.area}
              onChange={(e) => setPost({ ...post, area: e.target.value })}
              placeholder='Enter customer Home Address'
              required
              className='input'
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="pincode">Pin Code</Label>
            <Input
              type='tel'
              pattern='[0-9]*'
              value={post.pincode}
              onChange={(e) => setPost({ ...post, pincode: e.target.value })}
              placeholder='Enter customer pin code'
              required
              className='input'
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Customer Address</Label>
          <Textarea
            value={post.address}
            onChange={(e) => setPost({ ...post, address: e.target.value })}
            placeholder='Enter customer address'
            required
            className='form_textarea'
          />
        </div>
      

        <div className='my-4 flex justify-center gap-4'>
          <Link href='/customers' className='flex items-center rounded bg-red-400 p-1 px-4 text-sm text-primary-foreground shadow hover:bg-red-600'>
            Cancel
          </Link>
          <Button
            type='submit'
            disabled={submitting}
            className='rounded bg-primary px-5 py-1.5 text-sm text-white'
          >
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default CustomerForm;
