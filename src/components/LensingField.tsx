import { useEffect, useRef } from "react";
import { lensVisibility } from "../physics/relativity";

type Star = { x: number; y: number; radius: number; brightness: number };
type Props = { progress: number; reducedMotion: boolean };

function createStars(): Star[] {
  // Deterministic layout: no visual jumping between renders.
  let seed = 1083;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: 160 }, () => ({
    x: random(), y: random(), radius: 0.35 + random() * 0.85, brightness: 0.16 + random() * 0.55,
  }));
}

/** Deliberately schematic weak lensing, rendered in a small canvas layer.
 * Rays are deflected radially around a localized lens. Not a GR ray-tracer.
 */
export default function LensingField({ progress, reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibility = reducedMotion ? 0 : lensVisibility(progress);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visibility) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bounds = canvas.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const cx = width * 0.51;
    const cy = height * 0.48;
    const scale = Math.min(width, height);
    const lensRadius = scale * 0.17;
    const imageRadius = scale * 0.24;
    const fade = ctx.createRadialGradient(cx, cy, lensRadius * 0.15, cx, cy, imageRadius * 2.1);
    fade.addColorStop(0, "rgba(149,193,253,0.035)");
    fade.addColorStop(0.35, "rgba(149,193,253,0.012)");
    fade.addColorStop(1, "rgba(149,193,253,0)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, width, height);
    for (const star of createStars()) {
      const x = star.x * width;
      const y = star.y * height;
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.hypot(dx, dy);
      // Point lens inspired radial deflection, softened in the centre and bounded
      // to avoid numerical singularities or visual discontinuities.
      const deflection = r < imageRadius * 2.25
        ? Math.min(24, (lensRadius * lensRadius * 0.20) / Math.max(r, lensRadius * 0.35))
          * Math.pow(Math.max(0, 1 - r / (imageRadius * 2.25)), 2)
        : 0;
      const px = x + (r ? (dx / r) * deflection : 0);
      const py = y + (r ? (dy / r) * deflection : 0);
      const alpha = Math.min(0.82, star.brightness + (r < imageRadius ? 0.15 : 0));
      ctx.fillStyle = `rgba(190,218,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    // One restrained, broken Einstein-ring accent.
    ctx.strokeStyle = "rgba(149,193,253,0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, lensRadius * 0.82, lensRadius * 0.79, -0.14, 0.28, 1.78);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, lensRadius * 0.82, lensRadius * 0.79, -0.14, 3.4, 4.9);
    ctx.stroke();
  }, [visibility > 0.02, reducedMotion]);
  return (
    <canvas
      ref={canvasRef}
      className="lensing-field"
      aria-hidden="true"
      style={{ opacity: visibility * 0.57 }}
    />
  );
}
