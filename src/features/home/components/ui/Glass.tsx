"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { LiquidGlass, type LiquidGlassProps } from "@/features/liquid-glass/kit-v2";
import { buildGlassMaps, type GlassMaps } from "./glassMaps";
import styles from "./glass.module.css";

type GlassProps = Omit<LiquidGlassProps, "radius"> & { radius?: number };

// Chromatic aberration triples the refraction work; phones keep the bezel and highlight without the colour split.
const richQuery = "(pointer: fine) and (min-width: 901px)";
function subscribeRich(listener: () => void) {
  const media = window.matchMedia(richQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const isRich = () => window.matchMedia(richQuery).matches;

/** Liquid glass from the studio kit, with maps drawn for its real size so any proportion refracts cleanly. */
export function Glass({ className, contentClassName, filterClassName, radius = 28, ...props }: GlassProps) {
  const host = useRef<HTMLElement>(null);
  const [maps, setMaps] = useState<GlassMaps | null>(null);
  const rich = useSyncExternalStore(subscribeRich, isRich, () => false);

  // Draw the maps before the first paint after hydration, so the refraction appears with the page.
  useLayoutEffect(() => {
    const node = host.current;
    if (!node) return;
    const update = () => {
      const width = Math.round(node.offsetWidth);
      const height = Math.round(node.offsetHeight);
      if (width && height) setMaps(buildGlassMaps(width, height, radius));
    };
    update();
    const sizes = new ResizeObserver(update);
    sizes.observe(node);
    return () => sizes.disconnect();
  }, [radius]);

  return <LiquidGlass
    ref={host}
    as="span"
    radius={radius}
    displacement={46}
    blur={0.75}
    brightness={1}
    saturation={1.3}
    specularBlur={0.6}
    background="rgba(255, 255, 255, 0.04)"
    shadow="0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.16)"
    animation={{ disabled: true }}
    bezelOnly={Boolean(maps)}
    aberration={rich ? 0.07 : 0}
    displacementMap={maps?.displacement}
    specularMap={maps?.specular}
    {...props}
    className={[styles.glass, className].filter(Boolean).join(" ")}
    contentClassName={[styles.content, contentClassName].filter(Boolean).join(" ")}
    filterClassName={[styles.filter, maps ? "" : styles.pending, filterClassName].filter(Boolean).join(" ")}
  />;
}
