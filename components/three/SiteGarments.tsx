"use client";

import { Canvas } from "@react-three/fiber";
import { FallingGarments } from "./FallingGarments";
import { EnvLight, StudioLights } from "./Lighting";

/**
 * Camada de peças a cair para o site inteiro: canvas transparente, fixo atrás
 * de todo o conteúdo. Leve (poucas peças, sem pós-processamento), mas com a
 * mesma iluminação realista do hero para o tecido reagir à luz.
 */
export default function SiteGarments({ quality }: { quality: "high" | "low" }) {
  const high = quality === "high";
  const count = high ? 7 : 4;
  return (
    <Canvas
      dpr={high ? [1, 1.5] : [1, 1.2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <EnvLight />
      <StudioLights intensity={0.85} />
      <FallingGarments
        count={count}
        area={17}
        sizeBase={1.5}
        segments={high ? 24 : 16}
      />
    </Canvas>
  );
}
