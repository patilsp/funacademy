"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Badge } from "@/registry/new-york/ui/badge";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  { title: "Dashboard", href: "/dashboard", description: "Overview of key metrics and statistics." },
  { title: "Products", href: "/products", description: "Manage and view all water purifier products." },
  { title: "Customers", href: "/customers", description: "View and manage customer details." },
  { title: "Complaints", href: "/complaints", description: "Track and manage customer complaints." },
  { title: "Users", href: "/users", description: "Manage user accounts and permissions." },
  { title: "Progress", href: "/docs/primitives/progress", description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar." },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden w-full items-center justify-start md:flex">
      <nav className="flex items-center space-x-2 text-sm font-medium">
        <NavigationMenu>
          <NavigationMenuList>
          <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/help" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Help
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <motion.a
          ref={ref}
          className={cn(
            "hover:text-bold block select-none rounded-md p-4 leading-none text-[#050505] no-underline outline-none transition-colors duration-700 ease-in hover:bg-gray-200 focus:bg-gray-300 focus:text-white dark:text-white dark:hover:bg-slate-800",
            className
          )}
          whileHover={{ scale: 1.05, rotate: 0 }}  // Added rotation effect on hover
          whileTap={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 50 }}  // Smooth transition
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </motion.a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
