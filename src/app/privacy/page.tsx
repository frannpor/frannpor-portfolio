import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicLegalPages } from "@/features/legal/visibility";
import { LegalPage } from "@/features/legal/LegalPage";
import { siteConfig } from "@/shared/config/site";

const appName = "Francisco Porciel Portfolio y proyectos personales";
const appNameEn = "Francisco Porciel Portfolio and personal projects";
const { profile } = siteConfig;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Política de privacidad - Francisco Porciel",
  description:
    "Política de privacidad para el portfolio y proyectos personales de Francisco Porciel, formularios de contacto, preferencias de idioma y servicios asociados.",
};

export default function PrivacyPage() {
  if (!publicLegalPages) notFound();
  return (
    <LegalPage
      content={{
        es: {
          title: "Política de privacidad",
          description: `Esta política explica cómo ${appName} trata la información personal del portfolio y del contacto profesional. El portfolio no requiere crear una cuenta. Los proyectos externos tienen sus propias políticas.`,
          updatedAt: "8 de octubre de 2026",
          meta: {
            updated: "Última actualización",
            oauth: "Portfolio y contacto",
            publicDocument: "Consulta pública",
            cardTitle: "privacy.md",
            cardDescription: "qué datos se piden y para qué.",
            index: "Índice del documento",
            notice:
              "Las capturas y descripciones muestran trabajo profesional. Este portfolio no recibe los datos operativos o clínicos de los productos enlazados.",
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
                "Si usás el formulario de contacto, puedo recibir tu nombre, email, empresa opcional y mensaje para responderte. Evitá enviar contraseñas, información clínica o datos sensibles.",
                "Tu idioma elegido se guarda en el almacenamiento local del navegador. Podés eliminar esta preferencia borrando los datos del sitio. Para limitar el abuso del formulario, el servidor usa temporalmente la dirección IP o el identificador de red disponible.",
                "Solo si un proyecto personal se vincula expresamente a esta política y usa inicio de sesión con Google, Google puede compartir datos básicos de perfil según los permisos aceptados por vos, como identificador de cuenta, nombre, email y foto de perfil. La aplicación no recibe ni almacena tu contraseña de Google.",
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
                "El formulario usa Resend como proveedor de correo cuando el envío está habilitado. Los datos enviados incluyen nombre, email, empresa y mensaje. Si el envío no está disponible, el formulario lo indica y ofrece contacto por email.",
                "El hosting puede procesar registros técnicos de las solicitudes. Las tipografías se cargan desde Google Fonts, lo que genera una conexión a ese proveedor. Al abrir enlaces externos, se aplican las políticas del destino.",
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
          description: `This policy explains how ${appNameEn} handles personal information across the portfolio and professional contact. This portfolio does not require an account. External projects have their own policies.`,
          updatedAt: "October 8, 2026",
          meta: {
            updated: "Last updated",
            oauth: "Portfolio and contact",
            publicDocument: "Public reference",
            cardTitle: "privacy.md",
            cardDescription: "what data is requested and why.",
            index: "Document index",
            notice:
              "Screenshots and descriptions showcase professional work. This portfolio does not receive operational or clinical data from the linked products.",
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
                "If you use the contact form, I may receive your name, email address, optional company, and message so I can reply. Avoid sending passwords, clinical information, or sensitive data.",
                "Your chosen language is saved in your browser’s local storage. You can remove this preference by clearing the site’s data. To limit contact form abuse, the server temporarily uses the available IP address or network identifier.",
                "Only if a personal project explicitly links to this policy and uses Google sign-in, Google may share basic profile data according to the permissions you approve, such as account identifier, name, email address, and profile photo. The application never receives or stores your Google password.",
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
                "The contact form uses Resend as its email provider when sending is enabled. The submitted data includes name, email address, company, and message. If sending is unavailable, the form says so and offers contact by email.",
                "Hosting providers may process technical request logs. Typefaces load from Google Fonts, creating a connection to that provider. When you follow external links, the destination’s policies apply.",
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
