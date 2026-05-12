"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero, studio } from "@/lib/content";
import { Magnetic } from "../ui/Magnetic";
import { AlternatingDisplay } from "../shared/AlternatingDisplay";
import { ArrowDownRight } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* Subtle atmospheric layers — no 3D. Pure CSS. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 80% at 75% 30%, rgba(163,30,56,0.10) 0%, transparent 60%), radial-gradient(ellipse 55% 70% at 15% 85%, rgba(142,183,181,0.06) 0%, transparent 60%)",
        }}
      />
      {/* Diagonal hairline ornament */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(105deg, transparent 0 80px, var(--color-cream) 80px 81px)",
        }}
      />

      {/* Foreground */}
      <div className="relative z-10 flex flex-col min-h-[100svh] container-wide pt-28 md:pt-32 pb-10">
        {/* Top meta */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-cream-soft">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <p className="font-mono-meta">{hero.eyebrow}</p>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="hidden md:block"
          >
            <p className="font-mono-meta text-center">
              {studio.city} · {studio.region}
            </p>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.26 }}
            className="text-right"
          >
            <p className="font-mono-meta">N 41.38° · E 2.17°</p>
          </motion.div>
        </div>

        {/* Centre display block */}
        <div className="mt-auto pb-6 md:pb-12">
          {/* Wordmark — alternating letter animation */}
          <h1 className="font-display text-display-xl uppercase text-cream relative">
            <span className="block">
              <AlternatingDisplay
                text="CLICKICLICK"
                startDelay={0.3}
                stagger={0.055}
                letterDuration={1.1}
              />
            </span>
            <span className="block mt-0 -mt-[0.1em]">
              <span className="font-italic-display text-accent inline-block">
                <AlternatingDisplay
                  text="studio."
                  startDelay={0.95}
                  stagger={0.05}
                  letterDuration={1.0}
                />
              </span>
            </span>
          </h1>

          {/* Italic granate anchor phrase */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.55 }}
            className="mt-7 md:mt-10 font-italic-display text-accent text-2xl md:text-4xl leading-tight tracking-tight max-w-3xl"
          >
            obras firmadas,{" "}
            <span className="text-cream">hechas a medida</span>.
          </motion.p>
        </div>

        {/* Bottom band: paragraph + CTAs + scroll cue */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.8 }}
            className="md:col-span-7"
          >
            {/* WCAG AAA 7:1 — cream pleno sobre ink. */}
            <p className="text-cream text-base md:text-lg leading-relaxed max-w-2xl">
              {hero.intro}
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.95 }}
            className="md:col-span-5 flex flex-col gap-3 md:items-end"
          >
            <Magnetic>
              <a
                href="#contact"
                className="btn-press inline-flex items-center gap-2 h-12 px-6 bg-accent text-cream font-medium text-sm hover:bg-accent-deep transition-colors"
              >
                {hero.cta}
                <ArrowDownRight className="size-4" strokeWidth={1.5} />
              </a>
            </Magnetic>
            <a
              href="#work"
              className="font-mono-meta text-cream hover:text-accent hover-line"
            >
              {hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Bottom meta strip — replaces scroll indicator */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 2.2 }}
          className="mt-10 flex items-center justify-between border-t border-line pt-5"
        >
          <span className="font-mono-meta text-cream-soft">
            {studio.city} · {studio.founded} · Estudio digital de autor
          </span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono-meta text-cream-soft"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
