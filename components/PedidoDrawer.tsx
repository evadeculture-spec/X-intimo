"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BagIcon, CloseIcon, WhatsAppIcon } from "./Icons";
import { useStore } from "@/context/StoreContext";
import { getBrand } from "@/data/brands";
import { orderWhatsAppLink } from "@/lib/whatsapp";

export function PedidoDrawer() {
  const { items, isCartOpen, closeCart, removeItem, clear, count } = useStore();

  // Fecha com a tecla Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-label="Lista de pedido"
          >
            <header className="flex items-center justify-between border-b border-ink/5 px-6 py-5">
              <div className="flex items-center gap-2">
                <BagIcon className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold text-ink">
                  A sua lista
                  {count > 0 && (
                    <span className="ml-2 text-sm font-normal text-ink-muted">
                      ({count})
                    </span>
                  )}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Fechar"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 hover:bg-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </header>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-tint">
                    <BagIcon className="h-7 w-7 text-accent" />
                  </span>
                  <p className="font-semibold text-ink">A lista está vazia</p>
                  <p className="max-w-xs text-sm text-ink-muted">
                    Adicione produtos do catálogo e envie tudo de uma vez por
                    WhatsApp.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                      <motion.li
                        key={`${item.product.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 rounded-2xl border border-ink/5 bg-white p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-ink-muted">
                            {getBrand(item.product.brandId)?.name} · Tamanho{" "}
                            {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          aria-label={`Remover ${item.product.name}`}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-accent-tint hover:text-accent"
                        >
                          <CloseIcon className="h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Rodapé */}
            <footer className="border-t border-ink/5 px-6 py-5">
              <p className="mb-3 text-center text-xs text-ink-muted">
                Sem pagamento online. Confirmamos disponibilidade, preço e
                entrega por WhatsApp.
              </p>
              <a
                href={orderWhatsAppLink(items)}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={items.length === 0}
                onClick={(e) => {
                  if (items.length === 0) e.preventDefault();
                }}
                className={`btn w-full ${
                  items.length === 0
                    ? "cursor-not-allowed bg-ink/15 text-white"
                    : "bg-[#25D366] text-white hover:bg-[#1da851] active:scale-[0.98]"
                }`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar pedido por WhatsApp
              </a>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="mt-2 w-full text-center text-xs font-medium text-ink-muted hover:text-ink"
                >
                  Limpar lista
                </button>
              )}
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
