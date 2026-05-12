"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/content";
import { Reveal } from "../shared/Reveal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

export function SelectedWork() {
  return (
    <section id="work" className="relative bg-ink section-pad overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-16 md:mb-24">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">03 — Selected work</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-display-md uppercase max-w-4xl">
                Tres obras.{" "}
                <span className="font-italic-display text-accent">
                  Tres universos.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-cream-soft max-w-2xl text-base md:text-lg leading-relaxed">
                Cada proyecto trabaja su propia paleta, su propio sistema, su
                propia voz. El marco general recupera el control entre obra y
                obra — pero dentro de la cápsula, cada pieza vive con libertad.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, idx) => (
            <ProjectCapsule key={p.id} project={p} flip={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCapsule({
  project,
  flip,
}: {
  project: (typeof projects)[number];
  flip: boolean;
}) {
  const isPlaceholder = "placeholder" in project && project.placeholder;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yMedia = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    setHovering(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => undefined);
    }
  }
  function handleLeave() {
    setHovering(false);
    const v = videoRef.current;
    if (v) v.pause();
  }

  return (
    <article
      ref={containerRef}
      className={cn(
        "grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center",
      )}
    >
      {/* Media */}
      <motion.div
        style={!isPlaceholder ? { y: yMedia } : undefined}
        className={cn(
          "md:col-span-7 relative",
          flip ? "md:order-2" : "md:order-1",
        )}
        onMouseEnter={!isPlaceholder ? handleEnter : undefined}
        onMouseLeave={!isPlaceholder ? handleLeave : undefined}
      >
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden card-editorial",
          )}
          style={
            !isPlaceholder
              ? {
                  borderColor: hovering
                    ? project.palette!.accent
                    : undefined,
                }
              : undefined
          }
        >
          {!isPlaceholder ? (
            <>
              <Image
                src={project.cover!}
                alt={`${project.name} — screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className={cn(
                  "object-cover object-top transition-opacity duration-500",
                  hovering ? "opacity-0" : "opacity-100",
                )}
                quality={88}
                priority={false}
              />
              <video
                ref={videoRef}
                src={project.video}
                poster={project.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className={cn(
                  "absolute inset-0 size-full object-cover object-top transition-opacity duration-500",
                  hovering ? "opacity-100" : "opacity-0",
                )}
              />
              {/* Project palette swatch overlay */}
              <div className="absolute bottom-4 left-4 flex gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ background: project.palette!.base }}
                />
                <span
                  className="size-2 rounded-full"
                  style={{ background: project.palette!.accent }}
                />
                <span
                  className="size-2 rounded-full"
                  style={{ background: project.palette!.muted }}
                />
              </div>
              {/* Index ribbon */}
              <div className="absolute top-4 left-4 font-mono-meta text-cream-soft bg-ink/60 backdrop-blur-sm border border-line px-3 py-1.5">
                {project.year} · {project.sector}
              </div>
            </>
          ) : (
            <PlaceholderCapsule />
          )}
        </div>
      </motion.div>

      {/* Text */}
      <div
        className={cn(
          "md:col-span-5",
          flip ? "md:order-1" : "md:order-2",
        )}
      >
        <div className="flex items-baseline gap-4 mb-4">
          <span className="idx-num">{project.index}</span>
          <span className="font-mono-meta text-cream-soft">
            {project.year}
          </span>
        </div>
        <h3 className="font-display text-display-md uppercase leading-none mb-2">
          {project.name}
        </h3>
        <p className="font-italic-display text-cream-soft text-xl md:text-2xl mb-6">
          {project.subtitle}
        </p>
        <p className="text-cream/85 leading-relaxed max-w-prose">
          {project.description}
        </p>

        {!isPlaceholder ? (
          <>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {project.metrics!.map((m, i) => (
                <div key={i} className="border-l border-line pl-3">
                  <p className="font-display text-xl md:text-2xl text-cream">
                    {m.value}
                  </p>
                  <p className="font-mono-meta text-cream-soft mt-1 text-[0.65rem]">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono-meta text-cream hover-line"
              >
                Visitar live
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </a>
              <span className="font-mono-meta text-cream-soft">
                {project.services.join(" · ")}
              </span>
            </div>
          </>
        ) : (
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 font-mono-meta text-accent hover-line"
          >
            Reservar este hueco
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </a>
        )}
      </div>
    </article>
  );
}

function PlaceholderCapsule() {
  return (
    <div className="size-full relative grain-bg flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,91,60,0.18), transparent 60%), radial-gradient(circle at 70% 60%, rgba(142,183,181,0.16), transparent 60%)",
        }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative z-10 text-center">
        <p className="font-mono-meta text-cream-soft mb-4">
          Hueco reservado
        </p>
        <p className="font-display text-display-sm text-cream">
          En desarrollo
        </p>
        <p className="font-italic-display text-cream-soft text-lg mt-2">
          MMXXVI
        </p>
      </div>
    </div>
  );
}
