"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Wordmark";
import { Magnetic } from "../ui/Magnetic";
import { navItems, studio } from "@/lib/content";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          scrolled
            ? "bg-ink/75 backdrop-blur-md backdrop-saturate-150 border-b border-line"
            : "bg-ink/10 backdrop-blur-[2px] border-b border-line/40",
        )}
      >
        <div className="container-wide flex h-16 md:h-20 items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            aria-label="Volver al inicio"
          >
            <span className="font-mono-meta text-cream-soft hidden md:inline">
              {studio.founded}
            </span>
            <Wordmark className="text-base md:text-lg" />
          </a>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Navegación principal"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono-meta text-cream/85 hover:text-accent transition-colors duration-200 relative group"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-1 h-px w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[420ms] ease-out"
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Magnetic strength={0.18}>
              <a
                href="#contact"
                className="btn-glass-secondary inline-flex items-center gap-2 h-10 px-5 font-mono-meta"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                  <span className="relative rounded-full size-1.5 bg-accent" />
                </span>
                Disponible
              </a>
            </Magnetic>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="md:hidden relative size-10 flex flex-col items-center justify-center gap-1.5 btn-press"
          >
            <span
              className={cn(
                "block h-px w-6 bg-cream transition-transform duration-300 ease-out",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-cream transition-transform duration-300 ease-out",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-40 bg-ink md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-6">
              <ul className="space-y-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.12 + i * 0.05,
                      duration: 0.5,
                      ease,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-display-md block"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line py-6 px-6 flex items-center justify-between">
              <span className="font-mono-meta text-cream-soft">
                {studio.city} · {studio.founded}
              </span>
              <a
                href={`mailto:${studio.email}`}
                className="font-mono-meta text-accent"
              >
                {studio.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
