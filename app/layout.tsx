import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/Provider";
import LoginModal from "@/components/LoginModal";

export const metadata: Metadata = {
  title: {
    default: "FunAcademy",
    template: `%s - ${siteConfig.name}`,
  },
  description:
    "Fun Academy: Learn, Play, Earn, Repeat! – The ultimate educational app designed to make learning a joyous adventure for children aged 1 to 7...",
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className="main dark:bg-black dark:text-white">
            <div className="gradient1" />
          </div>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              {/* <LoginModal /> */}
              <main className="flex-1 dark:bg-black dark:text-white">
                {children}
              </main>
              {/* <SiteFooter /> */}
            </div>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
