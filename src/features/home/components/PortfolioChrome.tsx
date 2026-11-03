"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, GitBranch, Menu, X } from "@/shared/icons";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import styles from "./product-portfolio.module.css";

/** Tracks which section is under the reading line, for the header and the side map. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join(",");
  useEffect(() => {
    const sections = key.split(",").map(id => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);
  return active;
}

export function PortfolioHeader({ homePrefix = "" }: { homePrefix?: string }) {
  const { copy, locale, setLocale } = usePortfolioContent();
  const { ui } = copy;
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(copy.navigation.map(item => item.href.slice(1)));

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return <>
    <a className={styles.skip} href={`${homePrefix}#profile`}>{ui.skipToContent}</a>
    <header className={styles.header} data-open={menuOpen}>
      <div className={styles.headerInner}>
        <a href={`${homePrefix}#profile`} className={styles.brand} onClick={() => setMenuOpen(false)}>
          <Image src="/brand/franpor-color.png" alt="" width={36} height={36} priority />
          <span>{copy.profile.handle}<span className={styles.brandDot}>.</span></span>
        </a>
        <nav id="portfolio-navigation" aria-label={ui.navigationLabel} className={styles.nav}>
          {copy.navigation.map(item => <a key={item.href} href={`${homePrefix}${item.href}`} aria-current={!homePrefix && active === item.href.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
        <div className={styles.languages} role="group" aria-label={copy.languageSwitch.label}>
          {(["es", "en"] as const).map(value => <button key={value} type="button" lang={value} aria-label={ui.languageNames[value]} aria-pressed={value === locale} onClick={() => { setLocale(value); setMenuOpen(false); }}>{copy.languageSwitch[value]}</button>)}
        </div>
        <button ref={menuButton} aria-controls="portfolio-navigation" className={styles.menuToggle} type="button" aria-expanded={menuOpen} aria-label={menuOpen ? ui.menuClose : ui.menuOpen} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      <span className={styles.progress} aria-hidden="true" />
    </header>
  </>;
}

/** Dots along the right edge on wide screens; names appear only on hover or focus. */
export function SectionMap() {
  const { copy } = usePortfolioContent();
  const stops = [{ href: "#profile", label: copy.ui.sectionMap.top }, ...copy.navigation];
  const active = useActiveSection(stops.map(stop => stop.href.slice(1)));
  return <nav className={styles.sectionMap} aria-label={copy.ui.sectionMap.label}>
    {stops.map(stop => <a key={stop.href} href={stop.href} aria-label={stop.label} aria-current={active === stop.href.slice(1) ? "location" : undefined}><span aria-hidden="true">{stop.label}</span></a>)}
  </nav>;
}

export function PortfolioFooter({ homePrefix = "" }: { homePrefix?: string }) {
  const { copy } = usePortfolioContent();
  return <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <span>© 2026 {copy.profile.name} · {copy.ui.footer.place}</span>
      <div className={styles.footerLinks}>
        <a href={copy.profile.github} target="_blank" rel="noreferrer" aria-label={copy.hero.actions.github}><GitBranch size={19} /></a>
        <a href={copy.profile.linkedin} target="_blank" rel="noreferrer">{copy.hero.actions.linkedin}<ArrowUpRight size={14} /></a>
        <a href={`${homePrefix}#profile`}>{copy.ui.footer.backToTop}<ArrowUpRight size={14} /></a>
      </div>
    </div>
  </footer>;
}
