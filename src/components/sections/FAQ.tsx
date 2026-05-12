"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { faq } from "@/lib/content";
import { Reveal } from "../shared/Reveal";

export function FAQ() {
  return (
    <section id="faq" className="relative bg-ink section-pad">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-16">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">08 — Dudas</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-md uppercase max-w-3xl">
                Preguntas{" "}
                <span className="font-italic-display text-accent">
                  frecuentes.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                Lo que pregunta la gente antes de firmar. Si no encuentras la
                tuya, escribe directamente.
              </p>
            </Reveal>
          </div>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="border-t border-line"
        >
          {faq.map((item, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="border-b border-line group/item"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-baseline justify-between text-left py-7 md:py-8 gap-8 btn-press focus:outline-none data-[state=open]:[&_.fq-icon-plus]:hidden data-[state=closed]:[&_.fq-icon-minus]:hidden group">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="idx-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl md:text-3xl leading-tight pr-4">
                      {item.q}
                    </span>
                  </div>
                  <span className="shrink-0 size-10 border border-line flex items-center justify-center text-cream-soft group-hover:border-cream/30 transition-colors">
                    <Plus className="size-4 fq-icon-plus" strokeWidth={1.5} />
                    <Minus className="size-4 fq-icon-minus" strokeWidth={1.5} />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn">
                <div className="md:pl-16 pb-7 md:pb-10 pr-4 md:pr-16">
                  <p className="text-cream/85 text-base md:text-lg leading-relaxed max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            height: 0;
          }
          to {
            opacity: 1;
            height: var(--radix-accordion-content-height);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            height: var(--radix-accordion-content-height);
          }
          to {
            opacity: 0;
            height: 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animate-fadeOut {
          animation: fadeOut 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>
    </section>
  );
}
