"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Converte o site em scroll HORIZONTAL no desktop: rodar a roda do rato / fazer
 * scroll move o site para a direita. Cada secção é um painel à largura do ecrã.
 *
 * - Desktop (>=1024px) e sem prefers-reduced-motion → horizontal.
 * - Telemóvel / reduced-motion → vertical normal (mais natural ao toque e acessível).
 * - Secções mais altas que o ecrã podem deslizar na vertical dentro do painel;
 *   ao chegar ao limite, o scroll continua para o lado.
 */
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqDesktop.matches && !mqMotion.matches);
    update();
    mqDesktop.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // roda do rato vertical -> movimento horizontal (respeitando scroll interno do painel)
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad horizontal: nativo
      const idx = Math.round(scroller.scrollLeft / window.innerWidth);
      const panel = scroller.children[idx] as HTMLElement | undefined;
      if (panel) {
        const canDown =
          panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1;
        const canUp = panel.scrollTop > 0;
        if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) return;
      }
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    };
    scroller.addEventListener("wheel", onWheel, { passive: false });

    // links de âncora (#produtos, etc.) passam a navegar na horizontal
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    };
    document.addEventListener("click", onClick);

    return () => {
      scroller.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onClick);
    };
  }, [enabled]);

  if (!enabled) {
    return <main>{children}</main>;
  }

  return (
    <main
      ref={scrollerRef}
      className="no-scrollbar flex h-[100svh] w-screen snap-x snap-proximity overflow-x-auto overflow-y-hidden"
    >
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className="no-scrollbar relative h-[100svh] w-screen shrink-0 snap-start overflow-y-auto overflow-x-hidden"
        >
          {child}
        </div>
      ))}
    </main>
  );
}
