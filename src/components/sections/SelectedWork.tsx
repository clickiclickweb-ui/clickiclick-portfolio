"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectedWork() {
  return (
    <section id="work" className="relative bg-ink section-pad overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-16 md:mb-24">
          <div className="md:col-span-3">
            <p className="font-mono-meta text-cream-soft">03 — Selected work</p>
          </div>
          <div className="md:col-span-9">
            <SectionHeading
              text="Selected work."
              accent="Dos obras hasta hoy."
              variant="drop-dominant"
              size="md"
            />
            <Reveal delay={0.25}>
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
  project: Project;
  flip: boolean;
}) {
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
      className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-center"
    >
      <motion.div
        style={{ y: yMedia }}
        className={cn(
          "md:col-span-7 relative group/media",
          flip ? "md:order-2" : "md:order-1",
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        data-project={project.id}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden card-editorial transition-[border-color] duration-300"
          style={{
            borderColor: hovering ? project.palette?.accent : undefined,
            backgroundColor: hovering
              ? `color-mix(in oklab, ${project.palette?.accent} 8%, transparent)`
              : undefined,
          }}
        >
          <Image
            src={project.cover!}
            alt={`${project.name} — screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={cn(
              "object-cover object-top transition-[opacity,transform,filter] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              hovering
                ? "opacity-0 scale-[1.04] brightness-105"
                : "opacity-100 scale-100 brightness-100",
            )}
            quality={85}
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
              "absolute inset-0 size-full object-cover object-top transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              hovering
                ? "opacity-100 scale-[1.02]"
                : "opacity-0 scale-100",
            )}
          />
          {/* Project palette swatches */}
          <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
            <span
              className="size-2 rounded-full"
              style={{ background: project.palette?.base }}
            />
            <span
              className="size-2 rounded-full"
              style={{ background: project.palette?.accent }}
            />
            <span
              className="size-2 rounded-full"
              style={{ background: project.palette?.muted }}
            />
          </div>
          <div className="absolute top-4 left-4 font-mono-meta text-cream-soft bg-ink/60 backdrop-blur-sm border border-line px-3 py-1.5 z-10">
            {project.year} · {project.sector}
          </div>
        </div>
      </motion.div>

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

        <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
          {project.metrics?.map((m, i) => (
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
            className="btn-glass-secondary inline-flex items-center gap-2 h-11 px-5 font-mono-meta"
          >
            Visitar live
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </a>
          <span className="font-mono-meta text-cream-soft">
            {project.services.join(" · ")}
          </span>
        </div>
      </div>
    </article>
  );
}
