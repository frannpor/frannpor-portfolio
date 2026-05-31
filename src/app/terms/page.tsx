import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { siteConfig } from "@/shared/config/site";

const appName = "Francisco Porciel Portfolio y proyectos personales";

export const metadata: Metadata = {
  title: "Condiciones de servicio - Francisco Porciel",
  description:
    "Condiciones de servicio para el portfolio y proyectos personales de Francisco Porciel.",
};

export default function TermsPage() {
  const { profile } = siteConfig;

  return (
    <LegalPage
      title="Condiciones de servicio"
      description={`Estas condiciones aplican al uso de ${appName}, incluyendo páginas públicas, formularios y proyectos personales con autenticación.`}
      updatedAt="31 de mayo de 2026"
      sections={[
        {
          title: "Uso permitido",
          body: [
            "Podés visitar este sitio, consultar información profesional y usar los formularios o flujos de autenticación disponibles para fines legítimos.",
            "No está permitido intentar vulnerar el sitio, abusar de formularios, automatizar solicitudes dañinas, suplantar identidades o usar el servicio de una forma que afecte a otros usuarios o proveedores.",
          ],
        },
        {
          title: "Cuentas y autenticación",
          body: [
            "Algunos proyectos personales pueden permitir inicio de sesión con Google u otros proveedores. Sos responsable de mantener segura tu cuenta y de revisar los permisos que aceptás conceder.",
            "Puedo limitar, suspender o revocar acceso si detecto abuso, uso no autorizado, riesgos de seguridad o incumplimiento de estas condiciones.",
          ],
        },
        {
          title: "Servicios experimentales",
          body: [
            "Los proyectos personales, demos, laboratorios o playgrounds pueden cambiar, fallar, cerrarse o perder disponibilidad sin aviso previo.",
            "Salvo que exista un acuerdo escrito separado, el sitio y sus proyectos se ofrecen sin garantías de disponibilidad, continuidad, exactitud o adecuación para un propósito particular.",
          ],
        },
        {
          title: "Propiedad intelectual",
          body: [
            "El contenido, diseño, código propio, textos, capturas y materiales del portfolio pertenecen a sus respectivos titulares. No se concede una licencia para reutilizarlos fuera de lo permitido por la ley o por licencias explícitas del repositorio.",
          ],
        },
        {
          title: "Datos y privacidad",
          body: [
            "El tratamiento de datos personales se describe en la Política de privacidad. Si un proyecto usa Google OAuth, solo se solicitarán los permisos necesarios para las funciones indicadas.",
          ],
        },
        {
          title: "Limitación de responsabilidad",
          body: [
            "En la medida permitida por la ley, no seré responsable por daños indirectos, pérdida de datos, interrupciones, fallas de terceros o usos indebidos derivados del acceso al sitio o a proyectos experimentales.",
          ],
        },
        {
          title: "Contacto",
          body: [
            `Para consultas sobre estas condiciones, escribí a ${profile.email}.`,
          ],
        },
      ]}
    />
  );
}
