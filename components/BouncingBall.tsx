"use client";

import { motion } from "framer-motion";

const BouncingBall = () => {
  return (
    <motion.div
      className="size-16 rounded-full bg-blue-500"
      animate={{
        y: [0, -100, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

export default BouncingBall;
