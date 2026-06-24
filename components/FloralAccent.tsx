/** Pequena flor de 5 pétalas (estilo kalanchoe) em SVG — motivo decorativo da marca. */
export function FlowerGlyph({
  className = "",
  color = "#E11900",
  center = "#F2D9A0",
}: {
  className?: string;
  color?: string;
  center?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g transform="translate(20 20)">
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="5"
            ry="8.5"
            fill={color}
            transform={`rotate(${i * 72})`}
          />
        ))}
        <circle r="3.6" fill={center} />
      </g>
    </svg>
  );
}

/**
 * Conjunto decorativo de flores a flutuar (CSS leve, sem 3D) —
 * usado para reforçar o tema floral em secções fora do hero.
 */
export function FloralAccent({
  className = "",
  colors = ["#FF2A1A", "#E11900", "#FF6A4D"],
  centerColor = "#F2D9A0",
}: {
  className?: string;
  colors?: [string, string, string] | string[];
  centerColor?: string;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <FlowerGlyph
        className="absolute left-0 top-0 h-10 w-10 animate-float opacity-90"
        color={colors[0]}
        center={centerColor}
      />
      <FlowerGlyph
        className="absolute right-2 top-8 h-7 w-7 animate-float-slow opacity-80"
        color={colors[1]}
        center={centerColor}
      />
      <FlowerGlyph
        className="absolute left-10 top-12 h-5 w-5 animate-float opacity-70"
        color={colors[2]}
        center={centerColor}
      />
    </div>
  );
}
