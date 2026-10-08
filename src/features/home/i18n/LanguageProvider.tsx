"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { flushSync } from "react-dom";
import {
  defaultLocale,
  portfolioContent,
  type Locale,
  type PortfolioContent,
} from "@/features/home/data/portfolio";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: PortfolioContent;
};

const STORAGE_KEY = "franpor-portfolio-locale";
let memoryLocale: Locale = defaultLocale;
const LOCALE_EVENT = "franpor-portfolio-locale-change";
let localeTransition: ViewTransition | undefined;
let pendingLocale: Locale | undefined;

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "es" || value === "en";
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  try {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(savedLocale) ? savedLocale : memoryLocale;
  } catch {
    return memoryLocale;
  }
}

function subscribeToLocale(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(LOCALE_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(LOCALE_EVENT, listener);
  };
}

function setStoredLocale(locale: Locale) {
  memoryLocale = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Keep the language switch usable even when storage is blocked.
  }

  window.dispatchEvent(new Event(LOCALE_EVENT));
}

function changeLocale(locale: Locale) {
  if (locale === (pendingLocale ?? getStoredLocale())) return;
  localeTransition?.skipTransition();
  pendingLocale = locale;
  const apply = () => {
    if (pendingLocale === locale) flushSync(() => setStoredLocale(locale));
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof document.startViewTransition !== "function") {
    apply();
    pendingLocale = undefined;
    localeTransition = undefined;
    if (!reduced) document.querySelector("main")?.animate([{ opacity: .55, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: "ease-out" });
    return;
  }
  const transition = document.startViewTransition(apply);
  localeTransition = transition;
  void transition.finished.catch(() => {}).finally(() => {
    if (localeTransition === transition) { localeTransition = undefined; pendingLocale = undefined; }
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getStoredLocale, () => defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: changeLocale,
      copy: portfolioContent[locale],
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function usePortfolioContent() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("usePortfolioContent must be used inside LanguageProvider");
  }

  return context;
}
