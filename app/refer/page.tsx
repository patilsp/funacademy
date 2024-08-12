"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

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
  const [referralCode, setReferralCode] = useState('PLUSV6PTT');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setMessage('Thank you for your submission!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-purple-100 p-6 flex flex-col items-center">
      {/* Banner Section */}
      <motion.div
        className="w-full max-w-4xl bg-blue-500 text-white text-center py-12 px-6 rounded-b-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold mb-2">Refer Friends, Win Exciting Rewards</h1>
        <p className="text-lg mb-4">For every successful referral you can win exciting rewards!</p>
        <p className="text-2xl font-bold mb-4">Your Referral Code: <span className="bg-white text-blue-500 px-2 py-1 rounded">{referralCode}</span></p>
        <div className="flex justify-center space-x-4 mb-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition duration-300">Copy</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition duration-300">Share</button>
        </div>
        <p className="text-xl font-semibold mb-2">Up to ₹2,500 Vouchers for every referral of ₹2,500+</p>
        <p className="text-lg mb-4">157 learners have won laptops</p>
        <p className="text-lg mb-4">39.6K learners won rewards till now</p>
        <p className="text-lg font-bold mb-4">Rewards worth ₹3.0Cr won so far</p>
        <button className="bg-blue-700 text-white px-4 py-2 rounded shadow-md hover:bg-blue-800 transition duration-300">View Winners</button>
      </motion.div>

      {/* Rewards Section */}
      <motion.div
        className="w-full max-w-4xl bg-white p-6 mt-4 rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Your Rewards</h2>
        <p className="text-lg mb-4">Rewards will be disbursed after the first two successful referrals.</p>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-lg font-bold">₹0 Amazon voucher</div>
          <div className="text-lg font-bold">0 Month Plus subscription</div>
        </div>
      </motion.div>


     

      {/* Subscription Section */}
      <motion.div
        className="w-full max-w-4xl bg-blue-100 p-6 mt-4 rounded-lg shadow-xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Subscribe to Double Your Rewards</h2>
        <p className="text-lg mb-4">And a chance to win a branded laptop</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded shadow-md hover:bg-blue-700 transition duration-300">Get Subscription</button>
      </motion.div>
    </div>
  );
};

export default Refer;
