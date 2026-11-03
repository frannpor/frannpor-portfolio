"use client";

import { useEffect, useState } from "react";

export function useElementBox(ref: React.RefObject<HTMLElement | null>, fallbackWidth: number, fallbackHeight: number) {
  const [box, setBox] = useState({ height: fallbackHeight, width: fallbackWidth });

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

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
