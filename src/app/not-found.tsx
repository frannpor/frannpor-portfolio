import { StatusPage } from "@/features/system/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      content={{
        es: {
          eyebrow: "Página perdida",
          title: "Esta página no está donde debería.",
          description:
            "El enlace puede haber cambiado o estar mal copiado. Volvé al inicio para ver mi trabajo o escribime si necesitás algo.",
          primaryLabel: "Volver al inicio",
          secondaryLabel: "Ir a contacto",
          routeRecovery: "enlace roto",
          quickLinks: {
            projects: "Proyectos",
            privacy: "Privacidad",
            contact: "Contacto",
          },
          statusItems: ["inicio / disponible", "contacto / disponible", "legal / disponible"],
        },
        en: {
          eyebrow: "Lost page",
          title: "This page is not where it should be.",
          description:
            "The link may have changed or been mistyped. Head home to explore my work, or get in touch if you need something.",
          primaryLabel: "Back home",
          secondaryLabel: "Go to contact",
          routeRecovery: "broken link",
          quickLinks: {
            projects: "Projects",
            privacy: "Privacy",
            contact: "Contact",
          },
          statusItems: ["home / available", "contact / available", "legal / available"],
        },
      }}
    />
  );
}
