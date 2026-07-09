"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface SilkUniforms {
  uTime: { value: number };
  uSeed: { value: number };
  uAmp: { value: number };
  uSpeed: { value: number };
}

/**
 * Cetim/seda realista: um plano com muitas subdivisões que ondula devagar
 * como tecido pendurado, com as normais recalculadas para os brilhos de
 * cetim deslizarem pelas dobras. Sem texturas — só luz e material físico.
 */
function makeSilkMaterial(color: string, uniforms: SilkUniforms) {
  const base = new THREE.Color(color);
  const material = new THREE.MeshPhysicalMaterial({
    color: base,
    roughness: 0.48,
    metalness: 0,
    sheen: 1,
    sheenRoughness: 0.38,
    sheenColor: base.clone().lerp(new THREE.Color("#ffffff"), 0.6),
    envMapIntensity: 0.85,
    side: THREE.DoubleSide,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uSeed = uniforms.uSeed;
    shader.uniforms.uAmp = uniforms.uAmp;
    shader.uniforms.uSpeed = uniforms.uSpeed;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        /* glsl */ `#include <common>
        uniform float uTime;
        uniform float uSeed;
        uniform float uAmp;
        uniform float uSpeed;

        // dobras verticais dominantes (cortina) + respiração lenta
        float silkZ(vec2 p, float t, float s) {
          float w =
              sin(p.x * 0.85 + t * 0.50 + s) * 0.55
            + sin(p.x * 1.60 - t * 0.34 + s * 1.7) * cos(p.y * 0.55 + t * 0.40) * 0.30
            + sin(p.y * 1.10 + t * 0.55 + s * 0.6) * 0.15;
          return w * uAmp;
        }
        `,
      )
      .replace(
        "#include <beginnormal_vertex>",
        /* glsl */ `#include <beginnormal_vertex>
        {
          float e = 0.12;
          vec2 p2 = position.xy;
          float t2 = uTime * uSpeed;
          float z0 = silkZ(p2, t2, uSeed);
          float zx = silkZ(p2 + vec2(e, 0.0), t2, uSeed);
          float zy = silkZ(p2 + vec2(0.0, e), t2, uSeed);
          objectNormal = normalize(vec3(-(zx - z0) / e, -(zy - z0) / e, 1.0));
        }
        `,
      )
      .replace(
        "#include <begin_vertex>",
        /* glsl */ `#include <begin_vertex>
        transformed.z += silkZ(position.xy, uTime * uSpeed, uSeed);
        `,
      );
  };
  material.customProgramCacheKey = () => "silk-drape";

  return material;
}

export function SilkDrape({
  color,
  width,
  height,
  position,
  rotation = [0, 0, 0],
  amp = 0.55,
  speed = 1,
  seed = 0,
  segments = 72,
}: {
  color: string;
  width: number;
  height: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  amp?: number;
  speed?: number;
  seed?: number;
  segments?: number;
}) {
  const uniforms = useMemo<SilkUniforms>(
    () => ({
      uTime: { value: 0 },
      uSeed: { value: seed },
      uAmp: { value: amp },
      uSpeed: { value: speed },
    }),
    [seed, amp, speed],
  );

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(width, height, segments, segments),
    [width, height, segments],
  );
  const material = useMemo(
    () => makeSilkMaterial(color, uniforms),
    [color, uniforms],
  );

  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
    />
  );
}
