"use client";

import { LanguageProvider } from "@/features/home/i18n/LanguageProvider";
import { ProductPortfolio } from "@/features/home/components/ProductPortfolio";

export function HomePage() {
  return (
    <LanguageProvider>
      <ProductPortfolio />
    </LanguageProvider>
  );
}
