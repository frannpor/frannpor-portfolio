"use client";

import { useId, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { Send } from "@/shared/icons";
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

export function ContactForm({ form: copy }: { form: FormCopy }) {
  const id = useId();
  const { copy: content } = usePortfolioContent();
  const ui = content.ui.contact;
  const [state, setState] = useState<FormState>({ status: "idle", message: null });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
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
      onBlur: (event: FocusEvent<Control>) => {
        setTouched(current => ({ ...current, [field]: true }));
        updateError(field, event.currentTarget.value);
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
      <button type="submit" disabled={state.status === "submitting"}>
        <Send size={17} />{state.status === "submitting" ? copy.submitting : copy.submit}
      </button>
      <p className={state.status === "error" ? styles.formError : styles.formMessage} data-status={state.status} aria-live="polite">
        {state.status === "error" && <strong>{copy.errorTitle}</strong>}
        {message}
        {state.status === "error" && <> <a href={`mailto:${content.profile.email}`}>{ui.emailInstead}</a></>}
      </p>
    </form>
  );
}
