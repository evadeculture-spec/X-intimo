/**
 * Logótipo da X Íntimo.
 *
 * ⚠️ PLACEHOLDER: este é um wordmark fiel à descrição (círculo terracota + "X Íntimo").
 * Para usar o logótipo real, substitui /public/logo.svg e podes trocar este componente
 * por <img src="/logo.svg" alt="X Íntimo" /> mantendo as mesmas classes.
 */
export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const word = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/55" : "text-ink-muted";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-bold leading-none text-white shadow-sm">
        X
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-tight ${word}`}>
          Íntimo
        </span>
        <span
          className={`mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] ${sub}`}
        >
          Conforto &amp; Qualidade
        </span>
      </span>
    </span>
  );
}
