"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";

export type PriceFilter = "all" | "price" | "consult";

export interface Filters {
  brand: string; // id da marca ou "all"
  category: string; // id da categoria ou "all"
  audience: string; // mulher | homem | crianca | unisexo | "all"
  size: string; // tamanho ou "all"
  price: PriceFilter;
}

const DEFAULT_FILTERS: Filters = {
  brand: "all",
  category: "all",
  audience: "all",
  size: "all",
  price: "all",
};

interface StoreContextValue {
  // Carrinho / lista de pedido
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (index: number) => void;
  clear: () => void;
  count: number;
  // Drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // Filtros do catálogo
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const addItem = useCallback((product: Product, size: string) => {
    setItems((prev) => {
      // Evita duplicar exatamente o mesmo produto + tamanho.
      const exists = prev.some(
        (it) => it.product.id === product.id && it.size === size,
      );
      if (exists) return prev;
      return [...prev, { product, size }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const value = useMemo<StoreContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
      count: items.length,
      isCartOpen,
      openCart,
      closeCart,
      filters,
      setFilter,
      resetFilters,
    }),
    [
      items,
      addItem,
      removeItem,
      clear,
      isCartOpen,
      openCart,
      closeCart,
      filters,
      setFilter,
      resetFilters,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore deve ser usado dentro de <StoreProvider>.");
  }
  return ctx;
}
