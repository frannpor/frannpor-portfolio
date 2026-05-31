"use client";

import { StatusPage } from "@/features/system/StatusPage";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <StatusPage
      code="500"
      content={{
        es: {
          eyebrow: "Algo falló",
          title: "La página no terminó de cargar bien.",
          description:
            "Puede ser algo temporal del navegador, del deploy o de una integración. Probá de nuevo y, si vuelve a pasar, escribime con el link.",
          primaryLabel: "Volver al inicio",
          secondaryLabel: "Reintentar",
          routeRecovery: "error temporal",
          quickLinks: {
            projects: "Proyectos",
            privacy: "Privacidad",
            contact: "Contacto",
          },
          statusItems: ["inicio / disponible", "contacto / disponible", "legal / disponible"],
        },
        en: {
          eyebrow: "Something failed",
          title: "The page did not finish loading properly.",
          description:
            "It may be a temporary browser, deployment, or integration issue. Try again and, if it keeps happening, send me the link.",
          primaryLabel: "Back home",
          secondaryLabel: "Retry",
          routeRecovery: "temporary error",
          quickLinks: {
            projects: "Projects",
            privacy: "Privacy",
            contact: "Contact",
          },
          statusItems: ["home / available", "contact / available", "legal / available"],
        },
      }}
      onReset={reset}
    />
  );
}
