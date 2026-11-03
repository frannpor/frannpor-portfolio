"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import type { InterfaceCopy, ReaderMark } from "@/features/home/data/portfolio";
import { motionAllowed } from "@/features/home/motion/motion";
import styles from "./request-reader.module.css";

type ReaderCopy = InterfaceCopy["reader"];

// Which highlights are lit at each reading step: actors, then states, then rules.
const LIT: ReaderMark[][] = [["actor"], ["actor", "state"], ["actor", "state", "rule"], ["actor", "state", "rule"]];
const LAST_STEP = 3;
const subscribeNever = () => () => {};

/** Reads an example request and pulls out actors, states, rules and the missing question. */
export function RequestReader({ copy }: { copy: ReaderCopy }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const seen = useRef(false);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(LAST_STEP);
  const item = copy.cases[active] ?? copy.cases[0];
  const animates = useSyncExternalStore(subscribeNever, motionAllowed, () => false);

  function play(index: number) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActive(index);
    if (!motionAllowed()) { setStep(LAST_STEP); return; }
    setStep(-1);
    for (let s = 0; s <= LAST_STEP; s++) timers.current.push(setTimeout(() => setStep(s), 300 + s * 900));
  }

  // Read the first example once, when the reader comes into view.
  useEffect(() => {
    const element = root.current;
    if (!element || !motionAllowed()) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !seen.current) { seen.current = true; play(0); observer.disconnect(); }
    }, { rootMargin: "0px 0px -30% 0px" });
    observer.observe(element);
    const pending = timers.current;
    return () => { observer.disconnect(); pending.forEach(clearTimeout); };
  }, []);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const total = copy.cases.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % total;
    if (event.key === "ArrowLeft") next = (index - 1 + total) % total;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = total - 1;
    if (next < 0) return;
    event.preventDefault();
    tabs.current[next]?.focus();
    play(next);
  }

  const lit = step >= 0 ? LIT[step] : [];
  const on = (block: number) => step >= block;

  return <div ref={root} className={styles.reader}>
    <div className={styles.top}>
      <h3 className={styles.title}>{copy.title}</h3>
      <div className={styles.tabs} role="tablist" aria-label={copy.tabsLabel}>
        {copy.cases.map((entry, index) => <button key={entry.tab} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => play(index)} onKeyDown={event => onTabKey(event, index)}>{entry.tab}</button>)}
      </div>
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className={styles.panel}>
      <p className={styles.ask}>{item.ask.map((part, index) => part.mark
        ? <mark key={index} data-kind={part.mark} data-lit={lit.includes(part.mark)}>{part.text}</mark>
        : <span key={index}>{part.text}</span>)}</p>
      <div className={styles.out}>
        <div className={styles.block} data-on={on(0)}><h4>{copy.blocks.actors}</h4><ul className={styles.actors}>{item.actors.map(actor => <li key={actor}>{actor}</li>)}</ul></div>
        <div className={styles.block} data-on={on(1)}><h4>{copy.blocks.states}</h4><ol className={styles.states}>{item.states.map(state => <li key={state}><i aria-hidden="true" /><span>{state}</span></li>)}</ol></div>
        <div className={styles.block} data-on={on(2)}><h4>{copy.blocks.rules}</h4><ul className={styles.rules}>{item.rules.map(rule => <li key={rule}>{rule}</li>)}</ul></div>
        <div className={`${styles.block} ${styles.question}`} data-on={on(3)}><h4>{copy.blocks.question}</h4><p>{item.question}</p></div>
      </div>
    </div>
    <p className={styles.note}>{copy.note}{animates && <> <button type="button" onClick={() => play(active)}>{copy.replay}</button></>}</p>
  </div>;
}
