import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

// Open Graph image gerada dinamicamente (sem dependências extra — usa next/og).
export const runtime = "edge";
export const alt = "X Íntimo — Vestuário interior, pijamas e conforto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FAF8F5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "#C1351D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            X
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#1A1A1A" }}>
            {SITE.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Conforto, elegância e qualidade para todos os dias.
          </div>
          <div style={{ fontSize: 30, color: "#6B655E", maxWidth: 820 }}>
            Vestuário interior, pijamas e essenciais de marcas selecionadas.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 24, color: "#9A2A16" }}>
          Pijamas Isa · Ysabel Mora · Pedido fácil por WhatsApp
        </div>
      </div>
    ),
    { ...size },
  );
}
