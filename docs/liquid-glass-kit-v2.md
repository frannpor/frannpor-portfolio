# LiquidGlass Kit v2

Objetivo: mantener el efecto conseguido, pero dejarlo en una forma mas clara, reusable y facil de compartir.

## Que cambia respecto a la version original

- Se preserva la version original en `liquid-glass-kit/`.
- La v2 vive en `src/features/liquid-glass/kit-v2/`.
- El `filterId` se separa del `id` del host para evitar colisiones en el DOM.
- La capa de contenido vuelve a aceptar interacciones internas.
- La animacion deja de depender de GSAP en la v2.
- La logica se divide en helpers y hooks chicos.

## Estructura

```txt
src/features/liquid-glass/kit-v2/
  LiquidGlass.tsx
  LiquidGlass.module.css
  constants.ts
  helpers.ts
  maps.ts
  types.ts
  useElementBox.ts
  useInteractiveFilterMotion.ts
  index.ts
```

## Compartirlo bien

Si se extrae la v2 a otro proyecto, conviene llevar:

1. `LiquidGlass.tsx`
2. `LiquidGlass.module.css`
3. `constants.ts`
4. `helpers.ts`
5. `types.ts`
6. `useElementBox.ts`
7. `useInteractiveFilterMotion.ts`
8. `maps.ts` con sus data URIs o el archivo de mapas equivalente

## Notas de uso

- `width`, `height` y `radius` aceptan numero en px o string CSS.
- `responsiveIntensity` sigue activo por defecto.
- El efecto usa `backdrop-filter` + filtros SVG.
- Hay fallback visual cuando `backdrop-filter` no existe.
- La capa interna ya no bloquea `pointer-events`, asi que se pueden meter links o controles dentro de una surface.
