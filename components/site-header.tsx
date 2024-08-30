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
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'
import { NavbarDemo } from "@/components/NavbarDemo"
import UserAccountNav from '@/components/UserAccountNav';
import logoImage from '../public/images/logo.webp';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


import { Bell } from "lucide-react"

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
            <button className="btn-subscribe">            
              Subscribe
            </button>
          </Link>

          <CommandMenu className="mt-2 "/>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button variant="ghost" className="m-0 p-0">                
                <Bell className="size-7 rounded-md border border-input bg-transparent p-1 shadow-sm hover:bg-accent hover:fill-black hover:text-slate-900 dark:text-white dark:hover:fill-white" />
              </button>
            </DropdownMenuTrigger>      
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <Card className="border-none shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Here are some updates for you!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-500 px-3 font-bold text-white">
                      🌟
                    </div>
                    <div>
                      <Label className="font-semibold">New Lesson Unlocked!</Label>
                      <p className="text-sm text-muted-foreground">
                        Introduction to Space is now available. Start exploring the stars!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-green-500 px-3 font-bold text-white">
                      🏆
                    </div>
                    <div>
                      <Label className="font-semibold">Achievement Earned!</Label>
                      <p className="text-sm text-muted-foreground">
                        You just earned the Quiz Master badge for scoring 100% on your last quiz.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-yellow-500 px-3 font-bold text-white">
                      📚
                    </div>
                    <div>
                      <Label className="font-semibold">New Story Available!</Label>
                      <p className="text-sm text-muted-foreground">
                        The Adventures of Timmy the Turtle is ready to read in the Storytime section.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    
          <UserAccountNav />            
        </div>
      </div>
    </header>
  );
}
