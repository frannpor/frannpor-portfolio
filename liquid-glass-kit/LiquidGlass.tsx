"use client";

import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import type * as React from "react";
import gsap from "gsap";
import { ORIGINAL_DISPLACEMENT_MAP_URI, ORIGINAL_SPECULAR_LIGHTING_URI } from "./liquid-glass-original-maps";
import styles from "./LiquidGlass.module.css";

type LiquidGlassAs = "div" | "button" | "section" | "article" | "aside" | "nav" | "header" | "footer" | "span";
type LiquidGlassSize = number | string;

export type LiquidGlassAnimation = {
  hoverScale?: number;
  activeScale?: number;
  hoverDisplacement?: number;
  hoverBlur?: number;
  duration?: number;
  disabled?: boolean;
};

type LiquidGlassTuning = {
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
  animation?: LiquidGlassAnimation;
};

export type LiquidGlassProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> &
  LiquidGlassTuning & {
    as?: LiquidGlassAs;
    children?: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  };

export type LiquidGlassSurfaceProps = Omit<LiquidGlassProps, "as" | "type" | "disabled">;
export type LiquidGlassButtonProps = Omit<LiquidGlassProps, "as"> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 56;
const DEFAULT_RADIUS = 28;
const DEFAULT_DISPLACEMENT = 55;
const DEFAULT_BLUR = 1;
const DEFAULT_SATURATION = 1.5;
const DEFAULT_SHADOW = "0 18px 52px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18)";

function toCssSize(value: LiquidGlassSize | undefined) {
  if (typeof value === "number") return `${value}px`;
  return value;
}

function toNumber(value: LiquidGlassSize | undefined, fallback: number) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function getIntensityScale(width: number, height: number, responsive: boolean) {
  if (!responsive) return 1;

  const thicknessScale = Math.sqrt(height / DEFAULT_HEIGHT);
  const aspect = width / Math.max(height, 1);
  const sourceAspect = DEFAULT_WIDTH / DEFAULT_HEIGHT;
  const aspectCompensation = Math.min(Math.max(sourceAspect / aspect, 0.92), 1.08);

  return Math.min(Math.max(thicknessScale * aspectCompensation, 0.82), 1.28);
}

function useLiquidGlassFilterId(id?: string) {
  const reactId = useId().replace(/:/g, "");
  return id ?? `liquid-glass-${reactId}`;
}

function useMeasuredBox(ref: React.RefObject<HTMLElement | null>, fallbackWidth: number, fallbackHeight: number) {
  const [box, setBox] = useState({ height: fallbackHeight, width: fallbackWidth });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width || fallbackWidth));
      const nextHeight = Math.max(1, Math.round(rect.height || fallbackHeight));

      setBox((current) =>
        current.width === nextWidth && current.height === nextHeight
          ? current
          : { height: nextHeight, width: nextWidth },
      );
    };

    update();

    if (!("ResizeObserver" in globalThis)) {
      const win = globalThis as unknown as Window;
      win.addEventListener("resize", update);
      return () => win.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, [fallbackHeight, fallbackWidth, ref]);

  return box;
}

function useLiquidGlassMaps(displacementMap?: string, specularMap?: string) {
  return useMemo(
    () => {
      return {
        displacementMap: displacementMap ?? ORIGINAL_DISPLACEMENT_MAP_URI,
        specularMap: specularMap ?? ORIGINAL_SPECULAR_LIGHTING_URI,
      };
    },
    [displacementMap, specularMap],
  );
}

