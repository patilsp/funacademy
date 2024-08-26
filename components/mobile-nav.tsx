"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserIcon, HomeIcon, TrophyIcon, Award } from "lucide-react";

export function MobileNav() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet className="bg-gray-200" open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <label className="flex w-8 flex-col gap-2">
            <div className="h-[3px] w-1/2 rounded-2xl bg-black duration-500"></div>
            <div className="h-[3px] w-full rounded-2xl bg-black duration-500"></div>
            <div className="h-[3px] w-1/2 place-self-end rounded-2xl bg-black duration-500"></div>
          </label>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="bg-[#ffc854] p-0.5">
          <div className="flex size-full items-center justify-start p-4">
            {session?.user ? (
              <div className="flex justify-start gap-2">
                <img
                  className="mx-auto size-16 rounded-full border-2 border-white object-cover p-1"
                  src={session.user.image || "/images/avatars/02.png"}  
                  alt={session.user.name || "User"}
                />
                <div className="flex flex-col ">
                  <h2 className="mt-2 text-xl font-bold text-white">
                    {session.user.name || "Fun Kid"}
                  </h2>
                  <p className="text-white">Class 1</p>
                </div>
              </div>
            ) : (
              <h1 className="text-2xl text-white">Fun Academy</h1>
            )}
          </div>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-12rem)] flex-1 pl-6">
          <div className="flex flex-col space-y-4">
            {docsConfig.mainNav?.map((item) =>
              item.href ? (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                  className="mr-4 flex items-center rounded-lg bg-white p-3 text-lg font-bold shadow-lg hover:bg-purple-700 hover:text-white"
                >
                  {item.href === "/" ? (
                    <HomeIcon className="mr-2 size-8 rounded-full bg-orange-400 p-2 text-white shadow" />
                  ) : item.href === "/leaderboard" ? (
                    <TrophyIcon className="mr-2 size-8 rounded-full bg-orange-400 p-2 text-white shadow" />
                  ) : item.href === "/badges" ? (
                    <Award className="mr-2 size-8 rounded-full bg-orange-400 p-2 text-white shadow" />
                  ) : (
                    <UserIcon className="mr-2 size-8 rounded-full bg-orange-400 p-2 text-white shadow" />
                  )}
                  {item.title}

                  
                </MobileLink>
              ) : null
            )}
          </div>
        </ScrollArea>
        {/* Fixed Footer with Logout Button */}
        <div className="sticky bottom-0 rounded bg-indigo-400 p-4">
          {session && (
            <Button
              variant="ghost"
              className="w-full text-lg font-bold text-white"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Log Out
            </Button>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
