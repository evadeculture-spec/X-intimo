import type { Product } from "@/lib/types";

/**
 * ⚠️ EDITÁVEL — produtos do catálogo (dados de exemplo).
 *
 * Como editar:
 *  - `brandId`    deve corresponder a um id em data/brands.ts
 *  - `categoryId` deve corresponder a um id em data/categories.ts
 *  - `price`      número em euros, ou `null` para mostrar "Sob consulta"
 *  - `image`      opcional: coloca a imagem em /public e usa "/nome.jpg".
 *                 Se omitido, é usado um placeholder elegante gerado por CSS.
 *  - `badge`      opcional: etiqueta no canto do cartão.
 */
export const products: Product[] = [
  {
    id: "pijama-fem-isa",
    name: "Pijama feminino Isa",
    brandId: "isa",
    categoryId: "pijamas",
    audience: "mulher",
    sizes: ["S", "M", "L", "XL"],
    price: 29.9,
    description: "Conjunto macio em algodão, toque suave e respirável.",
    badge: "Mais vendido",
  },
  {
    id: "pijama-homem-isa",
    name: "Pijama homem Isa",
    brandId: "isa",
    categoryId: "pijamas",
    audience: "homem",
    sizes: ["M", "L", "XL", "XXL"],
    price: 32.9,
    description: "Conforto clássico para noites tranquilas, tecido durável.",
  },
  {
    id: "robe-feminino",
    name: "Robe feminino",
    brandId: "isa",
    categoryId: "pijamas",
    audience: "mulher",
    sizes: ["S", "M", "L"],
    price: null,
    description: "Robe acolhedor, ideal para os momentos de descanso.",
    badge: "Novidade",
  },
  {
    id: "meias-termicas-ym",
    name: "Meias térmicas Ysabel Mora",
    brandId: "ysabel-mora",
    categoryId: "meias",
    audience: "unisexo",
    sizes: ["35/38", "39/42", "43/46"],
    price: 7.5,
    description: "Calor extra com fibras térmicas, sem apertar.",
  },
  {
    id: "camisola-interior-termica",
    name: "Camisola interior térmica",
    brandId: "ysabel-mora",
    categoryId: "termica",
    audience: "mulher",
    sizes: ["S", "M", "L", "XL"],
    price: 14.9,
    description: "Camada base que mantém o calor e veste discretamente.",
  },
  {
    id: "leggings-termicas",
    name: "Leggings térmicas",
    brandId: "ysabel-mora",
    categoryId: "termica",
    audience: "mulher",
    sizes: ["S", "M", "L", "XL"],
    price: 16.9,
    description: "Leggings quentes e elásticas para os dias mais frios.",
  },
  {
    id: "cuecas-slips",
    name: "Cuecas / Slips",
    brandId: "ysabel-mora",
    categoryId: "interiores",
    audience: "homem",
    sizes: ["M", "L", "XL", "XXL"],
    price: null,
    description: "Pack de interiores em algodão, conforto durante todo o dia.",
  },
  {
    id: "soutien-top",
    name: "Soutien / Top confortável",
    brandId: "ysabel-mora",
    categoryId: "interiores",
    audience: "mulher",
    sizes: ["S", "M", "L", "XL"],
    price: 12.9,
    description: "Top sem aro, suporte suave e sensação de leveza.",
  },
];
