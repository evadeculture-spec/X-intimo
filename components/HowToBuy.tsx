import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";

const STEPS = [
  {
    n: "01",
    title: "Escolha os produtos",
    text: "Explore o catálogo, selecione o tamanho e adicione à sua lista de pedido.",
  },
  {
    n: "02",
    title: "Envie o pedido por WhatsApp",
    text: "Com um clique, abrimos o WhatsApp com a sua lista já escrita. É só enviar.",
  },
  {
    n: "03",
    title: "Confirmamos tudo consigo",
    text: "Respondemos com disponibilidade, preço final e a melhor forma de entrega.",
  },
];

export function HowToBuy() {
  return (
    <section id="como-comprar" className="bg-ink py-16 text-white sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Como comprar"
          title={<span className="text-white">Comprar é simples e sem stress</span>}
          subtitle={
            <span className="text-white/70">
              Em três passos rápidos trata de tudo connosco, de forma próxima e
              transparente.
            </span>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              delayIndex={i}
              className="relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="font-display text-5xl font-bold text-accent-soft/80">
                {step.n}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
