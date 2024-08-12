"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { NavbarDemo } from "@/components/NavbarDemo"
import UserAccountNav from '@/components/UserAccountNav';
import logoImage from '../public/images/logo.webp';


export function SiteHeader() {

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full shadow backdrop-blur dark:bg-black dark:text-white">
      <div className="flex h-14 items-center px-2">
        <div className="mt-1 block md:hidden">
          <MobileNav />
        </div>
        <Link href="/" className="hidden md:block">
          <Image
            src={logoImage}
            className="object-contain "
            width={100}
            height={100}
            alt="logo image"            
          />
          
        </Link>        
        
        <NavbarDemo />

        
        <div className="flex items-center justify-end gap-2">
          <div className="mt-2 hidden md:block">
            <CommandMenu />
          </div>
          {/* <ModeToggle /> */}
          <UserAccountNav />            
        </div>
      </div>
    </header>
  );
}
