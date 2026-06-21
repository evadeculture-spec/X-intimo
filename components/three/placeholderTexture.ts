import * as THREE from "three";

/**
 * Gera uma textura-placeholder elegante (silhueta de modelo + etiqueta) num <canvas>.
 * É usada apenas enquanto não existir fotografia real (ver data/models.ts).
 * Assim mostramos algo bonito e honesto, claramente marcado como placeholder.
 */
export function makeModelPlaceholderTexture(opts: {
  from: string;
  to: string;
  title: string;
  product: string;
}): THREE.CanvasTexture {
  const w = 512;
  const h = 720;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Fundo em degradê
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, opts.from);
  grad.addColorStop(1, opts.to);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Brilho suave no topo
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.32, 20, w * 0.5, h * 0.32, 360);
  glow.addColorStop(0, "rgba(255,255,255,0.35)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Silhueta estilizada de modelo
  ctx.fillStyle = "rgba(26,26,26,0.16)";
  // cabeça
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.3, 62, 0, Math.PI * 2);
  ctx.fill();
  // ombros / tronco
  ctx.beginPath();
  ctx.moveTo(w * 0.5 - 150, h * 0.95);
  ctx.quadraticCurveTo(w * 0.5 - 150, h * 0.46, w * 0.5, h * 0.42);
  ctx.quadraticCurveTo(w * 0.5 + 150, h * 0.46, w * 0.5 + 150, h * 0.95);
  ctx.closePath();
  ctx.fill();

  // Moldura interior
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  // Etiquetas
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "600 34px Georgia, serif";
  ctx.fillText(opts.title, w / 2, h - 120);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "500 22px Arial, sans-serif";
  ctx.fillText(opts.product, w / 2, h - 86);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "700 16px Arial, sans-serif";
  ctx.fillText("YSABEL MORA", w / 2, h - 52);

  // marca de placeholder (honestidade)
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "italic 13px Arial, sans-serif";
  ctx.fillText("placeholder — substituir por foto real", w / 2, h - 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Carrega uma textura de imagem real ou cai no placeholder se falhar. */
export function loadModelTexture(opts: {
  image: string | null;
  from: string;
  to: string;
  title: string;
  product: string;
}): THREE.Texture {
  if (!opts.image) return makeModelPlaceholderTexture(opts);
  const placeholder = makeModelPlaceholderTexture(opts);
  const loader = new THREE.TextureLoader();
  // Carrega a foto real por cima; se falhar, mantém o placeholder.
  loader.load(
    opts.image,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      placeholder.image = tex.image;
      placeholder.needsUpdate = true;
    },
    undefined,
    () => {
      /* mantém placeholder em caso de erro */
    },
  );
  return placeholder;
}