function useLiquidGlassAnimation<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  displacerRef: React.RefObject<SVGFEDisplacementMapElement | null>,
  blurRef: React.RefObject<SVGFEGaussianBlurElement | null>,
  options: Required<Pick<LiquidGlassTuning, "displacement" | "blur">> & {
    animation?: LiquidGlassAnimation;
  },
) {
  useEffect(() => {
    const root = rootRef.current;
    const displacer = displacerRef.current;
    const blur = blurRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || !displacer || !blur || reduceMotion || options.animation?.disabled) return;

    const hoverDisplacement =
      options.animation?.hoverDisplacement ??
      options.displacement * (85 / 55);
    const hoverBlur = options.animation?.hoverBlur ?? Math.max(options.blur * 2.4, 2.4);
    const hoverScale = options.animation?.hoverScale ?? 1.08;
    const activeScale = options.animation?.activeScale ?? 0.92;
    const duration = options.animation?.duration ?? 0.25;
    const state = { displacement: options.displacement, blur: options.blur };

    const syncFilter = () => {
      displacer.setAttribute("scale", state.displacement.toFixed(2));
      blur.setAttribute("stdDeviation", state.blur.toFixed(2));
    };

    const enter = () => {
      gsap.killTweensOf([root, state]);
      gsap.to(state, {
        blur: hoverBlur,
        displacement: hoverDisplacement,
        duration,
        ease: "back.out(1.4)",
        onUpdate: syncFilter,
      });
      gsap.to(root, { duration, ease: "back.out(1.4)", scale: hoverScale });
    };

    const leave = () => {
      gsap.killTweensOf([root, state]);
      gsap.to(state, {
        blur: options.blur,
        displacement: options.displacement,
        duration,
        ease: "power2.out",
        onUpdate: syncFilter,
      });
      gsap.to(root, { duration, ease: "power2.out", scale: 1 });
    };

    const down = () => gsap.to(root, { duration: 0.08, ease: "power2.in", scale: activeScale });
    const up = () => gsap.to(root, { duration, ease: "back.out(2)", scale: hoverScale });

    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointerup", up);

    return () => {
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointerup", up);
      gsap.killTweensOf([root, state]);
    };
  }, [blurRef, displacerRef, options.animation, options.blur, options.displacement, rootRef]);
}

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function useLiquidGlassDefs({
  blur,
  displacement,
  displacementMap,
  filterId,
  height,
  saturation,
  specularBlur,
  specularMap,
  width,
}: {
  blur: number;
  displacement: number;
  displacementMap: string;
  filterId: string;
  height: number;
  saturation: number;
  specularBlur: number;
  specularMap: string;
  width: number;
}) {
  const displacerRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);

  const node = (
    <svg aria-hidden="true" className={styles.filterSvg} colorInterpolationFilters="sRGB" focusable="false">
      <defs>
        <filter id={filterId}>
          <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation={blur} result="blurred_source" />
          <feImage
            href={displacementMap}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
            result="displacement_map"
          />
          <feDisplacementMap
            ref={displacerRef}
            in="blurred_source"
            in2="displacement_map"
            scale={displacement}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values={saturation.toString()}
            result="displaced_saturated"
          />
          <feImage
            href={specularMap}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
            result="specular_layer"
          />
          <feGaussianBlur in="specular_layer" stdDeviation={specularBlur} result="blurred_specular_layer" />
          <feComposite
            in="displaced_saturated"
            in2="blurred_specular_layer"
            operator="in"
            result="final_specular_layer"
          />
          <feBlend in="final_specular_layer" in2="displaced_saturated" mode="normal" />
        </filter>
      </defs>
    </svg>
  );

  return { blurRef, displacerRef, node };
}

function liquidGlassStyle(
  filterId: string,
  options: {
    background: string;
    brightness: number;
    displacement: number;
    height?: LiquidGlassSize;
    radius: LiquidGlassSize;
    saturation: number;
    shadow: string;
    specularBlur: number;
    textColor: string;
    width?: LiquidGlassSize;
  },
  style?: React.CSSProperties,
) {
  const edgeWidth = Math.max(2, Math.min(8, options.displacement * 0.05));
  const edgeHighlight = Math.max(0.045, Math.min(0.16, 0.045 + options.specularBlur * 0.03));
  const chromaOffset = Math.max(0.08, Math.min(0.22, options.specularBlur * 0.055 + options.displacement * 0.001));

  return {
    "--liquid-glass-background": options.background,
    "--liquid-glass-brightness": options.brightness,
    "--liquid-glass-chroma-offset": `${chromaOffset}px`,
    "--liquid-glass-color": options.textColor,
    "--liquid-glass-edge-highlight": edgeHighlight.toString(),
    "--liquid-glass-edge-width": `${edgeWidth}px`,
    "--liquid-glass-filter": `url(#${filterId})`,
    "--liquid-glass-height": toCssSize(options.height),
    "--liquid-glass-radius": toCssSize(options.radius),
    "--liquid-glass-saturation": options.saturation.toString(),
    "--liquid-glass-shadow": options.shadow,
    "--liquid-glass-specular": options.specularBlur.toString(),
    "--liquid-glass-width": toCssSize(options.width),
    ...style,
  } as React.CSSProperties;
}

