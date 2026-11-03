"use client";

import { useEffect } from "react";

/*
 * Every decorative movement of the home page lives behind this switch:
 * scroll reveals, the hero parallax, the hiding header, the experience route,
 * the contour map animation, screenshot tilt and the magnetic primary button.
 *
 * - Set MOTION_ENABLED to false to turn all of it off.
 * - Visitors with "reduce motion" never get it.
 * - `?motion=off` in the URL turns it off for one visit, to compare.
 *
 * When motion is off, or if this script never runs, the page renders in its
 * resting state: everything visible and in place. CSS only animates under
 * `:root[data-motion="on"]`.
 */
export const MOTION_ENABLED = true;

export function motionAllowed() {
  if (!MOTION_ENABLED || typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return new URLSearchParams(window.location.search).get("motion") !== "off";
}

const clamp = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

type Pass = { e: number; x: number; p: number; te: number; tx: number; tp: number };

/** Scroll-linked motion with inertia, both directions. Mount once per page. */
export function useNightMapMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const enabled = motionAllowed();
    const cleanups: Array<() => void> = [];
    let lastY = window.scrollY;

    // Progress bar and header visibility work with or without motion.
    function chrome() {
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? clamp(y / max).toFixed(4) : "0");
      if (!enabled) return;
      if (Math.abs(y - lastY) > 6) {
        const hide = y > lastY && y > window.innerHeight * 0.6;
        if (hide) root.dataset.header = "hidden";
        else delete root.dataset.header;
        lastY = y;
      }
    }

    if (!enabled) {
      chrome();
      window.addEventListener("scroll", chrome, { passive: true });
      return () => {
        window.removeEventListener("scroll", chrome);
        root.style.removeProperty("--scroll");
      };
    }

    root.dataset.motion = "on";
    const passes = new Map<HTMLElement, Pass>();
    const elements = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let tracked = elements();
    let dirty = true;
    let running = false;
    let routeFill = 0;
    let routeTarget = 0;

    function measure() {
      const vh = window.innerHeight;
      root.style.setProperty("--hero", clamp(window.scrollY / (vh * 0.9)).toFixed(4));
      for (const el of tracked) {
        const r = el.getBoundingClientRect();
        const pass = passes.get(el);
        const te = clamp((vh - r.top) / (vh * 0.42));
        const tx = clamp((vh * 0.16 - r.bottom) / (vh * 0.4));
        const tp = clamp((vh - r.top) / (vh + r.height));
        if (!pass) passes.set(el, { e: te, x: tx, p: tp, te, tx, tp });
        else Object.assign(pass, { te, tx, tp });
      }
      const route = document.querySelector<HTMLElement>("[data-route]");
      if (route) {
        const rr = route.getBoundingClientRect();
        routeTarget = clamp((vh * 0.7 - rr.top) / Math.max(rr.height, vh * 0.4));
      }
    }

    function frame() {
      if (dirty) { measure(); dirty = false; }
      let moving = false;
      const k = 0.14;
      passes.forEach((s, el) => {
        s.e += (s.te - s.e) * k;
        s.x += (s.tx - s.x) * k;
        s.p += (s.tp - s.p) * k;
        if (Math.abs(s.te - s.e) + Math.abs(s.tx - s.x) + Math.abs(s.tp - s.p) > 0.002) moving = true;
        el.style.setProperty("--e", s.e.toFixed(4));
        el.style.setProperty("--x", s.x.toFixed(4));
        el.style.setProperty("--p", s.p.toFixed(4));
      });
      routeFill += (routeTarget - routeFill) * 0.12;
      if (Math.abs(routeTarget - routeFill) > 0.002) moving = true;
      document.querySelector<HTMLElement>("[data-route]")?.style.setProperty("--fill", routeFill.toFixed(4));
      if (moving) requestAnimationFrame(frame);
      else running = false;
    }

    function kick() {
      dirty = true;
      chrome();
      if (!running) { running = true; requestAnimationFrame(frame); }
    }

    // Content changes (language switch, opened details) add or move elements.
    const mutations = new MutationObserver(() => { tracked = elements(); kick(); });
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    cleanups.push(() => {
      mutations.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    });

    // Pointer effects only for precise pointers; touch gets press feedback in CSS.
    if (window.matchMedia("(pointer: fine)").matches) {
      const move = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target : null;
        const card = target?.closest<HTMLElement>("[data-tilt]");
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(other => {
          if (other !== card) resetTilt(other);
        });
        if (card) {
          const r = card.getBoundingClientRect();
          const px = (event.clientX - r.left) / r.width - 0.5;
          const py = (event.clientY - r.top) / r.height - 0.5;
          card.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`);
          card.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
          card.style.setProperty("--lift", "-6px");
        }
        const magnet = target?.closest<HTMLElement>("[data-magnet]");
        document.querySelectorAll<HTMLElement>("[data-magnet]").forEach(other => {
          if (other !== magnet) { other.style.setProperty("--mx", "0px"); other.style.setProperty("--my", "0px"); }
        });
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          magnet.style.setProperty("--mx", `${((event.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px`);
          magnet.style.setProperty("--my", `${((event.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`);
        }
      };
      const leave = () => {
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(resetTilt);
        document.querySelectorAll<HTMLElement>("[data-magnet]").forEach(el => { el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px"); });
      };
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
      });
    }

    return () => {
      cleanups.forEach(cleanup => cleanup());
      delete root.dataset.motion;
      delete root.dataset.header;
      root.style.removeProperty("--hero");
      root.style.removeProperty("--scroll");
    };
  }, []);
}

function resetTilt(el: HTMLElement) {
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--lift", "0px");
}
