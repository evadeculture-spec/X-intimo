import * as THREE from "three";

/**
 * Geometria de uma pétala (inspirada nas flores de kalanchoe da marca).
 * Base na origem, a pétala aponta para +Y — assim serve tanto para pétalas
 * soltas a cair como para montar flores (pétalas a irradiar do centro).
 */
export function makePetalGeometry(): THREE.ShapeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.42, 0.12, 0.34, 0.78, 0, 0.95);
  s.bezierCurveTo(-0.34, 0.78, -0.42, 0.12, 0, 0);
  const g = new THREE.ShapeGeometry(s, 14);
  g.scale(0.5, 0.5, 0.5);
  return g;
}

/** Paleta vermelho vivo (com leve variação quente) inspirada nas flores da marca. */
export const FLOWER_PALETTE = [
  "#E11900",
  "#D6001C",
  "#FF2A1A",
  "#C20012",
  "#F0330F",
];
