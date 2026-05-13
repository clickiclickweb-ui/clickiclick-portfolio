"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

function StarRating({ value }: { value: 4.5 | 5 }) {
  const full = Math.floor(value);
  const half = value % 1 !== 0;
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${value} estrellas sobre 5`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`f-${i}`}
          className="size-3.5 fill-accent text-accent"
          strokeWidth={1.5}
        />
      ))}
      {half ? (
        <StarHalf
          className="size-3.5 fill-accent text-accent"
          strokeWidth={1.5}
        />
      ) : null}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star
          key={`e-${i}`}
          className="size-3.5 text-line-strong"
          strokeWidth={1.5}
        />
      ))}
      <span className="font-mono-meta text-cream-soft ml-2">
        {value.toFixed(1)}
      </span>
    </span>
  );
}

function Avatar({ index }: { index: number }) {
  const variants = [
    "linear-gradient(135deg, #a31e38 0%, #6e1425 100%)",
    "linear-gradient(135deg, #8eb7b5 0%, #2d5856 100%)",
    "linear-gradient(135deg, #b88746 0%, #6b4a1f 100%)",
    "linear-gradient(135deg, #f3ecde 0%, #9a8d77 100%)",
    "linear-gradient(135deg, #a31e38 0%, #b88746 100%)",
  ];
  return (
    <div
      className="size-10 md:size-12 shrink-0 relative overflow-hidden rounded-sm"
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
            <SectionHeading
              text="Lo que dicen"
              accent="las obras."
              variant="scale-slow"
              size="md"
            />
            <span className="font-mono-meta text-cream-soft">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative min-h-[340px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease }}
              className="testimonial-card relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start p-6 md:p-10"
            >
              <div className="md:col-span-3 flex flex-row md:flex-col items-start gap-4 md:gap-5">
                <Avatar index={active} />
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <span className="font-display text-cream text-[clamp(0.95rem,1.05vw,1.15rem)] leading-tight">
                    {t.name}
                  </span>
                  <span className="font-mono-meta text-cream-soft text-[0.65rem]">
                    {t.role}
                  </span>
                  <span className="font-mono-meta text-cream-soft text-[0.65rem]">
                    {t.company}
                  </span>
                </div>
                <span className="ml-auto md:ml-0 md:mt-2">
                  <StarRating value={t.rating} />
                </span>
              </div>
              <div className="md:col-span-9">
                <span className="font-italic-display text-cream-soft text-5xl md:text-6xl leading-none block mb-1">
                  &ldquo;
                </span>
                <p className="font-display text-cream leading-[1.18] max-w-3xl text-[clamp(1.1rem,1.8vw,1.6rem)]">
                  {t.quote}
                </p>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 md:mt-14 flex items-center justify-between border-t border-line pt-6">
          <button
            onClick={() => go(-1)}
            type="button"
            aria-label="Anterior testimonio"
            className="btn-press size-12 border border-line text-cream hover:border-line-strong flex items-center justify-center transition-colors"
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
            className="btn-press size-12 border border-line text-cream hover:border-line-strong flex items-center justify-center transition-colors"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-8 font-mono-meta text-cream-soft max-w-2xl">
          ✷ Estos testimonios son provisionales mientras se cierran los primeros
          clientes del estudio.
        </p>
      </div>
    </section>
  );
}
