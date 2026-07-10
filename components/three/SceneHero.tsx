"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { SilkDrape } from "./SilkDrape";
import { EnvLight, StudioLights } from "./Lighting";

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
    float b1 = smoothstep(0.72, 0.0, distance(uv, vec2(0.28 + 0.05*sin(uTime*0.08), 0.32 + 0.05*cos(uTime*0.07))));
    float b2 = smoothstep(0.62, 0.0, distance(uv, vec2(0.78 + 0.04*cos(uTime*0.06), 0.66 + 0.04*sin(uTime*0.09))));
    vec3 col = base;
    col = mix(col, vec3(0.820, 0.560, 0.510), b1 * 0.16); // areia rosada subtil
    col = mix(col, vec3(0.470, 0.130, 0.150), b2 * 0.12); // vinho muito leve
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
    <mesh position={[0, 0, -9]} scale={[40, 26, 1]}>
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

/* Parallax muito suave com o rato — presença, não espetáculo. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((state, dt) => {
    if (!group.current) return;
    const k = Math.min(1, dt * 1.5);
    group.current.rotation.y += (pointer.x * 0.06 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.035 - group.current.rotation.x) * k;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.03;
  });
  return <group ref={group}>{children}</group>;
}

/**
 * Cena intimista: cortinas de cetim em tons quentes a respirar devagar,
 * como um quarto ao fim da tarde — luz suave, dobras reais, nada gráfico.
 */
export default function SceneHero({ quality = "high" }: { quality?: Quality }) {
  const high = quality === "high";
  const seg = high ? 84 : 48;

  return (
    <Canvas
      dpr={high ? [1, 2] : [1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#FBF6F1"]} />

      <EnvLight />
      <StudioLights intensity={0.9} />

      <Backdrop />

      <Rig>
        {/* pano de fundo em linho-creme, ocupa o cenário todo */}
        <SilkDrape
          color="#F2E4D8"
          width={30}
          height={18}
          position={[0, 0, -5]}
          amp={0.8}
          speed={0.75}
          seed={0.4}
          segments={seg}
        />
        {/* cetim rosado a cair do lado direito */}
        <SilkDrape
          color="#D3A192"
          width={9}
          height={17}
          position={[5.6, 0, -3]}
          rotation={[0, -0.38, -0.06]}
          amp={0.55}
          speed={1}
          seed={2.3}
          segments={seg}
        />
        {/* apontamento de vinho na margem esquerda */}
        <SilkDrape
          color="#6E1B26"
          width={6.5}
          height={16}
          position={[-6.1, 0.3, -3.4]}
          rotation={[0, 0.42, 0.08]}
          amp={0.5}
          speed={0.85}
          seed={4.1}
          segments={seg}
        />

        {/* poeira fina apanhada pela luz, quase impercetível */}
        <Sparkles
          count={high ? 40 : 18}
          scale={[12, 7, 4]}
          size={1.7}
          speed={0.12}
          opacity={0.28}
          color="#e6c8b4"
        />
      </Rig>

      {high && (
        <EffectComposer>
          <Bloom
            intensity={0.18}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.16} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
