import type { Brand } from "@/lib/types";

/**
 * ⚠️ EDITÁVEL — marcas revendidas pela X Íntimo.
 * Para adicionar uma marca nova, basta acrescentar um objeto a este array.
 */
export const brands: Brand[] = [
  {
    id: "isa",
    name: "Pijamas Isa",
    description:
      "Pijamas e roupa de dormir com tecidos suaves e bom caimento, para mulher e homem.",
    categories: ["pijamas", "interiores"],
  },
  {
    id: "ysabel-mora",
    name: "Ysabel Mora",
    description:
      "Referência em meias, roupa térmica e interiores com excelente relação qualidade-conforto.",
    categories: ["meias", "termica", "interiores"],
  },
  {
    id: "outras",
    name: "Outras marcas",
    description:
      "Selecionamos continuamente novas marcas de confiança. Espaço reservado para crescer.",
    categories: ["pijamas", "interiores", "termica", "meias"],
  },
];

export function getBrand(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}
