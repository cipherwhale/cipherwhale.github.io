import { motion } from "framer-motion";

type Intermediate = {
  label: string;
  x: number;
  kind: "O" | "OH" | "OOH";
};

const intermediates: Intermediate[] = [
  { label: "*O", x: 190, kind: "O" },
  { label: "*OH", x: 500, kind: "OH" },
  { label: "*OOH", x: 810, kind: "OOH" },
];

const atomStyle = {
  fill: "rgba(245, 247, 250, 0.72)",
  stroke: "rgba(36, 41, 49, 0.72)",
  strokeWidth: 2.1,
};

const atomHighlightStyle = {
  fill: "rgba(255, 255, 255, 0.62)",
  stroke: "none",
};

const atomLabelStyle = {
  fill: "rgba(19, 24, 32, 0.82)",
  fontSize: 18,
  fontWeight: 700,
  textAnchor: "middle" as const,
};

const bondStyle = {
  stroke: "rgba(34, 39, 47, 0.62)",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
};

const faintBondStyle = {
  ...bondStyle,
  stroke: "rgba(75, 84, 96, 0.26)",
  strokeWidth: 3,
};

const titleStyle = {
  fill: "rgba(230, 237, 247, 0.86)",
  fontSize: 42,
  fontWeight: 500,
  textAnchor: "middle" as const,
  letterSpacing: "0.04em",
};

function Atom({ x, y, label, r = 20, faint = false }: { x: number; y: number; label?: string; r?: number; faint?: boolean }) {
  return (
    <g opacity={faint ? 0.34 : 0.92}>
      <circle cx={x} cy={y} r={r} style={atomStyle} />
      <circle cx={x - r * 0.24} cy={y - r * 0.2} r={r * 0.42} style={atomHighlightStyle} />
      {label ? (
        <text x={x} y={y + 6} style={atomLabelStyle}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Bond({ x1, y1, x2, y2, faint = false }: { x1: number; y1: number; x2: number; y2: number; faint?: boolean }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} style={faint ? faintBondStyle : bondStyle} />;
}

function Lattice({ x }: { x: number }) {
  const rows = [236, 292, 348];
  const cols = [-82, 0, 82];

  return (
    <g>
      {rows.map((rowY) =>
        cols.slice(0, -1).map((colX, i) => (
          <Bond key={`h-${rowY}-${i}`} x1={x + colX} y1={rowY} x2={x + cols[i + 1]} y2={rowY} faint />
        )),
      )}
      {cols.map((colX) =>
        rows.slice(0, -1).map((rowY, i) => (
          <Bond key={`v-${colX}-${i}`} x1={x + colX} y1={rowY} x2={x + colX} y2={rows[i + 1]} faint />
        )),
      )}
      {rows.map((rowY, rowIndex) =>
        cols.map((colX, colIndex) => (
          <Atom key={`${rowIndex}-${colIndex}`} x={x + colX} y={rowY} r={17} faint={rowIndex > 0 || colIndex !== 1} />
        )),
      )}
    </g>
  );
}

function Adsorbate({ x, kind }: { x: number; kind: Intermediate["kind"] }) {
  const surfaceY = 236;
  const firstO = { x, y: 148 };

  if (kind === "O") {
    return (
      <g>
        <Bond x1={x} y1={surfaceY - 17} x2={firstO.x} y2={firstO.y + 20} />
        <Atom x={firstO.x} y={firstO.y} label="O" />
      </g>
    );
  }

  if (kind === "OH") {
    const h = { x: x + 62, y: 91 };
    return (
      <g>
        <Bond x1={x} y1={surfaceY - 17} x2={firstO.x} y2={firstO.y + 20} />
        <Bond x1={firstO.x + 14} y1={firstO.y - 14} x2={h.x - 13} y2={h.y + 13} />
        <Atom x={firstO.x} y={firstO.y} label="O" />
        <Atom x={h.x} y={h.y} label="H" r={16} />
      </g>
    );
  }

  const secondO = { x, y: 86 };
  const h = { x: x + 68, y: 54 };
  return (
    <g>
      <Bond x1={x} y1={surfaceY - 17} x2={firstO.x} y2={firstO.y + 20} />
      <Bond x1={firstO.x} y1={firstO.y - 20} x2={secondO.x} y2={secondO.y + 20} />
      <Bond x1={secondO.x + 15} y1={secondO.y - 12} x2={h.x - 12} y2={h.y + 10} />
      <Atom x={firstO.x} y={firstO.y} label="O" />
      <Atom x={secondO.x} y={secondO.y} label="O" />
      <Atom x={h.x} y={h.y} label="H" r={16} />
    </g>
  );
}

export default function MolecularDiagramSection() {
  return (
    <section id="molecular-intermediates" className="panel">
      <div className="section-kicker">Catalyst Surface Intermediates</div>
      <h2 className="section-title">OER/ORR Adsorption Intermediates</h2>
      <p className="muted max-w-3xl">
        Pencil-style schematic of the surface-bound oxygen intermediates used in the reaction pathway: *O, *OH, and *OOH.
      </p>

      <motion.div
        className="mt-8 overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/[0.035] p-3"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          viewBox="0 0 1000 520"
          className="w-full"
          role="img"
          aria-label="Pencil sketch of surface-bound *O, *OH, and *OOH intermediates on a catalyst lattice"
        >
          <defs>
            <filter id="pencil-soften" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55" />
            </filter>
            <linearGradient id="fade-down" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.045)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="520" fill="url(#fade-down)" />
          <g filter="url(#pencil-soften)">
            {intermediates.map((item) => (
              <g key={item.label}>
                <text x={item.x} y="58" style={titleStyle}>
                  {item.label}
                </text>
                <Lattice x={item.x} />
                <Adsorbate x={item.x} kind={item.kind} />
              </g>
            ))}
          </g>
        </svg>
      </motion.div>
    </section>
  );
}
