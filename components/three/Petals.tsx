"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { FLOWER_PALETTE, makePetalGeometry } from "./petalGeometry";

interface PetalState {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  vr: number;
  fall: number;
  sway: number;
  swayAmp: number;
  flutter: number;
  phase: number;
  scale: number;
}

/** Pétalas realistas a cair com flutter natural (instanced — uma só draw call). */
export function Petals({
  count = 28,
  area = 13,
  opacity = 0.94,
}: {
  count?: number;
  area?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makePetalGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        roughness: 0.5,
        metalness: 0,
        vertexColors: true,
        transparent: true,
        opacity,
      }),
    [opacity],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo<PetalState[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * area,
        y: (Math.random() - 0.5) * area,
        z: (Math.random() - 0.5) * 5 - 1,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        fall: 0.16 + Math.random() * 0.26, // queda lenta e elegante
        sway: 0.3 + Math.random() * 0.7,
        swayAmp: 0.3 + Math.random() * 0.55,
        flutter: 0.5 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        scale: 0.55 + Math.random() * 0.7, // pétalas maiores
      })),
    [count, area],
  );

  // Cor (tom) por instância — multiplica com o gradiente de sombreado da pétala.
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.set(FLOWER_PALETTE[i % FLOWER_PALETTE.length]);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame((state, dt) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const half = area / 2;
    for (let i = 0; i < count; i++) {
      const p = data[i];
      p.y -= p.fall * dt;
      if (p.y < -half) {
        p.y = half;
        p.x = (Math.random() - 0.5) * area;
      }
      const x = p.x + Math.sin(t * p.sway + p.phase) * p.swayAmp;
      dummy.position.set(x, p.y, p.z);
      // tombo lento + flutter (oscilação) como uma pétala real a planar
      dummy.rotation.set(
        p.rx + t * p.vr + Math.sin(t * p.flutter + p.phase) * 0.5,
        p.ry + t * p.vr * 0.6,
        p.rz + Math.sin(t * p.flutter * 0.7 + p.phase) * 0.4,
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}
