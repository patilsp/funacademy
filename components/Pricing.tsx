"use client";
import React from 'react';
import Link from "next/link";
import { BiSolidCheckCircle } from "react-icons/bi";
import { motion } from 'framer-motion';

export default function Pricing() {
    return (
        <section className="space-y-6 bg-[#f6f6f6] py-8 dark:bg-gray-900 md:py-6 lg:py-12">
            <div className="mx-auto mb-10 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h1 className="font-heading text-xl font-semibold leading-[1.1]">
                    - Learning Plans
                </h1>
                <p className="font-heading text-3xl font-bold leading-[1.1]">
                    Choose Your Learning Plan <br />
                    <span className="text-blue-600">For Kids</span>
                </p>
            </div>

            <div className="container grid grid-cols-1 gap-6 py-4 md:max-w-5xl md:grid-cols-3 md:py-6 lg:py-12">
                {/* Pricing Card 1 */}
                <motion.div
                    className="w-full md:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="grid w-full items-start rounded-lg border bg-white p-4 hover:border-[#4548b9] dark:bg-gray-900">
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold sm:text-2xl">
                                $49 <span className="text-sm text-gray-500">/Month</span>
                            </h3>
                            <h3 className="text-xl font-bold sm:text-2xl">
                                Basic Learning
                            </h3>
                            <ul className="grid gap-3 text-sm text-muted-foreground">
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Interactive Lessons
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Weekly Quizzes
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Monthly Progress Report
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Access to Learning Games
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 text-center">
                            <Link href="/checkout" className="rounded border px-4 py-3 hover:bg-[#4548b9] hover:text-white hover:opacity-80">
                                Choose Plan
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Card 2 */}
                <motion.div
                    className="w-full md:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="grid w-full items-start rounded-lg border bg-[#4548b9] p-4 shadow hover:border-white dark:bg-black">
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                $89 <span className="text-sm text-gray-200">/Month</span>
                            </h3>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                Standard Learning
                            </h3>
                            <ul className="grid gap-3 text-sm text-white">
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Interactive Lessons
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Weekly Quizzes
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Monthly Progress Report
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Access to Learning Games
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Live Tutoring Sessions
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 text-center">
                            <Link href="/checkout" className="rounded border px-4 py-3 text-white hover:bg-[#4548b9] hover:text-white hover:opacity-80">
                                Choose Plan
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Card 3 */}
                <motion.div
                    className="w-full md:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="grid w-full items-start rounded-lg border bg-white p-4 hover:border-[#4548b9] dark:bg-gray-900">
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold sm:text-2xl">
                                $129 <span className="text-sm text-gray-500">/Month</span>
                            </h3>
                            <h3 className="text-xl font-bold sm:text-2xl">
                                Premium Learning
                            </h3>
                            <ul className="grid gap-3 text-sm text-muted-foreground">
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Unlimited Interactive Lessons
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Weekly Quizzes
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Monthly Progress Report
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Access to Learning Games
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Live Tutoring Sessions
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-6 fill-[#ffc854]" /> Personalized Learning Path
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 text-center">
                            <Link href="/checkout" className="rounded border px-4 py-3 hover:bg-[#4548b9] hover:text-white hover:opacity-80">
                                Choose Plan
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
