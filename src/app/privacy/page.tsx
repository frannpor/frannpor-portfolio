import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { siteConfig } from "@/shared/config/site";

const appName = "Francisco Porciel Portfolio y proyectos personales";
const appNameEn = "Francisco Porciel Portfolio and personal projects";
const { profile } = siteConfig;

export const metadata: Metadata = {
  title: "Política de privacidad - Francisco Porciel",
  description:
    "Política de privacidad para el portfolio y proyectos personales de Francisco Porciel, incluyendo el uso de Google OAuth cuando corresponda.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      content={{
        es: {
          title: "Política de privacidad",
          description: `Esta política explica cómo ${appName} trata la información personal en el portfolio, formularios de contacto y flujos de autenticación de proyectos personales.`,
          updatedAt: "31 de mayo de 2026",
          meta: {
            updated: "Última actualización",
            oauth: "Google incluido",
            publicDocument: "Consulta pública",
            cardTitle: "privacy.md",
            cardDescription: "qué datos se piden y para qué.",
            index: "Índice del documento",
            notice:
              "Si un proyecto pide datos o permisos, esta página explica el motivo y cómo contactarme.",
            back: "Portfolio",
            legalLabel: "Legal",
          },
          sections: [
            {
              title: "Responsable",
              body: [
                `El responsable de este sitio y de los proyectos personales asociados es ${profile.name}. Para consultas sobre privacidad, escribí a ${profile.email}.`,
              ],
            },
            {
              title: "Información que puedo recibir",
              body: [
                "Si usás el formulario de contacto, puedo recibir tu nombre, email, empresa y mensaje para responderte.",
                "Si un proyecto personal usa inicio de sesión con Google, Google puede compartir datos básicos de perfil según los permisos aceptados por vos, como identificador de cuenta, nombre, email y foto de perfil. La aplicación no recibe ni almacena tu contraseña de Google.",
                "Si autorizás permisos adicionales de Google, por ejemplo permisos relacionados con email o APIs de Google Workspace, la aplicación solo accede a los datos necesarios para la función visible que aceptaste usar.",
              ],
            },
            {
              title: "Cómo uso la información",
              body: [
                "Uso los datos de contacto para responder mensajes, coordinar conversaciones profesionales y mantener registros mínimos de comunicación.",
                "Uso los datos de Google OAuth para autenticar usuarios, mantener sesiones seguras y ejecutar las funciones autorizadas por el usuario dentro del proyecto correspondiente.",
                "No vendo datos personales, no los uso para publicidad personalizada y no los transfiero a terceros para fines comerciales.",
              ],
            },
            {
              title: "Servicios de terceros",
              body: [
                "El sitio puede usar proveedores de infraestructura, hosting, email transaccional o autenticación para operar correctamente. Esos proveedores procesan datos solo en la medida necesaria para prestar el servicio.",
                "Los flujos de Google OAuth se rigen también por las políticas y controles de Google. Podés revisar y revocar accesos desde la configuración de seguridad de tu cuenta de Google.",
              ],
            },
            {
              title: "Conservación y seguridad",
              body: [
                "Conservo la información solo durante el tiempo razonablemente necesario para responder consultas, operar el proyecto, cumplir obligaciones legales o resolver problemas de seguridad.",
                "Aplico medidas razonables para proteger la información en tránsito y en reposo. Ningún sistema conectado a internet puede garantizar seguridad absoluta, pero el acceso se limita a lo necesario.",
              ],
            },
            {
              title: "Tus derechos",
              body: [
                `Podés pedir acceso, corrección o eliminación de tus datos escribiendo a ${profile.email}. También podés revocar permisos concedidos a una app desde tu cuenta de Google.`,
              ],
            },
            {
              title: "Cambios",
              body: [
                "Puedo actualizar esta política cuando cambie el sitio, el proyecto o los servicios integrados. Si el cambio afecta el uso de datos de Google, se actualizará esta página antes de usar esos datos de una forma nueva.",
              ],
            },
          ],
        },
        en: {
          title: "Privacy Policy",
          description: `This policy explains how ${appNameEn} handles personal information across the portfolio, contact forms, and authentication flows for personal projects.`,
          updatedAt: "May 31, 2026",
          meta: {
            updated: "Last updated",
            oauth: "Google included",
            publicDocument: "Public reference",
            cardTitle: "privacy.md",
            cardDescription: "what data is requested and why.",
            index: "Document index",
            notice:
              "If a project asks for data or permissions, this page explains why and how to contact me.",
            back: "Portfolio",
            legalLabel: "Legal",
          },
          sections: [
            {
              title: "Controller",
              body: [
                `${profile.name} is responsible for this site and the associated personal projects. For privacy questions, contact ${profile.email}.`,
              ],
            },
            {
              title: "Information I may receive",
              body: [
                "If you use the contact form, I may receive your name, email address, company, and message so I can reply.",
                "If a personal project uses Google sign-in, Google may share basic profile data according to the permissions you approve, such as account identifier, name, email address, and profile photo. The application never receives or stores your Google password.",
                "If you authorize additional Google permissions, such as email or Google Workspace API permissions, the application only accesses the data needed for the visible feature you chose to use.",
              ],
            },
            {
              title: "How I use information",
              body: [
                "I use contact data to respond to messages, coordinate professional conversations, and keep minimal communication records.",
                "I use Google OAuth data to authenticate users, maintain secure sessions, and run the user-authorized features inside the corresponding project.",
                "I do not sell personal data, use it for personalized advertising, or transfer it to third parties for commercial purposes.",
              ],
            },
            {
              title: "Third-party services",
              body: [
                "The site may use infrastructure, hosting, transactional email, or authentication providers to operate correctly. Those providers process data only as needed to provide the service.",
                "Google OAuth flows are also governed by Google's policies and controls. You can review and revoke access from your Google account security settings.",
              ],
            },
            {
              title: "Retention and security",
              body: [
                "I keep information only for as long as reasonably necessary to answer inquiries, operate the project, comply with legal obligations, or resolve security issues.",
                "I apply reasonable measures to protect information in transit and at rest. No internet-connected system can guarantee absolute security, but access is limited to what is necessary.",
              ],
            },
            {
              title: "Your rights",
              body: [
                `You can request access, correction, or deletion of your data by contacting ${profile.email}. You can also revoke permissions granted to an app from your Google account.`,
              ],
            },
            {
              title: "Changes",
              body: [
                "I may update this policy when the site, project, or integrated services change. If a change affects the use of Google data, this page will be updated before using that data in a new way.",
              ],
            },
          ],
        },
      }}
    />
  );
}
