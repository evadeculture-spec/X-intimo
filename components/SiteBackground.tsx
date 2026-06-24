"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SitePetals = dynamic(() => import("./three/SitePetals"), { ssr: false });

type Quality = "high" | "low" | "off";

/**
 * Fundo floral do site inteiro (pétalas 3D vermelhas) — fixo atrás de todo o
 * conteúdo, em todas as secções. Desliga em prefers-reduced-motion e fica
 * mais leve em telemóvel.
 */
export function SiteBackground() {
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

  if (quality === "off") return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <SitePetals quality={quality} />
    </div>
  );
}
