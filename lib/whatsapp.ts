import { WHATSAPP_NUMBER } from "./config";
import type { CartItem, Product } from "./types";

/** Constrói um link wa.me com a mensagem já codificada. */
function buildLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Link para o pedido completo (lista de produtos escolhidos). */
export function orderWhatsAppLink(items: CartItem[]): string {
  if (items.length === 0) {
    return buildLink("Olá X Íntimo, gostaria de ajuda com um pedido.");
  }

  const lines = items.map(
    (item, i) => `${i + 1}. ${item.product.name} — Tamanho ${item.size}`,
  );

  const message = [
    "Olá, tenho interesse nestes produtos da X Íntimo:",
    "",
    ...lines,
    "",
    "Podem confirmar disponibilidade e preço? Obrigado/a.",
  ].join("\n");

  return buildLink(message);
}

/** Link para perguntar disponibilidade de um único produto. */
export function productWhatsAppLink(product: Product, size?: string): string {
  const sizePart = size ? ` (Tamanho ${size})` : "";
  const message = `Olá X Íntimo, queria saber a disponibilidade e o preço de: ${product.name}${sizePart}. Obrigado/a.`;
  return buildLink(message);
}

/** Link genérico, ex.: pedir catálogo ou falar com a loja. */
export function genericWhatsAppLink(
  message = "Olá X Íntimo, gostaria de receber o catálogo atualizado. Obrigado/a.",
): string {
  return buildLink(message);
}
