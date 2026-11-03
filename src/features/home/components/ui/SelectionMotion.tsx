"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { motionAllowed } from "@/features/home/motion/motion";
import styles from "./selection-motion.module.css";

/** One measured indicator, shared by tabs and segmented controls. Semantics stay with the caller. */
export function SlidingIndicator({ value, tone = "neutral", follow = false }: { value: string | number; tone?: "neutral" | "accent"; follow?: boolean }) {
  const indicator = useRef<HTMLSpanElement>(null);
  const hovered = useRef<HTMLElement | null>(null);
  const animation = useRef<Animation | null>(null);
  const destination = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  useLayoutEffect(() => {
    const marker = indicator.current;
    const host = marker?.parentElement;
    if (!marker || !host) return;
    const update = () => {
      const selected = host.querySelector<HTMLElement>('[aria-selected="true"], [aria-pressed="true"], [aria-current="location"]');
      // With a mouse, the lens previews the option under the pointer and returns to the selection on leave.
      const target = hovered.current ?? selected;
      marker.dataset.preview = String(Boolean(hovered.current && hovered.current !== selected));
      if (!target || !host.offsetWidth || !host.offsetHeight) { marker.dataset.visible = "false"; return; }
      const bounds = host.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      const scaleX = bounds.width / host.offsetWidth || 1;
      const scaleY = bounds.height / host.offsetHeight || 1;
      const next = {
        x: (r.left - bounds.left) / scaleX + host.scrollLeft - host.clientLeft,
        y: (r.top - bounds.top) / scaleY + host.scrollTop - host.clientTop,
        width: r.width / scaleX,
        height: r.height / scaleY,
      };
      const enabled = motionAllowed();
      const last = destination.current;
      if (last && marker.dataset.visible === "true" && Object.keys(next).every(key => Math.abs(next[key as keyof typeof next] - last[key as keyof typeof next]) < .1)) {
        if (!enabled) animation.current?.cancel();
        return;
      }
      const visible = marker.dataset.visible === "true";
      // Read the actual in-flight rectangle before cancellation, so rapid changes never jump.
      const old = marker.getBoundingClientRect();
      const from = {
        x: (old.left - bounds.left) / scaleX + host.scrollLeft - host.clientLeft,
        y: (old.top - bounds.top) / scaleY + host.scrollTop - host.clientTop,
        width: old.width / scaleX,
        height: old.height / scaleY,
      };
      animation.current?.cancel();
      destination.current = next;
      marker.style.width = `${next.width}px`;
      marker.style.height = `${next.height}px`;
      const transform = (rect: typeof next) => `translate3d(${rect.x}px, ${rect.y}px, 0) scale(${rect.width / next.width}, ${rect.height / next.height})`;
      marker.style.transform = transform(next);
      marker.dataset.visible = "true";
      if (enabled && visible && from.width && from.height) {
        const tokens = getComputedStyle(document.documentElement);
        // The accent pill is a single drop of colour, so it stretches and thins more as it travels.
        const liquid = tone === "accent";
        const stretch = Math.min(liquid ? 24 : 12, Math.abs(next.x - from.x) * (liquid ? .32 : .08));
        const middle = {
          x: from.x + (next.x - from.x) * .65 - (next.x < from.x ? stretch : 0),
          y: from.y + (next.y - from.y) * .65,
          width: from.width + (next.width - from.width) * .65 + stretch,
          height: (from.height + (next.height - from.height) * .65) * (liquid ? .86 : 1),
        };
        if (liquid) middle.y += (from.height - middle.height) / 2;
        animation.current = marker.animate([
          { transform: transform(from), offset: 0 },
          { transform: transform(middle), offset: .55 },
          { transform: transform(next), offset: 1 },
        ], { duration: parseFloat(tokens.getPropertyValue("--t-open")) || 260, easing: tokens.getPropertyValue("--ease").trim() || "ease-out" });
      }
    };
    update();
    const sizes = new ResizeObserver(update);
    sizes.observe(host);
    host.querySelectorAll("button, a").forEach(button => sizes.observe(button));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.addEventListener("change", update);
    const over = (event: PointerEvent) => {
      if (!follow || event.pointerType !== "mouse") return;
      const item = (event.target as Element | null)?.closest<HTMLElement>("button, a");
      if (!item || !host.contains(item) || item === hovered.current) return;
      hovered.current = item;
      update();
    };
    const leave = () => {
      if (!hovered.current) return;
      hovered.current = null;
      update();
    };
    host.addEventListener("pointerover", over);
    host.addEventListener("pointerleave", leave);
    return () => {
      sizes.disconnect();
      reduced.removeEventListener("change", update);
      host.removeEventListener("pointerover", over);
      host.removeEventListener("pointerleave", leave);
    };
  }, [value, follow, tone]);
  useEffect(() => () => { animation.current?.cancel(); }, []);
  return <span ref={indicator} className={styles.indicator} data-tone={tone} data-shape="pill" aria-hidden="true" />;
}

/** Keep the outgoing view inert while sliding the incoming view and measuring its natural height. */
export function AnimatedPanel({ value, open = true, children }: { value: number; open?: boolean; children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const previous = useRef<{ node: HTMLDivElement; value: number; open: boolean } | null>(null);
  const outgoing = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const host = viewport.current;
    const node = content.current;
    if (!host || !node) return;
    const enabled = motionAllowed();
    host.dataset.animate = String(enabled);
    outgoing.current?.remove();
    const old = previous.current;
    previous.current = { node, value, open };
    const measure = () => { host.style.height = open ? `${node.offsetHeight}px` : "0px"; };
    measure();
    const sizes = new ResizeObserver(measure);
    sizes.observe(node);
    if (enabled && old && old.node !== node && old.open && open) {
      const direction = value >= old.value ? 1 : -1;
      const tokens = getComputedStyle(document.documentElement);
      const enter = parseFloat(tokens.getPropertyValue("--t-open")) || 260;
      const exit = parseFloat(tokens.getPropertyValue("--t-close")) || 180;
      const easing = tokens.getPropertyValue("--ease").trim() || "ease-out";
      const oldNode = old.node;
      oldNode.inert = true;
      oldNode.setAttribute("aria-hidden", "true");
      for (const element of [oldNode, ...oldNode.querySelectorAll("[id]")]) element.removeAttribute("id");
      oldNode.classList.add(styles.outgoing);
      host.appendChild(oldNode);
      outgoing.current = oldNode;
      void oldNode.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${-direction * 8}px)` }], { duration: exit, easing, fill: "forwards" }).finished.then(() => oldNode.remove(), () => oldNode.remove());
      node.animate([{ opacity: 0, transform: `translateX(${direction * 8}px)` }, { opacity: 1, transform: "translateX(0)" }], { duration: enter, easing });
    }
    return () => sizes.disconnect();
  }, [value, open]);
  useEffect(() => () => { outgoing.current?.remove(); }, []);
  return <div ref={viewport} className={styles.viewport} data-open={open} inert={!open}>
    <div ref={content} key={value} className={styles.content}>{children}</div>
  </div>;
}