export const LiquidGlass = forwardRef<HTMLElement, LiquidGlassProps>(function LiquidGlass(
  {
    as = "div",
    animation,
    background = "rgba(255, 255, 255, 0.1)",
    blur = DEFAULT_BLUR,
    brightness = 1,
    children,
    className,
    contentClassName,
    displacement = DEFAULT_DISPLACEMENT,
    displacementMap,
    filterClassName,
    height,
    id,
    radius = DEFAULT_RADIUS,
    responsiveIntensity = true,
    saturation = DEFAULT_SATURATION,
    shadow = DEFAULT_SHADOW,
    specularBlur = 1,
    specularMap,
    style,
    textColor = "rgba(255, 255, 255, 0.94)",
    width,
    ...props
  },
  ref,
) {
  const Component = as;
  const localRef = useRef<HTMLElement>(null);
  const filterId = useLiquidGlassFilterId(id);
  const fallbackWidth = toNumber(width, DEFAULT_WIDTH);
  const fallbackHeight = toNumber(height, DEFAULT_HEIGHT);
  const measuredBox = useMeasuredBox(localRef, fallbackWidth, fallbackHeight);
  const intensityScale = getIntensityScale(measuredBox.width, measuredBox.height, responsiveIntensity);
  const scaledDisplacement = displacement * intensityScale;
  const scaledHoverDisplacement =
    animation?.hoverDisplacement === undefined ? undefined : animation.hoverDisplacement * intensityScale;
  const maps = useLiquidGlassMaps(displacementMap, specularMap);
  const defs = useLiquidGlassDefs({
    blur,
    displacement: scaledDisplacement,
    displacementMap: maps.displacementMap,
    filterId,
    height: measuredBox.height,
    saturation,
    specularBlur,
    specularMap: maps.specularMap,
    width: measuredBox.width,
  });

  useLiquidGlassAnimation(localRef, defs.displacerRef, defs.blurRef, {
    animation: animation ? { ...animation, hoverDisplacement: scaledHoverDisplacement } : animation,
    blur,
    displacement: scaledDisplacement,
  });

  return (
    <>
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          setForwardedRef(ref, node);
        }}
        className={`${styles.root} ${as === "button" ? styles.interactive : ""} ${className ?? ""}`}
        style={liquidGlassStyle(filterId, { background, brightness, displacement: scaledDisplacement, height, radius, saturation, shadow, specularBlur, textColor, width }, style)}
        {...props}
      >
        <div className={`${styles.filterLayer} ${filterClassName ?? ""}`} />
        <div className={`${styles.contentLayer} ${contentClassName ?? ""}`}>{children}</div>
      </Component>
      {defs.node}
    </>
  );
});

export const LiquidGlassSurface = forwardRef<HTMLDivElement, LiquidGlassSurfaceProps>(function LiquidGlassSurface(
  props,
  ref,
) {
  return <LiquidGlass ref={ref as React.ForwardedRef<HTMLElement>} {...props} as="div" />;
});

export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(function LiquidGlassButton(
  {
    height = DEFAULT_HEIGHT,
    type = "button",
    width = DEFAULT_WIDTH,
    ...props
  },
  ref,
) {
  return (
    <LiquidGlass
      ref={ref as React.ForwardedRef<HTMLElement>}
      {...props}
      as="button"
      height={height}
      type={type}
      width={width}
    />
  );
});
