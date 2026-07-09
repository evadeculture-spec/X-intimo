"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Iluminação de ambiente gerada localmente (sem HDRs externos): um "estúdio"
 * virtual pré-filtrado que dá reflexos e sheen realistas aos tecidos.
 */
export function EnvLight() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new RoomEnvironment();
    const env = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

/**
 * Setup de estúdio: luz principal quente, preenchimento suave e contra-luz
 * fria — o clássico esquema de 3 pontos de fotografia de produto.
 */
export function StudioLights({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <hemisphereLight args={["#fff6ec", "#c9b0a2", 0.5 * intensity]} />
      <directionalLight
        position={[4, 7, 6]}
        intensity={2.1 * intensity}
        color="#fff1e0"
      />
      <directionalLight
        position={[-5, 2, 3]}
        intensity={0.55 * intensity}
        color="#f6d9cb"
      />
      <directionalLight
        position={[0, -3, -6]}
        intensity={0.8 * intensity}
        color="#e8d5ff"
      />
    </>
  );
}
