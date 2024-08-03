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
      href: "/dashboard",
    },
    {
      title: "Users",
      href: "/users",
    },
    {
      title: "Customers",
      href: "/customers",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Complaints",
      href: "/complaints",
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
