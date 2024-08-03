"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { PulseBeams } from '@/components/PulseBeams';

export default function Home() {
  return (
 
      <div className=" text-center text-white">
        
        <PulseBeams />
      </div>
    
  );
}
