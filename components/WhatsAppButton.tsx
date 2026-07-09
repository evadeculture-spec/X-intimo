"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { genericWhatsAppLink } from "@/lib/whatsapp";

/**
 * CTA persistente de conversão:
 * - Telemóvel: barra fixa no fundo com "Ver produtos" + WhatsApp (thumb-zone).
 * - Desktop: botão flutuante clássico de WhatsApp.
 * Aparece depois do primeiro scroll para não competir com o hero.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = genericWhatsAppLink(
    "Olá X Íntimo, gostaria de falar convosco. Obrigado/a.",
  );

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Barra fixa mobile */}
          <motion.div
            key="mobile-bar"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/90 px-4 pt-3 backdrop-blur-md sm:hidden"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          >
            <div className="flex gap-3">
              <a href="#produtos" className="btn-dark flex-1">
                Ver produtos
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn flex-1 bg-[#25D366] text-white hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Botão flutuante desktop */}
          <motion.a
            key="desktop-fab"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift sm:grid"
          >
            <WhatsAppIcon className="h-7 w-7" />
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
