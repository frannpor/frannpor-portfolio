"use client";

import { useEffect } from "react";
import { clamp } from "@/features/liquid-glass/kit-v2/helpers";
import type { LiquidGlassAnimation } from "@/features/liquid-glass/kit-v2/types";

type MotionOptions = {
  animation?: LiquidGlassAnimation;
  blur: number;
  displacement: number;
};

function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function easeInQuad(t: number) {
  return t * t;
}

function animate({
  duration,
  draw,
  easing,
}: {
  duration: number;
  draw: (progress: number) => void;
  easing: (progress: number) => number;
}) {
  const start = performance.now();
  let frameId = 0;

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = clamp(elapsed / duration, 0, 1);

    draw(easing(progress));

    if (progress < 1) {
      frameId = window.requestAnimationFrame(tick);
    }
  };

  frameId = window.requestAnimationFrame(tick);

  return () => window.cancelAnimationFrame(frameId);
}

export function useInteractiveFilterMotion<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  displacerRef: React.RefObject<SVGFEDisplacementMapElement | null>,
  blurRef: React.RefObject<SVGFEGaussianBlurElement | null>,
  options: MotionOptions,
) {
  useEffect(() => {
    const root = rootRef.current;
    const displacer = displacerRef.current;
    const blur = blurRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || !displacer || !blur || reduceMotion || options.animation?.disabled) {
      return;
    }

    const hoverDisplacement = options.animation?.hoverDisplacement ?? options.displacement * (85 / 55);
    const hoverBlur = options.animation?.hoverBlur ?? Math.max(options.blur * 2.4, 2.4);
    const hoverScale = options.animation?.hoverScale ?? 1.08;
    const activeScale = options.animation?.activeScale ?? 0.92;
    const durationMs = (options.animation?.duration ?? 0.25) * 1000;
    const state = { blur: options.blur, displacement: options.displacement, scale: 1 };
    let stopFilterAnimation: (() => void) | null = null;
    let stopScaleAnimation: (() => void) | null = null;

    // Channels split for chromatic aberration follow the main displacement at their own ratio.
    const chroma = Array.from(displacer.parentElement?.querySelectorAll<SVGFEDisplacementMapElement>("[data-chroma]") ?? []);
    const sync = () => {
      displacer.setAttribute("scale", state.displacement.toFixed(2));
      for (const channel of chroma) channel.setAttribute("scale", (state.displacement * Number(channel.dataset.chroma)).toFixed(2));
      blur.setAttribute("stdDeviation", state.blur.toFixed(2));
      root.style.transform = `scale(${state.scale.toFixed(4)})`;
    };

    const stop = () => {
      stopFilterAnimation?.();
      stopScaleAnimation?.();
      stopFilterAnimation = null;
      stopScaleAnimation = null;
    };

    const tweenFilter = (nextBlur: number, nextDisplacement: number, easing: (progress: number) => number) => {
      stopFilterAnimation?.();

      const startBlur = state.blur;
      const startDisplacement = state.displacement;

      stopFilterAnimation = animate({
        duration: durationMs,
        draw: (progress) => {
          state.blur = startBlur + (nextBlur - startBlur) * progress;
          state.displacement = startDisplacement + (nextDisplacement - startDisplacement) * progress;
          sync();
        },
        easing,
      });
    };

    const tweenScale = (nextScale: number, duration: number, easing: (progress: number) => number) => {
      stopScaleAnimation?.();

      const startScale = state.scale;

      stopScaleAnimation = animate({
        duration,
        draw: (progress) => {
          state.scale = startScale + (nextScale - startScale) * progress;
          sync();
        },
        easing,
      });
    };

    const handleEnter = () => {
      stop();
      tweenFilter(hoverBlur, hoverDisplacement, easeOutBack);
      tweenScale(hoverScale, durationMs, easeOutBack);
    };

    const handleLeave = () => {
      stop();
      tweenFilter(options.blur, options.displacement, easeOutQuad);
      tweenScale(1, durationMs, easeOutQuad);
    };

    const handleDown = () => {
      tweenScale(activeScale, 80, easeInQuad);
    };

    const handleUp = () => {
      tweenScale(hoverScale, durationMs, easeOutBack);
    };

    root.addEventListener("pointerenter", handleEnter);
    root.addEventListener("pointerleave", handleLeave);
    root.addEventListener("pointerdown", handleDown);
    root.addEventListener("pointerup", handleUp);
    root.addEventListener("pointercancel", handleLeave);
    sync();

    return () => {
      stop();
      root.removeEventListener("pointerenter", handleEnter);
      root.removeEventListener("pointerleave", handleLeave);
      root.removeEventListener("pointerdown", handleDown);
      root.removeEventListener("pointerup", handleUp);
      root.removeEventListener("pointercancel", handleLeave);
    };
  }, [blurRef, displacerRef, options.animation, options.blur, options.displacement, rootRef]);
}
