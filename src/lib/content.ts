// All editorial copy and structured content lives here.
// Single source of truth. Sections import from this module.

export const studio = {
  name: "Clickiclick.studio",
  shortName: "Clickiclick",
  taglineEs: "Obras digitales hechas a medida",
  taglineEn: "Custom-made digital works",
  founded: "MMXXVI",
  city: "Barcelona",
  region: "Catalunya",
  scope: "Remote · Worldwide",
  email: "clickiclickweb@gmail.com",
  phone: "+34 722 753 559",
  social: {
    instagram: "#instagram",
    linkedin: "#linkedin",
    calendly: "#calendly",
  },
};

export const hero = {
  eyebrow: "Studio · Anno MMXXVI",
  display: "Clickiclick",
  // Italic accent word follows
  displayAccent: "studio",
  taglinePrimary: "Custom-made digital works",
  taglineSecondary: "Obras digitales hechas a medida",
  intro:
    "Estudio independiente que firma webs, marcas y sistemas de inteligencia artificial sobre encargo. Cada proyecto se trabaja al detalle, mano a mano, revisión a revisión.",
  cta: "Empezar una obra",
  ctaSecondary: "Ver trabajo",
  meta: [
    { label: "Estudio", value: "Independiente" },
    { label: "Base", value: "Barcelona · Remoto" },
    { label: "Año", value: "MMXXVI" },
  ],
};

export const manifesto = {
  eyebrow: "01 — Manifiesto",
  display: "Trabajamos al detalle.",
  italicAccent: "Cada milímetro.",
  body: [
    "Clickiclick existe porque el internet de las plantillas ya no nos vale. Las webs nos llegan empaquetadas, indistinguibles, decoradas con animaciones genéricas que pasan sin dejar huella.",
    "Aquí construimos al revés: a mano, en directo, con la persona que encarga la obra al otro lado. Una sola conversación, una sola firma, una sola pieza terminada que se reconoce de lejos.",
    "Diseñamos webs, marcas, agentes de IA, automatizaciones y estrategia de contenido — pero la categoría importa menos que el oficio. Lo que entregamos es la pieza que el cliente había imaginado, exactamente.",
  ],
  signature: "— Diego Puelles",
};

