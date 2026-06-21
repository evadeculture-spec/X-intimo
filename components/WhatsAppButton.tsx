"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { genericWhatsAppLink } from "@/lib/whatsapp";

/** Botão flutuante fixo para falar no WhatsApp. */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={genericWhatsAppLink("Olá X Íntimo, gostaria de falar convosco. Obrigado/a.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift"
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
