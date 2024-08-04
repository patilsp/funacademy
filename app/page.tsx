"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { PulseBeams } from '@/components/PulseBeams';

export default function Home() {
  return (
    <div className="relative z-10 flex h-screen items-center justify-center overflow-hidden bg-[#fec94d] text-center text-white">
      {/* PulseBeams for larger screens */}
      <div className="absolute inset-0 hidden md:block">
        <PulseBeams />
      </div>

      {/* Content for small screens */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:hidden md:p-8">
        <h1 className="mb-20 text-4xl font-extrabold leading-tight md:text-6xl">
          Welcome to <br /><span className="text-[#ff5722]">Fun Academy</span>
        </h1>
      
        <p className="text-semibold mx-auto mb-8 max-w-md text-4xl">
          Become and <br />expert by learning <br /><span className="text-bold text-teal-700">once </span> a day  
        </p>

        <motion.div
          className="fixed bottom-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
      
          {/* <button className="group relative z-40 inline-block h-[120px] w-[320px] cursor-pointer rounded-full bg-slate-800 p-px text-xs font-semibold leading-6 text-white no-underline  shadow-2xl shadow-zinc-900">
            <div className="relative z-10 flex h-[120px] w-[320px] items-center justify-center  space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 text-center ring-1 ring-white/10 ">
              <Link href='/dashboard' className="inline-block bg-gradient-to-r from-neutral-300 via-neutral-600 to-neutral-300 bg-clip-text text-base text-transparent md:text-4xl">
                  Start Learning
              </Link>
            </div>
          </button> */}
          <div className="group relative z-40 mb-4 inline-block h-[70px] w-[290px] cursor-pointer rounded-full bg-slate-800 p-px text-xs font-semibold leading-6 text-white no-underline  shadow">
          <button class="learn-more button-login">
            <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
            </span>
            <Link href='/dashboard'>
              <span class="button-text">Start Learning</span>
            </Link>            
          </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
