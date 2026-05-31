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
            "Puede que el link esté viejo, mal copiado o apuntando a algo que todavía no publiqué. El resto del portfolio sigue en pie.",
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
            "The link may be old, mistyped, or pointing to something I have not published yet. The rest of the portfolio is still up.",
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
