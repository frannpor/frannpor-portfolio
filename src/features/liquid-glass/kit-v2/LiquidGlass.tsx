"use client";

import { forwardRef, useId, useMemo, useRef } from "react";
import type * as React from "react";
import {
  DEFAULT_BACKGROUND,
  DEFAULT_BLUR,
  DEFAULT_BRIGHTNESS,
  DEFAULT_DISPLACEMENT,
  DEFAULT_HEIGHT,
  DEFAULT_RADIUS,
  DEFAULT_SATURATION,
  DEFAULT_SHADOW,
  DEFAULT_SPECULAR_BLUR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_WIDTH,
} from "@/features/liquid-glass/kit-v2/constants";
import { getIntensityScale, toCssSize, toNumber } from "@/features/liquid-glass/kit-v2/helpers";
import { ORIGINAL_DISPLACEMENT_MAP_URI, ORIGINAL_SPECULAR_LIGHTING_URI } from "@/features/liquid-glass/kit-v2/maps";
import type {
  LiquidGlassButtonProps,
  LiquidGlassProps,
  LiquidGlassSurfaceProps,
  LiquidGlassTuning,
} from "@/features/liquid-glass/kit-v2/types";
import { useElementBox } from "@/features/liquid-glass/kit-v2/useElementBox";
import { useInteractiveFilterMotion } from "@/features/liquid-glass/kit-v2/useInteractiveFilterMotion";
import styles from "@/features/liquid-glass/kit-v2/LiquidGlass.module.css";

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function useResolvedFilterId(filterId?: string) {
  const reactId = useId().replace(/:/g, "");
  return filterId ?? `liquid-glass-filter-${reactId}`;
}

function useLiquidGlassMaps(displacementMap?: string, specularMap?: string) {
  return useMemo(
    () => ({
      displacementMap: displacementMap ?? ORIGINAL_DISPLACEMENT_MAP_URI,
      specularMap: specularMap ?? ORIGINAL_SPECULAR_LIGHTING_URI,
    }),
    [displacementMap, specularMap],
  );
}

