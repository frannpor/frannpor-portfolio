"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motionAllowed } from "@/features/home/motion/motion";
import styles from "./portrait-playground.module.css";

type PortraitCopy = {
  label: string;
  hint: string;
  keyboard: string;
};

type Mark = { id: number; x: number; y: number };

const MARK_MS = 1600;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/*
 * The portrait sits inside a compass. Dragging turns the portrait in 3D; a tap
 * points the needle at that spot and leaves a small waypoint that fades.
 */
export function PortraitPlayground({ copy }: { copy: PortraitCopy }) {
  const helpId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const plane = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const pose = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const drag = useRef<{ id: number; x: number; y: number; width: number; height: number; moved: boolean } | null>(null);
  const tapPoint = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const animated = useRef(false);
  const sequence = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const [heading, setHeading] = useState(0);
  const [marks, setMarks] = useState<Mark[]>([]);

  useEffect(() => {
    animated.current = motionAllowed();
    const activeTimers = timers.current;
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      activeTimers.forEach(clearTimeout);
    };
  }, []);

  // Pointer movement only updates refs; one short spring loop moves the layer.
  function tilt(x: number, y: number) {
    if (!animated.current) return;
    pose.current.targetX = clamp(x, -26, 26);
    pose.current.targetY = clamp(y, -34, 34);
    if (frame.current !== null) return;
    let previous = 0;
    const step = (time: number) => {
      const p = pose.current;
      const dt = previous ? clamp((time - previous) / 16.67, 0.25, 2) : 1;
      previous = time;
      p.vx = (p.vx + (p.targetX - p.x) * 0.1 * dt) * Math.pow(0.72, dt);
      p.vy = (p.vy + (p.targetY - p.y) * 0.1 * dt) * Math.pow(0.72, dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (plane.current) plane.current.style.transform = `rotateX(${p.x}deg) rotateY(${p.y}deg)`;
      if (Math.abs(p.targetX - p.x) + Math.abs(p.targetY - p.y) + Math.abs(p.vx) + Math.abs(p.vy) > 0.05) frame.current = requestAnimationFrame(step);
      else frame.current = null;
    };
    frame.current = requestAnimationFrame(step);
  }

  // Turn the needle the short way round.
  function pointTo(angle: number) {
    setHeading(current => current + ((((angle - current) % 360) + 540) % 360) - 180);
  }

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, width: rect.width, height: rect.height, moved: false };
    tapPoint.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (Math.hypot(dx, dy) > 7) current.moved = true;
    if (current.moved) tilt(-dy / current.height * 90, dx / current.width * 105);
  }

  function finish(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    if (drag.current?.id !== event.pointerId) return;
    suppressClick.current = cancelled || drag.current.moved;
    drag.current = null;
    tilt(0, 0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function tap() {
    const point = tapPoint.current;
    tapPoint.current = null;
    if (suppressClick.current) { suppressClick.current = false; return; }
    const rect = button.current?.getBoundingClientRect();
    if (!rect) return;
    if (!point) pointTo(heading + 90);
    const x = point?.x ?? rect.width / 2;
    const y = point?.y ?? rect.height / 2;
    if (point) pointTo(Math.atan2(x - rect.width / 2, rect.height / 2 - y) * 180 / Math.PI);
    const mark = { id: ++sequence.current, x: x / rect.width * 100, y: y / rect.height * 100 };
    setMarks(previous => [...previous.slice(-2), mark]);
    const timer = setTimeout(() => {
      setMarks(previous => previous.filter(item => item.id !== mark.id));
      timers.current.delete(timer);
    }, MARK_MS);
    timers.current.add(timer);
  }

  return <div className={styles.playground} style={{ "--mark-duration": `${MARK_MS}ms` } as CSSProperties}>
    <div className={styles.compass}>
      <svg className={styles.ring} viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="97" stroke="currentColor" />
        <circle cx="100" cy="100" r="88" stroke="currentColor" strokeDasharray="1 5" />
        <path d="M100 0v9M100 191v9M0 100h9M191 100h9" stroke="currentColor" />
        <text x="100" y="22" fill="currentColor" fontSize="8" textAnchor="middle">N</text>
      </svg>
      <span className={styles.needle} style={{ "--heading": `${heading}deg` } as CSSProperties} aria-hidden="true"><i /></span>
      <button ref={button} className={styles.control} type="button" aria-label={copy.label} aria-describedby={helpId}
        onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)}
        onLostPointerCapture={() => { drag.current = null; tilt(0, 0); }}
        onClick={tap}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") { tapPoint.current = null; suppressClick.current = false; }
          if (event.key.startsWith("Arrow")) {
            event.preventDefault();
            tilt(pose.current.targetX + (event.key === "ArrowUp" ? 12 : event.key === "ArrowDown" ? -12 : 0), pose.current.targetY + (event.key === "ArrowLeft" ? -12 : event.key === "ArrowRight" ? 12 : 0));
          }
          if (event.key === "Escape") { tilt(0, 0); pointTo(0); }
        }} onBlur={() => tilt(0, 0)}>
        <span className={styles.plane} ref={plane} aria-hidden="true">
          <span className={styles.floatLayer}>
            <span className={styles.glow} />
            <Image src="/brand/franpor-electric.webp" alt="" width={1000} height={1000} sizes="(max-width: 980px) 320px, 460px" className={styles.portrait} priority draggable={false} />
          </span>
        </span>
      </button>
      <div className={styles.marks} aria-hidden="true">
        {marks.map(mark => <span key={mark.id} className={styles.mark} style={{ left: `${mark.x}%`, top: `${mark.y}%` }}><svg viewBox="-40 -40 80 80"><circle className={styles.wave} r="20" /><path className={styles.cross} d="M-8-8 8 8M8-8-8 8" /><path className={styles.ticks} d="M0-29v5M29 0h-5M0 29v-5M-29 0h5" /></svg></span>)}
      </div>
    </div>
    <p id={helpId} className={styles.hint}>{copy.hint}<span className={styles.srOnly}> {copy.keyboard}</span></p>
  </div>;
}
