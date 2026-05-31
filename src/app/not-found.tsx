import { StatusPage } from "@/features/system/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      eyebrow="Ruta no encontrada"
      title="Esta página no existe o cambió de lugar."
      description="El portfolio sigue online; lo más probable es que el enlace esté viejo, incompleto o apuntando a una sección que todavía no publiqué."
      primaryLabel="Volver al inicio"
      secondaryLabel="Ir a contacto"
    />
  );
}
