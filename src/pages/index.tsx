import { type NextPage } from "next";
import Link from "next/link";
import { GlobeSvg } from "~/components/Svgs";
import React from "react";
import { LanguageHeader } from "~/components/LanguageHeader";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";
import { LanguageCarousel } from "~/components/LanguageCarousel";

const bgSnow = _bgSnow as StaticImageData;

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  return (
    <main className="fa-bg-aurora fa-bg-dots relative flex min-h-screen flex-col items-center justify-center bg-canvas text-ink">
      <LanguageHeader />
      <div className="flex w-full flex-col items-center justify-center gap-10 px-4 py-24 md:flex-row md:gap-24 lg:gap-32">
        <div className="animate-float-slow relative order-2 md:order-1">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-90 rounded-full bg-brand/15 blur-3xl"
          />
          <GlobeSvg className="h-fit w-9/12 md:w-[360px]" />
        </div>
        <div className="order-1 md:order-2">
          <span className="fa-badge-brand mb-5 animate-rise hidden md:inline-flex">
            ✦ Learning that feels like play
          </span>
          <h1 className="fa-h1 animate-rise animate-delay-75 mb-5 max-w-[560px] text-center text-4xl sm:text-[44px] md:mb-7 md:text-left md:text-[46px]">
            The free, fun, and effective way to learn{" "}
            <span className="text-brand">anything</span>!
          </h1>
          <p className="fa-sub animate-rise animate-delay-150 mb-8 max-w-[520px] text-center text-lg md:mb-10 md:text-left">
            Bite-sized lessons, real progress, and rewards that keep young
            minds coming back — trusted by families and loved by kids.
          </p>
          <div className="animate-rise animate-delay-300 mx-auto mt-2 flex w-fit flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/register"
              className="fa-btn-primary-lg w-full sm:w-auto sm:min-w-[200px]"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="fa-btn-secondary w-full sm:w-auto sm:min-w-[200px]"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
      <LanguageCarousel />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;
