import * as THREE from "three";
import type { Garment, GarmentType } from "@/data/garments";

/* Mistura uma cor hex em direção ao branco (amt>0) ou preto (amt<0). */
function shade(hex: string, amt: number): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt) / 100;
  const mix = (v: number) => Math.round((t - v) * p + v);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

const DIMS: Record<GarmentType, { w: number; h: number }> = {
  "pijama-top": { w: 460, h: 500 },
  "pijama-pants": { w: 380, h: 520 },
  sock: { w: 300, h: 380 },
  stocking: { w: 300, h: 520 },
  boxer: { w: 480, h: 360 },
  bra: { w: 480, h: 300 },
};

function fabric(ctx: CanvasRenderingContext2D, h: number, base: string) {
  const g = ctx.createLinearGradient(0, h * 0.08, 0, h * 0.96);
  g.addColorStop(0, shade(base, 20));
  g.addColorStop(0.5, base);
  g.addColorStop(1, shade(base, -26));
  return g;
}

function withShadow(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.shadowColor = "rgba(35, 18, 18, 0.30)";
  ctx.shadowBlur = Math.min(w, h) * 0.06;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.min(w, h) * 0.03;
}
function noShadow(ctx: CanvasRenderingContext2D) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

function seam(ctx: CanvasRenderingContext2D, base: string) {
  ctx.strokeStyle = shade(base, -34);
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
}

