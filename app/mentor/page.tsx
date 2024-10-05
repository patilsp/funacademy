"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { 
    ArrowUpRight,
    AlignRight,
    AlignTopLeft,
    ClipboardCopy,
    FileX,
    Signature,
    TableColumn
  } from 'lucide-react';

export default function Mentor() {
  return (
    <BentoGrid className="mx-auto my-10 max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={<img src={item.icon} alt={item.title} className="flex h-32 w-32 justify-center text-center" />}  // Replaced Skeleton with image
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

// Updated item list with image URLs
const items = [
  {
    title: "Ms. Emily",
    description: "Expert in early childhood education, focusing on interactive and engaging learning techniques for young children.",
    icon: "/images/quiz/1.svg",  // Replace with the path to your SVG or image
  },
  {
    title: "Mr. John",
    description: "Mathematics guru who makes learning numbers fun with innovative teaching methods and practical examples.",
    icon: "/images/quiz/2.svg",
  },
  {
    title: "Dr. Sara",
    description: "Science enthusiast who brings experiments and scientific concepts to life, making science exciting and understandable.",
    icon: "/images/quiz/3.svg",
  },
  {
    title: "Ms. Nina",
    description: "Language arts expert who excels in creative writing and storytelling, helping children develop their language skills.",
    icon: "/images/quiz/4.svg",
  },
  {
    title: "Mr. Alex",
    description: "Art mentor who inspires creativity through various artistic mediums, encouraging self-expression and artistic skills.",
    icon: "/images/quiz/5.svg",
  },
  {
    title: "Ms. Lily",
    description: "History specialist who engages students with fascinating stories of the past, making history relatable and intriguing.",
    icon: "/images/quiz/6.svg",
  },
  {
    title: "Mr. Tom",
    description: "Technology tutor who introduces kids to coding and digital skills through fun and interactive projects and activities.",
    icon: "/images/quiz/7.svg",
  },
];
