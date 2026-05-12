import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { seoCopy, studio } from "@/lib/content";

const siteUrl = "https://clickiclick-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoCopy.title,
    template: "%s · Clickiclick.studio",
  },
  description: seoCopy.description,
  applicationName: studio.name,
  authors: [{ name: "Diego Puelles", url: siteUrl }],
  creator: "Diego Puelles",
  keywords: [
    "diseño web a medida",
    "desarrollo web",
    "estudio digital",
    "Barcelona",
    "React Three Fiber",
    "Next.js",
    "AI integrations",
    "automatizaciones",
    "branding",
  ],
  openGraph: {
    title: seoCopy.ogTitle,
    description: seoCopy.ogDescription,
    url: siteUrl,
    siteName: studio.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoCopy.ogTitle,
    description: seoCopy.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-ink antialiased">
      <body className="bg-ink text-cream grain min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
