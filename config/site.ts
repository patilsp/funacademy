export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Excellent Service",
  description:
    "Clean, Clear, Confident: Transforming Lives One Drop at a Time",
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
      title: "Customers",
      href: "/customers",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Users",
      href: "/users",
    },
     {
      title: "Settings",
      href: "/forms",
    },
  ],
  links: {
    twitter: "https://twitter.com/patilsp",
    github: "https://github.com/patilsp",
    docs: "https://ui.shadcn.com",
  },
}
