"use client";

import { useEffect, useState } from "react";
import { footerNav, studio } from "@/lib/content";
import { Wordmark } from "../shared/Wordmark";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("es-ES", opts).format(d) + " CET");
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative bg-ink-deep border-t border-line">
      <div className="container-wide pt-20 md:pt-24 py-12 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-y-10 md:gap-10">
        {/* Studio block */}
        <div className="col-span-2 md:col-span-4 max-w-sm">
          <Wordmark className="text-base" />
          <p className="mt-5 text-body-muted text-sm leading-relaxed">
            Estudio de diseño, desarrollo, IA y automatización. Trabajos a
            medida desde {studio.city}, para clientes en Europa y América.
          </p>
          <p
            className="mt-6 font-mono-meta text-cream-soft"
            suppressHydrationWarning
          >
            {studio.city}
            {time ? <> · {time}</> : null}
          </p>
        </div>

        {/* Sitemap */}
        <div className="col-span-1 md:col-span-3">
          <p className="font-mono-meta text-cream-soft mb-5">Sitio</p>
          <ul className="space-y-3">
            {footerNav.map((it) => (
              <li key={it.href}>
                <a href={it.href} className="text-cream hover-line">
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1 md:col-span-3">
          <p className="font-mono-meta text-cream-soft mb-5">Contacto</p>
          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${studio.email}`}
                className="text-cream hover-line break-all"
              >
                {studio.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${studio.phone.replace(/\s/g, "")}`}
                className="text-cream hover-line"
              >
                {studio.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="col-span-2 md:col-span-2">
          <p className="font-mono-meta text-cream-soft mb-5">Redes</p>
          <ul className="space-y-3">
            {[
              { label: "Instagram", href: studio.social.instagram },
              { label: "LinkedIn", href: studio.social.linkedin },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-cream hover-line inline-flex items-center gap-1.5"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="line-thin" />

      {/* Bottom bar */}
      <div className="container-wide py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
        <p className="font-mono-meta text-cream-soft">
          <span className="text-gold">MMXXVI</span> · Clickiclick.studio. Todos
          los derechos reservados.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono-meta text-cream-soft">
          <li>
            <a href="/legal/privacidad" className="hover:text-cream hover-line">
              Privacidad
            </a>
          </li>
          <li>
            <a href="/legal/cookies" className="hover:text-cream hover-line">
              Cookies
            </a>
          </li>
          <li>
            <a href="/legal/aviso" className="hover:text-cream hover-line">
              Aviso legal
            </a>
          </li>
          <li>
            <span>
              Hecho a mano · Next.js · GSAP · Lenis
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
