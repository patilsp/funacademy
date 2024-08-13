"use client";
import Link from "next/link";
import Image from 'next/image';
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';


const ComplaintForm = ({ type, complaint, setComplaint, submitting, handleSubmit }) => {
  const router = useRouter();

  const handleStatusChange = (value) => {
    setComplaint({ ...complaint, status: value });
  };


  return (



    <section className="flex w-full justify-center p-1 md:px-4">
    <div className="container flex flex-col items-center justify-center gap-6 p-1 lg:flex-row lg:p-8">
      
      {/* Form Section */}
      <div className="glassmorphism w-full rounded-lg border bg-white shadow-lg dark:bg-black dark:text-white lg:w-1/2">
        <div className="py-1">
          <h1 className='head_text text-center'>
            <span className='green_gradient text-2xl font-bold'>{type} Issue</span>
          </h1>
          {/* <p className='py-1 text-center text-sm text-slate-600 dark:text-gray-50'>
            Create and Update Issue here
          </p> */}
        </div>
        <motion.form
          onSubmit={handleSubmit}
          className='mt-2 flex w-full flex-col gap-5 p-4'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-4">
           

            <div className="grid w-full gap-2">
              <Label htmlFor="status">Issue Type</Label>
              <Select  value={complaint.status} defaultValue={complaint.status || ""} onValueChange={handleStatusChange}>
                <SelectTrigger className="line-clamp-1 w-full truncate border-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Issue">Issue</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
        
        
            
        <div className="grid w-full gap-2">
          <Label htmlFor="address">User Issue</Label>
          <Textarea
            value={complaint.name}
            onChange={(e) => setComplaint({ ...complaint, name: e.target.value })}
            placeholder="Type your issue here ..."
            required
            className="form_textarea border-white"
          />
        </div>
        <input type="hidden" name="hiddenAssignUser" value="Admin" />

          <div className='mt-6 flex justify-center gap-4'>
            <Link href='/complains' className='flex items-center rounded bg-red-400 p-1 px-4 text-sm text-primary-foreground shadow hover:bg-red-600'>
              Cancel
            </Link>

            <Button
              type='submit'
              disabled={submitting}
              className='rounded bg-primary px-5 py-2 text-sm text-white dark:text-black'
            >
              {submitting ? `${type}ing...` : type}
            </Button>
          </div>
          </div>
        </motion.form>
      </div>
    </div>
  </section>
  );
};

export default ComplaintForm;
