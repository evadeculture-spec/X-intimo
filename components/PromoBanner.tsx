"use client";

import { Reveal } from "./Reveal";
import { ArrowIcon } from "./Icons";
import { PROMO } from "@/lib/config";
import { genericWhatsAppLink } from "@/lib/whatsapp";

/**
 * Faixa de campanha — editar texto em lib/config.ts (PROMO).
 */
export function PromoBanner() {
  return (
    <section className="container-x py-8 sm:py-12">
      <Reveal className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#5E1723] to-[#3D0F17] px-6 py-10 text-white sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-white/5" />

        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {PROMO.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
              {PROMO.title}
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">{PROMO.text}</p>
          </div>

          <a
            href={genericWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn shrink-0 bg-white text-[#5E1723] hover:bg-cream active:scale-[0.98]"
          >
            {PROMO.ctaLabel}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
