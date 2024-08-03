"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Users, Lightbulb, Laptop, Settings } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-8 dark:bg-gray-900 md:py-12 lg:py-24">
      <div className="container space-y-6 py-8 dark:bg-gray-900 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold leading-[1.1] dark:text-white  md:text-6xl">
            Discover FunAcademy
          </h1>
          <p className="leading-normal dark:text-white sm:text-lg sm:leading-7">
            Explore our comprehensive and engaging educational features designed to make learning fun and effective for everyone.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-lg hover:border-yellow-500">
            <div className="flex flex-row items-start justify-between gap-4 rounded-md p-2">
              <BookOpen className="size-16 fill-current text-blue-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Diverse Courses</h3>
                <p className="text-sm text-gray-700">
                  Access a wide range of courses designed to enhance knowledge and skills in various subjects.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-lg hover:border-yellow-500">
            <div className="flex flex-row items-start justify-between gap-4 rounded-md p-2">
              <Star className="size-16 fill-current text-yellow-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Top Instructors</h3>
                <p className="text-sm text-gray-700">
                  Learn from industry experts and experienced educators who are passionate about teaching.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-lg hover:border-yellow-500">
            <div className="flex flex-row items-start justify-between gap-4 rounded-md p-2">
              <Users className="size-16 fill-current text-green-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Interactive Learning</h3>
                <p className="text-sm text-gray-700">
                  Engage in interactive sessions and discussions with fellow learners to enhance understanding.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-lg hover:border-yellow-500">
            <div className="flex flex-row items-start justify-between gap-4 rounded-md p-2">
              <Lightbulb className="size-16 fill-current text-orange-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Innovative Tools</h3>
                <p className="text-sm text-gray-700">
                  Utilize cutting-edge tools and resources to make learning more engaging and effective.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-lg hover:border-yellow-500">
            <div className="flex flex-row items-start justify-between gap-4 rounded-md p-2">
              <Laptop className="size-16 fill-current text-teal-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Flexible Learning</h3>
                <p className="text-sm text-gray-700">
                  Access courses anytime, anywhere with our user-friendly online platform.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-lg hover:border-yellow-500">
            <div className="flex flex-row items-start justify-between gap-4 rounded-md p-2">
              <BookOpen className="size-16 fill-current text-blue-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Personalized Learning</h3>
                <p className="text-sm text-gray-700">
                  Customize your learning path based on your interests and goals.
                </p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
}
