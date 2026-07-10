/**
 * Logótipo da X Íntimo — recriado a partir da fotografia da marca:
 * círculo vermelho-tijolo + "X" preto em pincelada + wordmark "Intimo" em serifa.
 *
 * Mark desenhada em SVG (vetorial, escala sem perder qualidade).
 * Se quiseres usar o ficheiro de imagem oficial, substitui /public/logo.svg
 * e troca o conteúdo deste componente por <img src="/logo.svg" .../>.
 */
export function Logo({
  className = "",
  tone = "dark",
  showTagline = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  showTagline?: boolean;
}) {
  const wordColor = tone === "light" ? "#FAF8F5" : "#1A1A1A";
  const subColor = tone === "light" ? "rgba(255,255,255,0.55)" : "#6B655E";

  return (
    <span className={`flex items-center gap-1 ${className}`}>
      {/* Marca: círculo + X em pincelada */}
      <svg viewBox="0 0 118 108" className="h-10 w-auto shrink-0" aria-hidden="true">
        <circle cx="50" cy="55" r="41" fill="#C0392B" />
        <g
          stroke="#1A1A1A"
          strokeWidth="17"
          strokeLinecap="round"
          fill="none"
        >
          {/* traço \ (canto sup. esq. → inf. dir.) */}
          <path d="M23 15 Q54 55 86 95" />
          {/* traço / com perna inferior esquerda mais comprida (como na foto) */}
          <path d="M88 17 Q50 55 12 101" />
        </g>
        {/* pequeno remate/gota no fim da perna comprida */}
        <circle cx="12" cy="101" r="5.5" fill="#1A1A1A" />
      </svg>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.7rem] font-medium leading-none tracking-tight"
          style={{ color: wordColor }}
        >
          Intimo
        </span>
        {showTagline && (
          <span
            className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: subColor }}
          >
            Conforto &amp; Qualidade
          </span>
        )}
      </span>
    </span>
  );
}
