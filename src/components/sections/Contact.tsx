"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studio } from "@/lib/content";
import { Reveal, RevealWords } from "../shared/Reveal";
import { ArrowUpRight, Check } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";

const ease = [0.23, 1, 0.32, 1] as const;

export function Contact() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    if (!email) return;
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Algo falló.");
      setState("ok");
      setEmail("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Algo falló.");
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-ink overflow-hidden"
    >
      {/* Top: large CTA */}
      <div className="container-wide section-pad border-b border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">09 — Empezar</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="font-display text-display-lg uppercase leading-[0.88] tracking-[-0.04em]">
              <RevealWords>Tienes una idea.</RevealWords>
              <br />
              <span className="font-italic-display text-accent normal-case">
                <RevealWords delay={0.18}>Yo tengo el oficio.</RevealWords>
              </span>
              <br />
              <RevealWords delay={0.36}>Hablemos.</RevealWords>
            </h2>

            <Reveal delay={0.5}>
              <p className="mt-8 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                Escribe directamente, agenda una llamada, o suscríbete a la
                newsletter si todavía no estás listo. Respondo en menos de 24h
                de lunes a viernes.
              </p>
            </Reveal>

            {/* Primary actions */}
            <div className="mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <Magnetic>
                <a
                  href={`mailto:${studio.email}?subject=Nueva%20obra%20·%20Clickiclick.studio`}
                  className="btn-press inline-flex items-center justify-between gap-4 h-16 px-7 bg-accent text-ink font-medium min-w-[280px] hover:bg-accent-deep transition-colors"
                >
                  <span className="font-mono-meta">Escribir email</span>
                  <span className="font-display text-lg">
                    {studio.email}
                  </span>
                  <ArrowUpRight className="size-5" strokeWidth={1.5} />
                </a>
              </Magnetic>

              <a
                href={studio.social.calendly}
                className="btn-press inline-flex items-center gap-3 h-16 px-7 border border-line-strong text-cream hover:border-cream transition-colors"
              >
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-cool animate-ping opacity-75" />
                  <span className="relative rounded-full size-2 bg-cool" />
                </span>
                <span className="font-mono-meta">Agendar llamada</span>
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </a>
            </div>

            {/* Meta info */}
            <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl">
              <ContactMeta label="Email" value={studio.email} href={`mailto:${studio.email}`} />
              <ContactMeta
                label="Teléfono"
                value={studio.phone}
                href={`tel:${studio.phone.replace(/\s/g, "")}`}
              />
              <ContactMeta label="Estudio" value={`${studio.city} · Remoto`} />
              <ContactMeta label="Horario" value="Lun–Vie · 09–19h CET" />
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom: newsletter */}
      <div className="container-wide section-pad">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">Newsletter</p>
          </div>
          <div className="md:col-span-9 max-w-3xl">
            <h3 className="font-display text-display-sm uppercase">
              Los próximos lanzamientos,{" "}
              <span className="font-italic-display text-accent">
                en tu bandeja.
              </span>
            </h3>
            <p className="mt-4 text-cream-soft text-base md:text-lg leading-relaxed">
              Una nota corta cuando lanzo una obra o publico una pieza nueva.
              Cero spam, cero marketing, cancelable en un click.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4 max-w-2xl"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <label className="sr-only" htmlFor="newsletter-email">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "loading"}
                  className="flex-1 bg-transparent border-b border-line py-3 px-1 text-cream placeholder:text-cream-mute focus:border-accent focus:outline-none transition-colors text-lg"
                />
                <button
                  type="submit"
                  disabled={state === "loading" || !email}
                  className="btn-press shrink-0 inline-flex items-center justify-center gap-2 h-12 px-6 bg-cream text-ink font-mono-meta disabled:opacity-50 disabled:pointer-events-none hover:bg-accent hover:text-ink transition-colors"
                >
                  {state === "loading" ? (
                    "Enviando…"
                  ) : state === "ok" ? (
                    <>
                      <Check className="size-4" /> Suscrito
                    </>
                  ) : (
                    <>
                      Suscribirme
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </div>

              <label className="flex items-start gap-3 cursor-pointer text-sm text-cream-soft">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 size-4 accent-accent shrink-0"
                />
                <span>
                  Acepto recibir comunicaciones puntuales de Clickiclick.studio.
                  Mi email se trata según el aviso legal y puedo cancelar
                  cuando quiera.
                </span>
              </label>

              <AnimatePresence>
                {state === "ok" ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease }}
                    className="text-cool font-mono-meta"
                  >
                    ✓ Recibido. Nos leemos pronto.
                  </motion.p>
                ) : null}
                {state === "error" ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease }}
                    className="text-accent font-mono-meta"
                  >
                    ✗ {errorMsg}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactMeta({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <>
      <dt className="font-mono-meta text-cream-soft mb-1">{label}</dt>
      <dd className="font-display text-cream text-base md:text-lg leading-tight">
        {value}
      </dd>
    </>
  );
  if (href) {
    return (
      <a href={href} className="block hover-line text-cream">
        {Inner}
      </a>
    );
  }
  return <div>{Inner}</div>;
}
