import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo } from "react";

type Props = { beta?: number; reducedMotion?: boolean };

function detectMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

/** Low-key stellar color cues. The color and shift are artistic hints at the
 * Doppler/aberration effects, not a full spectral relativistic rendering.
 */
export default function SpaceBackground({ beta = 0, reducedMotion = false }: Props) {
  const mobile = detectMobile();
  const starCount = useMemo(() => (mobile ? 2000 : 10000), [mobile]);
  const shift = reducedMotion ? 0 : beta;

  return (
    <div className="fixed inset-0 -z-10 opacity-90" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }} dpr={mobile ? 1 : [1, 1.5]}>
        <ambientLight intensity={0.45} />
        <pointLight intensity={8} position={[3, 4, 3]} color="#00f0ff" />
        <Stars
          radius={120}
          depth={70}
          count={starCount}
          factor={mobile ? 3 : 5}
          saturation={0.1 + shift * 0.055}
          fade
          speed={reducedMotion ? 0 : 0.35}
        />
      </Canvas>
      <div
        className="doppler-starlight"
        style={{
          opacity: shift * 0.28,
          transform: `translate3d(${shift * 1.5}vw, 0, 0)`,
        }}
      />
    </div>
  );
}
