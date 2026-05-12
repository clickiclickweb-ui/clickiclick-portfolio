"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero, studio } from "@/lib/content";
import { Magnetic } from "../ui/Magnetic";
import { ArrowDownRight } from "lucide-react";

// 3D loaded client-only — keeps SSR + LCP healthy
const HeroCanvas = dynamic(
  () => import("../three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      <HeroCanvas />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col min-h-[100svh] container-wide pt-28 md:pt-32 pb-10 pointer-events-none">
        {/* Top meta line */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-cream-soft pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <p className="font-mono-meta">{hero.eyebrow}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="hidden md:block text-right md:text-left"
          >
            <p className="font-mono-meta">{studio.city} · {studio.region}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.26 }}
            className="text-right"
          >
            <p className="font-mono-meta">N 41.38° · E 2.17°</p>
          </motion.div>
        </div>

        {/* Centre display */}
        <div className="mt-auto pb-10 md:pb-20 pointer-events-none select-none">
          <h1 className="font-display text-display-xl uppercase text-cream relative">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.35 }}
              >
                Clickiclick
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.5 }}
              >
                <span className="font-italic-display text-accent">studio</span>
                <span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Bottom band: tagline + CTAs + scroll cue */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="md:col-span-5"
          >
            <p className="text-cream/95 font-display text-2xl md:text-3xl leading-tight tracking-tight">
              {hero.taglinePrimary}{" "}
              <span className="font-italic-display text-cream-soft">
                / {hero.taglineSecondary.toLowerCase()}.
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.0 }}
            className="md:col-span-4 text-cream-soft max-w-prose"
          >
            <p className="text-sm md:text-[15px] leading-relaxed">
              {hero.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.15 }}
            className="md:col-span-3 flex flex-col gap-3 md:items-end"
          >
            <Magnetic>
              <a
                href="#contact"
                className="btn-press inline-flex items-center gap-2 h-12 px-6 bg-accent text-ink font-medium text-sm hover:bg-accent-deep transition-colors"
              >
                {hero.cta}
                <ArrowDownRight className="size-4" strokeWidth={1.5} />
              </a>
            </Magnetic>
            <a
              href="#work"
              className="font-mono-meta text-cream-soft hover:text-cream hover-line"
            >
              {hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-5 pointer-events-auto">
          <span className="font-mono-meta text-cream-soft">
            Scroll para entrar
          </span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono-meta text-cream-soft"
          >
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
