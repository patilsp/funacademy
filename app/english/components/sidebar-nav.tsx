"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 overflow-auto bg-gray-100 mx-3 p-1 m-3 rounded-lg lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-row">
      <Link href="/category" className="mt-3 font-semibold text-sm text-black"> 
        <ArrowLeft className="size-6 mr-1 rounded-full p-1 bg-gray-200 dark:bg-slate-600"/> </Link>
      </div>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-white hover:bg-muted"
              : "hover:bg-white",
            "justify-start m-1 shadow-2xl text-xl"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
