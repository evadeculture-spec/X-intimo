"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./Section";
import { Filters } from "./Filters";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export function ProductGrid() {
  const { filters } = useStore();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.brand !== "all" && p.brandId !== filters.brand) return false;
      if (filters.category !== "all" && p.categoryId !== filters.category)
        return false;
      if (filters.audience !== "all" && p.audience !== filters.audience)
        return false;
      if (filters.size !== "all" && !p.sizes.includes(filters.size))
        return false;
      if (filters.price === "price" && p.price === null) return false;
      if (filters.price === "consult" && p.price !== null) return false;
      return true;
    });
  }, [filters]);

  return (
    <section id="produtos" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute right-[-8%] top-32 -z-10 h-80 w-80 rounded-full bg-accent-soft/10 blur-3xl" />
      <div className="container-x">
      <SectionHeading
        eyebrow="Produtos em destaque"
        title="Escolha as suas peças favoritas"
        subtitle="Adicione ao pedido e envie tudo por WhatsApp. Confirmamos disponibilidade, preço e entrega consigo."
      />

      <div className="mt-8">
        <Filters resultCount={filtered.length} />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-ink-muted">
          Não encontrámos produtos com esses filtros. Experimente limpar os
          filtros.
        </p>
      ) : (
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      </div>
    </section>
  );
}
