import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  title: {
    default: 'FunAcadeny',
    template: `%s - ${siteConfig.name}`,
  },
  description: 'Welcome to FunAcademy – the ultimate educational app designed to make learning a joyous adventure for children aged 1 to 7. At FunAcademy, we combine engaging stories, interactive games, and animated content to spark curiosity and foster a love for learning. Our platform offers a rich variety of educational materials that cater to young minds, helping them develop essential skills while having fun. With FunAcademy, learning becomes an exciting journey of discovery and play!',

  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
    <ClerkProvider>
      <html lang="en">
      <body
          className={cn(
            "min-h-screen  font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className='main'>
              <div className='gradient' />
            </div>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              {/* <SiteHeader /> */}
                <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider>
    </>
  )
}
