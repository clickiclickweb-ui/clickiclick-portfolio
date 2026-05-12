"use client";

import { services } from "@/lib/content";
import { Reveal } from "../shared/Reveal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

function formatNum(n: number) {
  return n.toLocaleString("es-ES");
}

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink section-pad">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">05 — Tarifas</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-md uppercase max-w-4xl">
                Tarifas{" "}
                <span className="font-italic-display text-accent">
                  visibles.
                </span>{" "}
                Conversaciones útiles.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                Trabajo con tarifas públicas porque filtran. Si los números
                cuadran, hablamos. Si no, ahorramos tu tiempo y el mío. Los
                proyectos cerrados son presupuestos a medida que parten de
                estas bases.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {services.map((svc, idx) => {
            const featured = svc.id === "web";
            return (
              <article
                key={svc.id}
                className={cn(
                  "p-8 md:p-10 flex flex-col gap-6 transition-colors",
                  featured ? "bg-ink-soft" : "bg-ink",
                )}
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <p className="idx-num mb-3">{svc.index}</p>
                    <h3 className="font-display text-3xl md:text-4xl leading-none">
                      {svc.title}{" "}
                      <span className="font-italic-display text-cream-soft text-2xl">
                        {svc.titleItalic}
                      </span>
                    </h3>
                  </div>
                  {featured ? (
                    <span className="font-mono-meta text-accent border border-accent/50 px-2 py-1">
                      Más popular
                    </span>
                  ) : null}
                </header>

                <p className="text-cream-soft text-sm md:text-base leading-relaxed">
                  {svc.eyebrow}
                </p>

                <div className="border-t border-line pt-5">
                  {svc.id === "web" ? (
                    <div className="space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono-meta text-cream-soft">
                          Essential
                        </span>
                        <span className="font-display text-2xl md:text-3xl">
                          €{formatNum(svc.from.essential)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono-meta text-accent">
                          Full · 3D + motion
                        </span>
                        <span className="font-display text-2xl md:text-3xl text-accent">
                          €
                          {"full" in svc.from && svc.from.full
                            ? formatNum(svc.from.full)
                            : ""}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono-meta text-cream-soft">
                        Desde
                      </span>
                      <span className="font-display text-3xl md:text-4xl">
                        €{formatNum(svc.from.essential)}
                        {"perMonth" in svc && svc.perMonth ? (
                          <span className="text-base text-cream-soft font-sans ml-1">
                            /mes
                          </span>
                        ) : null}
                        {"perHour" in svc && svc.perHour ? (
                          <span className="text-base text-cream-soft font-sans ml-1">
                            /h
                          </span>
                        ) : null}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-2.5 text-sm text-cream/85 mt-auto">
                  {svc.deliverables.slice(0, 4).map((d, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent shrink-0">+</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    "btn-press mt-2 inline-flex items-center justify-between gap-2 h-12 px-5 border text-sm font-medium transition-colors",
                    featured
                      ? "bg-accent border-accent text-ink hover:bg-accent-deep hover:border-accent-deep"
                      : "border-line text-cream hover:border-cream",
                  )}
                >
                  Pedir presupuesto
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl font-mono-meta text-cream-soft">
          ✦ Precios en euros, IVA no incluido. Pago en 2 hitos (50/50) en
          proyectos cerrados. Subcontratación de colaboradores externos
          (fotografía, vídeo, ilustración) facturada aparte y por adelantado.
        </p>
      </div>
    </section>
  );
}
