
"use client"

import React from 'react';
import Link from 'next/link';

import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import { Textarea } from "@/registry/new-york/ui/textarea"

const UserProfileForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='flex-center mb-5 w-full max-w-full flex-col'>
      <h1 className='head_text text-center'>
        <span className='fs-36 green_gradient'>{type} Customer</span>
      </h1>
      {/* <p className='desc max-w-md text-center'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p> */}
        
      <form
        onSubmit={handleSubmit}
        className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7 dark:bg-slate-900 dark:text-white md:w-1/2'
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder='Enter customer Name'
            required
            className='input '
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email ID</Label>
          <Input
            value={post.email}
            onChange={(e) => setPost({ ...post, email: e.target.value })}
            placeholder='Enter customer email id'
            required
            className='input'
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            value={post.phone}
            onChange={(e) => setPost({ ...post, phone: e.target.value })}
            placeholder='Enter customer phone number'
            required
            className='input'
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Address</Label>
          <Textarea
            value={post.address}
            onChange={(e) => setPost({ ...post, address: e.target.value })}
            placeholder='Enter customer address'
            required
            className='form_textarea '
          />
        </div>

      <div className="flex gap-10">
        <div className="grid gap-2">
          <Label htmlFor="description">Date Of Birth</Label>
          <Input
            value={post.dateofbirth}
            onChange={(e) => setPost({ ...post, dateofbirth: e.target.value })}
            placeholder='Enter Date of Birth'
            required
            className='input '
          />
        </div>

        <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="1">
              <SelectTrigger
               value={post.status}
               onChange={(e) => setPost({ ...post, status: e.target.value })}
               className="line-clamp-1 w-[160px] truncate"
              >
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="2">In Active</SelectItem>
                <SelectItem value="3">Out Of Warranty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex-end mx-3 mb-5 mt-3 gap-4'>
          <Link href='/customers' className='text-sm text-gray-500'>
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
};

export default UserProfileForm;

