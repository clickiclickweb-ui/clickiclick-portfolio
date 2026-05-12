"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { cn } from "@/lib/utils";

// Editorial geometric avatar — no fake stock photos
function Avatar({ index }: { index: number }) {
  const variants = [
    "linear-gradient(135deg, #ff5b3c 0%, #c93617 100%)",
    "linear-gradient(135deg, #8eb7b5 0%, #2d5856 100%)",
    "linear-gradient(135deg, #b88746 0%, #6b4a1f 100%)",
    "linear-gradient(135deg, #f3ecde 0%, #9a8d77 100%)",
    "linear-gradient(135deg, #ff5b3c 0%, #b88746 100%)",
  ];
  return (
    <div
      className="size-12 md:size-14 shrink-0 relative overflow-hidden"
      style={{ background: variants[index % variants.length] }}
      aria-hidden
    >
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2.4'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>\")",
        }}
      />
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((v) => (v + 1) % total);
    }, 6500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, total]);

  function go(dir: 1 | -1) {
    setActive((v) => (v + dir + total) % total);
  }

  const t = testimonials[active];

  return (
    <section
      className="relative bg-ink-soft section-pad overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-16">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">07 — Voces</p>
          </div>
          <div className="md:col-span-9 flex items-end justify-between gap-6 flex-wrap">
            <Reveal>
              <h2 className="font-display text-display-md uppercase max-w-2xl">
                Lo que dicen las{" "}
                <span className="font-italic-display text-accent">obras.</span>
              </h2>
            </Reveal>
            <span className="font-mono-meta text-cream-soft">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              <div className="md:col-span-2 flex flex-row md:flex-col items-start gap-4">
                <Avatar index={active} />
                <span className="font-italic-display text-cream-soft text-5xl md:text-6xl leading-none">
                  &ldquo;
                </span>
              </div>
              <div className="md:col-span-10">
                <p className="font-display text-2xl md:text-4xl leading-snug text-cream max-w-5xl">
                  {t.quote}
                </p>
                <footer className="mt-8 flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-lg text-cream">
                    {t.name}
                  </span>
                  <span className="font-mono-meta text-cream-soft">
                    {t.role} · {t.company}
                  </span>
                </footer>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 md:mt-14 flex items-center justify-between border-t border-line pt-6">
          <button
            onClick={() => go(-1)}
            type="button"
            aria-label="Anterior testimonio"
            className="btn-press size-12 border border-line text-cream hover:border-line-strong flex items-center justify-center"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir a testimonio ${i + 1}`}
                className={cn(
                  "h-px transition-[width,background-color] duration-500 ease-out",
                  i === active ? "w-12 bg-accent" : "w-6 bg-line-strong",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            type="button"
            aria-label="Siguiente testimonio"
            className="btn-press size-12 border border-line text-cream hover:border-line-strong flex items-center justify-center"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-8 font-mono-meta text-cream-soft">
          ✷ Testimonios placeholder. Se sustituirán por reales conforme los
          clientes firmen su consentimiento público.
        </p>
      </div>
    </section>
  );
}
