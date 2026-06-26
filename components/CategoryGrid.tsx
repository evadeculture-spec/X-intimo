"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { CategoryIcon } from "./Icons";
import { audiences, categories } from "@/data/categories";
import { useStore } from "@/context/StoreContext";
import type { Filters } from "@/context/StoreContext";

export function CategoryGrid() {
  const { resetFilters, setFilter } = useStore();

  const apply = (key: keyof Filters, value: string) => {
    resetFilters();
    setFilter(key, value as never);
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categorias" className="container-x py-16 sm:py-24">
      <SectionHeading
        eyebrow="Categorias"
        title="Encontre o que procura, sem complicações"
        subtitle="Navegue pelas categorias principais ou por quem vai usar. Clique para ver os produtos."
      />

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delayIndex={i}>
            <button
              type="button"
              onClick={() => apply("category", cat.id)}
              className="group flex h-full w-full flex-col items-start gap-3 rounded-3xl border border-ink/5 bg-white p-5 text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-tint text-accent-dark transition-colors group-hover:bg-accent group-hover:text-white">
                <CategoryIcon name={cat.icon} className="h-6 w-6" />
              </span>
              <span className="text-base font-semibold text-ink">{cat.name}</span>
              <span className="text-xs leading-relaxed text-ink-muted">
                {cat.description}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Por público */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {audiences.map((aud, i) => (
          <Reveal key={aud.id} delayIndex={i}>
            <button
              type="button"
              onClick={() => apply("audience", aud.id)}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-sand/60 px-4 py-4 font-semibold text-ink transition-all hover:border-accent/30 hover:bg-white"
            >
              <CategoryIcon
                name={aud.icon}
                className="h-5 w-5 text-accent-dark"
              />
              {aud.name}
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
