"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code2, Eye, EyeOff, FileText, Layers2, Palette, Sparkles } from "lucide-react";
import { LiquidGlass as LegacyLiquidGlass, LiquidGlassButton as LegacyLiquidGlassButton } from "@/features/liquid-glass/legacy";
import { LiquidGlass, LiquidGlassButton } from "@/features/liquid-glass/kit-v2";
import styles from "@/features/liquid-glass-lab/components/liquid-glass-lab.module.css";

type LabTab = "playground" | "docs";
type ArtifactKind = "cta" | "toolbar" | "capsule";
type LayerId = "legacy" | "v2";
type BackgroundPreset = "spectrum" | "aurora" | "sunset" | "apple";

type PlaygroundState = {
  width: number;
  height: number;
  radius: number;
  displacement: number;
  blur: number;
  saturation: number;
  brightness: number;
  specularBlur: number;
  responsiveIntensity: boolean;
  animate: boolean;
};

type LayerState = {
  visible: boolean;
  x: number;
  y: number;
  z: number;
};

const DEFAULT_CANVAS = { width: 860, height: 560 };

const defaultState: PlaygroundState = {
  animate: true,
  blur: 0.75,
  brightness: 1.04,
  displacement: 75,
  height: 90,
  radius: 35,
  responsiveIntensity: true,
  saturation: 1,
  specularBlur: 2,
  width: 300,
};

const presets: Array<{ label: string; value: PlaygroundState }> = [
  { label: "Button", value: defaultState },
  {
    label: "Dense",
    value: { ...defaultState, blur: 1.35, brightness: 1.06, displacement: 68, height: 92, radius: 30, width: 316 },
  },
  {
    label: "Soft",
    value: { ...defaultState, blur: 0.78, brightness: 1.04, displacement: 42, height: 94, radius: 34, saturation: 1.3, width: 340 },
  },
];

const artifactPresets: Record<ArtifactKind, Partial<PlaygroundState>> = {
  capsule: { height: 76, radius: 38, width: 240 },
  cta: { height: 90, radius: 35, width: 300 },
  toolbar: { height: 66, radius: 24, width: 360 },
};

const backgroundOptions: Array<{ id: BackgroundPreset; label: string }> = [
  { id: "apple", label: "Apple mode" },
  { id: "spectrum", label: "Spectrum" },
  { id: "aurora", label: "Aurora" },
  { id: "sunset", label: "Sunset" },
];

const artifactOptions: Array<{ id: ArtifactKind; label: string }> = [
  { id: "cta", label: "Button" },
  { id: "toolbar", label: "Toolbar" },
  { id: "capsule", label: "Capsule" },
];

const tabs: Array<{ id: LabTab; label: string; icon: typeof Sparkles }> = [
  { id: "playground", label: "Playground", icon: Sparkles },
  { id: "docs", label: "Docs", icon: FileText },
];

const layerTitles: Record<LayerId, string> = {
  legacy: "Original",
  v2: "V2",
};

