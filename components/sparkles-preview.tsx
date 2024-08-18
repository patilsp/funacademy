"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

export function SparklesPreview() {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <h1 className="relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-9xl">
        Fun Academy
      </h1>
      <div className="relative h-40 w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <h4 className="mt-10 text-bold ax-w-md mx-auto mb-10 text-4xl">
          Become an <br />expert by learning <br /><span className="text-bold text-[#ff5722]">once </span> a day  
        </h4>
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="size-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="relative inset-0 size-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
