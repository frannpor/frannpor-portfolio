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
/** Mirrors the choice for the server, so a reload renders the chosen language from the first paint. */
export const LOCALE_COOKIE = "portfolio-locale";
let memoryLocale: Locale = defaultLocale;
const LOCALE_EVENT = "franpor-portfolio-locale-change";
let languageAnimation: Animation | undefined;

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

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function setStoredLocale(locale: Locale) {
  memoryLocale = locale;
  writeLocaleCookie(locale);
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Keep the language switch usable even when storage is blocked.
  }

  window.dispatchEvent(new Event(LOCALE_EVENT));
}

function changeLocale(locale: Locale) {
  if (locale === getStoredLocale()) return;
  languageAnimation?.cancel();
  flushSync(() => setStoredLocale(locale));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(window.location.search).get("motion") === "off") return;
  const tokens = getComputedStyle(document.documentElement);
  languageAnimation = document.querySelector("main")?.animate([{ opacity: .65, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], {
    duration: parseFloat(tokens.getPropertyValue("--t-open")) || 260,
    easing: tokens.getPropertyValue("--ease").trim() || "ease-out",
  });
}

export function LanguageProvider({ children, initialLocale = defaultLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const locale = useSyncExternalStore(subscribeToLocale, getStoredLocale, () => initialLocale);

  // Visitors who chose a language before the cookie existed get it written once.
  useEffect(() => {
    if (!document.cookie.includes(`${LOCALE_COOKIE}=${locale}`)) writeLocaleCookie(locale);
  }, [locale]);

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
