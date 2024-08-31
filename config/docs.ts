// config/docs.ts
import { NavItem } from "types/nav";

interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: NavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Leader Board",
      href: "/leaderboard",
    },
    {
      title: "Quiz",
      href: "/math-quiz",
    },
    {
      title: "Category",
      href: "/category",
    },
    {
      title: "Letters",
      href: "/letter",
    },
    {
      title: "Sports",
      href: "/sports",
    },
    {
      title: "Contact Us",
      href: "/contact-us",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
     {
      title: "Settings",
      href: "/forms",
    },
   
    
  ],
  sidebarNav: [
    {
      title: "General",
      items: [
        {
          title: "Help",
          href: "/helps",
        },
        {
          title: "Settings",
          href: "/forms",
        },
        {
          title: "Sign Up",
          href: "/sign-up",
        },
        // ... other sidebarNav sub-items ...
      ],
    },
    // ... other sidebarNav items ...
  ],
};
