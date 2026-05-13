"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { manifesto } from "@/lib/content";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const ease = [0.23, 1, 0.32, 1] as const;

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={sectionRef} className="relative bg-ink overflow-hidden">
      <div className="container-wide section-pad">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">
              {manifesto.eyebrow}
            </p>
            <motion.p
              style={{ y }}
              className="mt-4 font-italic-display text-cream-soft text-base md:text-lg leading-snug"
            >
              Un estudio. <br />
              Una firma. <br />
              Un oficio.
            </motion.p>
          </div>

          <div className="md:col-span-9 space-y-12 md:space-y-16">
            <SectionHeading
              text={manifesto.display}
              accent={manifesto.italicAccent}
              variant="hero-mix"
              size="lg"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
              {manifesto.body.map((p, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.1}
                  className="text-body text-base md:text-lg leading-relaxed"
                >
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.4 }}
              className="flex items-center gap-4 pt-6"
            >
              <span className="line-thin max-w-[120px]" />
              <span className="font-italic-display text-cream-soft">
                {manifesto.signature}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
