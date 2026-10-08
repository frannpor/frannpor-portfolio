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
            "Probá de nuevo. Si vuelve a pasar, escribime con el enlace para que pueda revisarlo.",
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
            "Try again. If it keeps happening, send me the link so I can look into it.",
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
