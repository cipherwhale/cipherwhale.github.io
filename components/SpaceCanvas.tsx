"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BlackHole() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 0.7, -6]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#05050f" emissive="#180a30" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

export default function SpaceCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
        <ambientLight intensity={0.35} />
        <pointLight color="#00f0ff" intensity={10} position={[5, 4, 2]} />
        <pointLight color="#ff00aa" intensity={8} position={[-5, -3, -1]} />
        <Stars radius={180} depth={80} count={10000} factor={7} saturation={0} fade speed={0.5} />
        <BlackHole />
      </Canvas>
    </div>
  );
}
