"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ClientContext } from "@/features/home/data/types";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import styles from "./project-gallery.module.css";

export function ProjectGallery({ items, initialIndex, onClose }: { items: ClientContext[]; initialIndex: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const [closing, setClosing] = useState(false);
  const { locale } = usePortfolioContent();
  const es = locale === "es";
  const item = items[index];
  const navigate = useCallback((step: number) => setIndex(current => (current + step + items.length) % items.length), [items.length]);
  const close = useCallback(() => {
    if (timer.current) return;
    setClosing(true);
    timer.current = setTimeout(onClose, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
  }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    const scrollY = window.scrollY;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const body = document.body;
    const html = document.documentElement;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight, htmlOverflow: html.style.overflow, behavior: html.style.scrollBehavior };
    const scrollbar = window.innerWidth - html.clientWidth;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbar}px`;
    html.style.overflow = "hidden";
    element?.showModal();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      element?.close();
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      html.style.overflow = previous.htmlOverflow;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previous.behavior;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className={styles.dialog} data-closing={closing} aria-labelledby="gallery-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); navigate(event.key === "ArrowRight" ? 1 : -1); }
  }}>
    <div className={styles.sheet}>
      <header className={styles.header}>
        <div className={styles.identity}><span className={styles.eyebrow}>{es ? "Una mirada al producto" : "A look at the product"}</span><h2 id="gallery-title" aria-live="polite">{item.name}</h2></div>
        <div className={styles.actions}><span>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><button type="button" onClick={close} aria-label={es ? "Cerrar galería" : "Close gallery"}><X size={20} /></button></div>
      </header>
      <div className={styles.stage}>
        <div key={item.name} className={styles.imageFrame}>
          {item.visual && <Image src={item.visual.src} alt={item.visual.alt} width={1600} height={1000} sizes="(max-width: 760px) 94vw, 85vw" priority />}
        </div>
        <div className={styles.navigation}><button type="button" onClick={() => navigate(-1)} aria-label={es ? "Captura anterior" : "Previous screenshot"}><ArrowLeft size={20} /></button><button type="button" onClick={() => navigate(1)} aria-label={es ? "Siguiente captura" : "Next screenshot"}><ArrowRight size={20} /></button></div>
      </div>
      <footer className={styles.footer}>
        <div><p>{item.type}</p><ul>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
        {item.url && <a href={item.url} target="_blank" rel="noreferrer">{es ? "Visitar sitio" : "Visit website"}<ArrowUpRight size={16} /></a>}
      </footer>
      <nav className={styles.projects} aria-label={es ? "Elegir proyecto" : "Choose project"}>{items.map((entry, position) => <button key={entry.name} type="button" aria-pressed={position === index} onClick={() => setIndex(position)}>{entry.name}</button>)}</nav>
    </div>
  </dialog>;
}
