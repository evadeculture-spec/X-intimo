"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { WhatsAppIcon } from "./Icons";
import { SITE, WHATSAPP_NUMBER } from "@/lib/config";
import { genericWhatsAppLink } from "@/lib/whatsapp";

export function ContactSection() {
  const [form, setForm] = useState({ nome: "", telefone: "", mensagem: "" });

  // Por agora o formulário encaminha para o WhatsApp com a mensagem preenchida.
  // ⚠️ INTEGRAÇÃO FUTURA: trocar este handler por um POST para uma API/serviço
  // de email (ex.: /api/contact, Formspree, Resend) mantendo os mesmos campos.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá X Íntimo!%0ANome: ${form.nome}%0ATelefone: ${form.telefone}%0AMensagem: ${form.mensagem}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const field =
    "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus:border-accent/50 focus:outline-none";

  return (
    <section id="contactos" className="container-x py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Info */}
        <div>
          <SectionHeading
            step="05"
            eyebrow="Contactos"
            title="Falar connosco é fácil"
            subtitle="Estamos a um clique de distância. Escolha a forma que lhe der mais jeito."
          />

          <a
            href={genericWhatsAppLink("Olá X Íntimo, gostaria de falar convosco. Obrigado/a.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-8 bg-[#25D366] text-white hover:bg-[#1da851]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Falar no WhatsApp
          </a>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card-surface p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Morada {/* ⚠️ PLACEHOLDER */}
              </dt>
              <dd className="mt-1 text-sm text-ink">{SITE.address}</dd>
            </div>
            <div className="card-surface p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Horário {/* ⚠️ PLACEHOLDER */}
              </dt>
              <dd className="mt-1 text-sm text-ink">{SITE.schedule}</dd>
            </div>
            <div className="card-surface p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Telefone {/* ⚠️ PLACEHOLDER */}
              </dt>
              <dd className="mt-1 text-sm text-ink">{SITE.phoneDisplay}</dd>
            </div>
            <div className="card-surface p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Redes sociais
              </dt>
              <dd className="mt-1 flex gap-3 text-sm">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:text-accent-dark"
                >
                  Instagram
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:text-accent-dark"
                >
                  Facebook
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Formulário */}
        <Reveal className="card-surface p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-ink">Envie-nos uma mensagem</h3>
          <p className="mt-1 text-sm text-ink-muted">
            Preencha e enviamos a sua mensagem pelo WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              required
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className={field}
            />
            <input
              required
              type="tel"
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              className={field}
            />
            <textarea
              required
              rows={4}
              placeholder="Mensagem"
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              className={`${field} resize-none`}
            />
            <button type="submit" className="btn-primary w-full">
              Enviar mensagem
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
