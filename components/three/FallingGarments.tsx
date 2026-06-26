"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { garments } from "@/data/garments";
import { loadGarmentTexture } from "./garmentTexture";

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

/**
 * Peças de vestuário a cair pelo ecrã, como planos 3D texturados (recortes).
 * Cada peça tomba/baloiça suavemente com leve inclinação 3D + parallax.
 * Com PNGs reais (data/garments.ts) fica hiper-realista.
 */
export function FallingGarments({
  count = 12,
  area = 12,
  sizeBase = 1.6,
}: {
  count?: number;
  area?: number;
  sizeBase?: number;
}) {
  // Uma textura + material por peça (reutilizados entre cópias).
  const items = useMemo(() => {
    return garments.map((g) => {
      const { texture, aspect } = loadGarmentTexture(g);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.22,
        side: THREE.DoubleSide,
        toneMapped: false,
        depthWrite: true,
      });
      return { material, aspect };
    });
  }, []);

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const drops = useMemo<Drop[]>(() => {
    const r = () => Math.random();
    return Array.from({ length: count }, (_, i) => ({
      item: i % items.length,
      x: (r() - 0.5) * area,
      y: (r() - 0.5) * area,
      z: (r() - 0.5) * 4 - 1,
      rz: r() * Math.PI * 2,
      rzv: (r() - 0.5) * 0.25,
      fall: 0.1 + r() * 0.18,
      sway: 0.18 + r() * 0.45,
      swayAmp: 0.3 + r() * 0.55,
      flutter: 0.35 + r() * 0.6,
      phase: r() * Math.PI * 2,
      size: sizeBase * (0.7 + r() * 0.55),
      tiltX: (r() - 0.5) * 0.4,
      tiltY: (r() - 0.5) * 0.6,
    }));
  }, [count, area, sizeBase, items.length]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const half = area / 2;
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      const m = meshRefs.current[i];
      if (!m) continue;
      d.y -= d.fall * dt;
      if (d.y < -half) {
        d.y = half;
        d.x = (Math.random() - 0.5) * area;
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
      {drops.map((d, i) => {
        const it = items[d.item];
        return (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            geometry={geometry}
            material={it.material}
            position={[d.x, d.y, d.z]}
            scale={[it.aspect * d.size, d.size, 1]}
          />
        );
      })}
    </group>
  );
}
