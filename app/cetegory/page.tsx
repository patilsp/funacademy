"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

// Update the categories array to include 'link' instead of 'id'
const categories = [
    { link: "/category/english", title: "English", image: "/images/categories/bookabc.png" },
    { link: "/category/colors", title: "Colors", image: "/images/categories/art.png" },
    { link: "/category/shapes", title: "Shapes", image: "/images/categories/shapes.png" },
    { link: "/category/animals", title: "Animals", image: "/images/categories/tale.png" },
    { link: "/category/nature", title: "Nature", image: "/images/categories/nature.png" },
    { link: "/category/simple-science", title: "Simple Science", image: "/images/categories/science.png" },
    { link: "/category/letters", title: "Letters", image: "/images/categories/abc.png" },
    { link: "/category/numbers", title: "Numbers", image: "/images/categories/numbers.png" },
    { link: "/category/colors", title: "Colors", image: "/images/categories/colors.png" },
    { link: "/category/shapes", title: "Shapes", image: "/images/categories/shapes.png" },
    { link: "/category/drawing", title: "Drawing", image: "/images/categories/draw.png" },
    { link: "/category/puzzle", title: "Puzzles", image: "/images/categories/puzzle.png" },
    { link: "/category/Games", title: "Simple Games", image: "/images/categories/game.png" },
    { link: "/category/math-quiz", title: "Quiz", image: "/images/categories/quiz.png" },
    { link: "/category/learning-videos", title: "Learning Videos", image: "/images/categories/book.png" }
  ];

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-10 min-h-screen p-2 md:p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <Link href="/" className="flex gap-2"> 
          <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow"/> 
          <h1 className="text-xl font-bold text-orange-500">Categories</h1>
        </Link>
        
        <div className="flex items-end">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full rounded border border-gray-300 px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="my-10 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
        {filteredCategories.map(category => (
          <Link key={category.title} href={category.link}>
            <div className="relative flex flex-col items-center justify-center rounded-lg border bg-white p-2 shadow transition-transform hover:scale-105 hover:shadow-md">
              <Image
                src={category.image}
                alt={category.title}
                width={70}
                height={70}
                className="object-cover"
              />
              <h2 className="mt-4 text-lg font-semibold text-blue-700">{category.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
