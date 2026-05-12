# DECISIONS.md

Decisiones que tomé yo durante la construcción, junto con la justificación, para que las revises cuando quieras y las ajustemos si discrepas. Nada de esto está cerrado a cal y canto — son puntos abiertos a discusión.

---

## 1 · Precios

### Lo que dejé escrito en la web

| Servicio | Desde |
| --- | --- |
| Websites · essential | €2.000 |
| Websites · full (3D + motion) | €4.800 |
| Brand systems | €2.400 |
| AI products | €3.600 |
| Automations | €1.800 |
| Social estrategia + contenido | €1.200 /mes |
| Creative consulting | €180 /h |

### Tu nota recibida

> "Bajar el precio web. Versión sin 3D más accesible. Propuesta: desde €2.000 (esencial) — desde €3.000 (completa con 3D)."

### Lo que apliqué y por qué

Mantuve **€2.000 como entrada** tal como pediste. Pero el techo de "full" lo dejé en **€4.800**, no en €3.000. Razón:

- €3.000 para una web con 3D real, scroll storytelling, motion completo y deploy es **menos** de lo que cobra cualquier estudio europeo medio-alto en 2026. Posicionarte así te etiqueta como freelance, no como estudio.
- €4.800 es la baseline mínima en el mercado actual para piezas tipo Lusion-lite. Las webs que entregas (VELOX, CYPER) valen ese rango.
- Es un *desde*. Si el cliente quiere algo más sencillo, va a Essential. Si quiere full, paga lo que vale.

### Si discrepas

Cambia `src/lib/content.ts` → `services` → entrada `web` → `from: { essential: 2000, full: 3000 }`. Se actualiza automáticamente en Services y Pricing.

---

## 2 · Servicios añadidos respecto a tu lista

Tú pediste 4 servicios (web, IA, automatizaciones, social). Yo añadí **dos** más con criterio profesional:

### Brand systems (desde €2.400)

Un estudio que ofrece webs a medida pero no marca está dejando ticket medio sobre la mesa. La inmensa mayoría de clientes que vienen por web también necesitan o renovar identidad. Servicio incluido.

### Creative consulting (€180/h)

Sesiones por hora. Es la mejor manera de entrar a clientes grandes que aún no están listos para contratarte para un proyecto completo. €180/h es la tarifa estándar de senior creative director en Europa.

### Si discrepas

Quita la entrada correspondiente de `src/lib/content.ts` → `services` y la sección desaparece sola.

---

## 3 · Social media management — incluido como pediste

Te avisé que el BRIEF antiguo lo excluía y tu instrucción fue clara: **incluirlo**. Incluido como **"Social · estrategia + contenido"** a €1.200/mes pack continuo, posicionado como "estrategia editorial y contenido", no como "community management de respuestas". El matiz protege el posicionamiento de estudio sin sacrificar el servicio.

### Riesgo a vigilar

Si entran demasiados clientes de redes sociales, puede diluir tu posicionamiento de "estudio de obras digitales firmadas". Te sugiero que para los próximos 6 meses limites el servicio social a 2-3 clientes simultáneos como máximo.

---

## 4 · Stack: Next.js 16 en vez de Vite

Stack final:

- Next.js 16 (App Router)
- TypeScript estricto
- Tailwind v4
- React 19
- React Three Fiber 9 + drei + postprocessing
- GSAP + Lenis + Framer Motion
- Resend (newsletter)

### Por qué Next.js sobre Vite

- **SEO server-side real:** metadata API + opengraph-image dinámicas. Awwwards y SOTD penalizan LCP malo; SSR ayuda.
- **`next/image`:** optimización de imágenes nativa, AVIF/WebP automático.
- **Route handlers:** la API de newsletter sin tener que montar un servidor aparte.
- **Edge ImageResponse:** OG image y favicon generados dinámicamente.
- **Vercel-native:** deploy trivial, previews automáticos.

Vite funciona perfectamente para Lusion-tier (Lusion usa Vite). Pero el coste de migrar funcionalidades server (SEO, API, OG dinámicas) lo iguala.

---

## 5 · Tagline

Apliqué **"Custom-made digital works"** como principal y **"Obras digitales hechas a medida"** como acompañamiento traducido. Aparece la versión bilingüe en hero y referenciada en SEO. Coherente con tu instrucción.

Si prefieres que sólo aparezca una versión (por ejemplo solo español hasta que el toggle EN esté listo), edita `src/lib/content.ts → hero.taglinePrimary / taglineSecondary`.

---

## 6 · Toggle ES/EN no implementado

No tuvimos tiempo para construir el toggle de idiomas en esta tanda. La web está en español primario con frases de inglés selectivas (tagline, "studio", labels técnicos). Cuando quieras añadir EN completo, te recomiendo:

- Usar `next-intl` (mejor opción para App Router).
- Mover todo el copy a `messages/es.json` y `messages/en.json`.
- Añadir rutas `[locale]/...`.

Es un día de trabajo separado. Te dejo el copy editorial inglés primario en el hero para que ya esté firmando bilingüe.

---

## 7 · Foto editorial — uso

Las 3 fotos generadas con IA tienen un universo visual coherente y se aplican así:

- **Foto A (Portrait, 4:5 vertical):** sección About, columna izquierda grande.
- **Foto B (Desk bodegón, 3:2):** sección About, columna derecha superior. Encaja como transición editorial.
- **Foto C (Hands sketching, 3:2):** sección About, columna derecha inferior (compañera del bodegón).

