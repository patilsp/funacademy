"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { LogIn, User, MapPin, Bookmark } from 'lucide-react';

export default function Guide() {
    return (
        <section className="space-y-8 dark:text-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pt-8 text-center"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4">
                    <h1 className="text-2xl font-bold leading-tight">
                        How It Works
                    </h1>
                    <h2 className="text-3xl font-semibold leading-tight">
                        <span className="text-highlight">A Step-By-Step Guide</span>
                    </h2>
                </div>
            </motion.div>

            <div className="space-y-8">
                <div className="relative flex flex-col items-center justify-center py-16 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex flex-col space-y-8 p-4 sm:w-[555px]"
                    >
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-slate-900"
                        >
                            <div className="flex size-12 items-center justify-center rounded-full">
                                <LogIn className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Sign Up</h3>
                                <p>Register to create an account and get started with Funacademy.</p>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex gap-4 rounded-lg bg-white p-6 shadow-md"
                        >
                            <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                                <User className="text-highlight" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Create Profile</h3>
                                <p>Fill out your profile information to personalize your experience.</p>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex gap-4 rounded-lg bg-white p-6 shadow-md"
                        >
                            <div className="flex size-12 items-center justify-center rounded-full">
                                <MapPin className="text-highlight" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Find Nearby Classes</h3>
                                <p>Search for classes and events in your area to join the Funacademy community.</p>
                            </div>
                        </motion.div>

                        {/* Step 4 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex gap-4 p-6 bg-white rounded-lg shadow-md dark:bg-funacademy-dark"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-funacademy-quaternary rounded-full">
                                <Bookmark className="text-funacademy-highlight" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Book a Class</h3>
                                <p>Enroll in your chosen classes and start learning with Funacademy.</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative mt-8 lg:flex lg:justify-center"
                    >
                        <div className="flex max-w-xl">
                            <Image
                                src="/images/7773496.jpg"
                                width={900}
                                height={900}
                                alt="funacademy guide"
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
