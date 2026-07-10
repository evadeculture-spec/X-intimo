import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Cabeçalho reutilizável de secção (número de etapa + eyebrow + título +
 * subtítulo). O `step` numera o percurso do site (01 → 05), para a informação
 * ficar esquematizada e o visitante saber sempre onde está no funil.
 */
export function SectionHeading({
  step,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  step?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow ? (
        <span className="eyebrow">
          {step ? (
            <>
              <span className="font-display text-sm font-bold leading-none text-accent">
                {step}
              </span>
              <span className="h-3 w-px bg-accent/30" aria-hidden />
            </>
          ) : null}
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
