export type Audience = "mulher" | "homem" | "crianca" | "unisexo";

export interface Brand {
  id: string;
  name: string;
  description: string;
  /** ids de categorias associadas (ver data/categories.ts) */
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  /** nome do ícone (ver components/Icons.tsx) */
  icon: IconName;
}

export interface Product {
  id: string;
  name: string;
  /** id da marca (ver data/brands.ts) */
  brandId: string;
  /** id da categoria (ver data/categories.ts) */
  categoryId: string;
  audience: Audience;
  sizes: string[];
  /** preço em euros ou null para "Sob consulta" */
  price: number | null;
  description?: string;
  /** opcional: caminho de imagem real em /public; se ausente usa placeholder */
  image?: string;
  /** etiqueta opcional, ex.: "Novidade", "Mais vendido" */
  badge?: string;
}

export interface CartItem {
  product: Product;
  size: string;
}

export type IconName =
  | "leaf"
  | "badge"
  | "chat"
  | "truck"
  | "heart"
  | "moon"
  | "snowflake"
  | "sock"
  | "shirt"
  | "woman"
  | "man"
  | "child";
