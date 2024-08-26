"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
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
            src="/images/logo.jpg"
            className="rounded-full bg-transparent object-contain"
            width={50}
            height={50}
            alt="logo image"            
          />
          
        </Link>        
        
        <NavbarDemo />

        
        <div className="flex items-center justify-end gap-2">
          <Link href="/subscribe" className="hidden md:block">
            <button class="pro-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
              </svg>
              Subscribe
            </button>
          </Link>

          <CommandMenu className="mt-2"/>
          <UserAccountNav />            
        </div>
      </div>
    </header>
  );
}
