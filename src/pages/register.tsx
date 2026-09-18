import type { NextPage } from "next";
import Link from "next/link";
import languages from "~/utils/languages";
import { LanguageHeader } from "~/components/LanguageHeader";
import { useBoundStore } from "~/hooks/useBoundStore";
import { Flag } from "~/components/Flag";

const Register: NextPage = () => {
  const setLanguage = useBoundStore((x) => x.setLanguage);
  return (
    <main className="fa-bg-aurora fa-bg-dots flex min-h-screen flex-col items-center bg-canvas text-ink">
      <LanguageHeader />
      <div className="container flex grow flex-col items-center justify-center gap-14 px-4 pb-16 pt-28">
        <div className="flex flex-col items-center gap-3">
          <h1 className="fa-h1 text-center">I want to learn...</h1>
          <p className="fa-sub text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-brand transition hover:text-brand-strong"
            >
              Log in
            </Link>{" "}
            ·{" "}
            <Link
              href="/signup"
              className="font-bold text-brand transition hover:text-brand-strong"
            >
              Sign up
            </Link>
          </p>
        </div>
        <section className="mx-auto grid w-full max-w-5xl grow grid-cols-1 flex-col gap-x-3 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {languages.map((language) => (
            <Link
              key={language.name}
              href="/learn"
              className="fa-card fa-card-interactive fa-press flex cursor-pointer flex-col items-center gap-4 px-5 py-8 text-lg font-semibold text-ink hover:text-brand"
              onClick={() => setLanguage(language)}
            >
              <Flag language={language} />
              <span>{language.name}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Register;
