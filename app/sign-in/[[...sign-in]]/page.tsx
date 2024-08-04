"use client";
import React from 'react';
import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';
import { motion } from "framer-motion"

const SignInPage = () => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center py-5" style={{ backgroundImage: 'url(/images/banner1.jpg)' }}>
      <div className="absolute inset-0  opacity-50"></div>
      <div className="relative z-10 flex size-full items-center justify-center">
        <div className="container flex justify-center text-center">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeOut" }}
          >
          <SignIn />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
