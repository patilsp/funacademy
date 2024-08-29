"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect} from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function NavbarDemo() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto hidden max-w-xl justify-between md:block", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/Events">Events</HoveredLink>
            <HoveredLink href="/games">Games</HoveredLink>
            <HoveredLink href="/course">Courses</HoveredLink>
            <HoveredLink href="/mentor">Mentors</HoveredLink>
            <HoveredLink href="/sports">Sports</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Subjects">
          <div className="grid grid-cols-2 gap-10 p-2 text-sm">
            <ProductItem
              title="Mathematics"
              href="/mathematics"
              src="/images/subjects/math.png"
              description="Learn addition, subtraction, multiplication, and division with interactive exercises."
            />
            <ProductItem
              title="Science"
              href="/science"
              src="/images/subjects/books.png"
              description="From biology to physics, engage in experiments and learn about the universe around you."
            />
            <ProductItem
              title="English"
              href="/english"
              src="/images/subjects/english.png"
              description="Enjoy stories, poems, and creative writing exercises designed for young learners."
            />
            <ProductItem
              title="History"
              href="/history"
              src="/images/subjects/history.png"
              description="important historical events, and notable figures through engaging lessons."
            />
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Classroom">
          <div className="flex flex-col space-y-4 p-1 px-2 text-sm">
            <HoveredLink href="/hobby">Class 1</HoveredLink>
            <HoveredLink href="/individual">Class 2</HoveredLink>
            <HoveredLink href="/team">Class 3</HoveredLink>
            <HoveredLink href="/enterprise">Class 4</HoveredLink>
            <HoveredLink href="/enterprise">Class 5</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Quiz">
          <div className="flex flex-col space-y-4 p-1 px-2 text-sm">
            <HoveredLink href="/math-quiz"> Quiz 1</HoveredLink>
            <HoveredLink href="/individual">Quiz 2</HoveredLink>
            <HoveredLink href="/team">Quiz 3</HoveredLink>
            <HoveredLink href="/enterprise">Quiz 4</HoveredLink>
            <HoveredLink href="/enterprise">Quiz 5</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Games">
          <div className="flex flex-col space-y-4 p-1 px-2 text-sm">
            <HoveredLink href="/hobby">Game 1</HoveredLink>
            <HoveredLink href="/individual">Game 2</HoveredLink>
            <HoveredLink href="/team">Game 3</HoveredLink>
            <HoveredLink href="/enterprise">Game 4</HoveredLink>
            <HoveredLink href="/enterprise">Game 5</HoveredLink>
          </div>
        </MenuItem>      
        
      </Menu>
    </div>
  );
}



