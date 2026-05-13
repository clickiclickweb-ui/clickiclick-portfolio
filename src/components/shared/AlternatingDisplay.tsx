"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

// 4 alternating entry techniques. Index modulo picks one.
// 0 — rise from below with mask
// 1 — fade + scale from below
// 2 — subtle rotation + slide
// 3 — drop from above
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
  // Custom pattern — not pure i%4 so the rhythm feels designed, not algorithmic.
  // pattern: 0,1,2,0,3,1,0,2,1,3,2  ...
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
  const chars = Array.from(text);

  return (
    <span
      aria-label={text}
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", ...baseStyle }}
    >
      {chars.map((ch, i) => {
        const technique = pickTechnique(i);
        const v = variantFor(technique, !!reduce);
        if (ch === " ") {
          return (
            <span
              key={`sp-${i}`}
              aria-hidden
              style={{ display: "inline-block", width: "0.32em" }}
            />
          );
        }
        return (
          <span
            key={`c-${i}`}
            aria-hidden
            style={{
              display: "inline-block",
              overflow: "hidden",
              lineHeight: 1.05,
              paddingTop: "0.18em",
              paddingBottom: "0.18em",
              paddingLeft: "0.06em",
              paddingRight: "0.16em",
              marginLeft: "-0.06em",
              marginRight: "-0.14em",
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
}
