import Link from "next/link";
import { LanguageDropDown } from "./LanguageDropDown";

export const LanguageHeader = () => {
  return (
    <header className="fa-glass fixed left-0 right-0 top-0 z-20 mx-auto flex min-h-[70px] max-w-5xl items-center justify-center border-b border-line px-6 font-bold md:justify-between md:px-10">
      <Link className="text-[26px] tracking-tight" href="/">
        <span className="text-brand">Fun</span>
        <span className="text-ink">Academy</span>
      </Link>
      <LanguageDropDown />
    </header>
  );
};
