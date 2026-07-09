"use client";

import { Reveal } from "./Reveal";
import { ArrowIcon } from "./Icons";
import { CAMPAIGN_VIDEO } from "@/lib/config";

/**
 * Anúncio da campanha: vídeo cinemático em autoplay silencioso (gerado no
 * Higgsfield, no registo intimista da Ysabel Mora), com texto sobreposto e
 * CTA. `playsInline` + `muted` garantem autoplay em telemóvel.
 */
export function CampaignVideo() {
  return (
    <section id="campanha" className="container-x py-16 sm:py-24">
      <Reveal className="relative overflow-hidden rounded-4xl shadow-lift">
        <video
          className="aspect-video w-full object-cover"
          src={CAMPAIGN_VIDEO.src}
          poster={CAMPAIGN_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vídeo da campanha X Íntimo — momentos de conforto em casa"
        />

        {/* gradiente para legibilidade do texto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 text-white sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              {CAMPAIGN_VIDEO.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-4xl">
              {CAMPAIGN_VIDEO.title}
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              {CAMPAIGN_VIDEO.text}
            </p>
          </div>

          <a
            href="#produtos"
            className="btn shrink-0 bg-white/95 text-ink hover:bg-white active:scale-[0.98]"
          >
            Ver a coleção
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
