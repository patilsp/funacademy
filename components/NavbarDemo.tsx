"use client";
import Link from "next/link";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { UserButton, useAuth, useUser, SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export function NavbarDemo() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  const router = useRouter()


  // if (!user) {
  //   return;
  // }

  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto hidden max-w-2xl md:block", className)}
    >

        
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/interface-design">Quiz</HoveredLink>
          <HoveredLink href="/interface-design">Games</HoveredLink>

            <HoveredLink href="/web-dev">Courses</HoveredLink>
            <HoveredLink href="/seo">Assessments</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  grid grid-cols-2 gap-10 p-4 text-sm">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Classes">
          <div className="flex flex-col space-y-4 p-1 px-2 text-sm">
            <HoveredLink href="/hobby">Class 1</HoveredLink>
            <HoveredLink href="/individual">Class 2</HoveredLink>
            <HoveredLink href="/team">Class 3</HoveredLink>
            <HoveredLink href="/enterprise">Class 4</HoveredLink>
            <HoveredLink href="/enterprise">Class 5</HoveredLink>
          </div>
        </MenuItem>

        {userId == null ? (
            <Link href="/sign-in" className="relative">
                Sign In
             
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/sign-in" />
          )}


      </Menu>
    </div>
  );
}
