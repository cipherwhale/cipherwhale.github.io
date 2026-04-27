type BackgroundClockProps = {
  progress: number;
};

function qBezier(t: number, p0: number, p1: number, p2: number) {
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

export default function BackgroundClock({ progress }: BackgroundClockProps) {
  const x = qBezier(progress, 88, 75, 84);
  const y = qBezier(progress, 16, 42, 78);
  const tilt = qBezier(progress, -8, 3, 12);

  const tickCount = 72;
  const rawTicks = progress * tickCount;
  const nearestTick = Math.round(rawTicks);
  const stepped = nearestTick / tickCount;
  const minuteAngle = stepped * 360;
  const hourAngle = stepped * 60;
  const distanceFromTick = Math.min(0.5, Math.abs(rawTicks - nearestTick));
  const pulseOpacity = 0.2 + (0.5 - distanceFromTick) * 0.38;

  return (
    <div className="relativity-clock-layer" aria-hidden="true">
      <svg className="clock-trajectory" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 88 16 Q 75 42 84 78" />
      </svg>

      <div
        className="schematic-clock"
        style={{
          transform: `translate(-50%, -50%) translate(${x}vw, ${y}vh) rotate(${tilt}deg)`,
        }}
      >
        <svg viewBox="0 0 200 200" role="presentation">
          <circle cx="100" cy="100" r="88" className="clock-ring outer" />
          <circle cx="100" cy="100" r="72" className="clock-ring inner" />
          <circle cx="100" cy="100" r="50" className="clock-ring guide" />

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
              />
            );
          })}

          <path d="M 31 145 A 70 70 0 0 1 145 31" className="clock-accent-arc" />
          <path d="M 42 58 C 72 38, 127 40, 159 68" className="clock-soft-curve" />

          <line
            x1="100"
            y1="100"
            x2="100"
            y2="62"
            className="clock-hand hour"
            style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: "100px 100px" }}
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="34"
            className="clock-hand minute"
            style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: "100px 100px" }}
          />

          <circle cx="100" cy="100" r="10" className="clock-center-halo" style={{ opacity: pulseOpacity }} />
          <circle cx="100" cy="100" r="5" className="clock-center" />
        </svg>
      </div>
    </div>
  );
}
