import type { NextPage } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { LanguageDropDown } from "~/components/LanguageDropDown";
import type { LoginScreenState } from "~/components/LoginScreen";
import { LoginScreen } from "~/components/LoginScreen";

const MenuIconSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <title>Artboard</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(5 10)" className="fill-ink" fillRule="nonzero">
          <rect x="0" y="16" width="30" height="4" rx="2" />
          <rect x="0" y="8" width="30" height="4" rx="2" />
          <rect x="0" y="0" width="30" height="4" rx="2" />
        </g>
      </g>
    </svg>
  );
};

const ForgotPassword: NextPage = () => {
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");
  const [mobileMenuShown, setMobileMenuShown] = useState(false);
  return (
    <div className="fa-bg-aurora fa-bg-dots flex min-h-screen flex-col items-center bg-canvas text-ink">
      <header className="fa-glass sticky top-0 z-20 flex h-[70px] w-full justify-center border-b border-line font-bold">
        <div className="flex max-w-5xl grow items-center justify-between px-5">
          <Link className="text-[26px] tracking-tight" href="/">
            <span className="text-brand">Fun</span>
            <span className="text-ink">Academy</span>
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            <LanguageDropDown />
            <button
              className="fa-btn-primary-sm"
              onClick={() => setLoginScreenState("LOGIN")}
            >
              Login
            </button>
            <Link href="/register" className="fa-btn-primary-sm">
              Get started
            </Link>
          </div>
          <div
            className="relative flex md:hidden"
            onClick={() => setMobileMenuShown((x) => !x)}
            role="button"
            tabIndex={0}
          >
            <MenuIconSvg aria-hidden="true" />
            {mobileMenuShown && (
              <div className="fa-card animate-scale-in absolute right-0 top-full z-30 p-1 font-bold">
                <Link
                  className="block min-w-max cursor-pointer rounded-xl px-5 py-2.5 text-ink transition hover:bg-canvas"
                  href="/?login"
                >
                  Sign in
                </Link>
                <Link
                  className="block min-w-max cursor-pointer rounded-xl px-5 py-2.5 text-brand transition hover:bg-brand-soft"
                  href="/register"
                >
                  Get started
                </Link>
                <div className="fa-caption min-w-max cursor-pointer border-t border-line px-5 py-2.5">
                  Site language: English
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex w-full grow flex-col items-center gap-5 px-5 pt-8 sm:w-96 sm:pt-52">
        <h1 className="fa-h2 text-center">Forgot password</h1>
        <p className="fa-sub text-center">
          We will send you instructions on how to reset your password by email.
        </p>
        <div className="flex w-full flex-col gap-3">
          <input
            className="fa-input"
            placeholder="Email"
            type="email"
            autoComplete="email"
          />
          <button className="fa-btn-primary">Submit</button>
        </div>
      </div>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </div>
  );
};

export default ForgotPassword;
