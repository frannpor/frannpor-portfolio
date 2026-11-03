import type * as React from "react";

export type LiquidGlassAs = "div" | "button" | "section" | "article" | "aside" | "nav" | "header" | "footer" | "span";
export type LiquidGlassSize = number | string;

export type LiquidGlassAnimation = {
  hoverScale?: number;
  activeScale?: number;
  hoverDisplacement?: number;
  hoverBlur?: number;
  duration?: number;
  disabled?: boolean;
};

export type LiquidGlassTuning = {
  width?: LiquidGlassSize;
  height?: LiquidGlassSize;
  radius?: LiquidGlassSize;
  responsiveIntensity?: boolean;
  displacement?: number;
  blur?: number;
  brightness?: number;
  saturation?: number;
  specularBlur?: number;
  background?: string;
  textColor?: string;
  shadow?: string;
  className?: string;
  contentClassName?: string;
  filterClassName?: string;
  displacementMap?: string;
  specularMap?: string;
  filterId?: string;
  /** Use a light filter when the maps already encode the bezel and its highlight. */
  bezelOnly?: boolean;
  /** 0 to about 0.12: how far red, green and blue separate on the bezel (light filter only). */
  aberration?: number;
  animation?: LiquidGlassAnimation;
};

export type LiquidGlassProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> &
  LiquidGlassTuning & {
    as?: LiquidGlassAs;
    children?: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  };

export type LiquidGlassSurfaceProps = Omit<LiquidGlassProps, "as" | "disabled">;
export type LiquidGlassButtonProps = Omit<LiquidGlassProps, "as"> & React.ButtonHTMLAttributes<HTMLButtonElement>;
