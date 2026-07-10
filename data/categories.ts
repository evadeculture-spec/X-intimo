import type { Category } from "@/lib/types";

/**
 * ⚠️ EDITÁVEL — categorias do catálogo.
 * O `id` é usado nos produtos (categoryId) e nos filtros.
 */
export const categories: Category[] = [
  {
    id: "pijamas",
    name: "Pijamas",
    description: "Conjuntos macios para noites tranquilas.",
    icon: "moon",
  },
  {
    id: "interiores",
    name: "Interiores",
    description: "Essenciais de uso diário com bom caimento.",
    icon: "shirt",
  },
  {
    id: "termica",
    name: "Roupa térmica",
    description: "Calor e conforto para os dias mais frios.",
    icon: "snowflake",
  },
  {
    id: "meias",
    name: "Meias",
    description: "Do dia a dia às térmicas, sempre confortáveis.",
    icon: "sock",
  },
];

/** Públicos-alvo usados como filtro rápido / blocos de categoria. */
export const audiences = [
  { id: "mulher", name: "Mulher", icon: "woman" as const },
  { id: "homem", name: "Homem", icon: "man" as const },
  { id: "crianca", name: "Criança", icon: "child" as const },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
