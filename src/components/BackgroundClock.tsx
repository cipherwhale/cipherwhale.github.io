type BackgroundClockProps = {
  progress: number;
};

type SchematicClockProps = {
  className: string;
  motionProgress: number;
  tickProgress: number;
  tickCount?: number;
  offsetX?: number;
  offsetY?: number;
  label?: string;
  scale?: number;
  opacity?: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function qBezier(t: number, p0: number, p1: number, p2: number) {
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

function SchematicClock({
  className,
  motionProgress,
  tickProgress,
  tickCount = 72,
  offsetX = 0,
  offsetY = 0,
  label,
  scale = 1,
  opacity,
}: SchematicClockProps) {
  const motionT = clamp01(motionProgress);
  const tickT = clamp01(tickProgress);
  const isDilated = className.includes("dilated");

  const x = qBezier(motionT, 88, 75, 84) + offsetX;
  const y = qBezier(motionT, 16, 42, 78) + offsetY;
  const tilt = qBezier(motionT, -8, 3, 12);

  const rawTicks = tickT * tickCount;
  const nearestTick = Math.round(rawTicks);
  const stepped = nearestTick / tickCount;
  const minuteAngle = stepped * 360;
  const hourAngle = stepped * 60;
  const distanceFromTick = Math.min(0.5, Math.abs(rawTicks - nearestTick));
  const pulseOpacity = 0.2 + (0.5 - distanceFromTick) * 0.38;

  const cyan = "rgba(149, 193, 253, 0.72)";
  const magenta = "rgba(205, 27, 87, 0.78)";
  const slowCyan = "rgba(149, 193, 253, 0.46)";
  const slowMagenta = "rgba(205, 27, 87, 0.54)";

  return (
    <div
      className={`schematic-clock ${className}`}
      style={{
        width: `clamp(${Math.round(220 * scale)}px, ${29 * scale}vw, ${Math.round(390 * scale)}px)`,
        opacity,
        transform: `translate(-50%, -50%) translate(${x}vw, ${y}vh) rotate(${tilt}deg)`,
      }}
    >
      <svg viewBox="0 0 200 200" role="presentation">
        <circle
          cx="100"
          cy="100"
          r="88"
          className="clock-ring outer"
          style={isDilated ? { stroke: slowMagenta } : undefined}
        />
        <circle
          cx="100"
          cy="100"
          r="72"
          className="clock-ring inner"
          style={isDilated ? { stroke: "rgba(149, 193, 253, 0.24)" } : undefined}
        />
        <circle
          cx="100"
          cy="100"
          r="50"
          className="clock-ring guide"
          style={isDilated ? { stroke: "rgba(205, 27, 87, 0.24)" } : undefined}
        />

        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 5 === 0;
          const r1 = isMajor ? 75 : 82;
          const r2 = 88;
          const x1 = 100 + Math.cos(angle) * r1;
          const y1 = 100 + Math.sin(angle) * r1;
          const x2 = 100 + Math.cos(angle) * r2;
          const y2 = 100 + Math.sin(angle) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={isMajor ? "clock-tick major" : "clock-tick minor"}
              style={
                isDilated
                  ? { stroke: isMajor ? "rgba(205, 27, 87, 0.42)" : "rgba(205, 27, 87, 0.16)" }
                  : undefined
              }
            />
          );
        })}

        <path
          d="M 31 145 A 70 70 0 0 1 145 31"
          className="clock-accent-arc"
          style={isDilated ? { stroke: slowMagenta } : undefined}
        />
        <path
          d="M 42 58 C 72 38, 127 40, 159 68"
          className="clock-soft-curve"
          style={isDilated ? { stroke: "rgba(149, 193, 253, 0.18)" } : undefined}
        />

        <line
          x1="100"
          y1="100"
          x2="100"
          y2="62"
          className="clock-hand hour"
          style={{
            stroke: isDilated ? slowMagenta : cyan,
            transform: `rotate(${hourAngle}deg)`,
            transformOrigin: "100px 100px",
          }}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="34"
          className="clock-hand minute"
          style={{
            stroke: isDilated ? slowCyan : magenta,
            transform: `rotate(${minuteAngle}deg)`,
            transformOrigin: "100px 100px",
          }}
        />

        <circle
          cx="100"
          cy="100"
          r="10"
          className="clock-center-halo"
          style={{
            opacity: pulseOpacity,
            fill: isDilated ? "rgba(205, 27, 87, 0.24)" : undefined,
          }}
        />
        <circle cx="100" cy="100" r="5" className="clock-center" />
        {label ? (
          <text
            x="100"
            y="118"
            style={{
              fill: isDilated ? "rgba(205, 27, 87, 0.72)" : "rgba(255, 255, 255, 0.62)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textAnchor: "middle",
            }}
          >
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  );
}

export default function BackgroundClock({ progress }: BackgroundClockProps) {
  const dilatedMotionProgress = progress * 1.55 + 0.03;
  const dilatedTickProgress = progress * 0.42;

  return (
    <div className="relativity-clock-layer" aria-hidden="true">
      <svg className="clock-trajectory" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="reference-trajectory" d="M 88 16 Q 75 42 84 78" />
        <path className="dilated-trajectory" d="M 78 20 Q 65 46 74 82" />
      </svg>

      <SchematicClock
        className="primary-clock"
        motionProgress={progress}
        tickProgress={progress}
        scale={0.5}
        opacity={0.26}
      />

      <SchematicClock
        className="dilated-clock"
        motionProgress={dilatedMotionProgress}
        tickProgress={dilatedTickProgress}
        offsetX={-10}
        offsetY={4}
        label="τ"
        scale={0.36}
        opacity={0.22}
      />
    </div>
  );
}
