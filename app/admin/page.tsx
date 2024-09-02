"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { ArrowLeftCircle, Home, User, Settings } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Dashboard from '/app/admin/components/dashboard';
import Course from '/app/admin/components/course';
import QuestionCreator from '@/components/QuestionCreator';
import UserCompetition from '@/components/user-competition';



const AdminPage: React.FC = () => {
  const [activeContent, setActiveContent] = useState("Dashboard"); // State to manage active content
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <Home className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <DashboardContent />,
    },

    {
      label: "Course",
      href: "/admin",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <CourseContent />,
    },

    {
      label: "Quiz",
      href: "/admin/",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <QuestionCreator />,
    },


    {
      label: "Competition",
      href: "/admin",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <UserCompetitionContent />, 
    },
    {
      label: "Mentor",
      href: "/admin",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <ProfileContent />, // Content for Profile
    },
    {
      label: "Help",
      href: "/admin/profile",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <ProfileContent />, // Content for Profile
    },

    {
      label: "Profile",
      href: "/admin/profile",
      icon: (
        <User className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <ProfileContent />, // Content for Profile
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: (
        <Settings className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      content: <SettingsContent />, // Content for Settings
    },

  ];

  const handleLinkClick = (label: string) => {
    setActiveContent(label);
  };

  return (
    <div
      className={cn(
        "mx-auto flex size-full flex-1 flex-col overflow-hidden rounded-md dark:border-neutral-700 dark:bg-neutral-800 md:flex-row"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => handleLinkClick(link.label)} // Handle link click
                />
              ))}
            </div>
          </div>
        
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 flex-col p-4">
        {links.find((link) => link.label === activeContent)?.content}
      </div>
    </div>
  );
};

// Dummy content components for different sections
const DashboardContent = () => (
  <div className="min-h-screen">
      <Dashboard />
  </div>
);

const CourseContent = () => (
  <div className="min-h-screen">
    <Course />
  </div>
);

const QuizContent = () => (
  <div className="min-h-screen">
    <QuestionCreator />
  </div>
);

const UserCompetitionContent = () => (
  <div className="min-h-screen">
    <UserCompetition />
  </div>
);


const ProfileContent = () => (
  <div className="min-h-screen">
    <h2 className="text-2xl font-bold">Profile</h2>
    <p>This is the profile page.</p>
  </div>
);

const SettingsContent = () => (
  <div className="min-h-screen">
    <h2 className="text-2xl font-bold">Settings</h2>
    <p>Adjust your settings here.</p>
  </div>
);

const ProductsContent = () => (
  <div className="min-h-screen">
    <h2 className="text-2xl font-bold">Products</h2>
    <p>Manage your products here.</p>
  </div>
);

export const Logo = () => {
  return (
    <Link href="/" className="hidden md:block">
    <Image
      src="/images/logo.jpg"
      className="rounded-full bg-transparent object-contain"
      width={50}
      height={50}
      alt="logo image"            
    />
    
  </Link>   
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="hidden md:block">
      <Image
        src="/images/logo.jpg"
        className="rounded-full bg-transparent object-contain"
        width={50}
        height={50}
        alt="logo image"            
      />
      
    </Link>    
  );
};

export default AdminPage;