function useLiquidGlassDefs({
  aberration,
  bezelOnly,
  blur,
  chromaOffset,
  chromaStrength,
  displacement,
  displacementMap,
  edgeWidth,
  filterId,
  height,
  saturation,
  specularBlur,
  specularMap,
  width,
}: {
  aberration: number;
  bezelOnly: boolean;
  blur: number;
  chromaOffset: number;
  chromaStrength: number;
  displacement: number;
  displacementMap: string;
  edgeWidth: number;
  filterId: string;
  height: number;
  saturation: number;
  specularBlur: number;
  specularMap: string;
  width: number;
}) {
  const displacerRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);

  if (bezelOnly) {
    // Light pipeline for maps that already encode the bezel: refract, soften, saturate, light the rim.
    return {
      blurRef,
      displacerRef,
      node: (
        <svg aria-hidden="true" className={styles.filterSvg} colorInterpolationFilters="sRGB" focusable="false">
          <defs>
            <filter id={filterId} x="0" y="0" width="100%" height="100%">
              <feImage href={displacementMap} x="0" y="0" width={width} height={height} preserveAspectRatio="none" result="displacement_map" />
              {aberration > 0 ? (
                <>
                  {/* Chromatic aberration: each channel bends by a slightly different amount, so colour only splits on the bezel. */}
                  <feDisplacementMap ref={displacerRef} in="SourceGraphic" in2="displacement_map" scale={displacement} xChannelSelector="R" yChannelSelector="G" result="bent_red" />
                  <feDisplacementMap data-chroma={1 - aberration} in="SourceGraphic" in2="displacement_map" scale={displacement * (1 - aberration)} xChannelSelector="R" yChannelSelector="G" result="bent_green" />
                  <feDisplacementMap data-chroma={1 - aberration * 2} in="SourceGraphic" in2="displacement_map" scale={displacement * (1 - aberration * 2)} xChannelSelector="R" yChannelSelector="G" result="bent_blue" />
                  <feColorMatrix in="bent_red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red_only" />
                  <feColorMatrix in="bent_green" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green_only" />
                  <feColorMatrix in="bent_blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue_only" />
                  <feComposite in="red_only" in2="green_only" operator="arithmetic" k2="1" k3="1" result="red_green" />
                  <feComposite in="red_green" in2="blue_only" operator="arithmetic" k2="1" k3="1" result="displaced" />
                </>
              ) : (
                <feDisplacementMap ref={displacerRef} in="SourceGraphic" in2="displacement_map" scale={displacement} xChannelSelector="R" yChannelSelector="G" result="displaced" />
              )}
              <feGaussianBlur ref={blurRef} in="displaced" stdDeviation={blur} result="softened" />
              <feColorMatrix in="softened" type="saturate" values={saturation.toString()} result="saturated" />
              <feImage href={specularMap} x="0" y="0" width={width} height={height} preserveAspectRatio="none" result="specular_layer" />
              <feComposite in="saturated" in2="specular_layer" operator="arithmetic" k1="0" k2="1" k3={Math.min(0.9, 0.35 + specularBlur * 0.2)} k4="0" />
            </filter>
          </defs>
        </svg>
      ),
    };
  }

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
          <feColorMatrix in="displaced" type="saturate" values={saturation.toString()} result="displaced_saturated" />
          <feMorphology in="SourceAlpha" operator="erode" radius={edgeWidth} result="inner_alpha" />
          <feComposite in="SourceAlpha" in2="inner_alpha" operator="out" result="edge_alpha" />
          <feGaussianBlur in="edge_alpha" stdDeviation={Math.max(edgeWidth * 0.58, 1)} result="soft_edge_alpha" />
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
          <feComposite in="blurred_specular_layer" in2="soft_edge_alpha" operator="in" result="edge_specular" />
          <feComposite in="displaced_saturated" in2="soft_edge_alpha" operator="out" result="glass_core" />
          <feComposite in="displaced_saturated" in2="soft_edge_alpha" operator="in" result="edge_base" />
          <feColorMatrix
            in="edge_base"
            type="matrix"
            values={`1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${chromaStrength * 0.84} 0`}
            result="red_channel"
          />
          <feColorMatrix
            in="edge_base"
            type="matrix"
            values={`0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 ${chromaStrength * 0.32} 0`}
            result="green_channel"
          />
          <feColorMatrix
            in="edge_base"
            type="matrix"
            values={`0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 ${chromaStrength * 0.88} 0`}
            result="blue_channel"
          />
          <feOffset in="red_channel" dx={chromaOffset} dy="0" result="red_offset" />
          <feOffset in="blue_channel" dx={-chromaOffset} dy="0" result="blue_offset" />
          <feBlend in="red_offset" in2="green_channel" mode="screen" result="edge_rgb_rg" />
          <feBlend in="blue_offset" in2="edge_rgb_rg" mode="screen" result="edge_rgb_split" />
          <feGaussianBlur in="edge_rgb_split" stdDeviation={Math.max(chromaOffset * 0.32, 0.12)} result="edge_rgb_soft" />
          <feBlend in="edge_specular" in2="edge_rgb_soft" mode="screen" result="edge_finish" />
          <feBlend in="edge_finish" in2="glass_core" mode="screen" />
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
    chromaOffset: number;
    edgeHighlight: number;
    edgeSoftness: number;
    edgeWidth: number;
    height?: LiquidGlassTuning["height"];
    radius: LiquidGlassTuning["radius"];
    saturation: number;
    shadow: string;
    specularBlur: number;
    textColor: string;
    width?: LiquidGlassTuning["width"];
  },
  style?: React.CSSProperties,
) {
  return {
    "--liquid-glass-background": options.background,
    "--liquid-glass-brightness": options.brightness,
    "--liquid-glass-chroma-offset": `${options.chromaOffset}px`,
    "--liquid-glass-color": options.textColor,
    "--liquid-glass-edge-highlight": options.edgeHighlight.toString(),
    "--liquid-glass-edge-softness": `${options.edgeSoftness}px`,
    "--liquid-glass-edge-width": `${options.edgeWidth}px`,
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
    aberration = 0,
    as = "div",
    animation,
    bezelOnly = false,
    background = DEFAULT_BACKGROUND,
    blur = DEFAULT_BLUR,
    brightness = DEFAULT_BRIGHTNESS,
    children,
    className,
    contentClassName,
    displacement = DEFAULT_DISPLACEMENT,
    displacementMap,
    disabled,
    filterClassName,
    filterId,
    height,
    radius = DEFAULT_RADIUS,
    responsiveIntensity = true,
    saturation = DEFAULT_SATURATION,
    shadow = DEFAULT_SHADOW,
    specularBlur = DEFAULT_SPECULAR_BLUR,
    specularMap,
    style,
    textColor = DEFAULT_TEXT_COLOR,
    width,
    ...props
  },
  ref,
) {
    const Component = as;
    const localRef = useRef<HTMLElement>(null);
    const resolvedFilterId = useResolvedFilterId(filterId);
    const fallbackWidth = toNumber(width, DEFAULT_WIDTH);
    const fallbackHeight = toNumber(height, DEFAULT_HEIGHT);
    const measuredBox = useElementBox(localRef, fallbackWidth, fallbackHeight);
    const intensityScale = getIntensityScale(measuredBox.width, measuredBox.height, responsiveIntensity);
    const scaledDisplacement = displacement * intensityScale;
    const edgeWidth = Math.max(3.2, Math.min(11.5, 2.4 + specularBlur * 1.1 + scaledDisplacement * 0.028));
    const edgeSoftness = Math.max(1.4, Math.min(8.5, edgeWidth * 0.82 + specularBlur * 0.55));
    const edgeHighlight = Math.max(0.08, Math.min(0.32, 0.055 + specularBlur * 0.08 + scaledDisplacement * 0.0012));
    const chromaOffset = Math.max(0.3, Math.min(1.6, 0.18 + specularBlur * 0.22 + scaledDisplacement * 0.0042));
    const chromaStrength = Math.max(0.16, Math.min(0.72, 0.08 + specularBlur * 0.18 + scaledDisplacement * 0.003));
    const scaledHoverDisplacement =
      animation?.hoverDisplacement === undefined ? undefined : animation.hoverDisplacement * intensityScale;
    const maps = useLiquidGlassMaps(displacementMap, specularMap);
    const defs = useLiquidGlassDefs({
      aberration,
      bezelOnly,
      blur,
      chromaOffset,
      chromaStrength,
      displacement: scaledDisplacement,
      displacementMap: maps.displacementMap,
      edgeWidth,
      filterId: resolvedFilterId,
      height: measuredBox.height,
      saturation,
      specularBlur,
      specularMap: maps.specularMap,
      width: measuredBox.width,
    });

    useInteractiveFilterMotion(localRef, defs.displacerRef, defs.blurRef, {
      animation: animation ? { ...animation, hoverDisplacement: scaledHoverDisplacement } : animation,
      blur,
      displacement: scaledDisplacement,
    });

    const sharedClassName = [
      styles.root,
      Component === "button" ? styles.interactive : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const contentLayerClassName = [styles.contentLayer, Component === "button" ? styles.buttonContent : "", contentClassName ?? ""]
      .filter(Boolean)
      .join(" ");

    const ComponentTag = Component as React.ElementType;
    const handleRef = (node: HTMLElement | null) => {
      localRef.current = node;
      setForwardedRef(ref, node);
    };

    const sharedStyle = liquidGlassStyle(
      resolvedFilterId,
      {
        background,
        brightness,
        chromaOffset,
        edgeHighlight,
        edgeSoftness,
        edgeWidth,
        height,
        radius,
        saturation,
        shadow,
        specularBlur,
        textColor,
        width,
      },
      style,
    );

    const layerNodes = (
      <>
        <div className={`${styles.filterLayer} ${filterClassName ?? ""}`} />
        <div className={contentLayerClassName}>{children}</div>
      </>
    );

    return (
      <>
        {Component === "button" ? (
          <button
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            className={sharedClassName}
            disabled={disabled}
            ref={handleRef as React.Ref<HTMLButtonElement>}
            style={sharedStyle}
            type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
          >
            {layerNodes}
          </button>
        ) : (
          <ComponentTag
            {...({
              ...props,
              "aria-disabled": disabled ? true : undefined,
              className: sharedClassName,
              ref: handleRef,
              style: sharedStyle,
            } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> })}
          >
            {layerNodes}
          </ComponentTag>
        )}
        {defs.node}
      </>
    );
  },
);

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
