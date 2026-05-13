"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

type Technique = 0 | 1 | 2 | 3;

type Variant =
  | "hero-mix"
  | "slide-up-rotate"
  | "drop-dominant"
  | "scale-pure-fast"
  | "slide-up-soft"
  | "scale-slow"
  | "slide-up-tight";

const PATTERNS: Record<Variant, Technique[]> = {
  "hero-mix": [0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 2],
  "slide-up-rotate": [0, 1, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1],
  "drop-dominant": [3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 1],
  "scale-pure-fast": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  "slide-up-soft": [0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0],
  "scale-slow": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  "slide-up-tight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const TIMING: Record<
  Variant,
  { stagger: number; duration: number }
> = {
  "hero-mix": { stagger: 0.055, duration: 1.1 },
  "slide-up-rotate": { stagger: 0.035, duration: 0.85 },
  "drop-dominant": { stagger: 0.035, duration: 0.9 },
  "scale-pure-fast": { stagger: 0.025, duration: 0.7 },
  "slide-up-soft": { stagger: 0.035, duration: 0.85 },
  "scale-slow": { stagger: 0.04, duration: 1.0 },
  "slide-up-tight": { stagger: 0.025, duration: 0.65 },
};

function variantFor(t: Technique, reduce: boolean) {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    };
  }
  switch (t) {
    case 0:
      return {
        initial: { y: "100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
      };
    case 1:
      return {
        initial: { y: "50%", opacity: 0, scale: 0.78 },
        animate: { y: "0%", opacity: 1, scale: 1 },
      };
    case 2:
      return {
        initial: { y: "32%", opacity: 0, rotate: -8 },
        animate: { y: "0%", opacity: 1, rotate: 0 },
      };
    case 3:
      return {
        initial: { y: "-85%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
      };
  }
}

function pickTechnique(variant: Variant, i: number): Technique {
  const p = PATTERNS[variant];
  return p[i % p.length];
}

function letterStyle(): React.CSSProperties {
  return {
    display: "inline-block",
    overflow: "hidden",
    lineHeight: 1.05,
    paddingTop: "0.18em",
    paddingBottom: "0.18em",
    paddingLeft: "0.04em",
    paddingRight: "0.14em",
    marginLeft: "-0.04em",
    marginRight: "-0.12em",
    verticalAlign: "top",
  };
}

interface AnimatedTextProps {
  text: string;
  variant: Variant;
  startDelay?: number;
  className?: string;
  inView: boolean;
  patternOffset?: number;
}

function AnimatedText({
  text,
  variant,
  startDelay = 0,
  className,
  inView,
  patternOffset = 0,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const { stagger, duration } = TIMING[variant];
  let globalIndex = 0;

  return (
    <span aria-label={text} className={cn("inline", className)}>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        const startOfWord = globalIndex;
        const inner = (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              verticalAlign: "top",
            }}
          >
            {chars.map((ch, ci) => {
              const i = startOfWord + ci + patternOffset;
              const technique = pickTechnique(variant, i);
              const v = variantFor(technique, !!reduce);
              return (
                <span key={`c-${ci}`} aria-hidden style={letterStyle()}>
                  <motion.span
                    initial={v.initial}
                    animate={inView ? v.animate : v.initial}
                    transition={{
                      duration,
                      delay: startDelay + (startOfWord + ci) * stagger,
                      ease,
                    }}
                    style={{
                      display: "inline-block",
                      lineHeight: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    {ch}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
        globalIndex += chars.length;
        return (
          <span key={`wg-${wi}`}>
            {inner}
            {wi < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}

type Size = "xl" | "lg" | "md" | "sm";

const SIZE_CLASS: Record<Size, string> = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
};

interface SectionHeadingProps {
  text: string;
  accent?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  immediate?: boolean;
  delay?: number;
  uppercase?: boolean;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  text,
  accent,
  variant = "hero-mix",
  size = "md",
  className,
  immediate = false,
  delay = 0,
  uppercase = true,
  as = "h2",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const Tag = as as "h2";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Tag
        className={cn(
          "font-display max-w-4xl",
          SIZE_CLASS[size],
          uppercase && "uppercase",
        )}
      >
        <AnimatedText
          text={text}
          variant={variant}
          startDelay={delay}
          inView={inView}
        />
        {accent ? (
          <>
            {" "}
            <span className="font-italic-display text-accent normal-case inline">
              <AnimatedText
                text={accent}
                variant={variant}
                startDelay={
                  delay +
                  text.length * TIMING[variant].stagger +
                  0.18
                }
                inView={inView}
                patternOffset={7}
              />
            </span>
          </>
        ) : null}
      </Tag>
    </div>
  );
}
