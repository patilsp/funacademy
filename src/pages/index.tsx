import type { NextPage } from "next";
import Link from "next/link";
import { useRef, useState } from "react";

import { Curio } from "@/components/Curio";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";

const TRACK_CARDS = [
  {
    emoji: "🧠",
    title: "Mind Quests",
    copy: "Math, reading and science — broken into joyful story-quests your child actually finishes.",
    bg: "bg-brand-soft",
    text: "text-brand",
    animals: ["🔢", "📖", "🔬"],
  },
  {
    emoji: "🧰",
    title: "Toolbox Quests",
    copy: "How computers, the internet and AI work — the tech basics schools forget to teach young kids.",
    bg: "bg-coral-soft",
    text: "text-coral-strong",
    animals: ["💻", "🌐", "🤖"],
  },
  {
    emoji: "🎨",
    title: "Create Quests",
    copy: "Art, music, movement and real projects — because smart hands make smart minds.",
    bg: "bg-emerald-soft",
    text: "text-emerald-strong",
    animals: ["🎨", "🎵", "⛵"],
  },
];

const FEATURES = [
  {
    emoji: "📚",
    title: "60-second storybooks",
    copy: "Every lesson opens as an animated story with narration — perfect for kids who can't read yet.",
  },
  {
    emoji: "🔊",
    title: "Reads aloud to them",
    copy: "Questions speak themselves. No reading required for Classes 1–2. Tap 🔊 anytime.",
  },
  {
    emoji: "🎯",
    title: "Real-world missions",
    copy: "Lessons end with hands-on missions — build a boat, plant a seed — parents confirm for bonus XP.",
  },
  {
    emoji: "🏆",
    title: "Streaks & celebrations",
    copy: "Confetti, XP, streaks and Curio the owl cheering every win keeps kids coming back daily.",
  },
];

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  const [mood, setMood] = useState<"happy" | "wave" | "excited">("wave");
  const tapCount = useRef(0);

  return (
    <main className="fa-bg-aurora fa-bg-dots relative min-h-screen overflow-hidden bg-canvas text-ink">
      {/* floating background emojis */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {["✏️", "🔢", "🚀", "🎨", "⭐", "🧩", "🌍", "🎵"].map((e, i) => (
          <span
            key={i}
            className="animate-float-emoji absolute text-3xl opacity-40"
            style={{ left: `${5 + i * 12}%`, bottom: "10%", animationDelay: `${i * 1.1}s`, animationDuration: `${7 + (i % 3)}s` }}
          >
            {e}
          </span>
        ))}
      </div>

      {/* nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <Curio mood="happy" className="h-11 w-11" />
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-brand">Curio</span>
            <span className="text-ink">Quest</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="fa-btn-secondary px-5 py-2.5 text-sm">
            Sign in
          </Link>
          <Link href="/register" className="fa-btn-primary px-5 py-2.5 text-sm">
            Start free
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-14">
        <div className="order-2 md:order-1">
          <span className="fa-badge-brand mb-5 animate-rise inline-flex">
            ✦ For kids in Class 1–7
          </span>
          <h1 className="fa-h1 animate-rise animate-delay-75 mb-5 text-4xl leading-tight sm:text-5xl md:text-[52px]">
            School smarts +{" "}
            <span className="bg-gradient-to-r from-brand via-sky to-emerald bg-clip-text text-transparent">
              tech &amp; creativity
            </span>{" "}
            — one playful quest.
          </h1>
          <p className="fa-sub animate-rise animate-delay-150 mb-8 max-w-lg text-lg">
            CurioQuest turns lessons into animated storybooks, questions into games,
            and screen time into real-world doing. The only app where kids learn
            subjects <i>and</i> how technology works <i>and</i> make things with their hands.
          </p>
          <div className="animate-rise animate-delay-300 flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className="fa-btn-primary-lg sm:min-w-[220px]">
              Start the adventure — free
            </Link>
            <Link href="/login" className="fa-btn-secondary sm:min-w-[180px]">
              I have an account
            </Link>
          </div>
          <p className="fa-caption mt-4">
            ✨ No ads. Kid-safe. Works on any phone, tablet or laptop.
          </p>
        </div>

        {/* interactive mascot */}
        <div className="order-1 flex flex-col items-center md:order-2">
          <button
            className="group relative outline-none"
            onClick={() => {
              tapCount.current += 1;
              setMood(tapCount.current % 3 === 0 ? "excited" : tapCount.current % 2 === 0 ? "wave" : "happy");
            }}
            aria-label="Say hi to Curio"
          >
            <div aria-hidden className="absolute inset-0 -z-10 scale-75 rounded-full bg-brand/15 blur-3xl" />
            <Curio
              mood={mood}
              className="h-56 w-56 drop-shadow-2xl transition-transform group-active:scale-95 sm:h-72 sm:w-72"
            />
          </button>
          <p className="fa-caption mt-2 font-bold">👆 Tap Curio!</p>

          {/* mini quest map preview */}
          <div className="fa-card mt-6 flex items-center gap-3 rounded-3xl p-4 shadow-lift">
            {["🔢", "📖", "🔬", "💻", "🎨"].map((e, i) => (
              <div
                key={i}
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-full text-xl",
                  i < 3 ? "bg-emerald-soft" : i === 3 ? "animate-pulse-soft bg-brand text-white" : "bg-panel opacity-60",
                ].join(" ")}
              >
                {e}
              </div>
            ))}
          </div>
          <p className="fa-caption mt-2">3 quests done · next up: Toolbox!</p>
        </div>
      </section>

      {/* tracks */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <h2 className="fa-h2 mb-2 text-center">Three quests, one happy brain</h2>
        <p className="fa-sub mb-10 text-center">
          Every class gets its own world of lessons, tuned to how kids actually learn.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {TRACK_CARDS.map((t) => (
            <article
              key={t.title}
              className={`fa-card ${t.bg} fa-press group rounded-[2rem] border-2 border-transparent p-7 transition-all hover:-translate-y-1.5 hover:shadow-lift`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-4xl transition-transform group-hover:scale-125">{t.emoji}</span>
                <h3 className={`text-xl font-extrabold ${t.text}`}>{t.title}</h3>
              </div>
              <p className="text-[15px] font-medium leading-relaxed text-ink/80">{t.copy}</p>
              <div className="mt-5 flex gap-2">
                {t.animals.map((a) => (
                  <span key={a} className="rounded-xl bg-white/70 px-2.5 py-1.5 text-xl shadow-card">{a}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <h2 className="fa-h2 mb-10 text-center">How a quest works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "1", emoji: "📚", title: "Watch the story", copy: "A 60-second animated tale with narration sets up the idea." },
            { n: "2", emoji: "🎮", title: "Play the quiz", copy: "Tap-the-picture and word games — spoken aloud, retry-friendly." },
            { n: "3", emoji: "🎉", title: "Celebrate", copy: "Confetti, XP and Curio cheering. Streaks grow daily." },
            { n: "4", emoji: "🎯", title: "Do the mission", copy: "A hands-off-screen mission confirmed by parents for bonus XP." },
          ].map((s) => (
            <div key={s.n} className="fa-card relative rounded-3xl p-6 text-center shadow-card">
              <span className="absolute -top-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white shadow-btn">
                {s.n}
              </span>
              <div className="text-4xl">{s.emoji}</div>
              <h3 className="mt-3 font-extrabold">{s.title}</h3>
              <p className="fa-caption mt-1.5">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* parents strip */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-16">
        <div className="fa-card fa-bg-dots flex flex-col items-center gap-6 rounded-[2.5rem] bg-gradient-to-br from-brand-soft to-sky-soft p-8 text-center sm:p-12 md:flex-row md:text-left">
          <Curio mood="wave" className="h-32 w-32 shrink-0 animate-float-slow" />
          <div>
            <h2 className="fa-h3">Built with parents, for parents 🫶</h2>
            <p className="fa-sub mt-2">
              Real-world missions pull families into learning. Weekly digests show what
              your child explored, mastered, and made with their hands — not just screen time.
            </p>
            <Link href="/register" className="fa-btn-primary mt-5 inline-block">
              Create your kid's free account
            </Link>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="relative z-10 border-t border-line py-8 text-center">
        <p className="fa-caption">
          <span className="font-bold text-brand">Curio</span>
          <span className="font-bold text-ink">Quest</span> — learn, play, create. 🦉
        </p>
      </footer>

      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;
