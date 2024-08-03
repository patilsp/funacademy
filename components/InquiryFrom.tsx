"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";

const InquiryForm = ({ type, inquiry, setInquiry, submitting, handleSubmit }) => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const { isSignedIn } = useUser();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      handleSubmit(); 
      const response = await fetch("/api/inquiry/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: inquiry.mobile,
          note: inquiry.note,
          inquiryType: inquiry.inquiryType,
          model: inquiry.model,
          username: inquiry.username,
          name:inquiry.username,
        }),
      });

      if (response.ok) {
        toast.success("Inquiry has been registered successfully! 🔥");
        router.push("/");
        setInquiry({
          mobile: "",
          inquiryType: "",
          note: "",
          model: "",
          username:"",
          name:"",
        });
      } else {
        toast.error("Failed to register Inquiry.");
      }
    } catch (error) {
      console.error("An error occurred while submitting Inquiry:", error);
    }
  };

  return (
    <section className='flex w-full max-w-full flex-col items-center justify-center px-4'>
     
      <form
        onSubmit={handleFormSubmit}
        className='flex w-full max-w-2xl flex-col gap-3 rounded-lg border border-gray-200 p-8'
      >
        <div className="grid gap-2">
          <Label htmlFor="type">Service Type</Label>
          <Select
            value={inquiry.inquiryType}
            onValueChange={(value) => setInquiry({ ...inquiry, inquiryType: value })}
            className='input'
            required
            default='Send Inquiry'
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Service">Service Issue</SelectItem>
              <SelectItem value="Repair">Repair</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Inquiry">Send Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            value={inquiry.username}
            onChange={(e) => setInquiry({ ...inquiry, username: e.target.value })}
            placeholder='Enter customer Name'            
            className='input'
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            value={inquiry.mobile}
            onChange={(e) => setInquiry({ ...inquiry, mobile: e.target.value })}
            placeholder='Enter customer phone number'
            required
            className='input'
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="Model">Model Number</Label>
          <Input
            value={inquiry.model}
            onChange={(e) => setInquiry({ ...inquiry, model: e.target.value })}
            placeholder='Enter Model Number'
            required
            className='input'
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="note">Description</Label>
          <Textarea
            value={inquiry.note}
            onChange={(e) => setInquiry({ ...inquiry, note: e.target.value })}
            placeholder='Enter inquiry note'
            required
            className='form_textarea'
          />
        </div>

        <div className='mx-3 flex justify-center gap-4 pt-2'>
          <Button
            type='submit'
            disabled={submitting}
            className='rounded bg-primary px-5 py-1.5 text-sm text-white'
          >
            {submitting ? 'Submitting...' : 'Request A Call Back'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InquiryForm;
