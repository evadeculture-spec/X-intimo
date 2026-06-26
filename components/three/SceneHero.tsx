"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { FallingGarments } from "./FallingGarments";

type Quality = "high" | "low";

/* Fundo em degradê quente, sóbrio e intimista. */
const backdropVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const backdropFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    vec3 base = mix(vec3(0.988, 0.972, 0.960), vec3(0.958, 0.916, 0.892), uv.y);
    float b1 = smoothstep(0.72, 0.0, distance(uv, vec2(0.28 + 0.09*sin(uTime*0.15), 0.32 + 0.09*cos(uTime*0.13))));
    float b2 = smoothstep(0.62, 0.0, distance(uv, vec2(0.78 + 0.08*cos(uTime*0.12), 0.66 + 0.08*sin(uTime*0.18))));
    vec3 col = base;
    col = mix(col, vec3(0.820, 0.560, 0.510), b1 * 0.18); // areia rosada subtil
    col = mix(col, vec3(0.470, 0.130, 0.150), b2 * 0.14); // vinho muito leve
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Backdrop() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh position={[0, 0, -7]} scale={[34, 22, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={backdropVertex}
        fragmentShader={backdropFragment}
        depthWrite={false}
      />
    </mesh>
  );
}

/* Parallax suave com o rato. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((state, dt) => {
    if (!group.current) return;
    const k = Math.min(1, dt * 2);
    group.current.rotation.y += (pointer.x * 0.14 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.08 - group.current.rotation.x) * k;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
  });
  return <group ref={group}>{children}</group>;
}

export default function SceneHero({ quality = "high" }: { quality?: Quality }) {
  const count = quality === "high" ? 11 : 6;

  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.8] : [1, 1.3]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#FBF6F1"]} />
      <ambientLight intensity={1} />

      <Backdrop />

      <Rig>
        <FallingGarments count={count} area={11} sizeBase={1.7} />
      </Rig>

      {quality === "high" && (
        <EffectComposer>
          <Vignette eskil={false} offset={0.18} darkness={0.62} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
