import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francisco Porciel | Full Stack Developer",
  description:
    "Portfolio de Francisco Porciel, desarrollador Full Stack. Aplicaciones web, interfaces, backend e infraestructura AWS. Experiencia, proyectos y CV en español e inglés.",
  authors: [{ name: "Francisco Porciel" }],
  icons: {
    icon: "/brand/franpor-color.ico",
    shortcut: "/brand/franpor-color.ico",
  },
  openGraph: {
    title: "Francisco Porciel | Full Stack Developer",
    description:
      "Aplicaciones web, interfaces, backend e infraestructura AWS. Conocé mi experiencia, mis proyectos y mi forma de trabajar.",
    type: "website",
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
