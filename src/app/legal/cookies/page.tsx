import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de cookies",
};

export default function CookiesPage() {
  return (
    <article className="space-y-8 text-cream/90 max-w-3xl">
      <p className="font-mono-meta text-cream-soft">Legal — Documento 02</p>
      <h1 className="font-display text-display-md uppercase">
        Política de cookies
      </h1>

      <p className="text-cream text-base md:text-lg leading-relaxed">
        Esta política está siendo redactada formalmente. Para cualquier consulta
        sobre cookies, almacenamiento en navegador o trazabilidad técnica del
        sitio, escribe directamente a{" "}
        <a
          href={`mailto:${studio.email}`}
          className="text-accent hover-line break-all"
        >
          {studio.email}
        </a>{" "}
        y respondemos en menos de 48 horas.
      </p>

      <p className="text-cream-soft text-base leading-relaxed">
        Mientras tanto: este sitio utiliza únicamente cookies técnicas
        estrictamente necesarias para que funcione. No usamos cookies de
        analítica de terceros sin consentimiento, ni cookies publicitarias. Si
        en el futuro añadimos analítica anónima, te avisaremos con banner antes
        de activarla.
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
