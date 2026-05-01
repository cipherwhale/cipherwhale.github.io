import { motion } from "framer-motion";
import moleculesArt from "../assets/molecules3.png";

export default function MolecularDiagramSection() {
  return (
    <section id="molecular-intermediates" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[28px] border border-cyan-300/10 bg-white/[0.02] p-2"
      >
        <img
          src={moleculesArt}
          alt=""
          aria-hidden="true"
          className="block w-full select-none object-cover"
          style={{
            opacity: 0.78,
            mixBlendMode: "screen",
            filter:
              "grayscale(100%) contrast(1.03) brightness(1.02) drop-shadow(0 0 18px rgba(255,255,255,0.04))",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.92) 72%, rgba(0,0,0,0.35) 88%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.92) 72%, rgba(0,0,0,0.35) 88%, transparent 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 48%,
                rgba(8,16,37,0.08) 70%,
                rgba(8,16,37,0.26) 100%
              ),
              linear-gradient(
                to bottom,
                rgba(8,16,37,0.18),
                transparent 18%,
                transparent 82%,
                rgba(8,16,37,0.22)
              )
            `,
          }}
        />
      </motion.div>
    </section>
  );
}
