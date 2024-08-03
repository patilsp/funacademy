"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const storyDetails = {
  1: { title: "Story One", image: "/images/award.png", content: "This is the full content of story one. It provides detailed information and description about the story." },
  2: { title: "Story Two", image: "/images/counting.png", content: "This is the full content of story two. It provides detailed information and description about the story." },
  3: { title: "Story Three", image: "/images/defence.png", content: "This is the full content of story three. It provides detailed information and description about the story." },
};

export default function StoryDetail({ params }) {
  const { id } = params;
  const story = storyDetails[id];

  if (!story) {
    return <p>Story not found.</p>;
  }

  return (
    <div className="flex min-h-screen flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center md:flex-row"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-4"
        >
          <img src={story.image} alt={story.title} className="h-auto w-full max-w-md rounded-lg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-4"
        >
          <h1 className="mb-4 text-3xl font-bold">{story.title}</h1>
          <p className="text-gray-700">{story.content}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
