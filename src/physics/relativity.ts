/** A bounded, illustrative relative speed shared by the portfolio's SR visuals.
 * Page scroll position is a storytelling cue, not a measurement of physical speed.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(start: number, end: number, value: number) {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

export function automaticBeta(progress: number): number {
  const approach = smoothstep(0.055, 0.27, progress);
  const departure = 1 - smoothstep(0.55, 0.83, progress);
  return 0.18 + 0.55 * approach * departure;
}

export function getRelativityState(progress: number, override: number | null = null) {
  const beta = clamp(override ?? automaticBeta(progress), 0, 0.92);
  const clockRate = Math.sqrt(1 - beta * beta);
  return { beta, gamma: 1 / clockRate, clockRate, lengthScale: clockRate };
}

/** Integrate dτ = dt √(1-β²) along the illustrative journey.
 * This avoids using final-speed × elapsed-time when the automatic speed varies.
 */
export function properProgress(progress: number, override: number | null = null) {
  const steps = 48;
  const endpoint = clamp(progress, 0, 1);
  const step = endpoint / steps;
  let elapsed = 0;
  for (let i = 0; i < steps; i++) {
    const beta = clamp(override ?? automaticBeta((i + 0.5) * step), 0, 0.92);
    elapsed += step * Math.sqrt(1 - beta * beta);
  }
  return elapsed;
}

export function physicsVisibility(progress: number) {
  return smoothstep(0.09, 0.21, progress) * (1 - smoothstep(0.64, 0.82, progress));
}

export function lensVisibility(progress: number) {
  return smoothstep(0.47, 0.59, progress) * (1 - smoothstep(0.74, 0.88, progress));
}
