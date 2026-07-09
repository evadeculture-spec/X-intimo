/**
 * Configuração central da X Íntimo.
 * ⚠️ EDITAR AQUI: substituir pelos dados reais da loja.
 */

// ⚠️ PLACEHOLDER — número de WhatsApp da loja (formato internacional, só dígitos).
// Exemplo Portugal: "351912345678"
export const WHATSAPP_NUMBER = "351900000000";

export const SITE = {
  name: "X Íntimo",
  // ⚠️ PLACEHOLDER — afinar quando o domínio final estiver definido.
  url: "https://x-intimo.vercel.app",
  tagline: "Conforto, elegância e qualidade para todos os dias.",
  description:
    "Loja portuguesa de vestuário interior, pijamas, roupa térmica e essenciais de conforto de marcas selecionadas.",
  // ⚠️ PLACEHOLDER — dados de contacto reais.
  email: "geral@xintimo.pt",
  phoneDisplay: "+351 900 000 000",
  address: "Rua Exemplo, 000 — Cidade, Portugal",
  schedule: "Seg a Sáb · 9h30 — 19h00",
  social: {
    instagram: "https://instagram.com/", // ⚠️ PLACEHOLDER
    facebook: "https://facebook.com/", // ⚠️ PLACEHOLDER
  },
} as const;

// Vídeo de campanha (anúncio gerado no Higgsfield, estilo Ysabel Mora).
// ⚠️ RECOMENDADO: descarregar o mp4 e colocá-lo em /public/campanha/anuncio.mp4
// (e o poster em /public/campanha/anuncio-poster.png), trocando os URLs abaixo
// por "/campanha/anuncio.mp4" e "/campanha/anuncio-poster.png" — os links do
// CDN do Higgsfield podem expirar.
export const CAMPAIGN_VIDEO = {
  src: "https://d8j0ntlcm91z4.cloudfront.net/user_3FNZX8hWHOXhzig1wENoUYSyPbO/hf_20260709_223129_47c3f0c6-8b04-41f4-8f00-255a9e51e91e.mp4",
  poster:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3FNZX8hWHOXhzig1wENoUYSyPbO/hf_20260709_222346_45a9fe29-4387-4e8c-bce0-79dfc2a8bede.png",
  eyebrow: "A nossa campanha",
  title: "Momentos de conforto, em casa",
  text: "Peças que acompanham os dias tranquilos — do primeiro café da manhã ao fim da tarde.",
} as const;

// Texto da faixa promocional (secção de campanha) — fácil de alterar.
export const PROMO = {
  eyebrow: "Novidade",
  title: "Nova coleção de conforto já disponível",
  text: "Peça o catálogo atualizado por WhatsApp e receba as novidades em primeira mão.",
  ctaLabel: "Pedir catálogo",
} as const;
