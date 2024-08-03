"use client";
import Link from "next/link";
import Image from 'next/image';
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useAuth, useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york/ui/popover";
import { Calendar } from "@/registry/new-york/ui/calendar";
import { motion } from 'framer-motion';

export function DatePickerDemo({ date, setDate }) {
  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP p") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

const ComplaintForm = ({ type, complaint, setComplaint, submitting, handleSubmit }) => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const { isSignedIn } = useUser();
  const [date, setDate] = useState(complaint.visitDate ? new Date(complaint.visitDate) : new Date());

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      setComplaint((prevComplaint) => ({ ...prevComplaint, userId }));
    }
  }, [isLoaded, isSignedIn, setComplaint, userId]);

  useEffect(() => {
    if (date) {
      setComplaint((prevComplaint) => ({
        ...prevComplaint,
        visitDate: format(date, "yyyy-MM-dd HH:mm"),
      }));
    }
  }, [date, setComplaint]);

  const handleStatusChange = (value) => {
    setComplaint({ ...complaint, status: value });
  };

  const handleProductTypeChange = (value) => {
    setComplaint({ ...complaint, productType: value });
  };

  const handleServiceTypeChange = (value) => {
    setComplaint({ ...complaint, complaintType: value });
  };


  return (



    <section className="flex w-full justify-center p-1 md:px-4">
    <div className="container flex flex-col items-center justify-center gap-6 p-1 lg:flex-row lg:p-8">
      
      {/* Form Section */}
      <div className="glassmorphism w-full rounded-lg border bg-white shadow-lg dark:bg-slate-900 dark:text-white lg:w-1/2">
        <div className="py-1">
          <h1 className='head_text text-center'>
            <span className='green_gradient text-2xl font-bold'>{type} Complaint</span>
          </h1>
          <p className='py-1 text-center text-sm text-slate-600 dark:text-gray-50'>
            Create and Update Complaint here
          </p>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          className='mt-2 flex w-full flex-col gap-5 p-4'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Form Fields */}

            <div className="grid gap-2">
          <Label htmlFor="name">Complaint Name</Label>
          <Input
            value={complaint.name}
            onChange={(e) => setComplaint({ ...complaint, name: e.target.value })}
            placeholder="Enter complaint name"
            required
            className="input border-white "
          />
        </div>

        <div className="grid gap-2">
            <Label htmlFor="product">Choose Product</Label>
            <Select value={complaint.productType} defaultValue={complaint.productType || ""} onValueChange={handleProductTypeChange}>
              <SelectTrigger className="line-clamp-1 w-full truncate border-white">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-1">Product 1</SelectItem>
                <SelectItem value="product-2">Product 2</SelectItem>
                <SelectItem value="product-3">Product 3</SelectItem>
                <SelectItem value="product-4">Product 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="type">Call Service Type</Label>
            <Select value={complaint.complaintType} defaultValue={complaint.complaintType || ""} onValueChange={handleServiceTypeChange}>
              <SelectTrigger className="line-clamp-1 w-full truncate border-white">
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Installation">Installation</SelectItem>
                <SelectItem value="Service-Complaint">Service Complaint</SelectItem>
                <SelectItem value="Re-Installation">Re-Installation</SelectItem>
                <SelectItem value="Dismantle-Request">Dismantle Request</SelectItem>
                <SelectItem value="SPM-Request">SPM Request</SelectItem>
                <SelectItem value="PM-Request">PM Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              value={complaint.mobile}
              onChange={(e) => setComplaint({ ...complaint, mobile: e.target.value })}
              placeholder="Enter customer phone number"
              required
              className="input border-white"
            />
          </div>
     

      
            <div className="grid w-full gap-2">
              <Label htmlFor="visitDate">Visit Date</Label>
              <DatePickerDemo className="border border-white" date={date} setDate={setDate} />
            </div>
            <div className="grid w-full gap-2">
            <Label htmlFor="status">Product Status</Label>
            <Select  value={complaint.status} defaultValue={complaint.status || ""} onValueChange={handleStatusChange}>
              <SelectTrigger className="line-clamp-1 w-full truncate border-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="Active">Active</SelectItem> */}
                <SelectItem value="Warranty">Warranty</SelectItem>
                <SelectItem value="Out Of Warranty">Out Of Warranty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        
           </div>
            
        <div className="grid w-full gap-2">
          <Label htmlFor="address">Customer Address</Label>
          <Textarea
            value={complaint.address}
            onChange={(e) => setComplaint({ ...complaint, address: e.target.value })}
            placeholder="Enter complaint address"
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
        </motion.form>
      </div>
    </div>
  </section>
  );
};

export default ComplaintForm;
