"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Home, Mail, RotateCcw, TerminalSquare } from "lucide-react";
import { LanguageProvider, usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import type { Locale } from "@/features/home/data/portfolio";
import { SystemHeader } from "@/features/system/SystemHeader";
import styles from "./status.module.css";

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

  return (
    <>
      <SystemHeader />
      <main className={styles.shell}>
        <div className={styles.topbar}>
          <Link href="/" aria-label={copy.primaryLabel}>
            FP
          </Link>
          <span>
            {code} / {copy.routeRecovery}
          </span>
        </div>
        <section className={styles.panel} aria-labelledby="status-title">
          <div className={styles.copy}>
            <p className={styles.kicker}>{copy.eyebrow}</p>
            <h1 id="status-title">{copy.title}</h1>
            <p>{copy.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/">
                <Home size={17} />
                {copy.primaryLabel}
              </Link>
              {onReset ? (
                <button className={styles.secondaryAction} onClick={onReset} type="button">
                  <RotateCcw size={17} />
                  {copy.secondaryLabel}
                </button>
              ) : (
                <Link className={styles.secondaryAction} href="/#contact">
                  <ArrowLeft size={17} />
                  {copy.secondaryLabel}
                </Link>
              )}
            </div>
            <nav className={styles.quickLinks} aria-label={locale === "es" ? "Rutas útiles" : "Useful routes"}>
              <Link href="/#projects">
                <TerminalSquare size={15} />
                {copy.quickLinks.projects}
              </Link>
              <Link href="/privacy">
                <FileText size={15} />
                {copy.quickLinks.privacy}
              </Link>
              <Link href="/#contact">
                <Mail size={15} />
                {copy.quickLinks.contact}
              </Link>
            </nav>
          </div>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.windowBar}>
              <span />
              <span />
              <span />
              <strong>route-check.ts</strong>
            </div>
            <div className={styles.codeBlock}>
              <span>{code}</span>
              <p>
                <TerminalSquare size={15} />
                response.status
              </p>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.statusGrid}>
              {copy.statusItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
