"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setStatus("Thank you for reaching out! We will get back to you soon.");
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-800 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Banner Section */}
      <div className="relative h-96 w-full bg-cover bg-center p-2" style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-700 p-2">
          <motion.h1
            className="mb-2 text-center text-4xl font-bold text-white"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="p-2 text-center text-lg text-white"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            We are here to assist you with any inquiries or issues. Please fill out the form below.
          </motion.p>
        </div>
      </div>
   

      {/* Contact Form Section */}
      <div className="mt-10 flex w-full max-w-7xl flex-col items-center justify-center p-6 md:flex-row">
        {/* Form Section */}
        
        <motion.div
          className="w-full rounded bg-white p-6 shadow dark:bg-gray-700 md:w-1/2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:border-blue-500 dark:border-gray-600"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:border-blue-500 dark:border-gray-600"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="rounded-lg border-gray-300 focus:border-blue-500 dark:border-gray-600"
            />
            <Button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-white transition duration-300 hover:bg-blue-700"
            >
              Send Message
            </Button>
          </form>
          {status && (
            <motion.p
              className="mt-4 text-green-600 dark:text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {status}
            </motion.p>
          )}
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="hidden w-full p-6 md:block md:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/image1.png"
            alt="Water Purifier"
            layout="responsive"
            width={500}
            height={400}
            className="rounded border shadow"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUs;




