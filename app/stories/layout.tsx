import { Metadata } from "next"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/stories/components/sidebar-nav"

// Metadata for the page
export const metadata: Metadata = {
  title: "Stories Learning Fun",
  description: "Interactive and fun English Stories learning experience for kids.",
}

// Sidebar navigation items
const sidebarNavItems = [
  {
    title: "all",
    href: "/stories/alphabet",
  },
  {
    title: "fictions",
    href: "/stories/fictions",
  },
  {
    title: "fantacy",
    href: "/stories/fantacy",
  },
  {
    title: "history",
    href: "/stories/history",
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
          <h2 className="text-2xl font-bold tracking-tight"> English Stories</h2>
          <p className="text-muted-foreground">
            Explore fun ways to read Stories!
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
