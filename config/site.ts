export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "FunAcademy",
  description:
    "Welcome to FunAcademy – the ultimate educational app designed to make learning a joyous adventure for children aged 1 to 7. At FunAcademy, we combine engaging stories, interactive games, and animated content to spark curiosity and foster a love for learning. Our platform offers a rich variety of educational materials that cater to young minds, helping them develop essential skills while having fun. With FunAcademy, learning becomes an exciting journey of discovery and play!",
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
      title: "Lessons",
      href: "/lessons",
    },
    {
      title: "Quiz",
      href: "/products",
    },
    {
      title: "Games",
      href: "/users",
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
