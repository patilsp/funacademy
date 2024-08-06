"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomerForm from "@/components/CustomerForm";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const CreateCustomer = () => {
  
  const router = useRouter();
 

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ name: "", email: "", address:"", phone: "", status:"", dateofbirth:"", area:"", pincode:"" });

  const createCustomer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    try {
      const response = await fetch("/api/customer/new", {
        method: "POST",
        body: JSON.stringify({
          userId: post.userId,
          name: post.name,
          email: post.email,
          address: post.address,
          phone: post.phone,
          status: post.status,
          dateofbirth:post.dateofbirth,
          area:post.area,
          pincode:post.pincode,
        }),
      });

      if (response.ok) {       
        toast.success("Customer has been created! 🔥");
        router.push("/customers");
      }
      
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerForm
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createCustomer}
    />
  );
};

export default CreateCustomer;
