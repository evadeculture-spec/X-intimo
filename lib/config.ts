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

// Texto da faixa promocional (secção de campanha) — fácil de alterar.
export const PROMO = {
  eyebrow: "Novidade",
  title: "Nova coleção de conforto já disponível",
  text: "Peça o catálogo atualizado por WhatsApp e receba as novidades em primeira mão.",
  ctaLabel: "Pedir catálogo",
} as const;
