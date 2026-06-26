"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { makePetalGeometry } from "./petalGeometry";

/** Uma flor estilizada (5 pétalas a irradiar + miolo), como as da fotografia. */
function Flower({
  color,
  center = "#D9B68A",
  spin = 0.12,
}: {
  color: string;
  center?: string;
  spin?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => makePetalGeometry(), []);
  const petalCount = 5;

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += spin * dt;
  });

  return (
    <group ref={ref}>
      {Array.from({ length: petalCount }).map((_, i) => (
        <mesh
          key={i}
          geometry={geometry}
          rotation={[0, 0, (i / petalCount) * Math.PI * 2]}
        >
          <meshStandardMaterial
            color={color}
            vertexColors
            side={THREE.DoubleSide}
            roughness={0.5}
            metalness={0}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={center} roughness={0.45} />
      </mesh>
    </group>
  );
}

const LAYOUT = [
  { position: [-3.7, 0.7, -0.6] as const, scale: 0.95, color: "#6E0F1C", spin: 0.12, float: 0.9 },
  { position: [3.8, 0.2, -0.9] as const, scale: 1.05, color: "#8A2433", spin: -0.1, float: 1.1 },
  { position: [-2.7, -1.9, -1.3] as const, scale: 0.72, color: "#A0303F", spin: 0.14, float: 1.3 },
  { position: [2.9, 1.9, -1.6] as const, scale: 0.64, color: "#511019", spin: -0.13, float: 1.5 },
  { position: [0.2, -2.4, -2] as const, scale: 0.56, color: "#761522", spin: 0.1, float: 1.7 },
];

/** Conjunto de flores a flutuar, a emoldurar o texto central. */
export function Flowers() {
  return (
    <>
      {LAYOUT.map((f, i) => (
        <Float key={i} speed={f.float} rotationIntensity={0.35} floatIntensity={0.9}>
          <group position={f.position} scale={f.scale}>
            <Flower color={f.color} spin={f.spin} />
          </group>
        </Float>
      ))}
    </>
  );
}
