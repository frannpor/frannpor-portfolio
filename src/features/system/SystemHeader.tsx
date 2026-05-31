"use client";

import Image from "next/image";
import Link from "next/link";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import type { Locale } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

export function SystemHeader() {
  const { copy, locale, setLocale } = usePortfolioContent();

  function renderLanguageControls() {
    return (
      <div className={styles.languageSwitch} aria-label={copy.languageSwitch.label}>
        {(["es", "en"] as Locale[]).map((nextLocale) => (
          <button
            aria-pressed={locale === nextLocale}
            className={locale === nextLocale ? styles.langButtonActive : styles.langButton}
            key={nextLocale}
            onClick={() => setLocale(nextLocale)}
            type="button"
          >
            {copy.languageSwitch[nextLocale]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <header className={styles.siteHeader}>
      <Link className={styles.brand} href="/#profile" aria-label={copy.profile.name}>
        <Image src="/brand/franpor-color.ico" alt="" width={36} height={36} priority />
        <span>{copy.profile.handle}</span>
      </Link>
      <nav className={styles.desktopNav} aria-label={locale === "es" ? "Secciones del portfolio" : "Portfolio sections"}>
        {copy.navigation.map((item) => (
          <Link key={item.href} href={`/${item.href}`}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.desktopLanguage}>{renderLanguageControls()}</div>
      <div className={styles.mobileHeaderActions}>{renderLanguageControls()}</div>
    </header>
  );
}
