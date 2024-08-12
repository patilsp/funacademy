"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { PulseBeams } from '@/components/PulseBeams';

function welcome() {
  return (
    <div>
        <div className="relative z-20 h-screen bg-white dark:bg-black  dark:text-white">
      {/* Overlay */}
      <div className="absolute"></div>
      <div className="absolute inset-0 hidden md:block">
        <PulseBeams />
      </div>

      {/* Content for small screens */}
      <div className="absolute inset-0 -mt-52 flex flex-col items-center justify-center text-center md:hidden">
        <h1 className="mb-20 text-4xl font-extrabold leading-tight md:text-6xl">
          Welcome to <br /><span className="text-[#ff5722]">Fun Academy</span>
        </h1>
      
        <h4 className="text-bold mx-auto mb-8 max-w-md text-4xl">
          Become an <br />expert by learning <br /><span className="text-bold text-[#ff5722]">once </span> a day  
        </h4>

        <Link href="/">
          <Image
            src="/images/banner.svg"
            className="size-full object-contain "
            width={400}
            height={400}
            alt="logo image"            
          />
        </Link>

        <motion.div
          className="fixed bottom-1 flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
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
    </div>
  )
}

export default welcome
