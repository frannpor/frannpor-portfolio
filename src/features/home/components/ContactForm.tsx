"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type PointerEvent } from "react";
import { motionAllowed } from "@/features/home/motion/motion";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import styles from "./contact-form.module.css";

type FormCopy = PortfolioContent["contact"]["form"];
type Field = "name" | "email" | "company" | "message";
type Control = HTMLInputElement | HTMLTextAreaElement;
type Issue = Exclude<keyof FormCopy["validation"], "summary">;
type Errors = Partial<Record<Field, Issue>>;
type StatusMessage = "sending" | "genericError" | "dryRunSuccess" | "success" | "rateLimited" | null;
type FormState = { status: "idle" | "submitting" | "success" | "error"; message: StatusMessage };
const fields: Field[] = ["name", "email", "company", "message"];

function validate(field: Field, raw: string): Issue | undefined {
  const value = raw.trim();
  if (field === "name") {
    if (!value) return "nameRequired";
    if (value.length < 2) return "nameShort";
    if (value.length > 80) return "nameLong";
  }
  if (field === "email") {
    if (!value) return "emailRequired";
    if (value.length > 120) return "emailLong";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "emailInvalid";
  }
  if (field === "company" && value.length > 100) return "companyLong";
  if (field === "message") {
    if (!value) return "messageRequired";
    if (value.length < 20) return "messageShort";
    if (value.length > 1600) return "messageLong";
  }
}

