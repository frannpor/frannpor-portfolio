"use client";

import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import styles from "./portrait-playground.module.css";

const words = {
  es: ["¿Y si probamos?", "Un detalle más", "Dale play", "Modo curioso", "Pixel por pixel", "Hecho con cariño", "Ideas en movimiento", "Por acá va", "A jugar", "Un toque distinto", "Me gusta esa idea", "Esto pide un giro", "Probemos otra vuelta", "Menos clics, mejor", "Que se sienta bien", "Un poquito de magia", "Siempre hay otra forma", "Tengo una idea", "Ese detalle importa", "Del boceto al click", "¿Lo hacemos juntos?", "Ahora sí", "Hay algo por acá", "Más simple, más lindo", "Un pixel rebelde", "Seguimos creando", "Esto recién empieza", "Pensado para usar", "Una vuelta más", "Que dé gusto tocar", "Mi lado eléctrico", "Se mueve la idea", "Un click de cariño", "Hagamos lugar", "Curiosidad encendida", "Gracias por pasar"],
  en: ["What if we try?", "One more detail", "Press play", "Stay curious", "Pixel by pixel", "Made with care", "Ideas in motion", "This way", "Let's play", "A little twist", "I like that idea", "Give it a spin", "Try another angle", "Fewer clicks, better", "Make it feel right", "A little bit of magic", "There's another way", "I've got an idea", "That detail matters", "From sketch to click", "Shall we build it?", "There we go", "Something over here", "Simple feels good", "A rebellious pixel", "Keep creating", "Just getting started", "Made to be used", "One more turn", "Good to the touch", "My electric side", "An idea takes shape", "A little care", "Make some room", "Curiosity switched on", "Thanks for stopping by"],
};
type Burst = { id: number; x: number; y: number; text: string; dx: number; dy: number; turn: number };
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function PortraitPlayground({ locale }: { locale: "es" | "en" }) {
  const es = locale === "es";
  const helpId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const plane = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const pose = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const drag = useRef<{ id: number; x: number; y: number; width: number; height: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const origin = useRef<{ x: number; y: number } | null>(null);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const sequence = useRef(0);
  const lastWord = useRef(-1);
  const deck = useRef<number[]>([]);
  const reduced = useRef(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduced.current = preference.matches;
      if (preference.matches) {
        if (frame.current !== null) cancelAnimationFrame(frame.current);
        frame.current = null;
        pose.current = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 };
        if (plane.current) plane.current.style.transform = "none";
      }
    };
    update();
    preference.addEventListener("change", update);
    let onScreen = true;
    const updateVisibility = () => {
      if (button.current) button.current.dataset.moving = String(onScreen && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; updateVisibility(); });
    if (button.current) observer.observe(button.current);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const activeTimers = timers.current;
    return () => {
      preference.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      activeTimers.forEach(clearTimeout);
    };
  }, []);

  // Pointer movement only updates refs. One short-lived animation loop moves the layer.
  function tilt(x: number, y: number) {
    if (reduced.current) return;
    pose.current.targetX = clamp(x, -28, 28);
    pose.current.targetY = clamp(y, -38, 38);
    if (frame.current !== null) return;
    let previousTime = 0;
    const step = (time: number) => {
      const p = pose.current;
      const dt = previousTime ? clamp((time - previousTime) / 16.67, .25, 2) : 1;
      previousTime = time;
      p.vx = (p.vx + (p.targetX - p.x) * .1 * dt) * Math.pow(.72, dt);
      p.vy = (p.vy + (p.targetY - p.y) * .1 * dt) * Math.pow(.72, dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (plane.current) plane.current.style.transform = `rotateX(${p.x}deg) rotateY(${p.y}deg)`;
      if (Math.abs(p.targetX - p.x) + Math.abs(p.targetY - p.y) + Math.abs(p.vx) + Math.abs(p.vy) > .05) frame.current = requestAnimationFrame(step);
      else frame.current = null;
    };
    frame.current = requestAnimationFrame(step);
  }

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, width: rect.width, height: rect.height, moved: false };
    origin.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (Math.hypot(dx, dy) > 7) current.moved = true;
    if (current.moved) tilt(-dy / current.height * 95, dx / current.width * 110);
  }

  function finish(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    if (drag.current?.id !== event.pointerId) return;
    suppressClick.current = cancelled || drag.current.moved;
    drag.current = null;
    tilt(0, 0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function pop(keyboard = false) {
    const pointerOrigin = origin.current;
    origin.current = null;
    if (suppressClick.current && !keyboard) { suppressClick.current = false; return; }
    const rect = button.current?.getBoundingClientRect();
    if (!rect) return;
    const point = !keyboard && pointerOrigin ? pointerOrigin : { x: rect.width * .5, y: rect.height * .45 };
    if (deck.current.length === 0) {
      deck.current = words[locale].map((_, index) => index);
      for (let i = deck.current.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck.current[i], deck.current[j]] = [deck.current[j], deck.current[i]];
      }
      if (deck.current[deck.current.length - 1] === lastWord.current) [deck.current[0], deck.current[deck.current.length - 1]] = [deck.current[deck.current.length - 1], deck.current[0]];
    }
    const index = deck.current.pop()!;
    lastWord.current = index;
    const x = clamp(point.x, 16, rect.width - 16);
    const y = clamp(point.y, 16, rect.height - 16);
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const measure = document.createElement("canvas").getContext("2d");
    if (measure) measure.font = `600 ${mobile ? 11 : 12}px ${getComputedStyle(button.current!).fontFamily}`;
    const halfWidth = Math.min(((measure?.measureText(words[locale][index]).width ?? 170) + (mobile ? 24 : 28)) / 2 + 8, rect.width / 2 - 8);
    const landing = clamp(x + (Math.random() - .5) * 100, halfWidth + 8, rect.width - halfWidth - 8);
    const destinationY = clamp(y < 90 ? y + 55 + Math.random() * 30 : y - 45 - Math.random() * 35, 40, rect.height - 40);
    const burst = { id: ++sequence.current, x, y, text: words[locale][index], dx: landing - x, dy: destinationY - y, turn: (Math.random() - .5) * 14 };
    if (timers.current.size >= 5) {
      const oldest = timers.current.keys().next().value;
      if (oldest !== undefined) { clearTimeout(timers.current.get(oldest)); timers.current.delete(oldest); }
    }
    setBursts(previous => [...previous.slice(-4), burst]);
    setAnnouncement(burst.text);
    const timer = setTimeout(() => { setBursts(previous => previous.filter(item => item.id !== burst.id)); timers.current.delete(burst.id); }, 1900);
    timers.current.set(burst.id, timer);
  }

  return <div className={styles.playground}>
    <div className={styles.stage}>
      <button ref={button} className={styles.control} type="button" aria-label={es ? "Jugar con mi logo" : "Play with my logo"} aria-describedby={helpId}
        onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)}
        onLostPointerCapture={() => { drag.current = null; tilt(0, 0); }}
        onClick={() => pop(origin.current === null)}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") { origin.current = null; suppressClick.current = false; }
          if (event.key.startsWith("Arrow")) {
            event.preventDefault();
            tilt(pose.current.targetX + (event.key === "ArrowUp" ? 12 : event.key === "ArrowDown" ? -12 : 0), pose.current.targetY + (event.key === "ArrowLeft" ? -12 : event.key === "ArrowRight" ? 12 : 0));
          }
          if (event.key === "Escape") tilt(0, 0);
        }} onBlur={() => tilt(0, 0)}>
        <span className={styles.ground} aria-hidden="true" />
        <span className={styles.plane} ref={plane} aria-hidden="true">
          <span className={styles.floatLayer}>
          <span className={styles.orbit} /><span className={styles.innerOrbit} />
          <span className={styles.depth} />
          <Image src="/brand/franpor-electric.png" alt="" width={500} height={500} sizes="(max-width: 760px) 240px, 480px" className={styles.portrait} priority draggable={false} />
          <span className={styles.spark} /><span className={styles.sparkSmall} />
          </span>
        </span>
      </button>
      <div className={styles.effects} aria-hidden="true">{bursts.map(burst => <span key={burst.id} className={styles.burst} style={{ left: burst.x, top: burst.y, "--dx": `${burst.dx}px`, "--dy": `${burst.dy}px`, "--turn": `${burst.turn}deg` } as CSSProperties}>
        <span className={styles.ripple} />{burst.id === bursts[bursts.length - 1]?.id && <span className={styles.word}>{burst.text}</span>}
        <i className={styles.particle} /><i className={styles.particle} /><i className={styles.particle} />
      </span>)}</div>
    </div>
    <div className={styles.caption} aria-hidden="true"><span>{es ? "PERSONAS" : "PEOPLE"}</span><span>{es ? "PRODUCTO" : "PRODUCT"}</span><span>{es ? "IA CON RESPONSABILIDAD" : "RESPONSIBLE AI"}</span></div>
    <p id={helpId} className={styles.hint}><MoveUpRight size={14} aria-hidden="true" />{es ? "Tocá para descubrir. Arrastrá para girar." : "Tap to discover. Drag to turn."}<span className={styles.keyboardHelp}>{es ? " También podés usar Enter y las flechas. Escape vuelve al inicio." : " You can also use Enter and the arrow keys. Escape resets the rotation."}</span></p>
    <span className={styles.srOnly} role="status">{announcement}</span>
  </div>;
}
