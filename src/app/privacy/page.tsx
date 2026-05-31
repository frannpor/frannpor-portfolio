import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { siteConfig } from "@/shared/config/site";

const appName = "Francisco Porciel Portfolio y proyectos personales";

export const metadata: Metadata = {
  title: "Política de privacidad - Francisco Porciel",
  description:
    "Política de privacidad para el portfolio y proyectos personales de Francisco Porciel, incluyendo el uso de Google OAuth cuando corresponda.",
};

export default function PrivacyPage() {
  const { profile } = siteConfig;

  return (
    <LegalPage
      title="Política de privacidad"
      description={`Esta política explica cómo ${appName} trata la información personal en el portfolio, formularios de contacto y flujos de autenticación de proyectos personales.`}
      updatedAt="31 de mayo de 2026"
      sections={[
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
      ]}
    />
  );
}
