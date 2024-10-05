"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { BiSolidCheckCircle } from "react-icons/bi";
import { motion } from 'framer-motion';

const pricingData = [
  {
    title: "Basic Learning",
    monthlyPrice: 49,
    yearlyPrice: 539,
    features: [
      "Interactive Lessons",
      "Weekly Quizzes",
      "Monthly Progress Report",
      "Access to Learning Games",
      "Live Tutoring Sessions",
      "Personalized Learning Path"
    ]
  },
  {
    title: "Standard Learning",
    monthlyPrice: 89,
    yearlyPrice: 979,
    features: [
      "Interactive Lessons",
      "Weekly Quizzes",
      "Monthly Progress Report",
      "Access to Learning Games",
      "Live Tutoring Sessions",
      "Personalized Learning Path"
    ]
  },
  {
    title: "Premium Learning",
    monthlyPrice: 129,
    yearlyPrice: 1419,
    features: [
      "Unlimited Interactive Lessons",
      "Weekly Quizzes",
      "Monthly Progress Report",
      "Access to Learning Games",
      "Live Tutoring Sessions",
      "Personalized Learning Path"
    ]
  }
];

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section className="space-y-6 bg-[#f6f6f6] py-8 dark:bg-black md:py-6 lg:py-12">
            <div className="mx-auto mb-10 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h1 className="font-heading text-xl font-semibold leading-[1.1]">
                    - Learning Plans
                </h1>
                <p className="font-heading text-3xl font-bold leading-[1.1]">
                    Choose Your Learning Plan <br />
                    <span className="text-blue-600">For Kids</span>
                </p>
            </div>

            <div className="mb-8 flex justify-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`rounded-l-lg px-4 py-2 text-sm font-medium ${
                            !isYearly ? 'bg-[#4548b9] text-white' : 'bg-white text-gray-900'
                        }`}
                        onClick={() => setIsYearly(false)}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        className={`rounded-r-lg px-4 py-2 text-sm font-medium ${
                            isYearly ? 'bg-[#4548b9] text-white' : 'bg-white text-gray-900'
                        }`}
                        onClick={() => setIsYearly(true)}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="container grid grid-cols-1 gap-6 py-4 md:max-w-5xl md:grid-cols-3 md:py-6 lg:py-12">
                {pricingData.map((plan, index) => (
                    <motion.div
                        key={index}
                        className="w-full md:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    >
                        <div className={`grid w-full items-start rounded-lg border p-4 ${
                            index === 1 ? 'bg-[#4548b9] text-white' : 'bg-white hover:border-[#4548b9] dark:bg-gray-900'
                        }`}>
                            <div className="grid gap-6">
                                <h3 className="text-xl font-bold sm:text-2xl">
                                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}{' '}
                                    <span className={`text-sm ${index === 1 ? 'text-gray-200' : 'text-gray-500'}`}>
                                        /{isYearly ? 'Year' : 'Month'}
                                    </span>
                                </h3>
                                <h3 className="text-xl font-bold sm:text-2xl">
                                    {plan.title}
                                </h3>
                                <ul className={`grid gap-3 text-sm ${index === 1 ? 'text-white' : 'text-muted-foreground'}`}>
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 flex flex-col gap-4 text-center">
                                <Link href="/checkout" className={`rounded border px-4 py-3 ${
                                    index === 1 
                                    ? 'text-white hover:bg-white hover:text-[#4548b9]' 
                                    : 'hover:bg-[#4548b9] hover:text-white'
                                } hover:opacity-80`}>
                                    Choose Plan
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}