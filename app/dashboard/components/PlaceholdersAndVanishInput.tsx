"use client";

import React from 'react'
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

function PlaceholdersAndVanishInputDemo() {

   const placeholders = [
    "What's the first rule of Fight Club?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    };
  return (
    <div>
         <div className="flex h-[40rem] flex-col items-center  justify-center px-4">
      <h2 className="mb-10 text-center text-xl text-black dark:text-white sm:mb-20 sm:text-5xl">
        Ask Dashboard UI Anything
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
      
    </div>
  )
}

export default PlaceholdersAndVanishInput