export type Service = {
  id: string;
  index: string;
  title: string;
  titleItalic: string;
  eyebrow: string;
  from: { essential: number; full?: number };
  perMonth?: boolean;
  perHour?: boolean;
  accent?: boolean;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "web",
    index: "01",
    title: "Websites",
    titleItalic: "a medida",
    eyebrow: "Diseño + desarrollo + 3D",
    from: { essential: 2000, full: 4800 },
    description:
      "Cada web nace de cero. Diseño tipográfico, sistema visual propio, microinteracciones cuidadas. Versión esencial para piezas centradas en mensaje; versión completa cuando hace falta motion, 3D real y scroll storytelling.",
    deliverables: [
      "Diseño visual completo en Figma",
      "Frontend con Next.js + React",
      "Animaciones GSAP / Framer Motion",
      "3D en React Three Fiber (track full)",
      "Optimización Core Web Vitals",
      "Deploy y dominio configurado",
    ],
    accent: true,
  },
  {
    id: "brand",
    index: "02",
    title: "Brand",
    titleItalic: "systems",
    eyebrow: "Identidad + sistema visual",
    from: { essential: 2400 },
    description:
      "Identidades completas: naming opcional, marca, paleta cromática, sistema tipográfico, guías de aplicación, plantillas. Sistemas que viven más allá del logo.",
    deliverables: [
      "Investigación + dirección creativa",
      "Marca + variantes",
      "Sistema cromático y tipográfico",
      "Guía de marca PDF + Figma",
      "Plantillas de aplicación",
    ],
  },
  {
    id: "ai",
    index: "03",
    title: "AI",
    titleItalic: "products",
    eyebrow: "Agentes · Integraciones · LLMs",
    from: { essential: 3600 },
    description:
      "Productos con inteligencia artificial reales: agentes a medida, chatbots con personalidad, integraciones LLM en webs y procesos. Construidos con Claude, OpenAI, modelos open-source — el más adecuado a cada caso.",
    deliverables: [
      "Agentes conversacionales custom",
      "Integraciones API con LLMs",
      "RAG sobre tu propio contenido",
      "Workflows AI dentro de tu producto",
      "Métricas de uso + observabilidad",
    ],
  },
  {
    id: "automations",
    index: "04",
    title: "Automations",
    titleItalic: "& flows",
    eyebrow: "n8n · Make · Scripts custom",
    from: { essential: 1800 },
    description:
      "Automatizo procesos de negocio: integraciones entre herramientas (Notion, Airtable, Slack, CRMs, GitHub), workflows visuales en n8n/Make, scripts a medida cuando los visuales no llegan.",
    deliverables: [
      "Auditoría del proceso actual",
      "Diseño del flujo automatizado",
      "Implementación + integraciones",
      "Documentación + handoff",
      "Soporte de mantenimiento opcional",
    ],
  },
  {
    id: "social",
    index: "05",
    title: "Social",
    titleItalic: "strategy",
    eyebrow: "Estrategia · Contenido · Comunidad",
    from: { essential: 1200 },
    perMonth: true,
    description:
      "Pack mensual continuo. Estrategia editorial, calendario de contenido, piezas gráficas, copy, gestión de la comunidad. Para marcas que necesitan voz propia, no más ruido.",
    deliverables: [
      "Estrategia + content pillars",
      "Calendario editorial mensual",
      "Piezas gráficas (8-16/mes)",
      "Copywriting + tono editorial",
      "Reporting mensual con insights",
    ],
  },
  {
    id: "consulting",
    index: "06",
    title: "Creative",
    titleItalic: "consulting",
    eyebrow: "Sesiones · Audits · Dirección",
    from: { essential: 180 },
    perHour: true,
    description:
      "Consultoría puntual o continuada. Auditorías UX/UI sobre tu producto vivo, dirección creativa para tu equipo interno, sesiones de estrategia. Para cuando no necesitas que ejecutemos, solo que pensemos contigo.",
    deliverables: [
      "Audit UX/UI escrito",
      "Sesiones 1-on-1 (60-90 min)",
      "Dirección creativa por sprint",
      "Revisión de portfolios / equipos",
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  year: string;
  services: string[];
  sector: string;
  url: string;
  placeholder?: boolean;
  palette?: { base: string; accent: string; muted: string };
  cover?: string;
  mobile?: string;
  video?: string;
  poster?: string;
  description: string;
  role?: string;
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    id: "velox",
    index: "01",
    name: "VELOX",
    subtitle: "Urban bikes",
    year: "2025",
    services: ["Web design", "Web development", "Motion"],
    sector: "Movilidad urbana",
    url: "https://stellular-gumption-febb6c.netlify.app/",
    palette: {
      base: "#0A1428",
      accent: "#FF4500",
      muted: "#C7CACE",
    },
    cover: "/images/projects/velox/desktop.webp",
    mobile: "/images/projects/velox/mobile.webp",
    video: "/videos/velox.mp4",
    poster: "/images/projects/velox/desktop.webp",
    description:
      "Una bicicleta urbana premium pedía una web que comunicara superioridad sin gritar. Construimos la pieza alrededor de la materialidad del producto — carbono, naranja, ciudad — y dejamos que la tipografía hiciera el trabajo pesado.",
    role: "Diseño y desarrollo end-to-end.",
    metrics: [
      { value: "6.4 kg", label: "Peso total" },
      { value: "10 años", label: "Garantía" },
      { value: "0 cadena", label: "Gates Carbon Drive" },
    ],
  },
  {
    id: "cyper",
    index: "02",
    name: "CYPER",
    subtitle: "Botanical oils",
    year: "2025",
    services: ["Web design", "Web development", "E-commerce"],
    sector: "Cosmética · Skincare",
    url: "https://keen-lamington-095de2.netlify.app/",
    palette: {
      base: "#1A1410",
      accent: "#B8956A",
      muted: "#8B7E68",
    },
    cover: "/images/projects/cyper/desktop.webp",
    mobile: "/images/projects/cyper/mobile.webp",
    video: "/videos/cyper.mp4",
    poster: "/images/projects/cyper/desktop.webp",
    description:
      "Cyperus Rotundus es un aceite ancestral con propiedades modernas. La marca pedía una web entre el editorial de revista y la ficha de producto — donde lo botánico, lo arqueológico y lo cosmético convivieran sin estridencias.",
    role: "Diseño visual + frontend + e-commerce.",
    metrics: [
      { value: "100%", label: "Prensado en frío" },
      { value: "3000+", label: "Años de tradición" },
      { value: "MED", label: "Origen Mediterráneo" },
    ],
  },
  {
    id: "next",
    index: "03",
    name: "En desarrollo",
    subtitle: "Próximamente",
    year: "MMXXVI",
    services: ["—"],
    sector: "—",
    url: "#contact",
    placeholder: true,
    description:
      "Hueco reservado para la siguiente obra. Si quieres firmar la tercera, escribe.",
  },
];

