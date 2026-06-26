import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { FlowerGlyph } from "./FloralAccent";

/** Cabeçalho reutilizável de secção (eyebrow + título + subtítulo). */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
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
          <FlowerGlyph className="h-3.5 w-3.5" color="#8A2433" />
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
