import { Logo } from "./Logo";
import { SITE } from "@/lib/config";

const QUICK_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Marcas", href: "#marcas" },
  { label: "Produtos", href: "#produtos" },
  { label: "Como Comprar", href: "#como-comprar" },
  { label: "Contactos", href: "#contactos" },
];

// ⚠️ PLACEHOLDER — páginas legais a criar futuramente.
const LEGAL_LINKS = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos e Condições", href: "#" },
  { label: "Livro de Reclamações", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-sand/60">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Vestuário interior, pijamas e essenciais de conforto de marcas
            selecionadas. Atendimento próximo e compra simples.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Navegação</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Contactos</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-muted">
            <li>{SITE.address}</li>
            <li>{SITE.phoneDisplay}</li>
            <li>{SITE.email}</li>
            <li>{SITE.schedule}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Legal</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {LEGAL_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <p>Feito com cuidado em Portugal.</p>
        </div>
      </div>
    </footer>
  );
}
