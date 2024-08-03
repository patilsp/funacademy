"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs"; 
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/registry/new-york/ui/button";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/registry/new-york/ui/sheet";

export function MobileNav() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const userName = user?.fullName || "User Name";
  const userProfileImage = user?.profileImageUrl || "/avatars/02.png";
  const userMobile = user?.phone || "";

  return (
    <Sheet classNme="bg-gray-200" open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <ViewVerticalIcon className="-ml-4 size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full bg-white">
        <MobileLink
          href="/"
          className="flex items-start p-4"
          onOpenChange={setOpen}
        >
          {/* <Image
            src={userProfileImage}
            className="mr-1 size-8 rounded-lg border border-white object-contain "
            width={70}
            height={70}
            alt="user profile image"
           
          /> */}
          <div className="grid gap-1">
            <span className="text_primary ml-3 text-2xl font-bold">{userName}</span>
            <span className="ml-3 text-sm font-bold text-gray-600">{userMobile}</span>
          </div>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-12rem)] flex-1 pb-10 pl-6">
          <div className="flex flex-col space-y-4">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className="rounded-md p-1 text-xl font-semibold text-slate-600 hover:bg-indigo-600 hover:text-white active:bg-indigo-600 active:text-white"
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </ScrollArea>
     
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
