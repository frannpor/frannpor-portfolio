import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.frannpor-dev.com"),
  title: "Francisco Porciel | Full Stack Developer",
  description:
    "Portfolio de Francisco Porciel, desarrollador Full Stack. Aplicaciones web, interfaces, backend e infraestructura AWS. Experiencia, proyectos y CV en español e inglés.",
  authors: [{ name: "Francisco Porciel" }],
  alternates: { canonical: "/" },
  icons: {
    icon: "/brand/franpor-color.ico",
    shortcut: "/brand/franpor-color.ico",
  },
  openGraph: {
    title: "Francisco Porciel | Full Stack Developer",
    description:
      "Aplicaciones web, interfaces, backend e infraestructura AWS. Conocé mi experiencia, mis proyectos y mi forma de trabajar.",
    type: "website",
    url: "/",
    siteName: "Francisco Porciel",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Porciel | Full Stack Developer",
    description: "Interfaces, producto e infraestructura. Conocé mis proyectos y mi forma de trabajar.",
    images: [{ url: "/opengraph-image", alt: "Francisco Porciel. Full Stack Developer. Interfaces, producto e infraestructura." }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