export const process = [
  {
    index: "01",
    name: "Discovery",
    duration: "1 semana",
    pull:
      "Escuchamos. Inmersión completa en tu marca, tu cliente, tu mercado, tus referentes.",
    body:
      "Una llamada profunda + un cuestionario detallado + research independiente. Salimos con un diagnóstico escrito y una propuesta estratégica.",
  },
  {
    index: "02",
    name: "Strategy",
    duration: "1 semana",
    pull:
      "Definimos el qué y el por qué antes del cómo. Posicionamiento, arquitectura, métricas.",
    body:
      "Documento de estrategia: mensaje principal, secciones, jerarquía de información, KPIs, mood inicial. Cierre antes de tocar Figma.",
  },
  {
    index: "03",
    name: "Design",
    duration: "2–3 semanas",
    pull:
      "Diseño visual completo en Figma. Sistema, no pantallas sueltas.",
    body:
      "Dirección de arte → mood → desktop y mobile → micro-interacciones → revisiones. Trabajamos con dos rondas formales y comentarios en directo.",
  },
  {
    index: "04",
    name: "Build",
    duration: "2–4 semanas",
    pull:
      "Construcción. Código limpio, animaciones cuidadas, performance medida.",
    body:
      "Next.js, React Three Fiber, GSAP, Tailwind. Cada commit pasa Lighthouse. Cada animación tiene easing custom. Sin shortcuts.",
  },
  {
    index: "05",
    name: "Launch & care",
    duration: "Continuo",
    pull:
      "Lanzamos contigo, no por ti. Y nos quedamos para los meses siguientes.",
    body:
      "Deploy, dominio, analítica, formación. Pack opcional de mantenimiento mensual: cambios, mejoras, monitorización, actualizaciones.",
  },
];

export const testimonials = [
  {
    name: "Marta Solé",
    role: "Founder",
    company: "Atelier Solé",
    quote:
      "Diego entiende lo que quieres antes de que sepas explicarlo. Entregó una web que parecía hecha por un estudio cinco veces más grande.",
  },
  {
    name: "Andreu Ribó",
    role: "Director de marca",
    company: "Velox Bikes",
    quote:
      "Trabajamos con tres agencias antes. Ninguna entregó la pieza que él entregó. Detalle obsesivo, animaciones que se sienten caras, código que no nos avergüenza enseñar a un dev.",
  },
  {
    name: "Lucía Marín",
    role: "Co-founder",
    company: "Cyper Botanical",
    quote:
      "Necesitábamos una web que pareciera de revista y vendiera como tienda. Diego no eligió: las hizo las dos cosas a la vez. Cinco meses después aún recibimos mensajes preguntándonos quién la hizo.",
  },
  {
    name: "Pol Vidal",
    role: "Head of Product",
    company: "Anonymous SaaS",
    quote:
      "Le pedimos una integración de IA. Nos devolvió, además, una propuesta de UX que reescribió cómo pensamos sobre el producto. Esa consultoría sola valió el doble.",
  },
  {
    name: "Inés Carbó",
    role: "Creative Director",
    company: "Studio Carbó",
    quote:
      "Subcontraté a Diego para un proyecto en el que íbamos cortos. Entregó por delante de plazo, en su voz, sin pedir nada más que el brief. Repetimos.",
  },
];

