import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
};

export default function CookiesPage() {
  return (
    <article className="space-y-6 text-cream/90">
      <p className="font-mono-meta text-cream-soft">Legal — Documento 02</p>
      <h1 className="font-display text-display-md uppercase mb-4">
        Política de cookies
      </h1>
      <p className="text-cream-soft">
        Última actualización: MMXXVI. Documento provisional pendiente de
        validación legal.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">¿Qué son?</h2>
      <p>
        Las cookies son pequeños archivos que se descargan en tu dispositivo
        cuando visitas un sitio web. Sirven para almacenar y recuperar
        información sobre tu navegación.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Cookies en este sitio
      </h2>
      <p>
        Este sitio utiliza únicamente cookies técnicas estrictamente necesarias
        para su funcionamiento (preferencias de visualización, sesión técnica).
        No utilizamos cookies de analítica de terceros sin consentimiento, ni
        publicitarias.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Si en el futuro añadimos analítica
      </h2>
      <p>
        En caso de incorporar herramientas de analítica (Plausible, Vercel
        Analytics, etc.), te avisaremos mediante banner de consentimiento y
        podrás aceptar o rechazar antes de que se activen.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Cómo gestionarlas
      </h2>
      <p>
        Puedes configurar o eliminar las cookies desde la configuración de tu
        navegador. Cada navegador tiene su propio panel: Chrome, Firefox, Safari
        y Edge ofrecen instrucciones detalladas en su documentación oficial.
      </p>

      <p className="text-cream-soft pt-10 font-mono-meta">
        ✷ Texto provisional. Pendiente de validación legal antes de
        producción definitiva.
      </p>
    </article>
  );
}
