import { useState } from "react";

type Props = {
  beta: number;
  override: number | null;
  onOverride: (next: number | null) => void;
};

export default function RelativityControl({ beta, override, onOverride }: Props) {
  const [open, setOpen] = useState(false);
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  return (
    <aside className="relativity-control" aria-label="Relativistic frame controls">
      {open && (
        <div className="relativity-control__panel" id="relativity-speed-panel">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold tracking-[0.12em] text-space-cyan">REFERENCE FRAME S′</p>
            <button className="text-xs text-space-muted hover:text-white" onClick={() => setOpen(false)} type="button" aria-label="Close frame controls">✕</button>
          </div>
          <label className="mt-4 flex justify-between text-xs text-space-muted" htmlFor="relativity-beta">
            <span>Illustrative relative speed</span><output>{beta.toFixed(2)}c</output>
          </label>
          <input
            id="relativity-beta"
            type="range"
            min="0"
            max="0.9"
            step="0.05"
            value={override ?? beta}
            onChange={(event) => onOverride(Number(event.target.value))}
            className="mt-3 w-full accent-[#95c1fd]"
          />
          <div className="mt-2 flex justify-between gap-3 text-[11px] text-space-muted">
            <span>γ = {gamma.toFixed(2)}</span><span>dτ/dt = {(1 / gamma).toFixed(2)}</span>
          </div>
          <button type="button" className="mt-4 text-xs text-space-cyan underline underline-offset-4" onClick={() => onOverride(null)}>
            {override === null ? "Scroll-driven speed active" : "Restore scroll-driven speed"}
          </button>
          <p className="mt-3 text-[10px] leading-relaxed text-space-muted">
            Educational illustration, not a physical velocity measurement of scrolling.
          </p>
        </div>
      )}
      <button
        className="relativity-control__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="relativity-speed-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">S′</span>
        <span className="relativity-control__speed">{beta.toFixed(2)}c</span>
        <span className="sr-only">Adjust relativistic reference-frame speed</span>
      </button>
    </aside>
  );
}
