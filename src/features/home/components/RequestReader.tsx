"use client";

import { useCallback, useEffect, useLayoutEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import type { InterfaceCopy, ReaderMark } from "@/features/home/data/portfolio";
import { motionAllowed } from "@/features/home/motion/motion";
import styles from "./request-reader.module.css";

type ReaderCopy = InterfaceCopy["reader"];

// Reading steps: 0 actors, 1 states, 2 rules, 3 question; DONE is the resting state.
const DONE = 4;
const STEP_MS = 1150;
const LIT: ReaderMark[][] = [["actor"], ["actor", "state"], ["actor", "state", "rule"], ["actor", "state", "rule"]];
const subscribeNever = () => () => {};
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/** Reads an example request into actors, states, rules and the question nobody asked. */
export function RequestReader({ copy }: { copy: ReaderCopy }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const terms = useRef<Array<HTMLButtonElement | null>>([]);
  const tooltip = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [position, setPosition] = useState({ left: 16, top: 16, "--tip-x": "50%", "--tip-direction": "1", "--tip-origin": "bottom" } as CSSProperties);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(DONE);
  const [note, setNote] = useState<{ index: number; pinned: boolean; closing?: boolean } | null>(null);
  const [why, setWhy] = useState<"closed" | "hover" | "pinned">("closed");
  const whyOpen = why !== "closed";
  const animates = useSyncExternalStore(subscribeNever, motionAllowed, () => false);
  const item = copy.cases[active] ?? copy.cases[0];
  const blockLabels = [copy.blocks.actors, copy.blocks.states, copy.blocks.rules, copy.blocks.question];

  function read() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!motionAllowed()) { setStep(DONE); return; }
    setStep(-1);
    for (let s = 0; s <= DONE; s++) timers.current.push(setTimeout(() => setStep(s), 350 + s * STEP_MS));
  }

  function choose(index: number) {
    if (index !== active) { setNote(null); setWhy("closed"); }
    setActive(index);
    read();
  }

  // Read the first example once, when the reader comes into view.
  useEffect(() => {
    const element = root.current;
    if (!element || !motionAllowed()) return;
    const pending = timers.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setStep(-1);
      for (let s = 0; s <= DONE; s++) pending.push(setTimeout(() => setStep(s), 350 + s * STEP_MS));
    }, { rootMargin: "0px 0px -30% 0px" });
    observer.observe(element);
    return () => { observer.disconnect(); pending.forEach(clearTimeout); };
  }, []);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const total = copy.cases.length;
    const next = event.key === "ArrowRight" ? (index + 1) % total
      : event.key === "ArrowLeft" ? (index - 1 + total) % total
      : event.key === "Home" ? 0
      : event.key === "End" ? total - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    tabs.current[next]?.focus();
    choose(next);
  }

  const lit = step < 0 ? [] : step >= DONE ? LIT[3] : LIT[step];
  const blockState = (block: number) => step >= DONE || step > block ? "done" : step === block ? "current" : "next";
  const noteId = (index: number) => `${id}-note-${active}-${index}`;
  const dismiss = useCallback(() => {
    clearTimeout(closeTimer.current);
    setNote(current => current ? { ...current, closing: true } : null);
    const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--t-close"));
    closeTimer.current = setTimeout(() => setNote(null), duration || 0);
  }, []);
  const keep = () => clearTimeout(hideTimer.current);
  const show = (index: number) => { keep(); clearTimeout(closeTimer.current); setNote(current => current?.pinned ? current : { index, pinned: false }); };
  const hide = () => { keep(); hideTimer.current = setTimeout(() => { if (!note?.pinned) dismiss(); }, 120); };

  useLayoutEffect(() => {
    if (!note) return;
    const trigger = terms.current[note.index];
    const bubble = tooltip.current;
    if (!trigger || !bubble) return;
    const r = trigger.getBoundingClientRect();
    const height = bubble.offsetHeight;
    const anchorX = pointer.current?.x ?? r.left + r.width / 2;
    const above = r.top - height - 16 >= 12;
    const left = Math.max(12, Math.min(anchorX - bubble.offsetWidth / 2, window.innerWidth - bubble.offsetWidth - 12));
    const top = above ? r.top - height - 16 : Math.min(r.bottom + 16, window.innerHeight - height - 12);
    setPosition({ left, top, "--tip-x": `${Math.max(20, Math.min(bubble.offsetWidth - 20, anchorX - left))}px`, "--tip-direction": above ? "1" : "-1", "--tip-origin": above ? "bottom" : "top" } as CSSProperties);
  }, [note, active]);

  useEffect(() => {
    if (!note) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !tooltip.current?.contains(event.target) && !terms.current.some(term => term?.contains(event.target as Node))) dismiss();
    };
    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("resize", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("scroll", dismiss); window.removeEventListener("resize", dismiss); document.removeEventListener("pointerdown", outside); };
  }, [note, dismiss]);
  useEffect(() => () => { clearTimeout(hideTimer.current); clearTimeout(closeTimer.current); }, []);

  return <div ref={root} className={styles.reader} onKeyDown={event => { if (event.key === "Escape") { dismiss(); setWhy("closed"); } }}>
    <div className={styles.top}>
      <h3 className={styles.title}>{copy.title}</h3>
      <div className={styles.tabs} role="tablist" aria-label={copy.tabsLabel}>
        {copy.cases.map((entry, index) => <button key={entry.tab} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => onTabKey(event, index)}>{entry.tab}</button>)}
      </div>
    </div>
    <div key={active} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className={styles.panel}>
      <p className={styles.ask}>{item.ask.map((part, index) => part.mark
        ? <button key={index} ref={node => { terms.current[index] = node; }} type="button" className={styles.term} data-kind={part.mark} data-lit={lit.includes(part.mark)} data-open={note?.index === index}
            aria-describedby={part.note && note?.index === index ? noteId(index) : undefined} aria-expanded={part.note ? note?.index === index : undefined}
            onMouseEnter={event => { pointer.current = { x: event.clientX, y: event.clientY }; show(index); }} onMouseLeave={hide} onFocus={() => { pointer.current = null; show(index); }} onBlur={hide}
            onClick={() => { clearTimeout(closeTimer.current); if (note?.index === index && note.pinned) dismiss(); else setNote({ index, pinned: true }); }}>{part.text}</button>
        : <span key={index}>{part.text}</span>)}</p>
      {note && item.ask[note.index]?.note && createPortal(<div ref={tooltip} role="tooltip" data-closing={note.closing ?? false} id={noteId(note.index)} className={styles.tooltip} data-kind={item.ask[note.index].mark} style={position} onMouseEnter={keep} onMouseLeave={hide}>
        <span className={styles.noteTerm}>{item.ask[note.index].text}</span>{item.ask[note.index].note}
      </div>, document.body)}
      <div className={styles.out}>
        <div className={styles.block} data-state={blockState(0)}><h4>{blockLabels[0]}</h4><ul className={styles.actors}>{item.actors.map((actor, i) => <li key={actor} style={stagger(i)}>{actor}</li>)}</ul></div>
        <div className={styles.block} data-state={blockState(1)}><h4>{blockLabels[1]}</h4><ol className={styles.states}>{item.states.map((state, i) => <li key={state} style={stagger(i)}><i aria-hidden="true" /><span>{state}</span></li>)}</ol></div>
        <div className={styles.block} data-state={blockState(2)}><h4>{blockLabels[2]}</h4><ul className={styles.rules}>{item.rules.map((rule, i) => <li key={rule} style={stagger(i)}>{rule}</li>)}</ul></div>
        <div className={`${styles.block} ${styles.question}`} data-state={blockState(3)} onMouseEnter={() => setWhy(w => w === "pinned" ? w : "hover")} onMouseLeave={() => setWhy(w => w === "pinned" ? w : "closed")}>
          <h4>{blockLabels[3]}</h4>
          <p>{item.question}</p>
          <button type="button" className={styles.why} aria-expanded={whyOpen} aria-controls={`${id}-why`} onFocus={() => setWhy(w => w === "pinned" ? w : "hover")} onBlur={() => setWhy(w => w === "pinned" ? w : "closed")} onClick={() => setWhy(w => w === "pinned" ? "closed" : "pinned")}>{copy.why}<span aria-hidden="true" /></button>
          <div id={`${id}-why`} className={styles.whyBody} data-open={whyOpen} inert={!whyOpen}><div><p>{item.questionNote}</p></div></div>
        </div>
      </div>
    </div>
    <p className={styles.srOnly} aria-live="polite">{step >= 0 && step < DONE ? blockLabels[step] : ""}</p>
    {animates && <div className={styles.footnote}><button type="button" onClick={read}>{copy.replay}</button></div>}
  </div>;
}
