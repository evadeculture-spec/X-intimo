"use client";

import { Canvas } from "@react-three/fiber";
import { Petals } from "./Petals";

/**
 * Camada de pétalas para o site inteiro: canvas transparente, fixo por trás de
 * todo o conteúdo. Propositadamente leve — só pétalas (instanced), sem
 * pós-processamento — para correr em todas as secções sem pesar.
 */
export default function SitePetals({ quality }: { quality: "high" | "low" }) {
  const count = quality === "high" ? 18 : 9;
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.5] : [1, 1.2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <Petals count={count} area={17} opacity={0.8} />
    </Canvas>
  );
}
