"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { garments } from "@/data/garments";
import { loadGarmentTexture, makeWeaveBumpTexture } from "./garmentTexture";

interface Drop {
  item: number;
  x: number;
  y: number;
  z: number;
  rz: number;
  rzv: number;
  fall: number;
  sway: number;
  swayAmp: number;
  flutter: number;
  phase: number;
  size: number;
  tiltX: number;
  tiltY: number;
}

interface ClothUniforms {
  uTime: { value: number };
  uSeed: { value: number };
  uAmp: { value: number };
}

/**
 * Simulação de pano no vertex shader: cada peça ondula como tecido ao vento
 * (as extremidades esvoaçam mais do que o centro) e as normais são
 * recalculadas para a luz "acompanhar" as dobras — é isto que dá o realismo.
 */
function makeClothMaterial(
  map: THREE.Texture,
  baseColor: string,
  uniforms: ClothUniforms,
): THREE.MeshPhysicalMaterial {
  const sheenColor = new THREE.Color(baseColor).lerp(
    new THREE.Color("#ffffff"),
    0.55,
  );

  const material = new THREE.MeshPhysicalMaterial({
    map,
    bumpMap: makeWeaveBumpTexture(),
    bumpScale: 0.6,
    roughness: 0.86,
    metalness: 0,
    sheen: 1,
    sheenRoughness: 0.5,
    sheenColor,
    envMapIntensity: 0.7,
    transparent: true,
    alphaTest: 0.22,
    side: THREE.DoubleSide,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uSeed = uniforms.uSeed;
    shader.uniforms.uAmp = uniforms.uAmp;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        /* glsl */ `#include <common>
        uniform float uTime;
        uniform float uSeed;
        uniform float uAmp;

        float clothZ(vec2 p, float t, float s) {
          // centro mais "preso", extremidades a esvoaçar
          float edge = 0.4 + 2.2 * dot(p, p);
          float w =
              sin(p.x * 5.3 + t * 1.35 + s) * cos(p.y * 3.9 + t * 0.95 + s * 1.7) * 0.55
            + sin((p.x + p.y) * 7.1 - t * 1.75 + s * 2.3) * 0.28
            + sin(p.y * 9.4 + t * 2.25 + s * 0.6) * 0.17;
          return w * edge * uAmp;
        }
        `,
      )
      .replace(
        "#include <beginnormal_vertex>",
        /* glsl */ `#include <beginnormal_vertex>
        {
          float e = 0.02;
          vec2 p2 = position.xy;
          float z0 = clothZ(p2, uTime, uSeed);
          float zx = clothZ(p2 + vec2(e, 0.0), uTime, uSeed);
          float zy = clothZ(p2 + vec2(0.0, e), uTime, uSeed);
          objectNormal = normalize(vec3(-(zx - z0) / e, -(zy - z0) / e, 1.0));
        }
        `,
      )
      .replace(
        "#include <begin_vertex>",
        /* glsl */ `#include <begin_vertex>
        transformed.z += clothZ(position.xy, uTime, uSeed);
        `,
      );
  };
  // materiais com o mesmo shader partilham o mesmo programa compilado
  material.customProgramCacheKey = () => "cloth-garment";

  return material;
}

/**
 * Peças de vestuário a cair pelo ecrã como panos 3D: tecido que ondula ao
 * vento, com trama em relevo, sheen de fibra e iluminação de estúdio.
 * Com PNGs reais (data/garments.ts) fica ainda mais hiper-realista.
 */
export function FallingGarments({
  count = 12,
  area = 12,
  sizeBase = 1.6,
  segments = 28,
  clearCenter = false,
}: {
  count?: number;
  area?: number;
  sizeBase?: number;
  segments?: number;
  /** Empurra as peças para as laterais (deixa o centro livre para o texto). */
  clearCenter?: boolean;
}) {
  // Uma textura por tipo de peça (reutilizada entre cópias).
  const items = useMemo(() => {
    return garments.map((g) => ({
      ...loadGarmentTexture(g),
      color: g.color,
    }));
  }, []);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(1, 1, segments, segments),
    [segments],
  );
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const drops = useMemo<Drop[]>(() => {
    const r = () => Math.random();
    const rx = () => {
      const v = (r() - 0.5) * area;
      if (!clearCenter) return v;
      const sign = v < 0 ? -1 : 1;
      return sign * (area * 0.22 + Math.abs(v) * 0.56);
    };
    return Array.from({ length: count }, (_, i) => ({
      item: i % items.length,
      x: rx(),
      y: (r() - 0.5) * area,
      z: (r() - 0.5) * 4 - 1,
      rz: r() * Math.PI * 2,
      rzv: (r() - 0.5) * 0.22,
      fall: 0.1 + r() * 0.18,
      sway: 0.18 + r() * 0.45,
      swayAmp: 0.3 + r() * 0.55,
      flutter: 0.35 + r() * 0.6,
      phase: r() * Math.PI * 2,
      size: sizeBase * (0.7 + r() * 0.55),
      tiltX: (r() - 0.5) * 0.4,
      tiltY: (r() - 0.5) * 0.6,
    }));
  }, [count, area, sizeBase, items.length, clearCenter]);

  // Material próprio por peça (uniforms independentes → cada pano ondula ao seu ritmo).
  const clothes = useMemo(() => {
    return drops.map((d) => {
      const uniforms: ClothUniforms = {
        uTime: { value: 0 },
        uSeed: { value: d.phase * 7.3 },
        uAmp: { value: 0.05 + d.size * 0.02 },
      };
      const it = items[d.item];
      return {
        material: makeClothMaterial(it.texture, it.color, uniforms),
        uniforms,
        aspect: it.aspect,
      };
    });
  }, [drops, items]);

  useEffect(() => {
    return () => {
      clothes.forEach((c) => c.material.dispose());
      geometry.dispose();
    };
  }, [clothes, geometry]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const half = area / 2;
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      const m = meshRefs.current[i];
      if (!m) continue;
      clothes[i].uniforms.uTime.value = t;
      d.y -= d.fall * dt;
      if (d.y < -half) {
        d.y = half;
        let nx = (Math.random() - 0.5) * area;
        if (clearCenter) {
          nx = (nx < 0 ? -1 : 1) * (area * 0.22 + Math.abs(nx) * 0.56);
        }
        d.x = nx;
      }
      const x = d.x + Math.sin(t * d.sway + d.phase) * d.swayAmp;
      m.position.set(x, d.y, d.z);
      m.rotation.set(
        d.tiltX + Math.sin(t * d.flutter + d.phase) * 0.22,
        d.tiltY + Math.sin(t * d.flutter * 0.6 + d.phase) * 0.38,
        d.rz + t * d.rzv,
      );
    }
  });

  return (
    <group>
      {drops.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={geometry}
          material={clothes[i].material}
          position={[d.x, d.y, d.z]}
          scale={[clothes[i].aspect * d.size, d.size, 1]}
        />
      ))}
    </group>
  );
}
