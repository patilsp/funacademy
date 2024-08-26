"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useSession } from "next-auth/react";


// Update the categories array to include 'link' instead of 'id'
const categories = [
    { link: "/english", title: "English", image: "/images/categories/bookabc.png" },
    { link: "/colors", title: "Colors", image: "/images/categories/art.png" },
    { link: "/shapes", title: "Shapes", image: "/images/categories/shapes.png" },
    { link: "/animals", title: "Animals", image: "/images/categories/tale.png" },
    { link: "/nature", title: "Nature", image: "/images/categories/nature.png" },
    { link: "/simple-science", title: "Simple Science", image: "/images/categories/science.png" },
    { link: "/letter", title: "Letters", image: "/images/categories/abc.png" },
    { link: "/numbers", title: "Numbers", image: "/images/categories/numbers.png" },
    { link: "/drawing", title: "Drawing", image: "/images/categories/draw.png" },
    { link: "/puzzle", title: "Puzzles", image: "/images/categories/puzzle.png" },
    { link: "/Games", title: "Simple Games", image: "/images/categories/game.png" },
    { link: "/math-quiz", title: "Quiz", image: "/images/categories/quiz.png" },
    { link: "/learning-videos", title: "Learning Videos", image: "/images/categories/book.png" },
    { link: "/stories", title: "Stories", image: "/images/categories/tale.png" },
  ];

export default function CategoryPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-200 p-2 dark:bg-black dark:text-white md:p-4">
      <div className="flex w-full flex-col items-center justify-between gap-2">
       
      <div className="mt-2">
        <Image
              src="/images/category.svg"
              alt="category"
              height="300"
              width="300"
              className="object-contain"
            />
        </div>
      
            <div className="p-0">
              {session?.user ? (
                <div className="flex justify-start gap-2">
                  <h3 className="mt-2 text-xl font-semibold">Hello, </h3>

                  <div className="flex flex-col ">
                    <h2 className="mt-2 text-xl font-bold text-orange-500">
                      {session.user.name || "Fun Kid"}
                    </h2>
                  </div>
                </div>
              ) : (
                <h1 className="text-2xl text-white">Fun Academy</h1>
              )}
            </div>

            <div className="flex justify-center">              
              <h1 className="mt-2 text-2xl font-bold">Lets be smart together</h1>
            </div>
           
        
        <div className="flex items-center">
          <input
            type="text"
            placeholder="I want to play..."
            className="w-full rounded-3xl border border-gray-300 px-8 py-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-6">
        {filteredCategories.map(category => (
          <Link key={category.title} href={category.link}>
            <div className="relative flex flex-row items-center justify-start rounded-xl bg-white p-2 shadow-lg transition-transform hover:scale-105 hover:shadow-md dark:bg-slate-950">
              <Image
                src={category.image}
                alt={category.title}
                width={100}
                height={100}
                className="object-cover"
              />
              <div className="ml-4 flex flex-col justify-start">
                <h2 className="mt-1 text-xl font-semibold text-blue-700 dark:text-white">{category.title}</h2>
                <p className="mt-1 text-sm font-semibold  dark:text-white">20 Levels </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
