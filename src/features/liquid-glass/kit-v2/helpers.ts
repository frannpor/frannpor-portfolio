import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "@/features/liquid-glass/kit-v2/constants";
import type { LiquidGlassSize } from "@/features/liquid-glass/kit-v2/types";

export function toCssSize(value: LiquidGlassSize | undefined) {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
}

export function toNumber(value: LiquidGlassSize | undefined, fallback: number) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

export function getIntensityScale(width: number, height: number, responsive: boolean) {
  if (!responsive) {
    return 1;
  }

  const thicknessScale = Math.sqrt(height / DEFAULT_HEIGHT);
  const aspect = width / Math.max(height, 1);
  const sourceAspect = DEFAULT_WIDTH / DEFAULT_HEIGHT;
  const aspectCompensation = Math.min(Math.max(sourceAspect / aspect, 0.92), 1.08);

  return Math.min(Math.max(thicknessScale * aspectCompensation, 0.82), 1.28);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
