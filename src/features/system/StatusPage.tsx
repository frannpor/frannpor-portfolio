import Link from "next/link";
import { ArrowLeft, Home, RotateCcw, TerminalSquare } from "lucide-react";
import styles from "./status.module.css";

type StatusPageProps = {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onReset?: () => void;
};

export function StatusPage({
  code,
  eyebrow,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onReset,
}: StatusPageProps) {
  return (
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby="status-title">
        <div className={styles.copy}>
          <p className={styles.kicker}>{eyebrow}</p>
          <h1 id="status-title">{title}</h1>
          <p>{description}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/">
              <Home size={17} />
              {primaryLabel}
            </Link>
            {onReset ? (
              <button className={styles.secondaryAction} onClick={onReset} type="button">
                <RotateCcw size={17} />
                {secondaryLabel ?? "Reintentar"}
              </button>
            ) : (
              <Link className={styles.secondaryAction} href="/#contact">
                <ArrowLeft size={17} />
                {secondaryLabel ?? "Contacto"}
              </Link>
            )}
          </div>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.windowBar}>
            <span />
            <span />
            <span />
            <strong>route-check.ts</strong>
          </div>
          <div className={styles.codeBlock}>
            <span>{code}</span>
            <p>
              <TerminalSquare size={15} />
              response.status
            </p>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.statusGrid}>
            <span>home</span>
            <span>contact</span>
            <span>legal</span>
          </div>
        </div>
      </section>
    </main>
  );
}
