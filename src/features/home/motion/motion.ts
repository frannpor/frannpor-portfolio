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
    const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");
    const heroParts = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-motion]"));
    const setValue = (element: HTMLElement, name: string, value: string) => {
      if (element.style.getPropertyValue(name) !== value) element.style.setProperty(name, value);
    };

    // Progress bar and header visibility work with or without motion.
    function chrome() {
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      if (progressBar) setValue(progressBar, "--scroll", max > 0 ? clamp(y / max).toFixed(4) : "0");
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
    let frameId = 0;
    let geometryDirty = true;
    const geometry = new Map<HTMLElement, { top: number; height: number }>();
    function refreshGeometry() {
      for (const el of tracked) {
        let top = 0;
        let node: HTMLElement | null = el;
        while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
        geometry.set(el, { top, height: el.offsetHeight });
      }
      geometryDirty = false;
    }

    function measure() {
      if (geometryDirty) refreshGeometry();
      const vh = window.innerHeight;
      const y = window.scrollY;
      heroParts.forEach(el => setValue(el, "--hero", clamp(y / (vh * 0.9)).toFixed(4)));
      for (const el of tracked) {
        const box = geometry.get(el)!;
        const top = box.top - y;
        const bottom = top + box.height;
        const pass = passes.get(el);
        const te = clamp((vh - top) / (vh * 0.42));
        const tx = clamp((vh * 0.16 - bottom) / (vh * 0.4));
        const tp = clamp((vh - top) / (vh + box.height));
        if (!pass) passes.set(el, { e: te, x: tx, p: tp, te, tx, tp });
        else Object.assign(pass, { te, tx, tp });
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
        setValue(el, "--e", s.e.toFixed(3));
        setValue(el, "--x", s.x.toFixed(3));
      });
      if (moving) frameId = requestAnimationFrame(frame);
      else running = false;
    }

    function kick() {
      dirty = true;
      chrome();
      if (!running) { running = true; frameId = requestAnimationFrame(frame); }
    }

    // Content changes (language switch, opened details) add or move elements.
    const sizes = new ResizeObserver(() => { geometryDirty = true; kick(); });
    sizes.observe(document.body);
    const resized = () => { geometryDirty = true; kick(); };
    const mutations = new MutationObserver(() => {
      tracked = elements();
      const live = new Set(tracked);
      for (const el of passes.keys()) if (!live.has(el)) { passes.delete(el); geometry.delete(el); }
      geometryDirty = true;
      kick();
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", resized);
    kick();
    cleanups.push(() => {
      cancelAnimationFrame(frameId);
      sizes.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", resized);
    });

    // Pointer effects only for precise pointers; touch gets press feedback in CSS.
    if (window.matchMedia("(pointer: fine)").matches) {
      let previousCard: HTMLElement | null = null;
      let previousMagnet: HTMLElement | null = null;
      const move = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target : null;
        const card = target?.closest<HTMLElement>("[data-tilt]");
        if (previousCard && previousCard !== card) resetTilt(previousCard);
        previousCard = card ?? null;
        if (card) {
          const r = card.getBoundingClientRect();
          const px = (event.clientX - r.left) / r.width - 0.5;
          const py = (event.clientY - r.top) / r.height - 0.5;
          card.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`);
          card.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
          card.style.setProperty("--lift", "-6px");
        }
        const magnet = target?.closest<HTMLElement>("[data-magnet]");
        if (previousMagnet && previousMagnet !== magnet) { previousMagnet.style.setProperty("--mx", "0px"); previousMagnet.style.setProperty("--my", "0px"); }
        previousMagnet = magnet ?? null;
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
