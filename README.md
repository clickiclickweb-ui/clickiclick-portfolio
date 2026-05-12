# Clickiclick.studio — Portfolio

> Custom-made digital works · Obras digitales hechas a medida.

Portfolio del estudio Clickiclick.studio. Una sola página, scroll storytelling, 3D real en hero, animaciones cuidadas. Construido con Next.js 16, React Three Fiber, GSAP, Lenis y Framer Motion.

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, edge ImageResponse for OG)
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS v4 con `@theme` tokens
- **3D:** React Three Fiber + `@react-three/drei` + `@react-three/postprocessing`
- **Animación:** GSAP (scroll), Framer Motion (UI), Lenis (smooth scroll)
- **Fuentes:** Editorial New + Switzer + JetBrains Mono vía Fontshare
- **Email:** Resend (newsletter API)
- **Deploy:** Vercel
- **Iconos:** lucide-react

---

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx              Root layout, fonts, metadata, providers
│  ├─ page.tsx                Composición de secciones
│  ├─ globals.css             Tokens, fonts, utilidades base
│  ├─ opengraph-image.tsx     OG image dinámica (edge)
│  ├─ icon.tsx                Favicon dinámico (edge)
│  ├─ robots.ts / sitemap.ts
│  ├─ api/newsletter/route.ts API de suscripción (Resend)
│  └─ legal/*                 Privacidad, cookies, aviso (placeholders GDPR)
├─ components/
│  ├─ providers/SmoothScroll.tsx     Lenis
│  ├─ three/HeroCanvas.tsx           R3F scene + post-processing
│  ├─ three/Monolith.tsx             Objeto 3D procedural del hero
│  ├─ shared/                        Nav, Footer, Wordmark, Reveal, Marquee
│  ├─ ui/                            Button, Magnetic (hover)
│  └─ sections/                      Hero, Manifesto, Services, SelectedWork,
│                                    Process, Pricing, About, Testimonials,
│                                    FAQ, Contact, Footer
└─ lib/
   ├─ content.ts             Single source of truth de copy y data
   └─ utils.ts               cn, lerp, clamp
```

---

## Desarrollo

```bash
# 1) Instalar dependencias
npm install

# 2) Variables de entorno (opcional para newsletter)
cp .env.example .env.local
# Rellena RESEND_API_KEY y RESEND_AUDIENCE_ID si quieres newsletter funcional.
# Sin ellas, el formulario funciona en modo placeholder (loguea pero no envía).

# 3) Servidor de desarrollo (http://localhost:3000)
npm run dev

# 4) Build de producción
npm run build

# 5) Servir build de producción local
npm start

# 6) Lint
npm run lint
```

Node ≥ 20 requerido. Compatible con Node 22 y 24.

---

## Variables de entorno

| Variable               | Requerida    | Descripción                                                                            |
| ---------------------- | ------------ | -------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Opcional     | API key de Resend para newsletter. Sin ella, el endpoint responde en modo placeholder. |
| `RESEND_AUDIENCE_ID`   | Opcional     | ID de la audiencia de Resend a la que se añaden las suscripciones.                     |
| `CONTACT_EMAIL`        | Opcional     | Email de fallback para notificar suscripciones si no hay `AUDIENCE_ID`.                |

Para producción, configura las variables en **Vercel Project Settings → Environment Variables**.

---

## Deploy a Vercel

### Opción A · Desde CLI

```bash
# Instalar Vercel CLI si no la tienes
npm i -g vercel

# Login
vercel login

# Deploy de preview
vercel

# Deploy a producción
vercel --prod
```

### Opción B · Desde GitHub

1. Empuja el repo a GitHub (este proyecto se inicializa con git ya).
2. En [vercel.com/new](https://vercel.com/new), conecta el repo.
3. Las opciones por defecto son correctas (Framework: Next.js, Build command: `next build`).
4. Añade las variables de entorno y desplega.
5. Cualquier push a `main` re-despliega automáticamente.

Dominio inicial: `clickiclick-portfolio.vercel.app`. Para conectar `clickiclick.studio`, añade el dominio en **Project → Domains** y configura el DNS (Vercel guía el proceso).

---

## Mantenimiento

### Cambiar copy

Todo el copy editorial vive en `src/lib/content.ts`. Cualquier cambio de texto se hace ahí, no toca a los componentes.

### Cambiar precios

`src/lib/content.ts` → exportación `services`. Cada objeto tiene un campo `from: { essential, full? }`. Si modificas precios, la sección **Pricing** y **Services** se actualizan automáticamente.

### Añadir un proyecto al Selected Work

1. Añade un nuevo objeto al array `projects` en `src/lib/content.ts`.
2. Coloca el screenshot WebP optimizado en `public/images/projects/<slug>/desktop.webp` y `mobile.webp`.
3. Si tienes vídeo, conviértelo con ffmpeg:
   ```bash
   ffmpeg -y -ss 2 -i input.mov -t 14 -an -vf "scale=1280:-2:flags=lanczos" \
     -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
     -crf 28 -preset slow -movflags +faststart public/videos/<slug>.mp4
   ```
4. Las paletas auxiliares (`palette.base/accent/muted`) tiñen el hover del proyecto.

### Sustituir testimonios placeholder

`src/lib/content.ts` → `testimonials`. Cuando reemplaces, el aviso "Placeholder" en la sección sigue mostrándose hasta que lo borres manualmente en `src/components/sections/Testimonials.tsx`.

### Sustituir fotos del estudio

Reemplaza los archivos en `public/images/studio/portrait.webp`, `desk.webp`, `hands.webp`. Mantén las dimensiones (4:5 vertical para el retrato, 3:2 horizontal para los otros dos).

### Cambiar paleta

`src/app/globals.css` → bloque `@theme`. Las variables `--color-*` están vinculadas a las utilidades de Tailwind. Cambia un valor y se propaga a toda la web.

### Activar la newsletter real

1. Crear cuenta en [resend.com](https://resend.com).
2. Crear API key.
3. (Opcional pero recomendado) crear una "Audience" para gestionar suscripciones.
4. Añadir `RESEND_API_KEY` y `RESEND_AUDIENCE_ID` a las env vars.
5. Re-deploy.

### Conectar Calendly / Instagram / LinkedIn

`src/lib/content.ts` → `studio.social`. Cambia los `"#calendly" → "https://calendly.com/tu-usuario"`, etc.

---

## Performance notes

- Imágenes servidas como WebP a través de `next/image` (lazy + responsive automático).
- Vídeos H.264 1280px, ~14s, ~800 KB, `preload="metadata"` (no se descarga el cuerpo hasta hover).
- 3D del hero: postprocessing desactivado en mobile, `dpr` cap a 1.4. Suspended hasta cliente (`ssr: false`).
- Lenis smooth scroll respeta `prefers-reduced-motion`.
- Tipografía Fontshare con `display=swap` para no bloquear FCP.

---

## Browser support

- Chrome / Edge / Firefox / Safari últimos 2 años.
- Safari iOS 14+.
- Si el navegador no soporta WebGL, el hero degrada al fondo de color y la composición tipográfica sigue funcionando.

---

## Autor

**Diego Puelles** · [clickiclickweb@gmail.com](mailto:clickiclickweb@gmail.com) · Barcelona · MMXXVI

Hecho a mano.
