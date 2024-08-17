"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft , ArrowRight} from 'lucide-react';

const animals = [
  {
    name: "Lion",
    description: "The king of the jungle, known for its majestic mane.",
    src: "/images/animals/tiger.jpg",
  },
  {
    name: "Elephant",
    description: "The largest land animal, known for its trunk and tusks.",
    src: "/images/animals/elephant.jpg",
  },
  {
    name: "Zebra",
    description: "The tallest animal, known for its long neck and legs.",
    src: "/images/animals/zebra.jpg",
  },
  // Add more animals as needed
];

export default function AnimalPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : animals.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < animals.length - 1 ? prevIndex + 1 : 0));
  };

  const currentAnimal = animals[currentIndex];

  return (
    <div className="mx-auto max-w-2xl p-4">
       <div className="mb-4 flex w-full items-center justify-between gap-2">
        <Link href="/category" className="flex gap-2"> 
          <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow"/> 
          <h1 className="mt-1 text-xl font-bold text-orange-500">Animals</h1>
        </Link>
      </div>


      <motion.div
        className="rounded bg-white p-6 shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          src={currentAnimal.src}
          alt={currentAnimal.name}
          width={700}
          height={700}
          className="h-60 w-full rounded-xl object-contain"
        />
        <h2 className="my-10 text-center text-4xl font-bold">{currentAnimal.name}</h2>
        {/* <p className="mt-2 text-gray-600">{currentAnimal.description}</p> */}
      </motion.div>

      <div className="mt-6 flex w-full justify-center">
        {/* <button
          onClick={handleBack}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Next
        </button> */}


            <div className="flex items-center justify-between">
                <button  onClick={handleBack} className="button-3d">
                    <div className="button-top"><ArrowLeft /> Back </div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
                <button onClick={handleNext} className="button-3d">
                    <div className="button-top">Next <ArrowRight /></div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
            </div>

      </div>
    </div>
  );
}
