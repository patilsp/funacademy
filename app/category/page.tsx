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
    <div className="bg-green-200 min-h-screen p-2 md:p-4">
      <div className="flex flex-col w-full items-center justify-between gap-2">
       
            <div className="p-0">
            {session?.user ? (
              <div className="flex justify-start gap-2">
                <h3 className="mt-2 text-xl font-semibold">Hello, </h3>

                <div className="flex flex-col ">
                  <h2 className="text-xl font-bold text-orange-500 mt-2">
                    {session.user.name || "Fun Kid"}
                  </h2>
                </div>
              </div>
            ) : (
              <h1 className="text-white text-2xl">Fun Academy</h1>
            )}


            </div>

            <div className="flex justify-center">              
              <h1 className="mt-2 text-2xl font-bold">Lets be smart together</h1>
            </div>
            <div className="mt-2">
                <Image
                    src="/images/category.svg"
                    alt="category"
                    height="300"
                    width="300"
                    className="object-contain"
                  />


              </div>
        
        <div className="flex items-center">
          <input
            type="text"
            placeholder="I want to play..."
            className="w-full rounded-3xl border border-gray-300 px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="my-10 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
        {filteredCategories.map(category => (
          <Link key={category.title} href={category.link}>
            <div className="relative flex flex-col items-center justify-center rounded-3xl bg-white dark:bg-slate-950 p-2 shadow-lg transition-transform hover:scale-105 hover:shadow-md">
              <Image
                src={category.image}
                alt={category.title}
                width={100}
                height={100}
                className="object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold text-blue-700 dark:text-white">{category.title}</h2>
              <p className="mt-1 text-sm font-semibold  dark:text-white">20 Levels </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
