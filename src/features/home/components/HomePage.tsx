"use client";

import { LanguageProvider } from "@/features/home/i18n/LanguageProvider";
import { ProductPortfolio } from "@/features/home/components/ProductPortfolio";
import type { Locale } from "@/features/home/data/portfolio";

export function HomePage({ initialLocale }: { initialLocale?: Locale }) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <ProductPortfolio />
    </LanguageProvider>
  );
}
