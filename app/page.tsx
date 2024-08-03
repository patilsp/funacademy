"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/home-banner.jpg')" }}>
      {/* Overlay */}
      <div className="absolute"></div>
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
        {/* Welcome Text */}
        {/* <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4 mt-20 text-4xl font-bold leading-tight md:text-5xl"
        >
          Welcome to <br /> FunAcademy
        </motion.h1> */}


        <div class="stage">
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-8  mt-10 text-lg md:text-xl"
        >
          Discover a world of exciting courses <br /> and learn new skills with us.
        </motion.p>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link href="/sign-in" className="rounded-lg border bg-slate-200 px-6 py-3 text-lg font-semibold text-blue-600">
           
              Get Started
           
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
