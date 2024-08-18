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
import { UserIcon, HomeIcon, TrophyIcon, BadgeIcon } from "lucide-react";

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
          <label className="flex flex-col gap-2 w-8">
            <div className="rounded-2xl h-[3px] w-1/2 bg-black duration-500"></div>
            <div className="rounded-2xl h-[3px] w-full bg-black duration-500"></div>
            <div className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end"></div>
          </label>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="bg-[#ffc854] p-0.5">
          <div className="size-full p-4 flex items-center justify-start">
            {session?.user ? (
              <div className="flex justify-start gap-2">
                <img
                  className="w-16 h-16 p-1 border-white border-2 rounded-full object-cover mx-auto"
                  src={session.user.image || "/default-avatar.png"}
                  alt={session.user.name || "User"}
                />
                <div className="flex flex-col ">
                  <h2 className="text-xl font-bold text-white mt-2">
                    {session.user.name || "Fun Kid"}
                  </h2>
                  <p className="text-white">{session.user.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-white">Not logged in</p>
            )}
          </div>
        </div>
        <ScrollArea className="flex-1 my-4 h-[calc(100vh-12rem)] pl-6">
          <div className="flex flex-col space-y-4">
            {docsConfig.mainNav?.map((item) =>
              item.href ? (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                  className="flex items-center rounded-lg p-3 text-lg mr-4 font-bold bg-gray-50 shadow-lg hover:bg-purple-700 hover:text-white"
                >
                  {item.href === "/" ? (
                    <HomeIcon className="mr-2 bg-green-400 p-1 text-white rounded-full shadow" />
                  ) : item.href === "/leaderboard" ? (
                    <TrophyIcon className="mr-2 bg-green-400 p-1 text-white rounded-full shadow" />
                  ) : item.href === "/badges" ? (
                    <BadgeIcon className="mr-2 bg-green-400 p-1 text-white rounded-full shadow" />
                  ) : (
                    <UserIcon className="mr-2 bg-green-400 p-1 text-white rounded-full shadow" />
                  )}
                  {item.title}

                  
                </MobileLink>
              ) : null
            )}
          </div>
        </ScrollArea>
        {/* Fixed Footer with Logout Button */}
        <div className="p-4 bg-indigo-400 rounded sticky bottom-0">
          {session && (
            <Button
              variant="ghost"
              className="w-full text-lg font-bold text-white"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Log Out
            </Button>
          )}

                {/* <Image
                    src="/images/student.png"
                    className="size-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  /> */}
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