/* ----------------------------- desenhos ----------------------------- */
function drawPijamaTop(ctx: CanvasRenderingContext2D, base: string) {
  withShadow(ctx, 460, 500);
  ctx.fillStyle = fabric(ctx, 500, base);
  ctx.beginPath();
  ctx.moveTo(60, 155);
  ctx.lineTo(150, 120);
  ctx.lineTo(196, 138);
  ctx.lineTo(230, 188);
  ctx.lineTo(264, 138);
  ctx.lineTo(310, 120);
  ctx.lineTo(400, 155);
  ctx.lineTo(378, 214);
  ctx.lineTo(330, 198);
  ctx.lineTo(345, 432);
  ctx.quadraticCurveTo(230, 462, 115, 432);
  ctx.lineTo(130, 198);
  ctx.lineTo(82, 214);
  ctx.closePath();
  ctx.fill();
  noShadow(ctx);

  // gola
  ctx.fillStyle = shade(base, -18);
  ctx.beginPath();
  ctx.moveTo(196, 138);
  ctx.lineTo(230, 188);
  ctx.lineTo(212, 150);
  ctx.closePath();
  ctx.moveTo(264, 138);
  ctx.lineTo(230, 188);
  ctx.lineTo(248, 150);
  ctx.closePath();
  ctx.fill();

  // carcela + botões
  seam(ctx, base);
  ctx.beginPath();
  ctx.moveTo(230, 190);
  ctx.lineTo(230, 430);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = shade(base, 30);
  for (let y = 220; y <= 410; y += 48) {
    ctx.beginPath();
    ctx.arc(230, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // punhos
  seam(ctx, base);
  ctx.beginPath();
  ctx.moveTo(70, 175);
  ctx.lineTo(120, 158);
  ctx.moveTo(390, 175);
  ctx.lineTo(340, 158);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawPijamaPants(ctx: CanvasRenderingContext2D, base: string) {
  withShadow(ctx, 380, 520);
  ctx.fillStyle = fabric(ctx, 520, base);
  ctx.beginPath();
  ctx.moveTo(70, 132);
  ctx.lineTo(310, 132);
  ctx.lineTo(300, 470);
  ctx.quadraticCurveTo(255, 486, 212, 470);
  ctx.lineTo(196, 250);
  ctx.lineTo(184, 250);
  ctx.lineTo(168, 470);
  ctx.quadraticCurveTo(125, 486, 80, 470);
  ctx.closePath();
  ctx.fill();
  noShadow(ctx);

  // cós
  ctx.fillStyle = shade(base, -16);
  ctx.fillRect(70, 86, 240, 48);
  // seam central + bainhas
  seam(ctx, base);
  ctx.beginPath();
  ctx.moveTo(190, 134);
  ctx.lineTo(190, 250);
  ctx.moveTo(86, 458);
  ctx.lineTo(170, 458);
  ctx.moveTo(210, 458);
  ctx.lineTo(296, 458);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawSock(
  ctx: CanvasRenderingContext2D,
  base: string,
  legBottom: number,
  lace: boolean,
) {
  withShadow(ctx, 300, legBottom + 130);
  ctx.fillStyle = fabric(ctx, legBottom + 130, base);
  ctx.beginPath();
  ctx.moveTo(105, 72);
  ctx.lineTo(195, 72);
  ctx.lineTo(195, legBottom);
  ctx.quadraticCurveTo(252, legBottom, 256, legBottom + 16);
  ctx.lineTo(256, legBottom + 50);
  ctx.quadraticCurveTo(256, legBottom + 70, 234, legBottom + 70);
  ctx.quadraticCurveTo(150, legBottom + 80, 110, legBottom + 66);
  ctx.quadraticCurveTo(94, legBottom + 62, 100, legBottom + 40);
  ctx.lineTo(105, 72);
  ctx.closePath();
  ctx.fill();
  noShadow(ctx);

  // canelado do punho
  seam(ctx, base);
  for (let y = 80; y <= 120; y += 9) {
    ctx.beginPath();
    ctx.moveTo(105, y);
    ctx.lineTo(195, y);
    ctx.stroke();
  }
  // costura do calcanhar e da biqueira
  ctx.beginPath();
  ctx.arc(120, legBottom + 40, 22, -0.4, 1.4);
  ctx.moveTo(244, legBottom + 20);
  ctx.arc(238, legBottom + 35, 16, -1.2, 1.0);
  ctx.stroke();
  ctx.globalAlpha = 1;

  if (lace) {
    // renda no topo
    ctx.fillStyle = shade(base, 22);
    for (let x = 108; x < 196; x += 14) {
      ctx.beginPath();
      ctx.arc(x, 72, 7, Math.PI, 0);
      ctx.fill();
    }
  }
}

function drawBoxer(ctx: CanvasRenderingContext2D, base: string) {
  withShadow(ctx, 480, 360);
  ctx.fillStyle = fabric(ctx, 360, base);
  ctx.beginPath();
  ctx.moveTo(60, 118);
  ctx.lineTo(420, 118);
  ctx.lineTo(405, 300);
  ctx.quadraticCurveTo(360, 316, 300, 300);
  ctx.lineTo(286, 212);
  ctx.quadraticCurveTo(240, 238, 194, 212);
  ctx.lineTo(180, 300);
  ctx.quadraticCurveTo(120, 316, 75, 300);
  ctx.closePath();
  ctx.fill();
  noShadow(ctx);

  // cós com faixa
  ctx.fillStyle = shade(base, -20);
  ctx.fillRect(58, 70, 364, 50);
  ctx.fillStyle = shade(base, 34);
  ctx.fillRect(58, 92, 364, 6);
  // costuras das pernas
  seam(ctx, base);
  ctx.beginPath();
  ctx.moveTo(240, 120);
  ctx.lineTo(240, 205);
  ctx.moveTo(95, 292);
  ctx.lineTo(180, 286);
  ctx.moveTo(300, 286);
  ctx.lineTo(388, 292);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawBra(ctx: CanvasRenderingContext2D, base: string) {
  withShadow(ctx, 480, 300);
  ctx.fillStyle = fabric(ctx, 300, base);
  // taça esquerda
  ctx.beginPath();
  ctx.moveTo(112, 120);
  ctx.quadraticCurveTo(155, 88, 205, 116);
  ctx.lineTo(222, 168);
  ctx.quadraticCurveTo(165, 212, 112, 180);
  ctx.quadraticCurveTo(92, 152, 112, 120);
  ctx.closePath();
  ctx.fill();
  // taça direita (espelhada em x=240)
  ctx.beginPath();
  ctx.moveTo(368, 120);
  ctx.quadraticCurveTo(325, 88, 275, 116);
  ctx.lineTo(258, 168);
  ctx.quadraticCurveTo(315, 212, 368, 180);
  ctx.quadraticCurveTo(388, 152, 368, 120);
  ctx.closePath();
  ctx.fill();
  // banda
  ctx.fillStyle = shade(base, -14);
  ctx.beginPath();
  ctx.moveTo(60, 170);
  ctx.quadraticCurveTo(240, 196, 420, 170);
  ctx.lineTo(420, 196);
  ctx.quadraticCurveTo(240, 224, 60, 196);
  ctx.closePath();
  ctx.fill();
  noShadow(ctx);

  // alças
  seam(ctx, base);
  ctx.beginPath();
  ctx.moveTo(120, 120);
  ctx.quadraticCurveTo(80, 150, 70, 182);
  ctx.moveTo(360, 120);
  ctx.quadraticCurveTo(400, 150, 410, 182);
  ctx.stroke();
  // renda no topo das taças
  ctx.globalAlpha = 1;
  ctx.fillStyle = shade(base, 24);
  for (let x = 118; x < 206; x += 13) {
    ctx.beginPath();
    ctx.arc(x, 112, 6, Math.PI, 0);
    ctx.fill();
  }
  for (let x = 274; x < 362; x += 13) {
    ctx.beginPath();
    ctx.arc(x, 112, 6, Math.PI, 0);
    ctx.fill();
  }
}

/* Grão/trama de tecido pintado só sobre a silhueta já desenhada. */
function clothGrain(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save();
  ctx.globalCompositeOperation = "source-atop";

  // fios diagonais muito finos (efeito de malha)
  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  for (let d = -h; d < w; d += 4) {
    ctx.beginPath();
    ctx.moveTo(d, 0);
    ctx.lineTo(d + h, h);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = "#fff";
  for (let d = -h + 2; d < w; d += 4) {
    ctx.beginPath();
    ctx.moveTo(d, 0);
    ctx.lineTo(d + h, h);
    ctx.stroke();
  }

  // ruído pontual (fibras)
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function paint(ctx: CanvasRenderingContext2D, type: GarmentType, base: string) {
  switch (type) {
    case "pijama-top":
      return drawPijamaTop(ctx, base);
    case "pijama-pants":
      return drawPijamaPants(ctx, base);
    case "sock":
      return drawSock(ctx, base, 250, false);
    case "stocking":
      return drawSock(ctx, base, 392, true);
    case "boxer":
      return drawBoxer(ctx, base);
    case "bra":
      return drawBra(ctx, base);
  }
}

export interface GarmentTexture {
  texture: THREE.Texture;
  aspect: number;
}

/** Cria a textura (placeholder desenhado) de uma peça. */
export function makeGarmentTexture(type: GarmentType, color: string): GarmentTexture {
  const { w, h } = DIMS[type];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  paint(ctx, type, color);
  clothGrain(ctx, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return { texture, aspect: w / h };
}

let weaveCache: THREE.Texture | null = null;

/**
 * Trama de tecido repetível (grayscale) usada como bumpMap nos materiais —
 * dá o relevo fino de malha que faz o tecido reagir à luz de forma realista.
 */
export function makeWeaveBumpTexture(): THREE.Texture {
  if (weaveCache) return weaveCache;
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, s, s);

  // trama: fios horizontais e verticais alternados
  for (let y = 0; y < s; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? "#8e8e8e" : "#727272";
    ctx.fillRect(0, y, s, 2);
  }
  for (let x = 0; x < s; x += 4) {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = x % 8 === 0 ? "#8a8a8a" : "#767676";
    ctx.fillRect(x, 0, 2, s);
    ctx.globalAlpha = 1;
  }
  // fibras irregulares
  for (let i = 0; i < 1400; i++) {
    const v = 118 + Math.floor(Math.random() * 24);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(Math.random() * s, Math.random() * s, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  weaveCache = texture;
  return texture;
}

/** Carrega o PNG real (se existir) por cima do placeholder; senão mantém o placeholder. */
export function loadGarmentTexture(g: Garment): GarmentTexture {
  const placeholder = makeGarmentTexture(g.type, g.color);
  if (g.image) {
    const loader = new THREE.TextureLoader();
    loader.load(
      g.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        placeholder.texture.image = tex.image;
        placeholder.texture.needsUpdate = true;
      },
      undefined,
      () => {
        /* mantém placeholder em caso de erro */
      },
    );
  }
  return placeholder;
}
