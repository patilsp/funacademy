import { Metadata } from "next"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/english/components/sidebar-nav"

// Metadata for the page
export const metadata: Metadata = {
  title: "English Learning Fun",
  description: "Interactive and fun English learning experience for kids.",
}

// Sidebar navigation items
const sidebarNavItems = [
  {
    title: "Alphabet",
    href: "/english/alphabet",
  },
  {
    title: "Words",
    href: "/english/words",
  },
  {
    title: "Sentences",
    href: "/english/sentences",
  },
  {
    title: "Stories",
    href: "/english/stories",
  },
  {
    title: "Games",
    href: "/english/games",
  },
]

interface EnglishLayoutProps {
  children: React.ReactNode
}

export default function EnglishLayout({ children }: EnglishLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 sm:mb-20 md:mb-1 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Learn English</h2>
          <p className="text-muted-foreground">
            Explore fun ways to learn letters, words, and sentences!
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
