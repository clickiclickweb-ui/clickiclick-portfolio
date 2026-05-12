import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aviso legal",
};

export default function AvisoPage() {
  return (
    <article className="space-y-8 text-cream/90 max-w-3xl">
      <p className="font-mono-meta text-cream-soft">Legal — Documento 03</p>
      <h1 className="font-display text-display-md uppercase">
        Aviso legal
      </h1>

      <p className="text-cream text-base md:text-lg leading-relaxed">
        Este aviso legal está siendo redactado formalmente. Para cualquier
        consulta sobre titularidad del sitio, propiedad intelectual de los
        proyectos mostrados o información legal del estudio, escribe
        directamente a{" "}
        <a
          href={`mailto:${studio.email}`}
          className="text-accent hover-line break-all"
        >
          {studio.email}
        </a>{" "}
        y respondemos en menos de 48 horas.
      </p>

      <p className="text-cream-soft text-base leading-relaxed">
        Mientras tanto: el sitio es propiedad de Diego Puelles, responsable del
        estudio independiente CLICKICLICK.studio. Los proyectos mostrados en
        Selected Work son propiedad de sus respectivos clientes y se exhiben
        con su autorización. Las relaciones derivadas del uso del sitio se
        rigen por la legislación española.
      </p>

      <div className="pt-10 border-t border-line">
        <p className="font-italic-display text-cream-soft">
          CLICKICLICK.studio — Estudio digital de autor
        </p>
        <p className="font-mono-meta text-cream-soft mt-2">
          {studio.city} · MMXXVI
        </p>
      </div>
    </article>
  );
}
