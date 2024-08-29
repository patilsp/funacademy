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
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex size-full min-h-24 flex-1 rounded-xl border bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);
const items = [
  {
    title: "Ms. Emily",
    description: "Expert in early childhood education, focusing on interactive and engaging learning techniques for young children.",
    header: <Skeleton />,
  },
  {
    title: "Mr. John",
    description: "Mathematics guru who makes learning numbers fun with innovative teaching methods and practical examples.",
    header: <Skeleton />,
  },
  {
    title: "Dr. Sara",
    description: "Science enthusiast who brings experiments and scientific concepts to life, making science exciting and understandable.",
    header: <Skeleton />,
  },
  {
    title: "Ms. Nina",
    description: "Language arts expert who excels in creative writing and storytelling, helping children develop their language skills.",
    header: <Skeleton />,
  },
  {
    title: "Mr. Alex",
    description: "Art mentor who inspires creativity through various artistic mediums, encouraging self-expression and artistic skills.",
    header: <Skeleton />,
  },
  {
    title: "Ms. Lily",
    description: "History specialist who engages students with fascinating stories of the past, making history relatable and intriguing.",
    header: <Skeleton />,
  },
  {
    title: "Mr. Tom",
    description: "Technology tutor who introduces kids to coding and digital skills through fun and interactive projects and activities.",
    header: <Skeleton />,
  },
];
