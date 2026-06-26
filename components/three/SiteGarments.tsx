"use client";

import { Canvas } from "@react-three/fiber";
import { FallingGarments } from "./FallingGarments";

/**
 * Camada de peças a cair para o site inteiro: canvas transparente, fixo atrás
 * de todo o conteúdo. Leve (poucas peças, sem pós-processamento).
 */
export default function SiteGarments({ quality }: { quality: "high" | "low" }) {
  const count = quality === "high" ? 7 : 4;
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.5] : [1, 1.2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <ambientLight intensity={1} />
      <FallingGarments count={count} area={17} sizeBase={1.5} />
    </Canvas>
  );
}
