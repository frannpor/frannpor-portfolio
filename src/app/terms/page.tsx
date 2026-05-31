import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { siteConfig } from "@/shared/config/site";

const appName = "Francisco Porciel Portfolio y proyectos personales";
const appNameEn = "Francisco Porciel Portfolio and personal projects";
const { profile } = siteConfig;

export const metadata: Metadata = {
  title: "Condiciones de servicio - Francisco Porciel",
  description:
    "Condiciones de servicio para el portfolio y proyectos personales de Francisco Porciel.",
};

export default function TermsPage() {
  return (
    <LegalPage
      content={{
        es: {
          title: "Condiciones de servicio",
          description: `Estas condiciones aplican al uso de ${appName}, incluyendo páginas públicas, formularios y proyectos personales con autenticación.`,
          updatedAt: "31 de mayo de 2026",
          meta: {
            updated: "Última actualización",
            oauth: "Google incluido",
            publicDocument: "Consulta pública",
            cardTitle: "terms.md",
            cardDescription: "uso permitido, límites y contacto.",
            index: "Índice del documento",
            notice:
              "Estas condiciones cubren el uso del sitio, formularios y proyectos personales publicados bajo este dominio.",
            back: "Portfolio",
            legalLabel: "Legal",
          },
          sections: [
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
              body: [`Para consultas sobre estas condiciones, escribí a ${profile.email}.`],
            },
          ],
        },
        en: {
          title: "Terms of Service",
          description: `These terms apply to the use of ${appNameEn}, including public pages, forms, and personal projects with authentication.`,
          updatedAt: "May 31, 2026",
          meta: {
            updated: "Last updated",
            oauth: "Google included",
            publicDocument: "Public reference",
            cardTitle: "terms.md",
            cardDescription: "allowed use, limits, and contact.",
            index: "Document index",
            notice:
              "These terms cover the use of the site, forms, and personal projects published under this domain.",
            back: "Portfolio",
            legalLabel: "Legal",
          },
          sections: [
            {
              title: "Allowed use",
              body: [
                "You may visit this site, review professional information, and use available forms or authentication flows for legitimate purposes.",
                "You may not attempt to compromise the site, abuse forms, automate harmful requests, impersonate others, or use the service in a way that affects other users or providers.",
              ],
            },
            {
              title: "Accounts and authentication",
              body: [
                "Some personal projects may allow sign-in with Google or other providers. You are responsible for keeping your account secure and reviewing the permissions you choose to grant.",
                "I may limit, suspend, or revoke access if I detect abuse, unauthorized use, security risks, or a violation of these terms.",
              ],
            },
            {
              title: "Experimental services",
              body: [
                "Personal projects, demos, labs, or playgrounds may change, fail, close, or become unavailable without prior notice.",
                "Unless a separate written agreement exists, the site and its projects are provided without warranties of availability, continuity, accuracy, or fitness for a particular purpose.",
              ],
            },
            {
              title: "Intellectual property",
              body: [
                "The portfolio content, design, original code, text, screenshots, and materials belong to their respective owners. No license is granted to reuse them except as allowed by law or by explicit repository licenses.",
              ],
            },
            {
              title: "Data and privacy",
              body: [
                "Personal data handling is described in the Privacy Policy. If a project uses Google OAuth, it will only request the permissions needed for the indicated features.",
              ],
            },
            {
              title: "Limitation of liability",
              body: [
                "To the extent permitted by law, I will not be liable for indirect damages, data loss, interruptions, third-party failures, or misuse arising from access to the site or experimental projects.",
              ],
            },
            {
              title: "Contact",
              body: [`For questions about these terms, contact ${profile.email}.`],
            },
          ],
        },
      }}
    />
  );
}
