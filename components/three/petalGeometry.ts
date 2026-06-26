import * as THREE from "three";

/**
 * Geometria de uma pétala realista: silhueta natural com curvatura (cup) e
 * pontas ligeiramente recurvadas, mais um gradiente vertex (base mais escura,
 * ponta mais clara) para um sombreado natural e premium.
 * Base na origem, a pétala aponta para +Y — serve para pétalas soltas e flores.
 */
export function makePetalGeometry(): THREE.BufferGeometry {
  const uSeg = 12; // base -> ponta
  const vSeg = 8; // lado a lado
  const L = 1.0;
  const halfW = 0.4;

  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= uSeg; i++) {
    const u = i / uSeg;
    // perfil de largura (estreito na base e na ponta, largo a meio)
    const wU = Math.pow(Math.sin(Math.PI * u), 0.62);
    for (let j = 0; j <= vSeg; j++) {
      const v = -1 + 2 * (j / vSeg);
      const x = v * halfW * wU;
      const y = u * L;
      // volume: cup longitudinal + bordos recurvados + ponta a inclinar
      const z =
        -0.16 * Math.sin(Math.PI * u) +
        0.26 * (v * v) * wU +
        0.1 * u * u;
      positions.push(x, y, z);

      // gradiente de sombreado: base ~0.5, ponta ~1.0; bordos ligeiramente mais escuros
      const tip = 0.5 + 0.5 * u;
      const edge = 1 - 0.16 * (v * v);
      const g = Math.min(1, tip * edge * 1.04);
      colors.push(g, g, g);
    }
  }

  const row = vSeg + 1;
  for (let i = 0; i < uSeg; i++) {
    for (let j = 0; j < vSeg; j++) {
      const a = i * row + j;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Paleta de vermelhos profundos (vinho / bordô / carmim) — sóbria, intimista
 * e premium. Multiplica com o gradiente de sombreado da pétala.
 */
export const FLOWER_PALETTE = [
  "#6E0F1C",
  "#8A2433",
  "#511019",
  "#A0303F",
  "#761522",
];
