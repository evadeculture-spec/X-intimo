import { Reveal } from "./Reveal";
import { BadgeIcon, ChatIcon, HeartIcon, LeafIcon, TruckIcon } from "./Icons";

const ITEMS = [
  {
    icon: LeafIcon,
    title: "Produtos selecionados",
    text: "Escolhemos peças confortáveis e duráveis que valem o investimento.",
  },
  {
    icon: BadgeIcon,
    title: "Marcas reconhecidas",
    text: "Trabalhamos com Pijamas Isa, Ysabel Mora e outras marcas de confiança.",
  },
  {
    icon: ChatIcon,
    title: "Atendimento próximo",
    text: "Falamos consigo de forma simples e tiramos todas as dúvidas.",
  },
  {
    icon: HeartIcon,
    title: "Pedido fácil por WhatsApp",
    text: "Escolhe, envia o pedido e confirmamos disponibilidade rapidamente.",
  },
  {
    icon: TruckIcon,
    title: "Entrega ou levantamento",
    text: "Combinamos a forma mais cómoda de receber as suas peças.",
  },
];

export function TrustBar() {
  return (
    <section className="container-x py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal
              key={item.title}
              delayIndex={i}
              className="card-surface flex flex-col gap-3 p-5 transition-shadow hover:shadow-lift"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-tint text-accent-dark">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="text-xs leading-relaxed text-ink-muted">{item.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
