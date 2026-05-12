"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutCopy, studio } from "@/lib/content";
import { Reveal, RevealWords } from "../shared/Reveal";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yDesk = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yHands = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-ink section-pad overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-20">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">06 — Estudio</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-md uppercase max-w-4xl">
                <RevealWords>{aboutCopy.display}</RevealWords>{" "}
                <span className="font-italic-display text-accent normal-case">
                  <RevealWords delay={0.2}>{aboutCopy.italicAccent}</RevealWords>
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                {aboutCopy.bodyShort}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Portrait — large */}
          <motion.div
            style={{ y: yPortrait }}
            className="col-span-12 md:col-span-7 relative aspect-[4/5] md:aspect-[4/5] overflow-hidden card-editorial"
          >
            <Image
              src="/images/studio/portrait.webp"
              alt="Diego Puelles trabajando en el estudio"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              quality={90}
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between">
              <span className="font-mono-meta text-cream bg-ink/70 px-2 py-1">
                Diego Puelles
              </span>
              <span className="font-mono-meta text-cream-soft bg-ink/70 px-2 py-1">
                MMXXVI · BCN
              </span>
            </div>
          </motion.div>

          {/* Side stack: desk + hands */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <motion.div
              style={{ y: yDesk }}
              className="relative aspect-[3/2] overflow-hidden card-editorial"
            >
              <Image
                src="/images/studio/desk.webp"
                alt="Mesa de trabajo del estudio"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={88}
                className="object-cover"
              />
            </motion.div>

            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
              <motion.div
                style={{ y: yHands }}
                className="relative aspect-[3/4] overflow-hidden card-editorial"
              >
                <Image
                  src="/images/studio/hands.webp"
                  alt="Detalle del proceso de sketch a mano"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  quality={86}
                  className="object-cover"
                />
              </motion.div>
              <div className="p-4 md:p-6 card-editorial flex flex-col justify-between">
                <div>
                  <p className="font-mono-meta text-cream-soft mb-3">Studio</p>
                  <p className="font-display text-xl md:text-2xl leading-tight">
                    Un solo cliente activo cada mes.
                  </p>
                </div>
                <div className="space-y-1 text-xs text-cream-soft">
                  <p>· {studio.city}</p>
                  <p>· {studio.scope}</p>
                  <p>· Desde {studio.founded}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio long */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 mt-16 md:mt-24">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">Sobre el autor</p>
          </div>
          <div className="md:col-span-9 max-w-3xl space-y-5">
            {aboutCopy.bodyLong.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-cream/90 text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <p className="font-italic-display text-cream-soft pt-4">
                — Firmado, Diego Puelles.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
