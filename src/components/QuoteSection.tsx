import { motion, useReducedMotion } from "framer-motion";

type QuoteSectionProps = {
  quote: string;
  author: string;
  provenance: string;
  sourceUrl: string;
  variant: "einstein" | "beethoven";
};

export default function QuoteSection({
  quote, author, provenance, sourceUrl, variant,
}: QuoteSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.figure
      className={`spacetime-quote spacetime-quote--${variant}`}
      initial={reducedMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <blockquote className="spacetime-quote__text">“{quote}”</blockquote>
      <figcaption className="spacetime-quote__credit">
        <span className="spacetime-quote__author">— {author}</span>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="spacetime-quote__source">
          {provenance}
        </a>
      </figcaption>
    </motion.figure>
  );
}
