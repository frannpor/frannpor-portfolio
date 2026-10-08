"use client";

import Link from "next/link";
import { ArrowUpRight, Home, RotateCcw } from "lucide-react";
import { LanguageProvider, usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import type { Locale } from "@/features/home/data/portfolio";
import { SystemHeader } from "@/features/system/SystemHeader";
import styles from "./status.module.css";
import pageStyles from "@/features/home/components/product-portfolio.module.css";
import { PortfolioFooter, PortfolioMotion } from "@/features/home/components/PortfolioChrome";

type StatusCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  routeRecovery: string;
  quickLinks: {
    projects: string;
    privacy: string;
    contact: string;
  };
  statusItems: string[];
};

type StatusPageProps = {
  code: string;
  content: Record<Locale, StatusCopy>;
  onReset?: () => void;
};

export function StatusPage({ code, content, onReset }: StatusPageProps) {
  return (
    <LanguageProvider>
      <StatusPageContent code={code} content={content} onReset={onReset} />
    </LanguageProvider>
  );
}

function StatusPageContent({ code, content, onReset }: StatusPageProps) {
  const { locale } = usePortfolioContent();
  const copy = content[locale];

  return <div className={pageStyles.page}>
    <PortfolioMotion />
    <SystemHeader />
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby="status-title">
        <span className={styles.code} aria-hidden="true">{code}</span>
        <div className={styles.copy}><p className={styles.kicker}>{copy.eyebrow}</p><h1 id="status-title">{copy.title}</h1><p>{copy.description}</p>
          <div className={pageStyles.actions}><Link className={pageStyles.primary} href="/"><Home size={17} />{copy.primaryLabel}</Link>
            {onReset ? <button className={pageStyles.secondary} onClick={onReset} type="button"><RotateCcw size={17} />{copy.secondaryLabel}</button> : <Link className={pageStyles.secondary} href="/#contact">{copy.secondaryLabel}<ArrowUpRight size={17} /></Link>}
          </div>
          <nav className={styles.quickLinks} aria-label={locale === "es" ? "Rutas útiles" : "Useful routes"}><Link href="/#contexts">{copy.quickLinks.projects}</Link><Link href="/#contact">{copy.quickLinks.contact}</Link></nav>
        </div>
      </section>
    </main>
    <PortfolioFooter homePrefix="/" />
  </div>;
}
