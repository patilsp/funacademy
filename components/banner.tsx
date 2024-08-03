"use client";

import Image from "next/image";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import InquiryForm from "@/components/InquiryFrom";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";

import bannerImage from '../public/images/banner.webp';
import zerobImage from '../public/icons/zerob.webp';
import eurekaImage from '../public/icons/eureka.webp';
import { ShieldCheck, ThumbsUp, Settings, ArrowRight, Users } from "lucide-react";

export default function Banner() {
  const [submitting, setIsSubmitting] = useState(false);
  const [inquiry, setInquiry] = useState({
    username: "",
    mobile: "",
    note: "",
    complaintType: "",
    model: "",
    name:"",
  });
  const [open, setOpen] = useState(false);

  const createInquiry = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Inquiry has been registered successfully! 🔥");
        setInquiry({
          username: "",
          mobile: "",
          note: "",
          model:"",
          inquiryType:"",
          name:"",
        });
        setTimeout(() => setOpen(false), 2000);
      } else {
        console.error("Failed to register inquiry.");
      }
    } catch (error) {
      console.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-0 pt-8 md:pt-5">
      <div className="container px-4">
        <div className="md:flex md:items-center">
          <div className="md:w-[478px]">
            <div className="inline-flex rounded border border-[#222]/10 bg-slate-200 px-3 py-1 text-sm tracking-tighter dark:bg-slate-600">
              - Your Premier Educational Partner
            </div>
            <h1 className="text-shadow mt-6 bg-gradient-to-b from-black to-[#0044CC] bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
              Fun and <span className="text-primary1">Interactive Learning</span> <br className="hidden sm:inline" />
              <span className="text-primary1">For Kids</span>
            </h1>
            <motion.p
              variants={slideInFromLeft(0.8)}
              className="mt-4 max-w-2xl text-sm leading-normal text-slate-700 sm:text-xl sm:leading-8"
            >
              Discover a world of fun with our interactive games, captivating stories, and engaging animations. Designed for children aged 1 to 7, FunAcademy makes learning an adventure!
            </motion.p>
            <div className="mt-7 flex gap-2 md:flex-row">
              <div className="flex items-center justify-center py-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Get Started</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl">
                    <h4 className="mb-8 text-left text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
                      <span className="text-center transition duration-500 group-hover:translate-x-40">
                        Explore the Best 
                      </span><span className="text-indigo-500">Educational Games & Stories</span>
                    </h4>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col md:flex-row">
                        <div className="items-start">
                          <Image
                            src={bannerImage}
                            alt="Banner"
                            layout="responsive"
                            width={460}
                            height={460}
                            className="rounded-md object-cover"
                          />
                        </div>
                        
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Button className="btn btn-text mt-2 flex items-center gap-1 bg-transparent text-black hover:text-white">
                <span>Explore More</span>
                <ArrowRight alt="arrow image" width={20} height={20} className="size-4" />
              </Button>
            </div>
          </div>
          <div className="relative mt-20 md:mt-0 md:h-[648px] md:flex-1">
            <div className="relative mt-10 md:mt-0 md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center justify-center md:justify-end"
              >
                <div className="relative sm:mt-0 md:mt-7 md:h-[548px] md:flex-1">
                  <Image
                    src="/images/image-7.png"
                    alt="Educational Banner"
                    height={300}
                    width={300}
                    objectFit="contain"
                    className="h-full w-auto max-w-none md:absolute md:p-20"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>  
      </div>
      <div className="container px-4">
        <div className="p-2 md:p-6">
          <div className="container mt-5">              
            <div className="relative flex justify-center overflow-hidden">
              <div className="animate-marquee flex flex-nowrap gap-14">
                <Image
                  src={zerobImage}
                  width={50}
                  height={50}
                  alt="brand image"
                  className="h-7 w-auto px-4"
                />
                <Image
                  src="/icons/icon2.jpg"
                  width={50}
                  height={50}
                  alt="brand image"
                  className="h-7 w-auto px-4"
                />
                <Image
                  src={eurekaImage}
                  width={50}
                  height={50}
                  alt="brand image"
                  className="h-7 w-auto px-4"
                />
                <Image
                  src="/icons/icon2.svg"
                  width={50}
                  height={50}
                  alt="brand image"
                  className="h-7 w-auto px-4"
                />
              </div>
            </div>
          </div>
          <div className="container-fluid mt-10">
            <div className="flex flex-col items-center justify-center rounded-lg p-0 md:flex-row md:p-8">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="relative overflow-hidden rounded-lg border-white bg-[#4548b9] p-2 hover:border-[#4548b9] hover:shadow-lg">
                  <div className="flex flex-row items-center gap-2 rounded-md p-0 md:p-4">
                    <ShieldCheck className="size-8 text-white"/>
                    <div className="space-y-2">
                      <h1 className="text-sm font-bold text-white">
                        Trusted by <br /> Thousands of Kids
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-white bg-[#4548b9] p-2 hover:border-[#0000ff] hover:shadow-lg">
                  <div className="flex flex-row items-center gap-2 rounded-md p-0 md:p-4">
                    <Settings className="size-8 text-white"/>
                    <div className="space-y-2">
                      <h1 className="text-sm font-bold text-white">
                        Fun Learning <br /> Anytime, Anywhere
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-white bg-[#4548b9] p-2 hover:border-[#0000ff] hover:shadow-lg">
                  <div className="flex flex-row items-center gap-2 rounded-md p-0 md:p-4">
                    <ThumbsUp className="size-8 text-white"/>
                    <div className="space-y-2">
                      <h1 className="text-sm font-bold text-white">
                        Engaging Content <br /> for Young Minds
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-white bg-[#4548b9] p-2 hover:border-[#0000ff] hover:shadow-lg">
                  <div className="flex flex-row items-center gap-2 rounded-md p-0 md:p-4">
                    <Users className="size-8 text-white"/>
                    <div className="space-y-2">
                      <h1 className="text-sm font-bold text-white">
                        Safe and <br /> Interactive Learning
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  
  );
}
