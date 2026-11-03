"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, GitBranch, Menu, X } from "@/shared/icons";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import { motionAllowed } from "@/features/home/motion/motion";
import { SlidingIndicator } from "./ui/SelectionMotion";
import styles from "./product-portfolio.module.css";

let navigation: AbortController | undefined;

/** Keep smooth navigation, skipping only the pinned experience interval. */
function jumpToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  event.preventDefault();
  navigation?.abort();
  const controller = new AbortController();
  navigation = controller;
  const root = document.documentElement;
  delete root.dataset.navigating;
  const route = document.querySelector<HTMLElement>("[data-route]");
  const runway = route?.parentElement;
  const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const destination = Math.max(0, target.getBoundingClientRect().top + scrollY - padding - margin);
  const pinned = route && getComputedStyle(route).position === "sticky";
  const start = runway ? runway.getBoundingClientRect().top + scrollY - 112 : 0;
  const end = runway && route ? start + runway.offsetHeight - route.offsetHeight : 0;
  const down = pinned && scrollY < end && destination > end;
  const up = pinned && scrollY > start && destination < start;
  history.pushState(null, "", href);
  if (!motionAllowed()) { target.scrollIntoView({ behavior: "instant", block: "start" }); return; }
  if (!down && !up) { target.scrollIntoView({ behavior: "smooth", block: "start" }); return; }

  root.dataset.navigating = "true";
  const cancel = () => controller.abort();
  window.addEventListener("wheel", cancel, { once: true, passive: true });
  window.addEventListener("touchstart", cancel, { once: true, passive: true });
  const smoothTo = (top: number) => new Promise<boolean>(resolve => {
    if (controller.signal.aborted || Math.abs(scrollY - top) < 2) { resolve(!controller.signal.aborted); return; }
    const done = () => {
      clearTimeout(timer);
      window.removeEventListener("scrollend", done);
      controller.signal.removeEventListener("abort", done);
      resolve(!controller.signal.aborted);
    };
    const timer = setTimeout(done, 1800);
    window.addEventListener("scrollend", done, { once: true });
    controller.signal.addEventListener("abort", done, { once: true });
    window.scrollTo({ top, behavior: "smooth" });
  });
  void (async () => {
    const entry = down ? Math.max(scrollY, start) : Math.min(scrollY, end);
    if (!await smoothTo(entry)) return;
    window.scrollTo({ top: down ? end : start, behavior: "instant" });
    // Let the instant jump settle before the final smooth leg.
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    if (!controller.signal.aborted) await smoothTo(destination);
  })().finally(() => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    if (navigation === controller) { delete root.dataset.navigating; navigation = undefined; }
  });
}

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
          <Image src="/brand/frannpor-clean.webp" alt="" width={36} height={36} priority />
          <span>{copy.profile.handle}<span className={styles.brandDot}>.</span></span>
        </a>
        <nav id="portfolio-navigation" aria-label={ui.navigationLabel} className={styles.nav}>
          <SlidingIndicator value={active} />
          {copy.navigation.map(item => <a key={item.href} href={`${homePrefix}${item.href}`} aria-current={!homePrefix && active === item.href.slice(1) ? "location" : undefined} onClick={event => { setMenuOpen(false); if (!homePrefix) jumpToSection(event, item.href); }}>{item.label}</a>)}
        </nav>
        <div className={styles.languages} role="group" aria-label={copy.languageSwitch.label}>
          <SlidingIndicator value={locale} tone="accent" />
          {(["es", "en"] as const).map(value => <button key={value} type="button" lang={value} aria-label={ui.languageNames[value]} aria-pressed={value === locale} onClick={() => { setLocale(value); setMenuOpen(false); }}>{copy.languageSwitch[value]}</button>)}
        </div>
        <button ref={menuButton} aria-controls="portfolio-navigation" className={styles.menuToggle} type="button" aria-expanded={menuOpen} aria-label={menuOpen ? ui.menuClose : ui.menuOpen} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      <span className={styles.progress} data-scroll-progress aria-hidden="true" />
    </header>
  </>;
}

/** Dots along the right edge on wide screens; names appear only on hover or focus. */
export function SectionMap() {
  const { copy } = usePortfolioContent();
  const stops = [{ href: "#profile", label: copy.ui.sectionMap.top }, ...copy.navigation];
  const active = useActiveSection(stops.map(stop => stop.href.slice(1)));
  return <nav className={styles.sectionMap} aria-label={copy.ui.sectionMap.label}>
    {stops.map(stop => <a key={stop.href} href={stop.href} onClick={event => jumpToSection(event, stop.href)} aria-label={stop.label} aria-current={active === stop.href.slice(1) ? "location" : undefined}><span aria-hidden="true">{stop.label}</span></a>)}
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
