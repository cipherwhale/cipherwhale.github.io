import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo } from "react";

function detectMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

export default function SpaceBackground() {
  const mobile = detectMobile();
  const starCount = useMemo(() => (mobile ? 2000 : 10000), [mobile]);

  return (
    <div className="fixed inset-0 -z-10 opacity-90">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }} dpr={mobile ? 1 : [1, 1.5]}>
        <ambientLight intensity={0.45} />
        <pointLight intensity={8} position={[3, 4, 3]} color="#00f0ff" />
        <Stars radius={120} depth={70} count={starCount} factor={mobile ? 3 : 5} saturation={0.1} fade speed={0.35} />
      </Canvas>
    </div>
  );
}
