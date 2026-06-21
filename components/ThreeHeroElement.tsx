"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

/**
 * Elemento 3D leve do hero: um anel + esfera suave inspirados no círculo do logótipo,
 * que flutuam lentamente. Sem texturas/HDR externos para manter a performance.
 *
 * É carregado dinamicamente e só em ecrãs grandes (ver Hero.tsx),
 * com fallback estático em mobile / prefers-reduced-motion.
 */
export default function ThreeHeroElement() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#E8755C" />

        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
          <mesh rotation={[0.5, 0.2, 0]}>
            <torusGeometry args={[1.45, 0.42, 48, 120]} />
            <MeshDistortMaterial
              color="#C1351D"
              distort={0.28}
              speed={1.3}
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>
        </Float>

        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.6}>
          <mesh position={[1.7, 1.1, 0.4]}>
            <sphereGeometry args={[0.42, 48, 48]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
          </mesh>
        </Float>

        <Float speed={1.7} rotationIntensity={0.3} floatIntensity={1.3}>
          <mesh position={[-1.8, -1.1, 0.2]}>
            <sphereGeometry args={[0.28, 48, 48]} />
            <meshStandardMaterial color="#E8755C" roughness={0.4} />
          </mesh>
        </Float>
      </Suspense>
    </Canvas>
  );
}
