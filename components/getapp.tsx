"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop,
  } from "@/utils/motion";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DiApple,DiAndroid } from "react-icons/di";

export default function GetApp() {
  return (
    

       <section className="bg2 space-y-2">
          <div className="relative h-full flex-col items-center justify-center md:grid lg:max-w-none">
          <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <div className=" m-auto flex w-full flex-col justify-center space-y-6 p-2 sm:w-[555px]">
                  <div className="flex w-full items-center justify-center">
                    <div className="mt-10 py-10 text-center">
                    <p className="font-heading text-xl font-semibold leading-[1.1] text-primary">
                        - Best Features
                    </p>
                    <h1 className="mb-10 text-3xl font-extrabold leading-tight md:text-4xl">
                        <span className="text_primary">Key Features</span> of<br className="hidden sm:inline" />
                        Our Event Booking App
                    </h1>


                      <motion.p
                        variants={slideInFromLeft(0.8)}
                        className="mb-10 max-w-[600px] text-lg text-slate-500"
                      >
                       Unlock the Future of Event Planning. Our app offers effortless booking, seamless management, and personalized recommendations. Elevate your event experience today!
                      </motion.p>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                        <div className="flex gap-4">
                            <div className="gap-4 border-r pr-4">
                                <h1 className="text_primary text-xl font-extrabold"> 5 Million+</h1>
                                <p className=""> Worldwide Active Users</p>

                            </div>
                            <div className="gap-4 border-r pr-4">
                                <h1 className="text_primary text-xl font-extrabold"> 20+</h1>
                                <p className=""> Countries</p>

                            </div>
                            <div className="gap-4 border-r pr-4">
                                <h1 className="text_primary text-xl font-extrabold"> 100K</h1>
                                <p className=""> Organizers</p>

                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

        

                </div>
              </motion.div>
            </div>
        
          </div>
          <div className="relative mt-4">
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
                 <div className="flex justify-center">                 
                    <Image
                        src="/images/getapp.png"
                        alt="demo"
                        width={800}
                        height={600}   
                        className="p-10"
                    />                 
              </div>
            </motion.div>
          </div>
        </section>

  )
}