const layerDescriptions: Record<LayerId, string> = {
  legacy: "Referencia intacta",
  v2: "Version modular",
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getArtifactFootprint(artifact: ArtifactKind, state: PlaygroundState) {
  if (artifact === "toolbar") {
    return {
      width: Math.max(state.width + 90, 320),
      height: 94,
    };
  }

  if (artifact === "capsule") {
    return {
      width: Math.max(state.width + 50, 280),
      height: 110,
    };
  }

  return {
    width: state.width,
    height: state.height,
  };
}

function createLayerDefaults(
  artifact: ArtifactKind,
  state: PlaygroundState,
  canvasWidth = DEFAULT_CANVAS.width,
  canvasHeight = DEFAULT_CANVAS.height,
): Record<LayerId, LayerState> {
  const footprint = getArtifactFootprint(artifact, state);
  const anchorX = (canvasWidth - footprint.width) / 2;
  const anchorY = (canvasHeight - footprint.height) / 2;

  return {
    legacy: {
      visible: true,
      x: clamp(anchorX - 48, 18, Math.max(18, canvasWidth - footprint.width - 18)),
      y: clamp(anchorY - 24, 18, Math.max(18, canvasHeight - footprint.height - 18)),
      z: 2,
    },
    v2: {
      visible: true,
      x: clamp(anchorX + 22, 18, Math.max(18, canvasWidth - footprint.width - 18)),
      y: clamp(anchorY + 44, 18, Math.max(18, canvasHeight - footprint.height - 18)),
      z: 3,
    },
  };
}

export function LiquidGlassLabPage() {
  const [tab, setTab] = useState<LabTab>("playground");
  const [state, setState] = useState<PlaygroundState>(defaultState);
  const [artifact, setArtifact] = useState<ArtifactKind>("cta");
  const [background, setBackground] = useState<BackgroundPreset>("spectrum");
  const [appleFrost, setAppleFrost] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerId>("v2");
  const [layers, setLayers] = useState<Record<LayerId, LayerState>>(createLayerDefaults("cta", defaultState));
  const [dragging, setDragging] = useState<LayerId | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<LayerId, HTMLDivElement | null>>({
    legacy: null,
    v2: null,
  });

  const sharedProps = useMemo(
    () => ({
      animation: state.animate ? { duration: 0.24 } : { disabled: true },
      background: "rgba(255, 255, 255, 0.04)",
      blur: state.blur,
      brightness: state.brightness,
      displacement: state.displacement,
      height: state.height,
      radius: state.radius,
      responsiveIntensity: state.responsiveIntensity,
      saturation: state.saturation,
      specularBlur: state.specularBlur,
      width: state.width,
    }),
    [state],
  );

  const codeSample = useMemo(
    () => `const shared = {
  width: ${state.width},
  height: ${state.height},
  radius: ${state.radius},
  displacement: ${state.displacement},
  blur: ${state.blur},
  saturation: ${state.saturation},
  brightness: ${state.brightness},
  specularBlur: ${state.specularBlur},
  responsiveIntensity: ${state.responsiveIntensity},
};

<LegacyLiquidGlassButton {...shared}>Original</LegacyLiquidGlassButton>
<LiquidGlassButton {...shared}>V2</LiquidGlassButton>`,
    [state],
  );

  function patchLayer(layerId: LayerId, patch: Partial<LayerState>) {
    setLayers((current) => ({
      ...current,
      [layerId]: { ...current[layerId], ...patch },
    }));
  }

  function resetCanvas(nextArtifact = artifact, nextState = state) {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    setLayers(
      createLayerDefaults(
        nextArtifact,
        nextState,
        canvasRect?.width ?? DEFAULT_CANVAS.width,
        canvasRect?.height ?? DEFAULT_CANVAS.height,
      ),
    );
    setSelectedLayer("v2");
  }

  function applyArtifact(nextArtifact: ArtifactKind) {
    const nextState = { ...state, ...artifactPresets[nextArtifact] };
    setArtifact(nextArtifact);
    setState(nextState);
    resetCanvas(nextArtifact, nextState);
  }

  function bringToFront(layerId: LayerId) {
    const otherId: LayerId = layerId === "legacy" ? "v2" : "legacy";
    setLayers((current) => ({
      ...current,
      [layerId]: { ...current[layerId], z: 4 },
      [otherId]: { ...current[otherId], z: 2 },
    }));
  }

  function sendToBack(layerId: LayerId) {
    const otherId: LayerId = layerId === "legacy" ? "v2" : "legacy";
    setLayers((current) => ({
      ...current,
      [layerId]: { ...current[layerId], z: 2 },
      [otherId]: { ...current[otherId], z: 4 },
    }));
  }

  function selectLayer(layerId: LayerId) {
    setSelectedLayer(layerId);
    bringToFront(layerId);
  }

  function applyPreset(nextState: PlaygroundState) {
    setState(nextState);
    resetCanvas(artifact, nextState);
  }

  function startDrag(layerId: LayerId, event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    selectLayer(layerId);
    setDragging(layerId);

    const startX = event.clientX;
    const startY = event.clientY;
    const origin = layers[layerId];
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    const layerRect = event.currentTarget.getBoundingClientRect();
    const maxX = canvasRect ? Math.max(0, canvasRect.width - layerRect.width) : DEFAULT_CANVAS.width;
    const maxY = canvasRect ? Math.max(0, canvasRect.height - layerRect.height) : DEFAULT_CANVAS.height;
    const layerNode = layerRefs.current[layerId];
    let nextX = origin.x;
    let nextY = origin.y;
    let frameId = 0;

    const flushPosition = () => {
      frameId = 0;
      if (!layerNode) {
        return;
      }

      layerNode.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
    };

    const handleMove = (moveEvent: PointerEvent) => {
      nextX = clamp(origin.x + moveEvent.clientX - startX, 0, maxX);
      nextY = clamp(origin.y + moveEvent.clientY - startY, 0, maxY);

      if (!frameId) {
        frameId = window.requestAnimationFrame(flushPosition);
      }
    };

    const handleUp = () => {
      setDragging((current) => (current === layerId ? null : current));
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      patchLayer(layerId, { x: nextX, y: nextY });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp, { once: true });
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <Link className={styles.backLink} href="/">
              <ArrowLeft size={16} />
              Portfolio
            </Link>
            <span className={styles.badge}>Liquid Glass Lab</span>
          </div>
          <div className={styles.headerControls}>
            <section className={styles.headerControlCard}>
              <div className={styles.sectionHead}>
                <Sparkles size={15} />
                <h2>Artifact</h2>
              </div>
              <div className={styles.segmented}>
                {artifactOptions.map((option) => (
                  <button
                    key={option.id}
                    className={artifact === option.id ? styles.segmentActive : styles.segment}
                    onClick={() => applyArtifact(option.id)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.headerControlCard}>
              <div className={styles.sectionHead}>
                <Palette size={15} />
                <h2>Background</h2>
              </div>
              <div className={styles.segmented}>
                {backgroundOptions.map((option) => (
                  <button
                    key={option.id}
                    className={background === option.id ? styles.segmentActive : styles.segment}
                    onClick={() => setBackground(option.id)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <Toggle
                checked={appleFrost}
                label="Apple blur wash"
                onChange={(checked) => setAppleFrost(checked)}
              />
            </section>

            <section className={styles.headerControlCard}>
              <div className={styles.sectionHead}>
                <Layers2 size={15} />
                <h2>Layers</h2>
              </div>
              <div className={styles.layerStack}>
                {(["legacy", "v2"] as LayerId[]).map((layerId) => (
                  <button
                    key={layerId}
                    className={selectedLayer === layerId ? styles.layerPillActive : styles.layerPill}
                    onClick={() => selectLayer(layerId)}
                    type="button"
                  >
                    <span>{layerTitles[layerId]}</span>
                    <small>{layerDescriptions[layerId]}</small>
                  </button>
                ))}
              </div>
              <div className={styles.layerActions}>
                <button className={styles.secondaryButton} onClick={() => bringToFront(selectedLayer)} type="button">
                  Bring front
                </button>
                <button className={styles.secondaryButton} onClick={() => sendToBack(selectedLayer)} type="button">
                  Send back
                </button>
                <button
                  aria-label={layers[selectedLayer].visible ? "Hide layer" : "Show layer"}
                  className={styles.iconButton}
                  onClick={() => patchLayer(selectedLayer, { visible: !layers[selectedLayer].visible })}
                  type="button"
                >
                  {layers[selectedLayer].visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
              </div>
            </section>

            <section className={styles.headerControlCard}>
              <div className={styles.sectionHead}>
                <Code2 size={15} />
                <h2>Presets</h2>
              </div>
              <div className={styles.segmented}>
                {presets.map((preset) => (
                  <button key={preset.label} className={styles.presetButton} onClick={() => applyPreset(preset.value)} type="button">
                    {preset.label}
                  </button>
                ))}
                <button className={styles.presetButton} onClick={() => resetCanvas()} type="button">
                  Reset
                </button>
              </div>
            </section>
          </div>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Liquid glass lab sections">
          {tabs.map(({ icon: Icon, id, label }) => (
            <button
              key={id}
              aria-selected={tab === id}
              className={tab === id ? styles.tabActive : styles.tab}
              onClick={() => setTab(id)}
              role="tab"
              type="button"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {tab === "playground" ? (
          <section className={styles.stage}>
            <div className={styles.canvasColumn}>
              <div className={styles.canvasHead}>
                <div>
                  <span>Canvas</span>
                  <strong>Drag directo sobre cada pieza</strong>
                </div>
                <button className={styles.secondaryButton} onClick={() => resetCanvas()} type="button">
                  Reset
                </button>
              </div>

              <div className={styles.canvas} ref={canvasRef}>
                <div className={`${styles.stageBackground} ${styles[`stageBackground${background}`]}`} />
                <div className={`${styles.appleWash} ${appleFrost ? styles.appleWashVisible : ""}`} />
                <div className={styles.canvasText} aria-hidden="true">
                  <span>Liquid Glass</span>
                  <small>playground / adaptive / reusable / v1 / v2</small>
                </div>

                {(["legacy", "v2"] as LayerId[]).map((layerId) => (
                  <div
                    key={layerId}
                    ref={(node) => {
                      layerRefs.current[layerId] = node;
                    }}
                    className={`${styles.canvasLayer} ${selectedLayer === layerId ? styles.canvasLayerSelected : ""} ${dragging === layerId ? styles.canvasLayerDragging : ""}`}
                    style={{
                      transform: `translate3d(${layers[layerId].x}px, ${layers[layerId].y}px, 0)`,
                      zIndex: layers[layerId].z,
                      visibility: layers[layerId].visible ? "visible" : "hidden",
                    }}
                  >
                    <div
                      className={styles.layerShell}
                      onClick={() => selectLayer(layerId)}
                      onPointerDown={(event) => startDrag(layerId, event)}
                      role="presentation"
                    >
                      {renderLayerArtifact(layerId, artifact, sharedProps)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className={styles.dock}>
              <section className={styles.dockSection}>
                <div className={styles.sectionHead}>
                  <Code2 size={15} />
                  <h2>Tuning</h2>
                </div>
                <div className={styles.controlGrid}>
                  <Control
                    label="Width"
                    max={420}
                    min={180}
                    step={2}
                    value={state.width}
                    onChange={(value) => setState((current) => ({ ...current, width: value }))}
                  />
                  <Control
                    label="Height"
                    max={132}
                    min={56}
                    step={2}
                    value={state.height}
                    onChange={(value) => setState((current) => ({ ...current, height: value }))}
                  />
                  <Control
                    label="Radius"
                    max={48}
                    min={14}
                    step={1}
                    value={state.radius}
                    onChange={(value) => setState((current) => ({ ...current, radius: value }))}
                  />
                  <Control
                    label="Displace"
                    max={92}
                    min={12}
                    step={1}
                    value={state.displacement}
                    onChange={(value) => setState((current) => ({ ...current, displacement: value }))}
                  />
                  <Control
                    label="Blur"
                    max={2.6}
                    min={0.2}
                    step={0.05}
                    value={state.blur}
                    onChange={(value) => setState((current) => ({ ...current, blur: value }))}
                  />
                  <Control
                    label="Light"
                    max={1.4}
                    min={0.8}
                    step={0.02}
                    value={state.brightness}
                    onChange={(value) => setState((current) => ({ ...current, brightness: value }))}
                  />
                  <Control
                    label="Saturate"
                    max={2.4}
                    min={0.8}
                    step={0.05}
                    value={state.saturation}
                    onChange={(value) => setState((current) => ({ ...current, saturation: value }))}
                  />
                  <Control
                    label="Specular"
                    max={3}
                    min={0}
                    step={0.1}
                    value={state.specularBlur}
                    onChange={(value) => setState((current) => ({ ...current, specularBlur: value }))}
                  />
                </div>
                <div className={styles.toggleStack}>
                  <Toggle
                    checked={state.responsiveIntensity}
                    label="Responsive intensity"
                    onChange={(checked) => setState((current) => ({ ...current, responsiveIntensity: checked }))}
                  />
                  <Toggle
                    checked={state.animate}
                    label="Animation"
                    onChange={(checked) => setState((current) => ({ ...current, animate: checked }))}
                  />
                </div>
              </section>
            </aside>
          </section>
        ) : null}

        {tab === "docs" ? (
          <section className={styles.docsGrid} id="docs">
            <article className={styles.docCard}>
              <h2>What stays</h2>
              <ul>
                <li>La version original sigue viviendo en `liquid-glass-kit/`.</li>
                <li>La v2 sigue separada en `src/features/liquid-glass/kit-v2/`.</li>
                <li>El lab ahora intenta mostrar el efecto, no competirle visualmente.</li>
              </ul>
            </article>

            <article className={styles.docCard}>
              <h2>What improves</h2>
              <ul>
                <li>Menos wrappers, menos blur en contenedores grandes y drag mas directo.</li>
                <li>Canvas centrado con superposicion controlada.</li>
                <li>Fondo Apple como modo visual, no como caja pesada arriba del efecto.</li>
              </ul>
            </article>

            <article className={`${styles.docCard} ${styles.docCardWide}`}>
              <div className={styles.sectionHead}>
                <Code2 size={16} />
                <h2>Quick copy</h2>
              </div>
              <pre>{codeSample}</pre>
            </article>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function renderLayerArtifact(
  layerId: LayerId,
  artifact: ArtifactKind,
  sharedProps: {
    animation: { duration: number; disabled?: undefined } | { disabled: boolean; duration?: undefined };
    blur: number;
    brightness: number;
    displacement: number;
    height: number;
    radius: number;
    responsiveIntensity: boolean;
    saturation: number;
    specularBlur: number;
    width: number;
  },
) {
  const isLegacy = layerId === "legacy";
  const ButtonComponent = isLegacy ? LegacyLiquidGlassButton : LiquidGlassButton;
  const SurfaceComponent = isLegacy ? LegacyLiquidGlass : LiquidGlass;
  const toolbarWidth = Math.max(sharedProps.width + 90, 320);
  const surfaceHeight = artifact === "capsule" ? 110 : artifact === "toolbar" ? 94 : 126;

  if (artifact === "toolbar") {
    return (
      <SurfaceComponent
        {...sharedProps}
        as="div"
        className={styles.playgroundArtifact}
        contentClassName={styles.playgroundContent}
        height={surfaceHeight}
        radius={Math.max(sharedProps.radius, 22)}
        width={toolbarWidth}
      >
        <div className={styles.toolbarCard}>
          <span>{isLegacy ? "legacy toolbar" : "v2 toolbar"}</span>
          <strong>Overlay controls</strong>
          <div className={styles.toolbarActions}>
            <button type="button">Edit</button>
            <button type="button">Layer</button>
            <button type="button">Save</button>
          </div>
        </div>
      </SurfaceComponent>
    );
  }

  if (artifact === "capsule") {
    return (
      <SurfaceComponent
        {...sharedProps}
        as="div"
        className={styles.playgroundArtifact}
        contentClassName={styles.playgroundContent}
        height={surfaceHeight}
        radius={Math.max(sharedProps.radius, 28)}
        width={Math.max(sharedProps.width + 50, 280)}
      >
        <div className={styles.capsuleCard}>
          <strong>{isLegacy ? "Original capsule" : "V2 capsule"}</strong>
          <p>{isLegacy ? "Referencia viva" : "Refactor reusable"}</p>
        </div>
      </SurfaceComponent>
    );
  }

  return (
    <ButtonComponent
      {...sharedProps}
      className={styles.playgroundArtifact}
      contentClassName={styles.playgroundContent}
    >
      {isLegacy ? "Original button" : "V2 button"}
    </ButtonComponent>
  );
}

function Control({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    <label className={styles.control}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <input max={max} min={min} onChange={(event) => onChange(Number(event.target.value))} step={step} type="range" value={value} />
    </label>
  );
}

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.toggle}>
      <span>{label}</span>
      <button
        aria-pressed={checked}
        className={checked ? styles.toggleActive : styles.toggleButton}
        onClick={() => onChange(!checked)}
        type="button"
      >
        <i />
      </button>
    </label>
  );
}
