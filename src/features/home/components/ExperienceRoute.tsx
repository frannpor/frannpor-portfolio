"use client";

import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import type { Experience, InterfaceCopy } from "@/features/home/data/portfolio";
import styles from "./experience-route.module.css";

type Props = {
  items: Experience[];
  copy: InterfaceCopy["experience"];
};

const WIDE = "(min-width: 900px)";
const subscribeWide = (listener: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};
const isWide = () => window.matchMedia(WIDE).matches;
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

function Details({ item, copy }: { item: Experience; copy: Props["copy"] }) {
  return <>
    <p className={styles.context}>{item.context}</p>
    <h4 className={styles.contribution}>{copy.contribution}</h4>
    <ul className={styles.highlights}>{item.highlights.map((line, index) => <li key={line} style={stagger(index)}>{line}</li>)}</ul>
    <ul className={styles.chips}>{item.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>
  </>;
}

/**
 * Experience as a route from 2023 to today. Wide screens get a horizontal line
 * of stops with a detail panel; narrow screens a vertical route that opens each
 * stop in place. The current job is the last stop and starts selected.
 */
export function ExperienceRoute({ items, copy }: Props) {
  const id = useId();
  const stops = [...items].reverse();
  const current = stops.length - 1;
  const [selected, setSelected] = useState(current);
  const wide = useSyncExternalStore(subscribeWide, isWide, () => true);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const chosen = stops[selected] ?? stops[current];

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? Math.min(index + 1, current)
      : event.key === "ArrowLeft" ? Math.max(index - 1, 0)
      : event.key === "Home" ? 0
      : event.key === "End" ? current : -1;
    if (next < 0) return;
    event.preventDefault();
    tabs.current[next]?.focus();
    setSelected(next);
  }

  if (!wide) {
    return <ol className={styles.vertical} data-route>
      {stops.map((item, index) => {
        const open = index === selected;
        return <li key={`${item.company}-${item.role}`} data-now={index === current} data-open={open}>
          <button type="button" className={styles.row} aria-expanded={open} aria-controls={`${id}-stop-${index}`} onClick={() => setSelected(open ? -1 : index)}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.when}>{item.period}{index === current && <b>{copy.now}</b>}</span>
            <span className={styles.company}>{item.company}</span>
            <span className={styles.role}>{item.role}</span>
            <span className={styles.toggle} aria-hidden="true" />
          </button>
          <div id={`${id}-stop-${index}`} className={styles.reveal} data-open={open} inert={!open}>
            <div><div className={styles.revealInner}><Details item={item} copy={copy} /></div></div>
          </div>
        </li>;
      })}
    </ol>;
  }

  return <div className={styles.horizontal} data-route>
    <div className={styles.track} role="tablist" aria-label={copy.stopsLabel} style={{ "--count": stops.length } as CSSProperties}>
      <span className={styles.line} aria-hidden="true"><span /></span>
      {stops.map((item, index) => <button key={`${item.company}-${item.role}`} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={index === selected} tabIndex={index === selected ? 0 : -1} data-now={index === current} className={styles.stop} onClick={() => setSelected(index)} onKeyDown={event => onKey(event, index)}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.when}>{item.period}{index === current && <b>{copy.now}</b>}</span>
        <span className={styles.company}>{item.company}</span>
      </button>)}
    </div>
    <div key={selected} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} className={styles.panel} data-now={selected === current}>
      <div className={styles.panelHead}>
        <p className={styles.role}>{chosen.role}</p>
        <h3>{chosen.company}</h3>
        <p className={styles.when}>{chosen.period}</p>
      </div>
      <div className={styles.panelBody}><Details item={chosen} copy={copy} /></div>
    </div>
  </div>;
}
