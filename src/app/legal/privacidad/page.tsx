import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
};

export default function PrivacidadPage() {
  return (
    <article className="prose-editorial space-y-6 text-cream/90">
      <p className="font-mono-meta text-cream-soft">Legal — Documento 01</p>
      <h1 className="font-display text-display-md uppercase mb-4">
        Política de privacidad
      </h1>
      <p className="text-cream-soft">
        Última actualización: MMXXVI. Documento provisional pendiente de
        validación por asesor legal.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        1. Responsable del tratamiento
      </h2>
      <p>
        Diego Puelles, persona física, responsable del estudio Clickiclick.studio,
        con domicilio profesional en Barcelona y email de contacto{" "}
        <a
          href="mailto:clickiclickweb@gmail.com"
          className="text-accent hover-line"
        >
          clickiclickweb@gmail.com
        </a>
        .
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        2. Datos que recogemos
      </h2>
      <p>
        Recogemos únicamente los datos que tú nos facilitas voluntariamente al
        rellenar el formulario de contacto, suscribirte a la newsletter o
        contactarnos por email: nombre, email, empresa (opcional) y mensaje.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        3. Finalidad del tratamiento
      </h2>
      <p>
        Responder a tus consultas, gestionar potenciales colaboraciones,
        enviarte la newsletter si has dado consentimiento expreso, y cumplir
        obligaciones legales.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        4. Base legal
      </h2>
      <p>
        Tu consentimiento expreso (formularios y newsletter) y el interés
        legítimo en gestionar la relación profesional iniciada por ti.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        5. Conservación
      </h2>
      <p>
        Conservamos tus datos mientras dure la relación profesional o hasta
        que solicites su supresión, en el caso de la newsletter.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">
        6. Tus derechos
      </h2>
      <p>
        Puedes ejercer en cualquier momento los derechos de acceso,
        rectificación, supresión, oposición, portabilidad y limitación
        escribiendo a{" "}
        <a
          href="mailto:clickiclickweb@gmail.com"
          className="text-accent hover-line"
        >
          clickiclickweb@gmail.com
        </a>
        . Si consideras que el tratamiento no se ajusta a la normativa, puedes
        reclamar ante la AEPD.
      </p>

      <h2 className="font-display text-2xl uppercase mt-10">7. Terceros</h2>
      <p>
        Usamos Vercel (hosting), Resend (envío de email) y eventualmente otras
        plataformas para el funcionamiento del sitio. Los datos no se ceden a
        terceros con fines comerciales.
      </p>

      <p className="text-cream-soft pt-10 font-mono-meta">
        ✷ Texto de carácter informativo. Para la versión definitiva, este
        documento será revisado y firmado por asesoría legal.
      </p>
    </article>
  );
}
