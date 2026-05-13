"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { faq } from "@/lib/content";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function FAQ() {
  return (
    <section id="faq" className="relative bg-ink section-pad">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-16">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">08 — Dudas</p>
          </div>
          <div className="md:col-span-9">
            <SectionHeading
              text="Preguntas"
              accent="frecuentes."
              variant="slide-up-tight"
              size="md"
            />
            <Reveal delay={0.25}>
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
                <Accordion.Trigger className="flex flex-1 items-baseline justify-between text-left py-7 md:py-8 gap-8 btn-press focus:outline-none group data-[state=open]:[&_.fq-mark]:rotate-45 data-[state=open]:[&_.fq-mark]:text-accent">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="idx-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl md:text-3xl leading-tight pr-4">
                      {item.q}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="fq-mark shrink-0 text-2xl text-cream-soft group-hover:text-cream transition-[transform,color] duration-300 ease-out leading-none -mt-0.5"
                  >
                    +
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

    </section>
  );
}
