type ScrollKinematics = {
  progress: number;
  velocity: number;
};

type BackgroundClockProps = {
  progress: number | ScrollKinematics;
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

type RulerProps = {
  label: "S" | "S'";
  progress: number;
  velocity: number;
  left: string;
  motionScale: number;
  speedScale: number;
  accent: "cyan" | "magenta";
  xLabel: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}

function qBezier(t: number, p0: number, p1: number, p2: number) {
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

function normalizeScroll(input: number | ScrollKinematics): ScrollKinematics {
  if (typeof input === "number") {
    return { progress: input, velocity: 0 };
  }

  return {
    progress: input.progress,
    velocity: input.velocity,
  };
}

function getLorentzState(scrollVelocity: number, speedScale: number) {
  // Deliberately artificial display speed of light. It is set low so ordinary
  // scrolling creates visible length contraction in the schematic rulers.
  const visualC = 0.42;
  const beta = clamp((scrollVelocity * speedScale) / visualC, 0, 0.88);
  const lengthScale = Math.sqrt(1 - beta * beta);

  return { beta, lengthScale };
}

function RelativisticRuler({
  label,
  progress,
  velocity,
  left,
  motionScale,
  speedScale,
  accent,
  xLabel,
}: RulerProps) {
  const y = 8 + progress * 46 * motionScale;
  const { beta, lengthScale } = getLorentzState(velocity, speedScale);

  const top = 18;
  const fullLength = 180;
  const contractedLength = fullLength * lengthScale;
  const bottom = top + contractedLength;
  const origin = bottom;

  const isMagenta = accent === "magenta";
  const accentStroke = isMagenta ? "rgba(205, 27, 87, 0.45)" : "rgba(149, 193, 253, 0.45)";
  const faintStroke = isMagenta ? "rgba(205, 27, 87, 0.18)" : "rgba(149, 193, 253, 0.20)";
  const labelFill = isMagenta ? "rgba(205, 27, 87, 0.78)" : "rgba(255, 255, 255, 0.68)";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left,
        width: 150,
        height: 270,
        opacity: isMagenta ? 0.34 : 0.3,
        pointerEvents: "none",
        mixBlendMode: "screen",
        filter: isMagenta
          ? "drop-shadow(0 0 14px rgba(205, 27, 87, 0.16)) drop-shadow(0 0 8px rgba(149, 193, 253, 0.08))"
          : "drop-shadow(0 0 14px rgba(149, 193, 253, 0.14)) drop-shadow(0 0 10px rgba(205, 27, 87, 0.08))",
        transform: `translate3d(0, ${y}vh, 0)`,
        willChange: "transform",
      }}
    >
      <svg viewBox="0 0 150 270" role="presentation" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        <text x="20" y="18" style={{ fill: labelFill, fontSize: 20, fontWeight: 700, letterSpacing: "0.06em" }}>
          {label}
        </text>
        <text x="20" y="38" style={{ fill: "rgba(220, 237, 255, 0.42)", fontSize: 9, letterSpacing: "0.06em" }}>
          beta={beta.toFixed(2)}
        </text>
        <text x="20" y="54" style={{ fill: "rgba(220, 237, 255, 0.42)", fontSize: 9, letterSpacing: "0.06em" }}>
          L/L0={lengthScale.toFixed(2)}
        </text>

        <circle cx="62" cy={origin} r="4" style={{ fill: "rgba(255, 255, 255, 0.78)", stroke: accentStroke, strokeWidth: 1 }} />

        <line x1="62" y1={origin} x2="118" y2={origin} style={{ stroke: "rgba(220, 237, 255, 0.34)", strokeWidth: 1, strokeLinecap: "round" }} />
        <path d={`M 118 ${origin} l -7 -4 v 8 z`} style={{ fill: "rgba(220, 237, 255, 0.38)" }} />
        <text x="123" y={origin + 4} style={{ fill: "rgba(220, 237, 255, 0.46)", fontSize: 9 }}>
          {xLabel}
        </text>

        <line x1="62" y1={origin} x2="62" y2={origin - 48} style={{ stroke: "rgba(220, 237, 255, 0.34)", strokeWidth: 1, strokeLinecap: "round" }} />
        <path d={`M 62 ${origin - 48} l -4 7 h 8 z`} style={{ fill: "rgba(220, 237, 255, 0.38)" }} />
        <text x="68" y={origin - 42} style={{ fill: "rgba(220, 237, 255, 0.46)", fontSize: 9 }}>
          ct
        </text>

        <line x1="62" y1={top} x2="62" y2={bottom} style={{ stroke: accentStroke, strokeWidth: 1.2, strokeLinecap: "round" }} />

        {Array.from({ length: 11 }).map((_, i) => {
          const tickY = top + (contractedLength * i) / 10;
          const major = i % 2 === 0;
          return (
            <g key={i}>
              <line
                x1={major ? 40 : 48}
                y1={tickY}
                x2="62"
                y2={tickY}
                style={{
                  stroke: major ? accentStroke : faintStroke,
                  strokeWidth: major ? 1.1 : 0.8,
                  strokeLinecap: "round",
                }}
              />
              {major ? (
                <text x="28" y={tickY + 4} style={{ fill: "rgba(220, 237, 255, 0.46)", fontSize: 9 }}>
                  {i}
                </text>
              ) : null}
            </g>
          );
        })}

        <path
          d={`M 84 ${top + 12} C 112 ${top + 58}, 112 ${bottom - 54}, 84 ${bottom - 10}`}
          style={{ fill: "none", stroke: faintStroke, strokeWidth: 0.9, strokeDasharray: "3 5" }}
        />
      </svg>
    </div>
  );
}

