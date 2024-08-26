"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const winners = [
  { name: 'Vishal', referrals: 5 },
  { name: 'Ojas', referrals: 5 },
  { name: 'Allen', referrals: 5 },
  { name: 'Rupa', referrals: 5 },
  { name: 'Mr', referrals: 5 },
  { name: 'Aviral', referrals: 7 },
];

const monthlyWinners = [
  { name: 'Vishal', amount: '₹5000' },
  { name: 'Yash', amount: '₹3000' },
  { name: 'Riya', amount: '₹3000' },
  { name: 'Taba', amount: '₹3000' },
  { name: 'Faizal', amount: '₹3000' },
];

const Refer = () => {
  const [referralCode, setReferralCode] = useState('FUNCODE123');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setMessage('Thank you for your submission!');
  };

  return (
    <div className="m:p-6 flex min-h-screen flex-col items-center p-2">
      {/* Banner Section */}
      <motion.div
        className="w-full max-w-4xl rounded-md border bg-white px-6 py-12 text-center shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-2xl font-extrabold text-primary">Refer Friends, Win Exciting Rewards</h1>
        <p className="mb-4 text-sm">For every successful referral you can win exciting rewards!</p>
        <div className="flex w-full justify-center gap-2">
        <Image
            src="/images/108.svg"
            className="object-contain "
            width={500}
            height={500}
            alt="logo image"            
          />
          </div>
        
        <p className="mb-4 text-2xl font-bold">Your Referral Code:</p>

        <span className="rounded border border-dotted p-6 px-2 py-1 text-blue-500">{referralCode}</span>

       
        <div className="mt-4 flex justify-center space-x-4">
          <button className="rounded bg-green-500 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-green-600">Copy</button>
          <button className="rounded bg-primary px-6 py-2 text-white shadow-md transition duration-300 ">Share</button>
        </div>
        
        {/* <button className="rounded bg-blue-700 px-4 py-2 text-white shadow-md transition duration-300 hover:bg-blue-800">Invite Friends</button> */}
      </motion.div>

     


     

    </div>
  );
};

export default Refer;
