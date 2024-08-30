"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"

const categories = [
  
  { link: "/letter", title: "Letters", image: "/images/categories/abc.png" },
  { link: "/numbers", title: "Numbers", image: "/images/categories/numbers.png" }, 
  { link: "/english", title: "English", image: "/images/categories/bookabc.png" },
  { link: "/mathematics", title: "Mathematics", image: "/images/categories/numbers.png" },
  { link: "/colors", title: "Colors", image: "/images/categories/art.png" },
  { link: "/shapes", title: "Shapes", image: "/images/categories/shapes.png" },
  { link: "/animals", title: "Animals", image: "/images/categories/tale.png" },
  { link: "/nature", title: "Nature", image: "/images/categories/nature.png" },
  { link: "/iq", title: "IQ", image: "/images/categories/science.png" }, 
  { link: "/drawing", title: "Drawing", image: "/images/categories/draw.png" },
  { link: "/puzzle", title: "Puzzles", image: "/images/categories/puzzle.png" },
  { link: "/Games", title: "Games", image: "/images/categories/game.png" },
  { link: "/math-quiz", title: "Quiz", image: "/images/categories/quiz.png" },
  { link: "/learning-videos", title: "Learning Videos", image: "/images/categories/book.png" },
  { link: "/stories", title: "Stories", image: "/images/categories/tale.png" },
 
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="my-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center sm:text-right"
          >
            <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Lets be smart together!</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
          <Input
            type="text"
            placeholder="I want to learn about..."
            className="h-10 w-full rounded bg-white shadow-lg focus:outline-none dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
        </div>
      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={category.link}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800">
                    <div className="flex items-center">
                      <Image
                        src={category.image}
                        alt={category.title}
                        width={80}
                        height={80}
                        className="object-cover transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{category.title}</h2>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">20 Fun Levels</p>
                        
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
