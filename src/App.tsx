import { Suspense, lazy, useEffect, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import SpaceBackground from "./components/SpaceBackground";

const AboutSection = lazy(() => import("./sections/AboutSection"));
const EducationSection = lazy(() => import("./sections/EducationSection"));
const ResearchSection = lazy(() => import("./sections/ResearchSection"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const CurrentExpeditionSection = lazy(() => import("./sections/CurrentExpeditionSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

export default function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1 });
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
    <div className="min-h-screen bg-space-deep text-space-text font-body">
      <SpaceBackground />
      <header className="relative flex min-h-screen items-center justify-center px-4 text-center">
        <div className="absolute top-6 right-6 text-xs text-space-muted">Current Mission: Albuquerque, NM · {time}</div>
        <div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="title-glow text-5xl md:text-8xl font-display tracking-[0.3em]">
            WILLIAM HALE
          </motion.h1>
          <p className="mt-4 text-space-muted">Electrical Engineer • Materials Scientist • Explorer of Spacetime</p>
          <a className="btn mt-8 inline-block" href="#mission-brief">Enter the Wormhole</a>
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

      <main className="mx-auto w-[min(94%,1100px)] space-y-6 pb-16">
        <Suspense fallback={<section className="panel">Loading mission data…</section>}>
          <AboutSection />
          <EducationSection />
          <ResearchSection />
          <ExperienceSection />
          <SkillsSection />
          <CurrentExpeditionSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}
