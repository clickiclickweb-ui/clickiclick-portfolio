import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad",
};

export default function PrivacidadPage() {
  return (
    <article className="space-y-8 text-cream/90 max-w-3xl">
      <p className="font-mono-meta text-cream-soft">Legal — Documento 01</p>
      <h1 className="font-display text-display-md uppercase">
        Política de privacidad
      </h1>

      <p className="text-cream text-base md:text-lg leading-relaxed">
        Esta política está siendo redactada formalmente. Para cualquier
        consulta sobre tratamiento de datos personales — qué guardamos, durante
        cuánto tiempo, con qué finalidad o cómo ejercer tus derechos de acceso,
        rectificación o supresión — escribe directamente a{" "}
        <a
          href={`mailto:${studio.email}`}
          className="text-accent hover-line break-all"
        >
          {studio.email}
        </a>{" "}
        y respondemos en menos de 48 horas.
      </p>

      <p className="text-cream-soft text-base leading-relaxed">
        El documento definitivo se publicará revisado por asesoría legal. Hasta
        entonces, la responsabilidad sobre los datos que nos confías es
        nuestra y la tomamos en serio: sólo guardamos lo que necesitamos para
        responderte, no lo compartimos con terceros para fines comerciales, y
        lo eliminamos si nos lo pides.
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
