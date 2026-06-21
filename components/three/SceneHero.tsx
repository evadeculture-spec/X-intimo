"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { modelLooks } from "@/data/models";
import { loadModelTexture } from "./placeholderTexture";

type Quality = "high" | "low";

/* ------------------------------------------------------------------ */
/* Fundo em degradê animado (warm)                                     */
/* ------------------------------------------------------------------ */
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
    vec3 base = mix(vec3(0.980,0.972,0.960), vec3(0.960,0.930,0.900), uv.y);
    float b1 = smoothstep(0.65, 0.0, distance(uv, vec2(0.30 + 0.10*sin(uTime*0.20), 0.35 + 0.10*cos(uTime*0.16))));
    float b2 = smoothstep(0.55, 0.0, distance(uv, vec2(0.75 + 0.10*cos(uTime*0.15), 0.62 + 0.10*sin(uTime*0.22))));
    vec3 col = base;
    col = mix(col, vec3(0.910, 0.550, 0.420), b1 * 0.38);
    col = mix(col, vec3(0.760, 0.180, 0.080), b2 * 0.22);
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

/* ------------------------------------------------------------------ */
/* Tecido / seda em movimento                                          */
/* ------------------------------------------------------------------ */
const silkVertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 1.5 + uTime * 0.6) * 0.45
            + sin(p.y * 2.0 + uTime * 0.8) * 0.30
            + sin((p.x + p.y) * 1.1 - uTime * 0.5) * 0.22;
    p.z += w;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const silkFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    float shade = 0.5 + vWave * 0.5;
    vec3 col = mix(uColorA, uColorB, clamp(vUv.y + vWave * 0.15, 0.0, 1.0));
    col += shade * 0.12;
    float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x)
               * smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    gl_FragColor = vec4(col, edge * 0.5);
  }
`;

function Silk({ quality }: { quality: Quality }) {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#E8755C") },
      uColorB: { value: new THREE.Color("#9A2A16") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });
  const seg = quality === "high" ? 80 : 40;
  return (
    <mesh position={[1.2, -0.4, -3]} rotation={[-0.35, -0.4, 0.25]} scale={6}>
      <planeGeometry args={[2.2, 2.2, seg, seg]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={silkVertex}
        fragmentShader={silkFragment}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Painéis de modelos (Lookbook flutuante)                             */
/* ------------------------------------------------------------------ */
// Painéis dispostos a emoldurar o texto central (uns à esquerda, outros à direita).
const PANEL_LAYOUT = [
  { position: [-3.5, 0.3, -0.4] as const, scale: 0.95, rot: 0.16, float: 1.1 },
  { position: [3.7, -0.2, -0.6] as const, scale: 0.92, rot: -0.16, float: 1.4 },
  { position: [-2.4, -1.7, -1.4] as const, scale: 0.6, rot: 0.2, float: 1.7 },
  { position: [2.7, 1.7, -1.6] as const, scale: 0.58, rot: -0.18, float: 1.9 },
];

function ModelPanels() {
  const looks = modelLooks.slice(0, PANEL_LAYOUT.length);
  const textures = useMemo(
    () =>
      looks.map((l) =>
        loadModelTexture({
          image: l.image,
          from: l.from,
          to: l.to,
          title: l.title,
          product: l.product,
        }),
      ),
    [looks],
  );

  return (
    <>
      {looks.map((look, i) => {
        const cfg = PANEL_LAYOUT[i];
        return (
          <Float
            key={look.id}
            speed={cfg.float}
            rotationIntensity={0.35}
            floatIntensity={0.9}
          >
            <group position={cfg.position} rotation={[0, cfg.rot, 0]} scale={cfg.scale}>
              {/* moldura / sombra atrás */}
              <mesh position={[0, 0, -0.06]}>
                <planeGeometry args={[1.72, 2.42]} />
                <meshBasicMaterial color="#1A1A1A" transparent opacity={0.12} />
              </mesh>
              {/* foto / placeholder */}
              <mesh>
                <planeGeometry args={[1.6, 2.3]} />
                <meshBasicMaterial map={textures[i]} toneMapped={false} />
              </mesh>
            </group>
          </Float>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Poeira / partículas                                                 */
/* ------------------------------------------------------------------ */
function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.0015 + Math.sin(t * 0.5 + i) * 0.0006;
      if (arr[i * 3 + 1] > 4.5) arr[i * 3 + 1] = -4.5;
    }
    geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#E8755C"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax com o rato + leve respiração                               */
/* ------------------------------------------------------------------ */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((state, dt) => {
    if (!group.current) return;
    const k = Math.min(1, dt * 2.2);
    group.current.rotation.y += (pointer.x * 0.18 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * k;
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
  });
  return <group ref={group}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/* Cena completa                                                       */
/* ------------------------------------------------------------------ */
export default function SceneHero({ quality = "high" }: { quality?: Quality }) {
  const dust = quality === "high" ? 220 : 90;
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.8] : [1, 1.3]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#FAF8F5"]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} />

      <Backdrop />

      <Rig>
        <Silk quality={quality} />
        <ModelPanels />
        <Dust count={dust} />
      </Rig>

      {quality === "high" && (
        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
