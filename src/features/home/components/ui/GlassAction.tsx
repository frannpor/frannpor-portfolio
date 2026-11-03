"use client";

import type { ReactNode } from "react";
import { Glass } from "./Glass";
import styles from "./glass.module.css";

/** A pill action in liquid glass with the studio's hover: it swells, refracts deeper and settles on press. */
export function GlassAction({ children }: { children: ReactNode }) {
  return <Glass
    radius={25}
    className={styles.action}
    contentClassName={styles.actionContent}
    animation={{ hoverScale: 1.05, activeScale: 0.95, hoverDisplacement: 64, hoverBlur: 1.1, duration: 0.3 }}
  >
    {children}
  </Glass>;
}