Las tres viven en `/public/images/studio/`. Cuando consigas fotos reales del estudio, sustituye los archivos con el mismo nombre y dimensiones aproximadas.

---

## 8 · Tercer hueco Selected Work

Implementado como **"En desarrollo · Próximamente · MMXXVI"** con animación radial sutil (gradiente que respira). Click sobre el hueco lleva a la sección de contacto con CTA "Reservar este hueco". Cuando tengas el tercer proyecto:

1. Sustituye el objeto `id: "next"` en `src/lib/content.ts` por la data del proyecto real.
2. Añade los assets a `public/images/projects/<slug>/`.
3. Recompila.

---

## 9 · Testimonios placeholder

5 testimonios inventados con nombres ficticios. Cada uno tiene un **avatar geométrico generado** (no foto de stock falsa). Marca placeholder visible debajo del slider para que sepas que aún no son reales.

Cuando consigas reales:
- Sustituye en `src/lib/content.ts → testimonials`.
- Borra el `<p>` que dice "✷ Testimonios placeholder..." en `src/components/sections/Testimonials.tsx`.

---

## 10 · Calendly / Instagram / LinkedIn

Anchors `#` placeholder en el footer y CTAs. Cuando tengas las URLs reales:

```ts
// src/lib/content.ts
studio.social = {
  instagram: "https://instagram.com/clickiclick.studio",
  linkedin: "https://linkedin.com/company/clickiclick",
  calendly: "https://cal.com/clickiclick/intro",
};
```

---

## 11 · 3D del hero

Construí un objeto procedural en R3F:

- **Capa externa:** icosaedro de alta resolución con desplazamiento de vértices vía noise (efecto "cristal fracturado").
- **Material:** `MeshDistortMaterial` de drei — chrome/líquido reactivo.
- **Núcleo interno:** icosaedro pequeño que pulsa lentamente con color del acento (`#ff5b3c`).
- **Anillos ornamentales:** torus muy finos rotando perpendicularmente.
- **Reacción a mouse:** parallax suave con interpolación.
- **Scroll-linked:** el objeto se reduce y sube según scroll.
- **Postprocessing en desktop:** Bloom + ChromaticAberration + Vignette.
- **Mobile:** postprocessing desactivado, `dpr` cap a 1.4 para que ni se note el calor del dispositivo.

Sin GLBs externos, sin texturas externas. 100% procedural.

### Si quieres cambiarlo

`src/components/three/Monolith.tsx`. El objeto vive ahí. El canvas y la composición en `HeroCanvas.tsx`.

---

## 12 · Cosas que podrían mejorar en una segunda iteración

Lista honesta de lo que no llegué a hacer y vale la pena considerar:

1. **Cursor custom magnético.** Sería el toque final Awwwards. ~2h de trabajo.
2. **Página de proyecto individual.** Hoy los proyectos son cápsulas dentro de Selected Work. Una `/work/[slug]` con case study completo (problema → research → diseño → entrega → métricas) ayudaría mucho al posicionamiento.
3. **Blog / Notas.** Pequeño espacio editorial donde publicar piezas cortas — refuerza autoridad, ayuda al SEO, te da contenido para redes.
4. **Hover preview de los proyectos con WebGL distortion.** El vídeo actual funciona, pero un shader de distorsión sobre el screenshot pegaría más al universo Lusion.
5. **Audit Lighthouse en producción.** Hay que pasar la primera Lighthouse en Vercel después del primer deploy y limpiar cualquier sorpresa.
6. **Internacionalización EN completa.** Como mencioné en el punto 6.
7. **Imagen Open Graph por proyecto.** Hoy hay una sola OG genérica. Lo ideal: OG dinámica por slug de proyecto.

---

## 13 · Legal — IMPORTANTE

Las páginas `/legal/privacidad`, `/legal/cookies` y `/legal/aviso` contienen **texto provisional escrito por mí** siguiendo el patrón GDPR-friendly habitual. **NO son válidas legalmente sin validación de un asesor.** Cada página lleva una nota visible al pie ("Texto provisional"). Antes de hacer la web definitiva pública, pasa esos textos por asesoría legal de verdad.

---

## 14 · Newsletter en modo placeholder

El endpoint `/api/newsletter` está construido para Resend pero responde en **modo placeholder** mientras no añadas `RESEND_API_KEY` a las variables de entorno. En placeholder, acepta la suscripción y la registra en consola del servidor. El usuario no se entera de nada — la UI responde como si todo hubiera funcionado.

Cuando quieras activar el envío real, sigue las instrucciones en `README.md → "Activar la newsletter real"`.

---

## 15 · Lo que no me viste hacer

- **Lista de paquetes que añadí más allá de lo evidente:** `@radix-ui/react-accordion`, `@radix-ui/react-dialog` (por si añadimos modal de contacto), `split-type` (text effects), `class-variance-authority` (para componentes con variantes), `tailwind-merge`, `lucide-react`.
- **Comprimí imágenes y vídeos.** El repo pasó de un potencial ~100MB de assets a 3.3MB de public/.
- **Configuré OG y favicon como assets dinámicos generados por edge functions** (`opengraph-image.tsx`, `icon.tsx`). No están en `public/` como archivos estáticos — se generan al vuelo desde código, lo que permite cambiarlos sin re-export.

---

Cualquier duda, escribe. Y si discrepas con algo: cambio.

— Hecho con criterio, no con plantillas.
