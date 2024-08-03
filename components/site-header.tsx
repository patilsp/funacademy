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
import { Button } from "@/registry/new-york/ui/button";
import { UserButton, useAuth, useUser, SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export function SiteHeader() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  const router = useRouter()


  // if (!user) {
  //   return;
  // }

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full shadow backdrop-blur dark:bg-black dark:text-white">
      <div className="flex h-14">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/water.svg"
            className="mt-6 object-contain"
            width={60}
            height={60} 
            alt="Logo image"
          />
        </Link>
        
        <MainNav />
        
        {/* <MobileNav /> */}
        
        <div className="flex flex-1 items-center justify-end  md:justify-end">
        <CommandMenu />
          <ModeToggle />
     
            {/* <Button className="font-sm mr-1 hidden h-8 py-1 md:flex" type="button" onClick={() => router.push('/dashboard')}>
              Dashboard
            </Button> */}

          {userId == null ? (
            <Link href="/sign-in" className="mr-1 flex w-20 justify-center rounded bg-black p-1 font-medium text-white shadow   transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                Sign In
             
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/sign-in" />
          )}
        </div>
      </div>
    </header>
  );
}
