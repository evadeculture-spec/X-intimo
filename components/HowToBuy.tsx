import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { genericWhatsAppLink } from "@/lib/whatsapp";

const STEPS = [
  {
    n: "1",
    title: "Escolha os produtos",
    text: "Explore o catálogo, selecione o tamanho e adicione à sua lista de pedido.",
  },
  {
    n: "2",
    title: "Envie o pedido por WhatsApp",
    text: "Com um clique, abrimos o WhatsApp com a sua lista já escrita. É só enviar.",
  },
  {
    n: "3",
    title: "Confirmamos tudo consigo",
    text: "Respondemos com disponibilidade, preço final e a melhor forma de entrega.",
  },
];

export function HowToBuy() {
  return (
    <section id="como-comprar" className="bg-ink py-16 text-white sm:py-24">
      <div className="container-x">
        <SectionHeading
          step="03"
          eyebrow="Enviar e receber"
          title={<span className="text-white">Comprar é simples e sem stress</span>}
          subtitle={
            <span className="text-white/70">
              Em três passos rápidos trata de tudo connosco, de forma próxima e
              transparente.
            </span>
          }
        />

        {/* Esquema em 3 passos ligados por setas (empilha na vertical em mobile) */}
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              as="li"
              delayIndex={i}
              className="relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-bold text-white">
                  {step.n}
                </span>
                {i < STEPS.length - 1 && (
                  <ArrowIcon className="hidden h-4 w-4 text-white/30 md:block" />
                )}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        {/* CTA no momento da decisão */}
        <Reveal className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="#produtos" className="btn bg-white text-ink hover:bg-cream w-full sm:w-auto">
            Escolher produtos
            <ArrowIcon className="h-4 w-4" />
          </a>
          <a
            href={genericWhatsAppLink("Olá X Íntimo, gostaria de fazer um pedido. Obrigado/a.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] text-white hover:bg-[#1da851] w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir já por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
