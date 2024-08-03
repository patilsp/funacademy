"use client";
import React from 'react';
import Link from "next/link";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function Pricing() {
    return (
        <section className="space-y-6 bg-[#f6f6f6] py-8 dark:bg-gray-900 md:py-12 lg:py-24">
            <div className="mx-auto mb-10 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h1 className="font-heading text-xl font-semibold leading-[1.1]">
                    - AMC & Plans
                </h1>
                <p className="font-heading text-3xl font-bold leading-[1.1]">
                    Choose Your AMC Plan <br />
                    <span className="text-blue-600">For Your Water Purifier</span>
                </p>
            </div>

            <div className="container grid grid-cols-1 gap-6 py-8 md:max-w-5xl md:grid-cols-3 md:py-12 lg:py-24">
                {/* Pricing Card 1 */}
                <div className="w-full md:col-span-1">
                    <div className="grid w-full items-start rounded-lg border bg-white p-10 hover:border-[#4548b9] dark:bg-gray-900">
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold sm:text-2xl">
                                $99 <span className="text-sm text-gray-500">/Year</span>
                            </h3>
                            <h3 className="text-xl font-bold sm:text-2xl">
                                Basic AMC
                            </h3>
                            <ul className="grid gap-3 text-sm text-muted-foreground">
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> 2 Free Service Call
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Filter Replacement
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Annual Check-Up
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Priority Support
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 text-center">
                            <Link href="/plans" className="rounded border px-4 py-3 hover:bg-[#4548b9] hover:text-white hover:opacity-80">
                                Choose Plan
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Pricing Card 2 */}
                <div className="w-full md:col-span-1">
                    <div className="grid w-full items-start rounded-lg border bg-[#4548b9] p-10 shadow hover:border-white dark:bg-slate-900">
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                $149 <span className="text-sm text-gray-200">/Year</span>
                            </h3>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                Standard AMC
                            </h3>
                            <ul className="grid gap-3 text-sm text-white">
                               
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Filter Replacement
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Annual Check-Up
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Priority Support
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Water Quality Testing
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 text-center">
                            <Link href="/plans" className="rounded border px-4 py-3 text-white hover:bg-[#4548b9] hover:text-white hover:opacity-80">
                                Choose Plan
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Pricing Card 3 */}
                <div className="w-full md:col-span-1">
                    <div className="grid w-full items-start rounded-lg border bg-white p-10 hover:border-[#4548b9] dark:bg-gray-900">
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold sm:text-2xl">
                                $199 <span className="text-sm text-gray-500">/Year</span>
                            </h3>
                            <h3 className="text-xl font-bold sm:text-2xl">
                                Premium AMC
                            </h3>
                            <ul className="grid gap-3 text-sm text-muted-foreground">
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Unlimited Service Calls
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Filter Replacement
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Annual Check-Up
                                </li>
                                <li className="flex items-center">
                                    <BiSolidCheckCircle className="mr-2 size-4" /> Priority Support
                                </li>
                               
                            </ul>
                        </div>
                        <div className="mt-10 flex flex-col gap-4 text-center">
                            <Link href="/plans" className="rounded border px-4 py-3 hover:bg-[#4548b9] hover:text-white hover:opacity-80">
                                Choose Plan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