export const faq = [
  {
    q: "¿Cuánto tarda una web?",
    a: "Una pieza esencial: 4 semanas. Una pieza con 3D y motion completo: 6 a 9 semanas. Te doy fechas reales, no plazos optimistas que luego se rompen.",
  },
  {
    q: "¿Trabajas solo o con equipo?",
    a: "Solo. Clickiclick es un estudio de autor. Si el proyecto exige colaboradores específicos (fotografía, ilustración, vídeo) los traigo bajo mi dirección, pero el contrato y la firma son míos. Hablas siempre conmigo.",
  },
  {
    q: "¿De quién es la propiedad intelectual?",
    a: "Tuya, completa, al cierre del proyecto. Archivos source incluidos. Yo conservo el derecho a mostrarlo en portfolio salvo NDA acordado por escrito.",
  },
  {
    q: "¿Hosting, dominio y mantenimiento?",
    a: "Vercel + dominio a tu nombre. Te ayudo con el setup inicial sin coste. Para mantenimiento ofrezco un pack mensual desde €280 que cubre cambios menores, monitorización, backups y soporte prioritario.",
  },
  {
    q: "¿Cuántas rondas de revisión?",
    a: "Dos rondas formales sobre el diseño + ajustes finos en la fase de desarrollo. La mayoría de proyectos cierran con menos. Si pides revisiones que cambien la dirección estratégica, lo hablamos antes de empezar.",
  },
  {
    q: "¿Trabajas con clientes internacionales?",
    a: "Sí. Trabajo en español e inglés. Facturo en euros, acepto transferencias internacionales y Stripe. Las reuniones se acomodan a tu zona horaria dentro de lo razonable.",
  },
  {
    q: "¿Por qué no estás en una agencia más grande?",
    a: "Porque las cosas buenas las firma una sola persona. Una agencia me obligaría a tener tres clientes simultáneos para que las cuentas salgan. Aquí trabajo en uno o dos a la vez. Eso es la diferencia.",
  },
];

export const aboutCopy = {
  eyebrow: "Studio",
  display: "Un estudio.",
  italicAccent: "Una firma.",
  bodyShort:
    "Diego Puelles. Diseñador y desarrollador en Barcelona, trabajando para clientes en Europa y América.",
  bodyLong: [
    "Llevo más de cinco años construyendo productos digitales para marcas que no quieren parecerse al resto. Empecé como diseñador, terminé escribiendo código en producción, y entendí que la frontera entre las dos disciplinas es ficticia.",
    "Clickiclick es la consecuencia: un estudio de una sola persona donde cada proyecto se trata como una obra. Sin sales pipeline, sin propuestas genéricas, sin el rosario de tres meses que tarda una agencia en pasar del brief al diseño.",
    "Trabajo con dos o tres clientes simultáneos como máximo. El resto del tiempo lo dedico a investigar, escribir, y mantener los proyectos que ya salieron al mundo.",
  ],
};

export const footerNav = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#services" },
  { label: "Trabajo", href: "#work" },
  { label: "Proceso", href: "#process" },
  { label: "Tarifas", href: "#pricing" },
  { label: "Estudio", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contact" },
];

export const navItems = [
  { label: "Servicios", href: "#services" },
  { label: "Trabajo", href: "#work" },
  { label: "Proceso", href: "#process" },
  { label: "Estudio", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

export const seoCopy = {
  title: "Clickiclick.studio — Custom-made digital works",
  description:
    "Estudio independiente de diseño, desarrollo, IA y automatización. Webs, marcas y productos digitales hechos a medida. Barcelona · Remoto.",
  ogTitle: "Clickiclick.studio",
  ogDescription: "Custom-made digital works · Obras digitales hechas a medida",
};
