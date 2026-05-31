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
      eyebrow="Algo falló"
      title="La página se cayó antes de terminar de cargar."
      description="Puede ser un error temporal del navegador, del deploy o de una integración. Reintentá y, si vuelve a pasar, escribime con el enlace que estabas abriendo."
      primaryLabel="Volver al inicio"
      secondaryLabel="Reintentar"
      onReset={reset}
    />
  );
}
