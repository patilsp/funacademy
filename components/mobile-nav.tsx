"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "next-auth/react";


export function MobileNav() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  
  return (
    <Sheet classNme="bg-gray-200" open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:p-1"
        >
           {/* <Image
              src="/images/menu.png"
              alt="menu"
              width={45}
              height={45}
              className="rounded-md object-cover"
            />
          <span className="sr-only">Toggle Menu</span> */}

        <label className="flex flex-col gap-2 w-8">
          <div
            className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"
          ></div>
          <div
            className="rounded-2xl h-[3px] w-full bg-black duration-500 peer-checked:-rotate-45"
          ></div>
          <div
            className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"
          ></div>
        </label>

        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <MobileLink
          href="/"
          className="flex items-start p-4"
          onOpenChange={setOpen}
        >
  
         
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
