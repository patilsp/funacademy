"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { PulseBeams } from '@/components/PulseBeams';
import { SparklesPreview } from '@/components/sparkles-preview';



export default function Home() {
  return (
      <div className="relative z-20 h-screen bg-white dark:bg-black dark:text-white">
      
      <div className="absolute"></div>
      <div className="absolute inset-0 hidden md:block">
        <PulseBeams />
      </div>

      <div className="relative inset-0 flex flex-col items-center justify-center  text-center md:hidden">
      <h1 className="mt-20 text-center text-4xl font-bold md:text-7xl lg:text-9xl">
        Fun Academy
      </h1>
       
        <h1 className="text-bold mx-auto my-10 max-w-md text-4xl">
          Become an <br />expert by learning <br /><span className="text-bold text-[#ff5722]">once </span> a day  
        </h1>
        <div className="my-10">
        <Image
            src="/images/welcome2.jpg"
            className="size-full object-contain "
            width={500}
            height={700}
            alt="logo image"            
          />


          </div>
        <motion.div
          className="relative mb-4 mt-10 flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className=" cursor-pointer rounded-full bg-slate-800 p-px text-xs font-semibold leading-6  no-underline  shadow">
          <button className="learn-more button-login">
            <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
            </span>
            <Link href='/category'>
              <span className="button-text">Start Learning</span>
            </Link>            
          </button>

          </div>

          
        </motion.div>
        
      </div>
    </div>
  );
}
