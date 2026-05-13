"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "@/lib/content";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="process"
      className="relative bg-ink-soft section-pad overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">04 — Proceso</p>
          </div>
          <div className="md:col-span-9">
            <SectionHeading
              text="Cinco fases."
              accent="Sin sorpresas."
              variant="scale-pure-fast"
              size="md"
            />
            <Reveal delay={0.25}>
              <p className="mt-6 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                Cómo construyo cada obra, paso a paso. Cada fase tiene un
                entregable claro, un cierre acordado, y una conversación en
                directo contigo antes de pasar a la siguiente.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical progress line */}
          <motion.div
            aria-hidden
            className="hidden md:block absolute top-0 bottom-0 left-[calc(25%-1px)] w-px origin-top bg-accent"
            style={{
              scaleY: useTransform(scrollYProgress, [0.05, 0.95], [0, 1]),
            }}
          />
          <div className="hidden md:block absolute top-0 bottom-0 left-[calc(25%-1px)] w-px bg-line" />

          <ul className="grid grid-cols-1 gap-14 md:gap-24">
            {process.map((phase, i) => (
              <ProcessPhase key={phase.index} phase={phase} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProcessPhase({
  phase,
  index,
}: {
  phase: (typeof process)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.6],
  );

  return (
    <motion.li
      ref={ref}
      style={{ opacity }}
      className="grid grid-cols-1 md:grid-cols-12 md:gap-12 items-start"
    >
      <div className="md:col-span-3 mb-4 md:mb-0 md:pr-6 flex items-baseline gap-4 md:flex-col md:items-start md:gap-3 py-1 md:py-2">
        <span className="font-display text-6xl md:text-7xl text-cream leading-none">
          {phase.index}
        </span>
        <span className="font-mono-meta text-cream-soft text-[clamp(0.78rem,1vw,0.95rem)]">
          {phase.duration}
        </span>
      </div>
      <div className="md:col-span-9 md:pl-12 md:border-l border-line/40 md:-ml-px py-1 md:py-2">
        <h3 className="font-display uppercase mb-4 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.05]">
          {phase.name}
        </h3>
        <p className="font-italic-display text-cream-soft mb-5 max-w-2xl leading-snug text-[clamp(1.1rem,1.6vw,1.6rem)]">
          {phase.pull}
        </p>
        <p className="text-cream/85 max-w-2xl leading-relaxed text-[clamp(1rem,1.15vw,1.18rem)]">
          {phase.body}
        </p>
        {index === 4 ? (
          <p className="mt-7 font-mono-meta text-cool">
            ▲ Pack mantenimiento mensual disponible
          </p>
        ) : null}
      </div>
    </motion.li>
  );
}
