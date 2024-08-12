"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const courses = [
  { id: 1, title: 'Healthy Habits', link: '/healthy-habits', image: '/images/quiz/1.svg' },
  { id: 2, title: 'Basic Geography', link: '/geography', image: '/images/award.png' },
  { id: 3, title: 'Emotional Intelligence', link: '/emotional-intelligence', image: '/images/award.png' },
  { id: 4, title: 'Problem Solving', link: '/problem-solving', image: '/images/award.png' },
  { id: 5, title: 'Critical Thinking', link: '/critical-thinking', image: '/images/award.png' },
  { id: 6, title: 'Technology Basics', link: '/technology-basics', image: '/images/award.png' },
  { id: 7, title: 'Storytelling', link: '/storytelling', image: '/images/award.png' },
  { id: 8, title: 'Environmental Awareness', link: '/environmental-awareness', image: '/images/award.png' },
  { id: 9, title: 'Cultural Awareness', link: '/cultural-awareness', image: '/images/award.png' },
  { id: 10, title: 'Mindfulness and Relaxation', link: '/mindfulness', image: '/images/award.png' },
];

const Course = () => {
  return (
    <div className="min-h-screen p-2">
      <h1 className="mb-8 text-center text-4xl font-extrabold">Educational Courses for Kids</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <Link href={course.link} key={course.id} passHref>
            <motion.div
              className="relative h-48 cursor-pointer overflow-hidden rounded border bg-cover bg-center shadow transition-transform duration-300 ease-in-out"
              style={{ backgroundImage: `url(${course.image})` }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <h2 className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-center text-lg font-semibold text-white">{course.title}</h2>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Course;
