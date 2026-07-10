"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, WhatsAppIcon } from "./Icons";
import { useStore } from "@/context/StoreContext";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { productWhatsAppLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

/** Gradiente de placeholder elegante, consistente por categoria. */
const CATEGORY_GRADIENT: Record<string, string> = {
  pijamas: "linear-gradient(135deg, #FBEDE9, #E8755C)",
  interiores: "linear-gradient(135deg, #F1ECE5, #C9BBA8)",
  termica: "linear-gradient(135deg, #FDEAE3, #C1351D)",
  meias: "linear-gradient(135deg, #EFE9E0, #B7A78F)",
};

function formatPrice(price: number | null): string {
  if (price === null) return "Sob consulta";
  return price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useStore();
  const [size, setSize] = useState(product.sizes[0] ?? "");

  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  const gradient =
    CATEGORY_GRADIENT[product.categoryId] ??
    "linear-gradient(135deg, #F1ECE5, #C9BBA8)";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface group flex flex-col overflow-hidden transition-shadow hover:shadow-lift"
    >
      {/* Imagem / placeholder */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: gradient }}
            aria-hidden
          />
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-dark shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
          <span>{brand?.name}</span>
          <span className="h-1 w-1 rounded-full bg-ink/20" />
          <span>{category?.name}</span>
        </div>

        <h3 className="mt-1.5 text-base font-semibold text-ink">{product.name}</h3>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted">
            {product.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span
            className={`text-base font-bold ${
              product.price === null ? "text-ink-muted" : "text-ink"
            }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Seletor de tamanho */}
        <label className="mt-3 block">
          <span className="sr-only">Tamanho</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-accent/50 focus:outline-none"
          >
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                Tamanho {s}
              </option>
            ))}
          </select>
        </label>

        {/* Ações */}
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => addItem(product, size)}
            className="btn-primary w-full"
          >
            <PlusIcon className="h-4 w-4" />
            Adicionar ao pedido
          </button>
          <a
            href={productWhatsAppLink(product, size)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full text-xs text-ink-muted hover:text-ink"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            Perguntar disponibilidade
          </a>
        </div>
      </div>
    </motion.article>
  );
}
