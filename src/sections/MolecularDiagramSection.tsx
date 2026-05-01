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
        className="relative overflow-hidden rounded-[28px] border border-cyan-300/10 bg-white/[0.028] p-2"
      >
        <img
          src={moleculesArt}
          alt=""
          aria-hidden="true"
          className="block w-full select-none object-cover"
          style={{
            opacity: 0.92,
            mixBlendMode: "screen",
            filter:
              "grayscale(100%) contrast(1.18) brightness(1.08) drop-shadow(0 0 22px rgba(255,255,255,0.075))",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 62%, rgba(0,0,0,0.96) 76%, rgba(0,0,0,0.52) 91%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 62%, rgba(0,0,0,0.96) 76%, rgba(0,0,0,0.52) 91%, transparent 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 56%,
                rgba(8,16,37,0.045) 74%,
                rgba(8,16,37,0.14) 100%
              ),
              linear-gradient(
                to bottom,
                rgba(8,16,37,0.08),
                transparent 20%,
                transparent 84%,
                rgba(8,16,37,0.14)
              )
            `,
          }}
        />
      </motion.div>
    </section>
  );
}
