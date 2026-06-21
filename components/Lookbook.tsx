"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Section";
import { ArrowIcon } from "./Icons";
import { modelLooks } from "@/data/models";
import { useStore } from "@/context/StoreContext";

/** Silhueta ilustrada (placeholder enquanto não há foto real). */
function ModelSilhouette() {
  return (
    <svg
      viewBox="0 0 200 280"
      className="absolute inset-x-0 bottom-0 mx-auto h-[78%] w-auto opacity-25"
      aria-hidden
    >
      <circle cx="100" cy="48" r="30" fill="#1A1A1A" />
      <path
        d="M48 280 C48 150 60 120 100 112 C140 120 152 150 152 280 Z"
        fill="#1A1A1A"
      />
    </svg>
  );
}

function LookCard({
  look,
  index,
}: {
  look: (typeof modelLooks)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 6 });
  };

  // alturas variadas para um ar editorial
  const tall = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={tall ? "sm:row-span-6" : "sm:row-span-5"}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className="group relative h-full min-h-[300px] overflow-hidden rounded-3xl shadow-card transition-shadow duration-300 hover:shadow-lift sm:min-h-0"
      >
        {/* fundo / foto placeholder */}
        {look.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={look.image}
            alt={`${look.title} — ${look.product}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(150deg, ${look.from}, ${look.to})`,
            }}
          >
            <ModelSilhouette />
            <span className="absolute right-3 top-3 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
              {/* honestidade: marcado como placeholder */}
              Substituir foto
            </span>
          </div>
        )}

        {/* gradiente para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />

        {/* texto */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
            Ysabel Mora
          </p>
          <h3 className="mt-0.5 font-display text-xl font-bold">{look.title}</h3>
          <p className="text-sm text-white/80">{look.product}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Lookbook() {
  const { resetFilters, setFilter } = useStore();

  const seeBrand = () => {
    resetFilters();
    setFilter("brand", "ysabel-mora");
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="lookbook" className="relative overflow-hidden py-16 sm:py-24">
      {/* blobs decorativos */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent-soft/15 blur-3xl" />

      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Lookbook · Ysabel Mora"
            title="A coleção que veste o seu conforto"
            subtitle="Térmicos, meias e interiores que combinam qualidade e bem-estar. Inspire-se e peça o que mais gostar."
          />
          <button
            type="button"
            onClick={seeBrand}
            className="btn-dark shrink-0"
          >
            Ver Ysabel Mora
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid auto-rows-[40px] grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {modelLooks.map((look, i) => (
            <LookCard key={look.id} look={look} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
