"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SpaceCanvas from "@/components/SpaceCanvas";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "MISSION BRIEF", href: "mission-brief" },
  { label: "EDUCATION", href: "education" },
  { label: "RESEARCH & MISSIONS", href: "research-missions" },
  { label: "EXPERIENCE", href: "experience" },
  { label: "SKILLS & TOOLKIT", href: "skills-toolkit" },
  { label: "CURRENT PHYSICS EXPEDITION", href: "current-physics-expedition" },
  { label: "CONTACT", href: "contact" },
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const missionTimeline = [
  {
    role: "Electrical Engineer",
    org: "Sandia National Laboratories",
    dates: "Jan 2022 to Present",
    bullets: [
      "Work in microwave primary standards lab supporting calibration and measurement automation.",
      "Perform data analysis and measurement automation across RF standards and tools.",
      "Specialize in S-parameters and power sensor calibration with ISO 17025 compliance.",
      "Drive process improvements and lead tool-set and process development initiatives.",
    ],
  },
  {
    role: "Process Engineer Intern",
    org: "Intel Corporation",
    dates: "Dec 2021 to Aug 2022",
    bullets: [
      "Improved e-test process and measurement accuracy for advanced nodes.",
      "Analyzed high- and medium-volume measurements and correlation to mass metrology.",
      "Managed experiments, process reliability assessments, and statistical methods for yield improvements.",
    ],
  },
  {
    role: "Graduate Teaching & Research Assistant",
    org: "New Mexico Tech",
    dates: "Aug 2019 to Dec 2020",
    bullets: [
      "Teaching assistant for undergraduate chemical engineering and materials courses.",
      "Supported hands-on labs, grading, and mentoring for course capstone projects.",
    ],
  },
  {
    role: "Graduate Assistant – Solution Methods for Chemical Engineers",
    org: "New Mexico Tech",
    dates: "Aug 2020 to Dec 2020",
    bullets: ["Provided tutoring and review sessions in transport phenomena and computational methods."],
  },
  {
    role: "Research Assistant – Electrochemical CO2 Capture",
    org: "New Mexico Tech",
    dates: "May 2019 to Aug 2020",
    bullets: [
      "Supported analysis of supporting carbonate species and scripts for electrochemical workflows.",
      "Worked under Dr. Fiore to model solvent effects and electrochemical pathways.",
    ],
  },
  {
    role: "Research Assistant – Materials/Instrumentation",
    org: "UNM Nanoscience & Microsystems REU",
    dates: "May 2017 to Aug 2017",
    bullets: [
      "Built and characterized a Co planar cathode and sensor calibration hardware.",
      "Developed instrumentation for microscale sensor applications.",
    ],
  },
];

