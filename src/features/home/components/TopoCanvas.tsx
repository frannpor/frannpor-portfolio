"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "@/features/home/motion/motion";

// Edge pairs for each marching-squares case (0 top, 1 right, 2 bottom, 3 left).
const EDGES: Record<number, number[]> = {
  1: [0, 3], 2: [0, 1], 3: [1, 3], 4: [1, 2], 5: [0, 1, 2, 3], 6: [0, 2], 7: [2, 3],
  8: [2, 3], 9: [0, 2], 10: [0, 3, 1, 2], 11: [1, 2], 12: [1, 3], 13: [0, 1], 14: [0, 3],
};

/** Contour lines of a slowly shifting terrain, drawn behind the hero. */
export function TopoCanvas({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const c = context;
    const animate = motionAllowed();
    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;
    let last = 0;
    let visible = true;

    const field = (x: number, y: number) => {
      x /= 230;
      y /= 230;
      return Math.sin(x * 1.1 + time) * Math.cos(y * 0.9 - time * 0.6)
        + 0.55 * Math.sin((x + y) * 1.6 - time * 0.4)
        + 0.35 * Math.cos(x * 2.3 - y * 1.7 + time * 0.3)
        + 0.25 * Math.sin(y * 3.1 + x * 0.4);
    };

    function draw() {
      c.clearRect(0, 0, width, height);
      const step = width < 700 ? 18 : 14;
      const cols = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;
      const values = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) values[j * cols + i] = field(i * step, j * step);
      for (let level = -1.6, k = 0; level <= 1.6; level += 0.2, k++) {
        c.beginPath();
        c.strokeStyle = k % 5 === 0 ? "rgba(200,242,80,.28)" : "rgba(140,200,188,.15)";
        c.lineWidth = k % 5 === 0 ? 1.2 : 0.8;
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
          const a = values[j * cols + i], b = values[j * cols + i + 1];
          const d = values[(j + 1) * cols + i], e = values[(j + 1) * cols + i + 1];
          const index = Number(a > level) | (Number(b > level) << 1) | (Number(e > level) << 2) | (Number(d > level) << 3);
          const edges = EDGES[index];
          if (!edges) continue;
          const x = i * step, y = j * step;
          const points = edges.map(edge => {
            if (edge === 0) return [x + step * (level - a) / (b - a), y];
            if (edge === 1) return [x + step, y + step * (level - b) / (e - b)];
            if (edge === 2) return [x + step * (level - d) / (e - d), y + step];
            return [x, y + step * (level - a) / (d - a)];
          });
          for (let q = 0; q + 1 < points.length; q += 2) {
            c.moveTo(points[q][0], points[q][1]);
            c.lineTo(points[q + 1][0], points[q + 1][1]);
          }
        }
        c.stroke();
      }
    }

    function resize() {
      const ratio = Math.min(1.5, window.devicePixelRatio || 1);
      width = element!.clientWidth;
      height = element!.clientHeight;
      element!.width = Math.round(width * ratio);
      element!.height = Math.round(height * ratio);
      c.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 66) return;
      last = now;
      time += 0.006;
      draw();
    }

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(element);
    resize();
    let viewObserver: IntersectionObserver | undefined;
    if (animate) {
      viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      viewObserver.observe(element);
      frame = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver?.disconnect();
    };
  }, []);

  return <canvas ref={canvas} className={className} aria-hidden="true" />;
}
