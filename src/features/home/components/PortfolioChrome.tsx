"use client";
import Image from "next/image";
import { ArrowUpRight, GitBranch, Languages, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import styles from "./product-portfolio.module.css";
export function PortfolioHeader({ homePrefix = "" }: { homePrefix?: string }) {
 const { copy, locale, setLocale } = usePortfolioContent();
 const menuButton = useRef<HTMLButtonElement>(null);
 const [menuOpen, setMenuOpen] = useState(false);
 const es = locale === "es";
 return <>
    <a className={styles.skip} href={`${homePrefix}#profile`}>{es ? "Ir al contenido" : "Skip to content"}</a>
    <header className={styles.header} onKeyDown={event => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <a href={`${homePrefix}#profile`} className={styles.brand} onClick={() => setMenuOpen(false)}><Image src="/brand/franpor-color.png" alt="" width={44} height={44} className={styles.personalLogo} /><span>franpor<span className={styles.brandDot}>.</span></span></a>
      <nav id="portfolio-navigation" aria-label={es ? "Navegación principal" : "Main navigation"} className={menuOpen ? styles.navOpen : styles.nav}>
        {copy.navigation.map(item => <a key={item.href} href={`${homePrefix}${item.href}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
      </nav>
      <div className={styles.headerActions}>
        <div className={styles.languages} aria-label={copy.languageSwitch.label}>
          <Languages size={16} strokeWidth={1.5} aria-hidden="true" />
          <div className={styles.languageOptions} data-locale={locale}>{(["es","en"] as const).map(value => <button key={value} type="button" aria-label={value === "es" ? "Español" : "English"} title={value === "es" ? "Español" : "English"} aria-pressed={value === locale} onClick={() => { setLocale(value); setMenuOpen(false); }} >{value.toUpperCase()}</button>)}</div>
        </div>
        <button ref={menuButton} aria-controls="portfolio-navigation" className={styles.menuToggle} type="button" aria-expanded={menuOpen} aria-label={menuOpen ? (es ? "Cerrar menú" : "Close menu") : (es ? "Abrir menú" : "Open menu")} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
</>;
}
export function PortfolioFooter({ homePrefix = "" }: { homePrefix?: string }) {
 const { copy, locale } = usePortfolioContent();
 const es = locale === "es";
 return (<footer className={styles.footer}><span>© 2026 Francisco Porciel</span><div><a href={copy.profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={19} /></a><a href={copy.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={14} /></a></div><a href={`${homePrefix}#profile`}>{es ? "Volver arriba" : "Back to top"}<ArrowUpRight size={16} /></a></footer>);
}

export function PortfolioMotion() {
 useEffect(() => {
   const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   if (reduced) return;
   const nodes = document.querySelectorAll<HTMLElement>("main section[id] > .reveal, main section[id] article, main section[id] > div, main > section > div");
   const observer = new IntersectionObserver(entries => {
     for (const entry of entries) if (entry.isIntersecting) {
       entry.target.setAttribute("data-revealed", "true");
       observer.unobserve(entry.target);
     }
   }, { threshold: .08, rootMargin: "0px 0px -30px 0px" });
   nodes.forEach((node, index) => {
     if (node.getBoundingClientRect().top < window.innerHeight - 20) return;
     node.setAttribute("data-revealed", "false");
     node.style.setProperty("--reveal-delay", `${(index % 2) * 60}ms`);
     observer.observe(node);
   });
   return () => { observer.disconnect(); nodes.forEach(node => { node.removeAttribute("data-revealed"); node.style.removeProperty("--reveal-delay"); }); };
 }, []);
 return null;
}
