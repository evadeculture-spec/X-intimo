export type GarmentType =
  | "pijama-top"
  | "pijama-pants"
  | "sock"
  | "stocking"
  | "boxer"
  | "bra";

export interface Garment {
  id: string;
  type: GarmentType;
  label: string;
  /**
   * ⚠️ FOTO REAL (recomendado para o efeito hiper-realista):
   * caminho para um PNG com FUNDO TRANSPARENTE em /public/garments/.
   * Enquanto for `null`, é desenhada uma ilustração-placeholder elegante.
   * Dica: exporta o PNG com proporção parecida com a do placeholder do tipo.
   */
  image: string | null;
  /** Cor base do tecido (usada só no placeholder). */
  color: string;
}

/**
 * ⚠️ EDITÁVEL — peças que "caem" pelo site.
 * Para hiper-realismo: coloca PNGs recortados em /public/garments/ e
 * aponta `image` para eles (ex.: image: "/garments/pijama.png").
 */
export const garments: Garment[] = [
  { id: "pijama-top", type: "pijama-top", label: "Pijama", image: null, color: "#7A1E2A" },
  { id: "pijama-pants", type: "pijama-pants", label: "Calças de pijama", image: null, color: "#2E2A30" },
  { id: "peuga", type: "sock", label: "Peúgas", image: null, color: "#E3D7C4" },
  { id: "meia", type: "stocking", label: "Meias", image: null, color: "#B5736B" },
  { id: "boxer", type: "boxer", label: "Bóxers", image: null, color: "#28303A" },
  { id: "sutia", type: "bra", label: "Sutiãs", image: null, color: "#C9A37B" },
];
