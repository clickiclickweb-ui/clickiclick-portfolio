"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

type Technique = 0 | 1 | 2 | 3;

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
        initial: { y: "55%", opacity: 0, scale: 0.7 },
        animate: { y: "0%", opacity: 1, scale: 1 },
      };
    case 2:
      return {
        initial: { y: "30%", opacity: 0, rotate: -8 },
        animate: { y: "0%", opacity: 1, rotate: 0 },
      };
    case 3:
      return {
        initial: { y: "-90%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
      };
  }
}

const pickTechnique = (i: number): Technique => {
  const pattern: Technique[] = [0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 2];
  return pattern[i % pattern.length];
};

export function AlternatingDisplay({
  text,
  className,
  startDelay = 0,
  stagger = 0.06,
  letterDuration = 1.05,
  baseStyle,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  stagger?: number;
  letterDuration?: number;
  baseStyle?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  // Split into word groups so the browser word-wraps cleanly,
  // but letters inside a word never split.
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span
      aria-label={text}
      className={className}
      style={{ display: "inline", ...baseStyle }}
    >
      {words.map((word, wi) => {
        const chars = Array.from(word);
        const startOfWord = globalIndex;
        const wordNode = (
          <span
            key={`w-${wi}`}
            aria-hidden
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              verticalAlign: "top",
            }}
          >
            {chars.map((ch, ci) => {
              const i = startOfWord + ci;
              const technique = pickTechnique(i);
              const v = variantFor(technique, !!reduce);
              return (
                <span
                  key={`c-${ci}`}
                  aria-hidden
                  style={{
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
                  }}
                >
                  <motion.span
                    initial={v.initial}
                    animate={v.animate}
                    transition={{
                      duration: letterDuration,
                      delay: startDelay + i * stagger,
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
            {wordNode}
            {wi < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
