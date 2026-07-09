"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { ArrowIcon } from "./Icons";
import { brands } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { useStore } from "@/context/StoreContext";

export function BrandHighlights() {
  const { setFilter, resetFilters } = useStore();

  const showBrand = (brandId: string) => {
    resetFilters();
    setFilter("brand", brandId);
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="marcas" className="container-x py-16 sm:py-24">
      <SectionHeading
        step="04"
        eyebrow="Marcas em destaque"
        title="Marcas de confiança, escolhidas a dedo"
        subtitle="Selecionamos marcas conhecidas pela qualidade e pelo conforto. Há sempre espaço para acrescentar novas."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand, i) => (
          <Reveal
            key={brand.id}
            delayIndex={i}
            className="card-surface group flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-sand to-white">
              {/* ⚠️ PLACEHOLDER do logótipo da marca */}
              <span className="font-display text-2xl font-bold text-ink">
                {brand.name}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-ink">{brand.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
              {brand.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {brand.categories.map((catId) => (
                <span
                  key={catId}
                  className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  {getCategory(catId)?.name ?? catId}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => showBrand(brand.id)}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
            >
              Ver produtos
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
