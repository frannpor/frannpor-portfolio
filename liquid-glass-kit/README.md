# LiquidGlass Kit

Carpeta portable para copiar y pegar el efecto LiquidGlass en otro proyecto React.

## Archivos

```txt
LiquidGlass.tsx
LiquidGlass.module.css
liquid-glass-original-maps.ts
index.ts
```

## Instalacion En El Proyecto Destino

Copiá esta carpeta, por ejemplo a:

```txt
src/components/liquid-glass
```

Instalá la dependencia de animación:

```bash
npm install gsap
```

Importá:

```tsx
import { LiquidGlass, LiquidGlassButton, LiquidGlassSurface } from "@/components/liquid-glass";
```

## Uso

```tsx
<LiquidGlassButton>
  Contact me
</LiquidGlassButton>
```

```tsx
<LiquidGlass as="div" width="min(100%, 680px)" height={140} radius={32}>
  Any content
</LiquidGlass>
```

```tsx
<LiquidGlass
  as="div"
  width="clamp(180px, 38vw, 420px)"
  height="clamp(72px, 12vw, 132px)"
  radius="clamp(22px, 4vw, 42px)"
  displacement={55}
  blur={1}
  saturation={1.5}
/>
```

## Notas

- `width`, `height` y `radius` aceptan numeros en px o strings CSS.
- `saturation` es multiplicador SVG: `1.5`, no `150`.
- `responsiveIntensity` viene activo por defecto.
- En Next/App Router el componente ya trae `"use client"`.
