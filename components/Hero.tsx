"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { genericWhatsAppLink } from "@/lib/whatsapp";

// Cena 3D carregada só no cliente.
const SceneHero = dynamic(() => import("./three/SceneHero"), { ssr: false });

type Quality = "high" | "low" | "off";

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 },
  }),
};

/** Define a qualidade do 3D: desktop = high, mobile = low, reduced-motion = off. */
function useSceneQuality(): Quality {
  const [quality, setQuality] = useState<Quality>("off");
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (mqMotion.matches) setQuality("off");
      else setQuality(mqDesktop.matches ? "high" : "low");
    };
    update();
    mqDesktop.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);
  return quality;
}

export function Hero() {
  const quality = useSceneQuality();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Fundo 3D animado (ou fallback estático) */}
      <div className="absolute inset-0 -z-10">
        {quality === "off" ? (
          <div className="h-full w-full bg-gradient-to-br from-cream via-sand to-accent-tint">
            <div className="absolute right-[-10%] top-1/4 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-accent to-accent-soft opacity-80 blur-2xl" />
          </div>
        ) : (
          <SceneHero quality={quality} />
        )}
      </div>

      {/* Scrim para legibilidade do texto (mais forte à esquerda/baixo) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-cream/85 via-cream/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-cream to-transparent" />

      {/* grão subtil */}
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />

      <div className="container-x w-full pt-28 pb-16 sm:pt-32 lg:pt-24">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <motion.span
            className="eyebrow backdrop-blur-sm"
            variants={fade}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Loja portuguesa · marcas selecionadas
          </motion.span>

          <motion.h1
            className="font-display text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl text-balance"
            variants={fade}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            Conforto, elegância e qualidade para todos os dias.
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
            variants={fade}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            Vestuário interior, pijamas e essenciais de marcas selecionadas como{" "}
            <span className="font-semibold text-ink">Ysabel Mora</span> e{" "}
            <span className="font-semibold text-ink">Pijamas Isa</span>, com
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
              className="btn-outline backdrop-blur-sm"
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
      </div>

      {/* indicador de scroll */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ink/20 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
