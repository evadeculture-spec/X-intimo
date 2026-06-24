"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Petals } from "./Petals";
import { Flowers } from "./Flowers";

type Quality = "high" | "low";

/* ------------------------------------------------------------------ */
/* Fundo em degradê quente e aconchegante                              */
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
    // creme quente -> blush suave
    vec3 base = mix(vec3(0.992, 0.976, 0.965), vec3(0.980, 0.918, 0.886), uv.y);
    float b1 = smoothstep(0.7, 0.0, distance(uv, vec2(0.28 + 0.10*sin(uTime*0.18), 0.32 + 0.10*cos(uTime*0.15))));
    float b2 = smoothstep(0.6, 0.0, distance(uv, vec2(0.78 + 0.09*cos(uTime*0.13), 0.66 + 0.09*sin(uTime*0.20))));
    vec3 col = base;
    col = mix(col, vec3(0.945, 0.620, 0.520), b1 * 0.34); // blush coral
    col = mix(col, vec3(0.870, 0.380, 0.300), b2 * 0.20); // coral mais quente
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
/* Tecido / seda suave (camada "conforto" muito subtil)                */
/* ------------------------------------------------------------------ */
const silkVertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 1.4 + uTime * 0.5) * 0.4
            + sin(p.y * 1.9 + uTime * 0.7) * 0.28
            + sin((p.x + p.y) * 1.0 - uTime * 0.4) * 0.2;
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
    vec3 col = mix(uColorA, uColorB, clamp(vUv.y + vWave * 0.15, 0.0, 1.0));
    col += (0.5 + vWave * 0.5) * 0.1;
    float edge = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x)
               * smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
    gl_FragColor = vec4(col, edge * 0.32);
  }
`;

function Silk({ quality }: { quality: Quality }) {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#F6B5A6") },
      uColorB: { value: new THREE.Color("#C0392B") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });
  const seg = quality === "high" ? 70 : 36;
  return (
    <mesh position={[0.6, -0.6, -3.5]} rotation={[-0.35, -0.3, 0.2]} scale={7}>
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
/* Poeira luminosa                                                     */
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
      arr[i * 3 + 1] += 0.0014 + Math.sin(t * 0.5 + i) * 0.0005;
      if (arr[i * 3 + 1] > 4.5) arr[i * 3 + 1] = -4.5;
    }
    geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        color="#F6B5A6"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax suave com o rato                                           */
/* ------------------------------------------------------------------ */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((state, dt) => {
    if (!group.current) return;
    const k = Math.min(1, dt * 2);
    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.1 - group.current.rotation.x) * k;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/* Cena                                                                */
/* ------------------------------------------------------------------ */
export default function SceneHero({ quality = "high" }: { quality?: Quality }) {
  const dust = quality === "high" ? 180 : 70;
  const petals = quality === "high" ? 44 : 18;

  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.8] : [1, 1.3]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#FBF6F1"]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <pointLight position={[-4, 2, 3]} intensity={18} color="#F6B5A6" distance={20} />

      <Backdrop />

      <Rig>
        <Silk quality={quality} />
        <Flowers />
      </Rig>

      <Petals count={petals} />
      <Dust count={dust} />

      {quality === "high" && (
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.22} darkness={0.5} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
