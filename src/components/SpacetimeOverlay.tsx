import { physicsVisibility } from "../physics/relativity";

type Props = { progress: number; beta: number; reducedMotion: boolean };

/** S and S′ in a Minkowski (x, ct) diagram, c = 1.
 * The magenta worldline has |dx/d(ct)| = β < 1 and remains inside the cone.
 * The tilted S′ simultaneity slice satisfies ct = β x.
 */
export default function SpacetimeOverlay({ progress, beta, reducedMotion }: Props) {
  const visibility = reducedMotion ? 0.14 : physicsVisibility(progress) * 0.32;
  const eventT = reducedMotion ? 0 : -78 + 156 * Math.min(1, Math.max(0, progress / 0.78));
  const eventX = 135 + beta * eventT;
  const eventY = 150 - eventT;
  const startX = 135 - beta * 93;
  const endX = 135 + beta * 93;
  return (
    <div className="spacetime-overlay" style={{ opacity: visibility }} aria-hidden="true">
      <svg viewBox="0 0 270 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lightcone-future" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stopColor="#95c1fd" stopOpacity="0.2" />
            <stop offset="1" stopColor="#95c1fd" stopOpacity="0.015" />
          </linearGradient>
        </defs>
        <g stroke="#95c1fd" strokeWidth="0.65" opacity="0.18">
          {Array.from({ length: 5 }, (_, i) => <path key={`v${i}`} d={`M${35 + i * 50} 14 V282`} />)}
          {Array.from({ length: 6 }, (_, i) => <path key={`h${i}`} d={`M9 ${25 + i * 48} H259`} />)}
        </g>
        <path d="M135 150 L43 58 H227 Z" fill="url(#lightcone-future)" />
        <path d="M135 150 L43 242 H227 Z" fill="#95c1fd" fillOpacity="0.06" />
        <path d="M43 58 L135 150 L227 58 M43 242 L135 150 L227 242" fill="none" stroke="#95c1fd" strokeWidth="1.15" strokeOpacity="0.8" />
        <path d="M135 278 V17 M10 150 H258" fill="none" stroke="#c4ddff" strokeWidth="1" strokeOpacity="0.55" />
        <path d="M45 150 H225" stroke="#95c1fd" strokeWidth="1.2" strokeOpacity="0.75" />
        <path d={`M45 ${150 + beta * 90} L225 ${150 - beta * 90}`} stroke="#cd1b57" strokeOpacity="0.85" strokeWidth="1.4" strokeDasharray="4 4" />
        <path d={`M${startX} 243 L${endX} 57`} fill="none" stroke="#cd1b57" strokeWidth="2" strokeOpacity="0.92" />
        <circle cx={eventX} cy={eventY} r="4.8" fill="#f6a4c0" />
        <circle cx={eventX} cy={eventY} r="10" fill="none" stroke="#cd1b57" strokeOpacity="0.5" />
        <g fill="#c4ddff" fontSize="11" opacity="0.7">
          <text x="141" y="21">ct</text>
          <text x="251" y="144">x</text>
          <text x="17" y="139">S</text>
          <text x="223" y={140 - beta * 84} fill="#f6a4c0">S′</text>
        </g>
      </svg>
    </div>
  );
}