const shake = [
  { transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(6px)" },
  { transform: "translateX(-4px)" }, { transform: "translateX(2px)" }, { transform: "translateX(0)" },
];

/** The send action narrates the whole request: lift on hover, ripple on press, flight while sending, a drawn tick or a shake. */
function SendButton({ status, nudge, copy }: { status: FormState["status"]; nudge: number; copy: FormCopy }) {
  const button = useRef<HTMLButtonElement>(null);
  const ripple = useRef<HTMLSpanElement>(null);
  const label = status === "submitting" ? copy.submitting : status === "success" ? copy.sent : status === "error" ? copy.retry : copy.submit;

  useEffect(() => {
    if ((nudge || status === "error") && motionAllowed()) button.current?.animate(shake, { duration: 420, easing: "ease-out" });
  }, [nudge, status]);

  function press(event: PointerEvent<HTMLButtonElement>) {
    const node = ripple.current;
    if (!node || !motionAllowed()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const size = Math.max(bounds.width, bounds.height) * 2.2;
    node.style.width = node.style.height = `${size}px`;
    node.style.left = `${event.clientX - bounds.left - size / 2}px`;
    node.style.top = `${event.clientY - bounds.top - size / 2}px`;
    node.animate([{ opacity: .32, transform: "scale(0)" }, { opacity: 0, transform: "scale(1)" }], { duration: 620, easing: "cubic-bezier(.2, .8, .2, 1)" });
  }

  return <button ref={button} type="submit" className={styles.send} data-state={status} disabled={status === "submitting"} onPointerDown={press}>
    <span ref={ripple} className={styles.sendRipple} aria-hidden="true" />
    <span className={styles.sendIcon} aria-hidden="true">
      <svg viewBox="0 0 24 24" className={styles.plane}><path d="M21.5 2.5 10.6 13.4" /><path d="m21.5 2.5-6.9 19-4-8.1-8.1-4z" /></svg>
      <svg viewBox="0 0 24 24" className={styles.spinner}><circle cx="12" cy="12" r="8.5" pathLength={1} /></svg>
      <svg viewBox="0 0 24 24" className={styles.tick}><path d="m4.5 12.8 4.6 4.6L19.5 7" pathLength={1} /></svg>
      <svg viewBox="0 0 24 24" className={styles.alert}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><path d="M12 16.6h.01" /></svg>
    </span>
    <span key={label} className={styles.sendLabel}>{label}</span>
  </button>;
}

export function ContactForm({ form: copy }: { form: FormCopy }) {
  const id = useId();
  const { copy: content } = usePortfolioContent();
  const ui = content.ui.contact;
  const [state, setState] = useState<FormState>({ status: "idle", message: null });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [nudge, setNudge] = useState(0);
  const message = state.message === "rateLimited" ? ui.rateLimited : state.message ? copy[state.message] : "";

  function updateError(field: Field, value: string) {
    const issue = validate(field, value);
    setErrors(current => {
      const next = { ...current };
      if (issue) next[field] = issue;
      else delete next[field];
      return next;
    });
  }

  function fieldProps(field: Field) {
    return {
      id: `${id}-${field}`,
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
      // Leaving an empty field is not a mistake yet: missing required fields are reported on send.
      onBlur: (event: FocusEvent<Control>) => {
        const value = event.currentTarget.value;
        if (!value.trim() && !attempted) return;
        setTouched(current => ({ ...current, [field]: true }));
        updateError(field, value);
      },
      onChange: (event: ChangeEvent<Control>) => {
        if (touched[field] || attempted) updateError(field, event.currentTarget.value);
        if (state.status !== "idle" && state.status !== "submitting") setState({ status: "idle", message: null });
      },
    };
  }

  function feedback(field: Field) {
    const issue = errors[field];
    return issue ? <span id={`${id}-${field}-error`} className={styles.fieldError} aria-live="polite">{copy.validation[issue]}</span> : null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "submitting") return;
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const nextErrors: Errors = {};
    for (const field of fields) {
      const issue = validate(field, String(data.get(field) ?? ""));
      if (issue) nextErrors[field] = issue;
    }
    setAttempted(true);
    setErrors(nextErrors);
    const first = fields.find(field => nextErrors[field]);
    if (first) {
      setState({ status: "idle", message: null });
      setNudge(count => count + 1);
      const control = formElement.elements.namedItem(first);
      if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) requestAnimationFrame(() => control.focus());
      return;
    }
    setState({ status: "submitting", message: "sending" });
    let response: Response;
    let result: { ok: boolean; mode?: "sent" | "dry-run" };
    try {
      response = await fetch("/api/contact", { method: "POST", body: data });
      result = await response.json() as typeof result;
    } catch {
      setState({ status: "error", message: "genericError" });
      return;
    }
    if (!response.ok || !result.ok) {
      setState({ status: "error", message: response.status === 429 ? "rateLimited" : "genericError" });
      return;
    }
    if (result.mode !== "sent") {
      setState({ status: "error", message: "dryRunSuccess" });
      return;
    }
    formElement.reset();
    setTouched({});
    setAttempted(false);
    setState({ status: "success", message: "success" });
  }

  return (
    <form noValidate aria-busy={state.status === "submitting"} className={styles.contactForm} onSubmit={handleSubmit}>
      <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {attempted && Object.keys(errors).length > 0 && <p className={styles.validationSummary} role="alert">{copy.validation.summary}</p>}
      <label className={styles.formGroup}>
        <span>{copy.name}</span>
        <input {...fieldProps("name")} name="name" type="text" autoComplete="name" minLength={2} maxLength={80} placeholder=" " required />
        {feedback("name")}
      </label>
      <label className={styles.formGroup}>
        <span>{copy.email}</span>
        <input {...fieldProps("email")} name="email" type="email" autoComplete="email" maxLength={120} placeholder=" " required />
        {feedback("email")}
      </label>
      <label className={styles.formGroup}>
        <span>{copy.company} <small>{ui.optional}</small></span>
        <input {...fieldProps("company")} name="company" type="text" autoComplete="organization" maxLength={100} placeholder=" " />
        {feedback("company")}
      </label>
      <label className={styles.formGroup}>
        <span>{copy.message}</span>
        <textarea {...fieldProps("message")} name="message" rows={6} minLength={20} maxLength={1600} placeholder=" " required />
        {feedback("message")}
      </label>
      <p className={styles.privacy}>{ui.privacy}</p>
      <SendButton status={state.status} nudge={nudge} copy={copy} />
      <p className={state.status === "error" ? styles.formError : styles.formMessage} data-status={state.status} aria-live="polite">
        {state.status === "error" && <strong>{copy.errorTitle}</strong>}
        {message}
        {state.status === "error" && <> <a href={`mailto:${content.profile.email}`}>{ui.emailInstead}</a></>}
      </p>
    </form>
  );
}
