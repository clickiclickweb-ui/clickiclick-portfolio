"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const ease = [0.23, 1, 0.32, 1] as const;

function formatPrice(svc: (typeof services)[number]) {
  const from = svc.from.essential;
  if (svc.perMonth) return `desde €${from.toLocaleString("es-ES")} /mes`;
  if (svc.perHour) return `€${from}/h`;
  if ("full" in svc.from && svc.from.full) {
    return `desde €${from.toLocaleString("es-ES")} → €${svc.from.full.toLocaleString("es-ES")}`;
  }
  return `desde €${from.toLocaleString("es-ES")}`;
}

export function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="relative bg-ink section-pad">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">02 — Servicios</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-md uppercase max-w-4xl">
                Seis disciplinas.{" "}
                <span className="font-italic-display text-accent">
                  Una sola firma.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                Diseño y desarrollo de webs, sistemas de marca, productos de
                inteligencia artificial, automatización, estrategia social y
                consultoría creativa. Cada disciplina contratable por separado o
                en conjunto.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-line">
          {services.map((svc) => {
            const isOpen = active === svc.id;
            return (
              <div
                key={svc.id}
                className="border-b border-line group"
                onMouseEnter={() => setActive(svc.id)}
                onFocus={() => setActive(svc.id)}
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : svc.id)}
                  className="w-full text-left py-7 md:py-9 px-1 grid grid-cols-12 gap-4 md:gap-8 items-center btn-press focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${svc.id}`}
                >
                  <span className="col-span-1 idx-num">{svc.index}</span>
                  <h3 className="col-span-7 md:col-span-5 font-display text-2xl md:text-5xl leading-none">
                    <span>{svc.title} </span>
                    <span className="font-italic-display text-cream-soft">
                      {svc.titleItalic}
                    </span>
                  </h3>
                  <span className="hidden md:block col-span-4 font-mono-meta text-cream-soft">
                    {svc.eyebrow}
                  </span>
                  <span className="col-span-4 md:col-span-2 text-right md:text-right font-mono-meta text-cream group-hover:text-accent transition-colors">
                    {formatPrice(svc)}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      id={`svc-${svc.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 md:gap-8 pb-10 md:pb-14 pt-2 md:pt-4">
                        <div className="col-span-12 md:col-start-2 md:col-span-5">
                          <p className="text-cream text-base md:text-lg leading-relaxed">
                            {svc.description}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                          <p className="font-mono-meta text-cream-soft mb-4">
                            Incluido
                          </p>
                          <ul className="space-y-3">
                            {svc.deliverables.map((d, i) => (
                              <li
                                key={i}
                                className="flex items-baseline gap-3 text-cream/90"
                              >
                                <span className="idx-num shrink-0">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                          <a
                            href="#contact"
                            className="mt-8 inline-flex items-center gap-2 font-mono-meta text-accent hover-line"
                          >
                            Empezar este servicio
                            <ArrowUpRight className="size-4" strokeWidth={1.5} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
