"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { genericWhatsAppLink } from "@/lib/whatsapp";

// 3D carregado só no cliente e apenas quando necessário (ver lógica abaixo).
const ThreeHeroElement = dynamic(() => import("./ThreeHeroElement"), {
  ssr: false,
});

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 },
  }),
};

/** Decide se mostramos a animação 3D (desktop + sem prefers-reduced-motion). */
function useEnable3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqDesktop.matches && !mqMotion.matches);
    update();
    mqDesktop.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);
  return enabled;
}

const FLOATING_CARDS = [
  { label: "Pijama Isa", tag: "Conforto", className: "left-2 top-8 animate-float", from: "#F6D9CF", to: "#E8755C" },
  { label: "Meias térmicas", tag: "Ysabel Mora", className: "right-2 top-24 animate-float-slow", from: "#E7E1D8", to: "#C9BBA8" },
  { label: "Robe macio", tag: "Novidade", className: "bottom-6 left-10 animate-float-slow", from: "#FBEDE9", to: "#C1351D" },
];

export function Hero() {
  const enable3D = useEnable3D();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* fundo suave */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-accent-soft/20 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            className="eyebrow"
            variants={fade}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Loja portuguesa · marcas selecionadas
          </motion.span>

          <motion.h1
            className="font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl text-balance"
            variants={fade}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            Conforto, elegância e qualidade para todos os dias.
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-ink-muted"
            variants={fade}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            Vestuário interior, pijamas e essenciais de marcas selecionadas, com
            atendimento próximo e compra simples.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            variants={fade}
            custom={3}
            initial="hidden"
            animate="visible"
          >
            <a href="#produtos" className="btn-dark">
              Ver produtos
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={genericWhatsAppLink("Olá X Íntimo, gostaria de falar convosco. Obrigado/a.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted"
            variants={fade}
            custom={4}
            initial="hidden"
            animate="visible"
          >
            <span>★★★★★ Atendimento próximo</span>
            <span className="hidden h-4 w-px bg-ink/15 sm:block" />
            <span>Pijamas Isa · Ysabel Mora</span>
          </motion.div>
        </div>

        {/* Composição visual / 3D */}
        <motion.div
          className="relative aspect-square w-full max-w-lg justify-self-center lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-sand to-white shadow-soft" />

          {/* anel decorativo (fallback estático + moldura do 3D) */}
          <div className="absolute inset-8 rounded-full border border-accent/15" />
          <div className="absolute inset-16 rounded-full border border-accent/10" />

          {enable3D ? (
            <div className="absolute inset-0">
              <ThreeHeroElement />
            </div>
          ) : (
            // Fallback elegante para mobile / reduced-motion
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-44 w-44 rounded-full bg-gradient-to-br from-accent to-accent-soft opacity-90 shadow-lift sm:h-56 sm:w-56" />
            </div>
          )}

          {/* cartões de produto flutuantes */}
          {FLOATING_CARDS.map((card) => (
            <div
              key={card.label}
              className={`absolute ${card.className} w-36 rounded-2xl border border-white/60 bg-white/80 p-3 shadow-card backdrop-blur-sm`}
            >
              <div
                className="mb-2 h-16 w-full rounded-xl"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${card.from}, ${card.to})`,
                }}
              />
              <p className="text-xs font-semibold text-ink">{card.label}</p>
              <p className="text-[11px] text-ink-muted">{card.tag}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