export default function Home() {
  const [utcClock, setUtcClock] = useState<string>("");
  const [showNav, setShowNav] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const tick = () => setUtcClock(new Date().toISOString().slice(11, 19) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNav(y > window.innerHeight * 0.55);
      gsap.to(".time-dilate", {
        scaleY: 1 + Math.min(y / 7000, 0.05),
        scaleX: 1 - Math.min(y / 11000, 0.03),
        duration: 0.25,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const binaryRain = useMemo(
    () => "101101 010010 110001 001011 010110 111000 010111 001101 101010 001110",
    [],
  );

  const onSubmit = (_data: ContactForm) => {
    // Formspree/Resend placeholder.
  };

  return (
    <main className="relative pb-16 text-space-text">
      <SpaceCanvas />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showNav ? 1 : 0, y: showNav ? 0 : -20 }}
        className="pointer-events-none fixed left-1/2 top-4 z-50 w-[min(95%,1200px)] -translate-x-1/2 rounded-full border border-cyan-300/40 bg-[#080b1bcc] px-4 py-3 backdrop-blur-xl"
      >
        <ul className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 text-[0.65rem] tracking-wide text-space-muted md:text-[0.74rem]">
          {navItems.map((item, idx) => (
            <li key={item.href} className="flex items-center gap-1.5">
              <span className="orbit-dot" style={{ background: ["#00f0ff", "#ff00aa", "#ff9900"][idx % 3] }} />
              <a href={`#${item.href}`} className="transition hover:text-space-cyan">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="wormhole-ring" />
        <div className="wormhole-ring delay-200" />
        <motion.h1
          className="time-dilate glow-heading font-display text-5xl font-bold tracking-[0.35em] md:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05 }}
        >
          WILLIAM HALE
        </motion.h1>
        <p className="mt-5 max-w-3xl text-sm text-space-muted md:text-lg">
          Electrical Engineer • Materials Scientist • Explorer of Spacetime
        </p>
        <p className="mt-7 max-w-4xl text-xs text-space-muted/85 md:text-sm">
          ∇·E = ρ/ε₀ • iℏ∂ψ/∂t = Ĥψ • ds² = −c²dt² + dx² + dy² + dz²
        </p>
        <p className="binary-rain mt-6 text-space-cyan">{binaryRain}</p>
        <Button
          onClick={() => document.getElementById("mission-brief")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-12 px-8 shadow-glow hover:scale-105"
        >
          Enter the Wormhole
        </Button>

        <div className="absolute right-5 top-5 rounded-xl border border-orange-400/40 bg-slate-950/60 px-3 py-2 text-xs text-space-muted">
          <p>Current Mission: Albuquerque, NM</p>
          <p className="text-space-orange">{utcClock}</p>
        </div>
      </section>

      <div className="mx-auto flex w-[min(94%,1150px)] flex-col gap-8">
        <section id="mission-brief" className="hud-panel p-6 md:p-10">
          <h2 className="glow-heading font-display text-2xl md:text-3xl">MISSION BRIEF</h2>
          <p className="mt-4 leading-relaxed text-space-muted">
            Electrical engineer and materials scientist with a passion for computational physics and precision metrology.
            Currently supporting microwave primary standards at Sandia National Laboratories while pursuing advanced studies
            in relativity, quantum mechanics, and spacetime at the University of New Mexico.
          </p>
        </section>

        <section id="education" className="hud-panel star-divider p-6 md:p-10">
          <h2 className="glow-heading font-display text-2xl md:text-3xl">EDUCATION</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-magenta-400/35 bg-slate-950/50 p-5">
              <h3 className="text-lg font-semibold text-space-cyan">Master of Science in Materials Engineering</h3>
              <p className="text-sm text-space-muted">New Mexico Institute of Mining and Technology (Jun 2020 – Jan 2022) • GPA 4.00/4.00</p>
              <p className="mt-2 text-sm">Thesis: A-site Access and Oxygen Deficient LaMnMn2O5 (GEM ORR Catalyst)</p>
              <p className="mt-1 text-xs text-space-muted">Advisor: Dr. Pabitra Choudhury</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-space-muted">
                <li>Teaching assistant for undergraduate chemical engineering and materials courses.</li>
                <li>Supported hands-on labs, grading, and mentoring for course capstone projects.</li>
                <li>Provided tutoring and review sessions in transport phenomena and computational methods.</li>
                <li>Supported analysis of supporting carbonate species and scripts for electrochemical workflows.</li>
              </ul>
            </article>
            <article className="rounded-xl border border-cyan-400/35 bg-slate-950/50 p-5">
              <h3 className="text-lg font-semibold text-space-cyan">B.S. Electrical Engineering & B.S. Chemical Engineering</h3>
              <p className="text-sm text-space-muted">NM Tech (Aug 2017 – May 2020) • GPA 3.97/4.00</p>
              <p className="mt-2 text-sm">FE Certified (2020); Senior Project: Atmospheric Plasma & Glow Discharge System</p>
              <p className="mt-4 text-sm font-semibold text-space-orange">Central New Mexico Community College</p>
              <p className="text-sm text-space-muted">A.S. Mathematics & A.S. Engineering/Physics</p>
            </article>
          </div>
          <div className="mt-6 rounded-xl border border-orange-400/35 bg-slate-950/45 p-5">
            <h3 className="text-lg font-semibold text-space-orange">Awards Nebula</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-space-muted">
              <li>Dean&apos;s List (2018–2020) and Tau Beta Pi scholarship recipient.</li>
              <li>Presidential STEM Scholarship for academic achievement.</li>
              <li>Tau Beta Pi Fellowship (Fall 2019) and Eta Kappa Nu member (2019).</li>
              <li>Various research poster awards including National AAAS STEM poster presentation.</li>
            </ul>
          </div>
        </section>

        <section id="research-missions" className="hud-panel star-divider tesseract-grid p-6 md:p-10">
          <h2 className="glow-heading font-display text-2xl md:text-3xl">RESEARCH & MISSIONS</h2>
          <article className="mt-5 rounded-xl border border-cyan-400/30 bg-slate-950/55 p-5">
            <h3 className="text-lg font-semibold text-space-orange">A-site Access and Oxygen Deficient LaMnMn2O5 (GEM ORR Catalyst)</h3>
            <p className="mt-2 text-sm text-space-muted">Published in Journal of Catalysis • DFT and computational catalyst optimization campaign.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-space-muted">
              <li>Worked under Dr. Fiore to model solvent effects and electrochemical pathways.</li>
              <li>Computational modeling with VASP and Quantum ESPRESSO for ORR/OER catalyst research.</li>
              <li>Supported analysis of supporting carbonate species and scripts for electrochemical workflows.</li>
              <li>UNM Nanoscience & Microsystems REU — developed instrumentation for microscale sensor applications.</li>
            </ul>
          </article>
        </section>

        <section id="experience" className="hud-panel star-divider p-6 md:p-10">
          <h2 className="glow-heading font-display text-2xl md:text-3xl">EXPERIENCE • MISSION LOG</h2>
          <div className="mt-6 space-y-5 border-l border-cyan-300/40 pl-6">
            {missionTimeline.map((entry) => (
              <article key={`${entry.role}-${entry.org}`} className="relative rounded-xl border border-cyan-400/25 bg-slate-950/50 p-4">
                <span className="absolute -left-[2.05rem] top-6 h-3 w-3 rounded-full bg-space-cyan shadow-glow" />
                <h3 className="font-semibold">
                  {entry.role} — {entry.org}
                </h3>
                <p className="text-xs text-space-muted">{entry.dates}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-space-muted">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills-toolkit" className="hud-panel star-divider p-6 md:p-10">
          <h2 className="glow-heading font-display text-2xl md:text-3xl">SKILLS & TOOLKIT</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-cyan-400/35 bg-slate-950/55 p-4 text-sm">High-Level: Python, MATLAB/GNU Octave</div>
            <div className="rounded-xl border border-magenta-400/35 bg-slate-950/55 p-4 text-sm">Past Experience: C/C++ basics, JavaScript (ES6), Verilog/VHDL, AVR ATmega microcontrollers</div>
            <div className="rounded-xl border border-orange-400/35 bg-slate-950/55 p-4 text-sm">Software: VASP, Quantum ESPRESSO, MATLAB, VESTA, GIMP, Inkscape, LTSpice, Cadence PCB, ChemCAD, Git</div>
            <div className="rounded-xl border border-cyan-400/35 bg-slate-950/55 p-4 text-sm">Hardware: RF/microwave calibration, analog & digital filters, FPGAs</div>
          </div>
        </section>

        <section id="current-physics-expedition" className="hud-panel star-divider relative overflow-hidden p-6 md:p-10">
          {/* WORMHOLE TRANSITION HERE */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12),transparent_60%)]" />
          <h2 className="relative glow-heading font-display text-2xl text-space-orange md:text-3xl">Current Expedition – University of New Mexico</h2>
          <p className="relative mt-2 text-space-muted">Advanced studies in the fabric of spacetime</p>
          <div className="relative mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-cyan-400/30 bg-slate-950/55 p-4">
              <h3 className="text-lg font-semibold text-space-cyan">Undergraduate</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-space-muted">
                <li>Analytical Mechanics I</li>
                <li>Intermediate Quantum Mechanics I</li>
                <li>Math Methods of Physics</li>
                <li>Complex Analysis</li>
              </ul>
            </article>
            <article className="rounded-xl border border-orange-400/35 bg-slate-950/55 p-4">
              <h3 className="text-lg font-semibold text-space-orange">Graduate</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-space-muted">
                <li>Electrodynamics</li>
                <li>Introduction to Partial Differential Equations</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="contact" className="hud-panel star-divider p-6 md:p-10">
          <h2 className="glow-heading font-display text-2xl md:text-3xl">CONTACT TRANSMISSION</h2>
          <form action="https://formspree.io/f/your-form-id" method="POST" onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
            <input {...register("name")} className="rounded-lg border border-cyan-400/40 bg-slate-950/60 px-4 py-3" placeholder="Call sign" />
            {errors.name ? <p className="text-xs text-red-300">{errors.name.message}</p> : null}
            <input {...register("email")} className="rounded-lg border border-cyan-400/40 bg-slate-950/60 px-4 py-3" placeholder="Transmission email" />
            {errors.email ? <p className="text-xs text-red-300">{errors.email.message}</p> : null}
            <textarea {...register("message")} rows={5} className="rounded-lg border border-cyan-400/40 bg-slate-950/60 px-4 py-3" placeholder="Mission message" />
            {errors.message ? <p className="text-xs text-red-300">{errors.message.message}</p> : null}
            <Button type="submit">Send Transmission</Button>
            {isSubmitSuccessful ? <p className="text-xs text-space-cyan">Transmission queued.</p> : null}
          </form>

          <div className="mt-6 text-sm text-space-muted">
            <p>Email: williamhaleaemail@gmail.com</p>
            <p>Phone: (505) 934-2340</p>
            <p>Address: 5450 Jackson Loop NE, Rio Rancho, NM 87144</p>
          </div>
        </section>
      </div>
    </main>
  );
}
