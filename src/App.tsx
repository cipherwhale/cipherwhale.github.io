import { Suspense, lazy, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import SpaceBackground from "./components/SpaceBackground";
import BackgroundClock from "./components/BackgroundClock";
import { useSmoothScrollProgress } from "./hooks/useSmoothScrollProgress";
import headshotSrc from "./assets/headshot_cropped.png";

const AboutSection = lazy(() => import("./sections/AboutSection"));
const EducationSection = lazy(() => import("./sections/EducationSection"));
const ResearchSection = lazy(() => import("./sections/ResearchSection"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const CurrentExpeditionSection = lazy(() => import("./sections/CurrentExpeditionSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [time, setTime] = useState("");
  const scrollProgress = useSmoothScrollProgress();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const update = () => setTime(new Date().toISOString().slice(11, 19) + " UTC");
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-space-deep text-space-text font-body">
      <SpaceBackground />
      <BackgroundClock progress={scrollProgress} />

      <header className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center">
        <div className="absolute top-6 right-6 text-xs text-space-muted">Current Mission: Albuquerque, NM · {time}</div>
        <div className="hero-copy flex max-w-5xl flex-col items-center gap-8 md:flex-row md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(149,193,253,0.22),transparent_65%)] blur-xl" />
            <img
              src={headshotSrc}
              alt="William Hale headshot"
              className="relative h-36 w-36 rounded-full border border-cyan-300/40 object-cover object-center shadow-[0_0_30px_rgba(149,193,253,0.20)] md:h-44 md:w-44"
            />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-xs uppercase tracking-[0.42em] text-space-muted"
            >
              Engineer · Researcher · Explorer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="title-glow text-5xl md:text-8xl font-display tracking-[0.3em]"
            >
              WILLIAM HALE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-2xl text-space-muted md:mx-0"
            >
              Electrical Engineer • Materials Scientist • Explorer of Spacetime
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="btn mt-8 inline-block"
              href="#mission-brief"
            >
              Enter the Wormhole
            </motion.a>
          </div>
        </div>
      </header>

      <nav className="sticky top-3 z-40 mx-auto mb-6 w-[min(94%,1100px)] rounded-full border border-cyan-400/30 bg-[#081025cc] px-4 py-2 text-xs backdrop-blur">
        <ul className="flex flex-wrap justify-center gap-3">
          <li><a href="#mission-brief">MISSION BRIEF</a></li>
          <li><a href="#education">EDUCATION</a></li>
          <li><a href="#research-missions">RESEARCH & MISSIONS</a></li>
          <li><a href="#experience">EXPERIENCE</a></li>
          <li><a href="#skills-toolkit">SKILLS & TOOLKIT</a></li>
          <li><a href="#current-physics-expedition">CURRENT PHYSICS EXPEDITION</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
      </nav>

      <main className="relative z-10 mx-auto w-[min(94%,1100px)] space-y-6 pb-16">
        <Suspense fallback={<section className="panel">Loading mission data…</section>}>
          <RevealSection><AboutSection /></RevealSection>
          <RevealSection><EducationSection /></RevealSection>
          <RevealSection><ResearchSection /></RevealSection>
          <RevealSection><ExperienceSection /></RevealSection>
          <RevealSection><SkillsSection /></RevealSection>
          <RevealSection><CurrentExpeditionSection /></RevealSection>
          <RevealSection><ContactSection /></RevealSection>
        </Suspense>
      </main>
    </div>
  );
}