function RelativisticRulers({ progress, velocity }: ScrollKinematics) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 }} aria-hidden="true">
      <RelativisticRuler
        label="S"
        progress={progress}
        velocity={velocity}
        left="clamp(0.25rem, 2vw, 2rem)"
        motionScale={0.75}
        speedScale={0.72}
        accent="cyan"
        xLabel="x"
      />
      <RelativisticRuler
        label="S'"
        progress={progress}
        velocity={velocity}
        left="clamp(4.5rem, 8vw, 8rem)"
        motionScale={1.35}
        speedScale={1.65}
        accent="magenta"
        xLabel="x'"
      />
    </div>
  );
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
        <circle cx="100" cy="100" r="88" className="clock-ring outer" style={isDilated ? { stroke: slowMagenta } : undefined} />
        <circle cx="100" cy="100" r="72" className="clock-ring inner" style={isDilated ? { stroke: "rgba(149, 193, 253, 0.24)" } : undefined} />
        <circle cx="100" cy="100" r="50" className="clock-ring guide" style={isDilated ? { stroke: "rgba(205, 27, 87, 0.24)" } : undefined} />

        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 5 === 0;
          const r1 = isMajor ? 75 : 82;
          const r2 = 88;
          const x1 = 100 + Math.cos(angle) * r1;
          const y1 = 100 + Math.sin(angle) * r1;
          const x2 = 100 + Math.cos(angle) * r2;
          const y2 = 100 + Math.sin(angle) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={isMajor ? "clock-tick major" : "clock-tick minor"} style={isDilated ? { stroke: isMajor ? "rgba(205, 27, 87, 0.42)" : "rgba(205, 27, 87, 0.16)" } : undefined} />;
        })}

        <path d="M 31 145 A 70 70 0 0 1 145 31" className="clock-accent-arc" style={isDilated ? { stroke: slowMagenta } : undefined} />
        <path d="M 42 58 C 72 38, 127 40, 159 68" className="clock-soft-curve" style={isDilated ? { stroke: "rgba(149, 193, 253, 0.18)" } : undefined} />

        <line x1="100" y1="100" x2="100" y2="62" className="clock-hand hour" style={{ stroke: isDilated ? slowMagenta : cyan, transform: `rotate(${hourAngle}deg)`, transformOrigin: "100px 100px" }} />
        <line x1="100" y1="100" x2="100" y2="34" className="clock-hand minute" style={{ stroke: isDilated ? slowCyan : magenta, transform: `rotate(${minuteAngle}deg)`, transformOrigin: "100px 100px" }} />

        <circle cx="100" cy="100" r="10" className="clock-center-halo" style={{ opacity: pulseOpacity, fill: isDilated ? "rgba(205, 27, 87, 0.24)" : undefined }} />
        <circle cx="100" cy="100" r="5" className="clock-center" />
        {label ? <text x="100" y="118" style={{ fill: isDilated ? "rgba(205, 27, 87, 0.72)" : "rgba(255, 255, 255, 0.62)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textAnchor: "middle" }}>{label}</text> : null}
      </svg>
    </div>
  );
}

export default function BackgroundClock({ progress: scrollInput }: BackgroundClockProps) {
  const { progress, velocity } = normalizeScroll(scrollInput);
  const dilatedMotionProgress = progress * 1.55 + 0.03;
  const dilatedTickProgress = progress * 0.42;

  return (
    <div className="relativity-clock-layer" aria-hidden="true">
      <RelativisticRulers progress={progress} velocity={velocity} />
      <svg className="clock-trajectory" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="reference-trajectory" d="M 88 16 Q 75 42 84 78" />
        <path className="dilated-trajectory" d="M 78 20 Q 65 46 74 82" />
      </svg>
      <SchematicClock className="primary-clock" motionProgress={progress} tickProgress={progress} scale={0.5} opacity={0.26} />
      <SchematicClock className="dilated-clock" motionProgress={dilatedMotionProgress} tickProgress={dilatedTickProgress} offsetX={-10} offsetY={4} label="tau" scale={0.36} opacity={0.22} />
    </div>
  );
}
