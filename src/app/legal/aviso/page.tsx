import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
};

export default function AvisoPage() {
  return (
    <article className="space-y-6 text-cream/90">
      <p className="font-mono-meta text-cream-soft">Legal — Documento 03</p>
      <h1 className="font-display text-display-md uppercase mb-4">
        Aviso legal
      </h1>
      <p className="text-cream-soft">
        Última actualización: MMXXVI. Documento provisional pendiente de
        validación legal.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Titularidad del sitio
      </h2>
      <p>
        Este sitio es propiedad de Diego Puelles, responsable del estudio
        independiente Clickiclick.studio, con sede profesional en Barcelona y
        contacto en{" "}
        <a
          href="mailto:clickiclickweb@gmail.com"
          className="text-accent hover-line"
        >
          clickiclickweb@gmail.com
        </a>
        .
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Propiedad intelectual
      </h2>
      <p>
        Todo el contenido del sitio — textos, imágenes, código, sistema visual,
        marcas referenciadas — está protegido por derechos de propiedad
        intelectual. Los proyectos mostrados en la sección Selected Work son
        propiedad de sus respectivos clientes y se exhiben con su autorización.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Limitación de responsabilidad
      </h2>
      <p>
        Hacemos esfuerzo razonable por mantener el sitio operativo y la
        información actualizada, pero no podemos garantizar la ausencia total
        de interrupciones ni errores. El acceso es bajo tu propia
        responsabilidad.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        Ley aplicable
      </h2>
      <p>
        Las relaciones derivadas del uso de este sitio se rigen por la
        legislación española. Cualquier controversia se someterá a los
        juzgados competentes de Barcelona.
      </p>

      <p className="text-cream-soft pt-10 font-mono-meta">
        ✷ Texto provisional. Versión definitiva pendiente de validación por
        asesor legal antes de la producción final.
      </p>
    </article>
  );
}
