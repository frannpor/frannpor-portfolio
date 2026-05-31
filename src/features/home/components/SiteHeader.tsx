"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale, NavItem, PortfolioContent } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

type SiteHeaderProps = {
  languageSwitch: PortfolioContent["languageSwitch"];
  locale: Locale;
  navigation: NavItem[];
  onLocaleChange: (locale: Locale) => void;
  profile: PortfolioContent["profile"];
};

export function SiteHeader({ languageSwitch, locale, navigation, onLocaleChange, profile }: SiteHeaderProps) {
  const [activeHref, setActiveHref] = useState(navigation[0]?.href ?? "#profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    let frameId = 0;

    function updateActiveSection() {
      frameId = 0;

      const headerOffset = window.matchMedia("(max-width: 820px)").matches ? 112 : 92;
      const readingLine = window.scrollY + headerOffset;
      const bottomReached = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (bottomReached) {
        const lastSection = sections[sections.length - 1];

        if (lastSection?.id) {
          setActiveHref(`#${lastSection.id}`);
        }

        return;
      }

      const currentSection = sections.reduce((current, section) => {
        return section.offsetTop <= readingLine ? section : current;
      }, sections[0]);

      if (currentSection.id) {
        setActiveHref(`#${currentSection.id}`);
      }
    }

    function requestActiveUpdate() {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestActiveUpdate, { passive: true });
    window.addEventListener("resize", requestActiveUpdate);
    window.addEventListener("hashchange", requestActiveUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestActiveUpdate);
      window.removeEventListener("resize", requestActiveUpdate);
      window.removeEventListener("hashchange", requestActiveUpdate);
    };
  }, [navigation]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function handleLocaleChange(nextLocale: Locale) {
    onLocaleChange(nextLocale);
    setIsMenuOpen(false);
  }

  function renderLanguageControls() {
    return (
      <div className={styles.languageSwitch} aria-label={languageSwitch.label}>
        <button
          aria-pressed={locale === "es"}
          className={locale === "es" ? styles.langButtonActive : styles.langButton}
          onClick={() => handleLocaleChange("es")}
          type="button"
        >
          {languageSwitch.es}
        </button>
        <button
          aria-pressed={locale === "en"}
          className={locale === "en" ? styles.langButtonActive : styles.langButton}
          onClick={() => handleLocaleChange("en")}
          type="button"
        >
          {languageSwitch.en}
        </button>
      </div>
    );
  }

  return (
    <header className={`${styles.siteHeader} ${isMenuOpen ? styles.siteHeaderOpen : ""}`}>
      <a className={styles.brand} href="#profile" aria-label={profile.name}>
        <Image src="/brand/franpor-color.ico" alt="" width={36} height={36} priority />
        <span>{profile.handle}</span>
      </a>
      <nav className={styles.desktopNav} aria-label={locale === "es" ? "Secciones del portfolio" : "Portfolio sections"}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} aria-current={activeHref === item.href ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className={styles.desktopLanguage}>{renderLanguageControls()}</div>
      <div className={styles.mobileHeaderActions}>
        {renderLanguageControls()}
        <button
          className={styles.mobileMenuButton}
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar navegación" : "Abrir navegación"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <div className={styles.mobileNavPanel} id="mobile-navigation" hidden={!isMenuOpen}>
        <div className={styles.mobileNavStatus}>
          <span>current</span>
          <strong>{navigation.find((item) => item.href === activeHref)?.label ?? navigation[0]?.label}</strong>
        </div>
        <nav className={styles.mobileNav} aria-label={locale === "es" ? "Secciones del portfolio en mobile" : "Mobile portfolio sections"}>
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={() => {
                setActiveHref(item.href);
                setIsMenuOpen(false);
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.mobileContactLink} href={`mailto:${profile.email}`} onClick={() => setIsMenuOpen(false)}>
          {profile.email}
        </a>
      </div>
    </header>
  );
}
