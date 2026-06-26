"use client";

import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

// Lista única e ordenada de tamanhos existentes nos produtos.
const ALL_SIZES = Array.from(
  new Set(products.flatMap((p) => p.sizes)),
).sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-sm text-ink focus:border-accent/50 focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

export function Filters({ resultCount }: { resultCount: number }) {
  const { filters, setFilter, resetFilters } = useStore();

  const hasActive =
    filters.brand !== "all" ||
    filters.category !== "all" ||
    filters.audience !== "all" ||
    filters.size !== "all" ||
    filters.price !== "all";

  return (
    <div className="card-surface flex flex-col gap-4 p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Select
          label="Marca"
          value={filters.brand}
          onChange={(v) => setFilter("brand", v)}
        >
          <option value="all">Todas</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>

        <Select
          label="Categoria"
          value={filters.category}
          onChange={(v) => setFilter("category", v)}
        >
          <option value="all">Todas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>

        <Select
          label="Para"
          value={filters.audience}
          onChange={(v) => setFilter("audience", v)}
        >
          <option value="all">Todos</option>
          <option value="mulher">Mulher</option>
          <option value="homem">Homem</option>
          <option value="crianca">Criança</option>
          <option value="unisexo">Unissexo</option>
        </Select>

        <Select
          label="Tamanho"
          value={filters.size}
          onChange={(v) => setFilter("size", v)}
        >
          <option value="all">Todos</option>
          {ALL_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <Select
          label="Preço"
          value={filters.price}
          onChange={(v) => setFilter("price", v as typeof filters.price)}
        >
          <option value="all">Todos</option>
          <option value="price">Com preço</option>
          <option value="consult">Sob consulta</option>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">
          {resultCount} {resultCount === 1 ? "produto" : "produtos"}
        </p>
        {hasActive && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-semibold text-accent hover:text-accent-dark"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
