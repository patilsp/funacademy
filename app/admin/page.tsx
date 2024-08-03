"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  ArrowLeftCircle,
  Home,
  User,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";



const stories = [
  { id: 1, title: "Story One", image: "/images/award.png", snippet: "This is a short snippet of story one." },
  { id: 2, title: "Story Two", image: "/images/counting.png", snippet: "This is a short snippet of story two." },
  { id: 3, title: "Story Three", image: "/images/defence.png", snippet: "This is a short snippet of story three." },
];


const AdminPage: React.FC = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/dasboard",
      icon: (
        <Home className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/forms",
      icon: (
        <Settings className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Products",
      href: "/products",
      icon: (
        <ArrowLeftCircle className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex size-full flex-1 flex-col overflow-hidden rounded-md dark:border-neutral-700 dark:bg-neutral-800 md:flex-row"
         
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink  key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/images/image1.png"
                    className="size-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Excellent Service
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-10 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded bg-black dark:bg-white" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex size-full flex-1 flex-col gap-2 border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-10">
      <div className="min-h-screen  p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Story Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(story => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <img src={story.image} height={150} width={150} alt={story.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">{story.title}</h2>
              <p className="mb-4 text-gray-700">{story.snippet}</p>
              <Link href={`/story/${story.id}`}>
                <p className="text-blue-500 hover:underline">Read More</p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};
export default AdminPage;
