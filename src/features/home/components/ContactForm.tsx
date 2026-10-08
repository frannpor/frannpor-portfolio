"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import styles from "./contact-form.module.css";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

type ContactFormProps = {
  form: PortfolioContent["contact"]["form"];
};

export function ContactForm({ form: copy }: ContactFormProps) {
  const { locale, copy: content } = usePortfolioContent();
  const es = locale === "es";
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting", message: copy.sending });

    const formElement = event.currentTarget;
    let response: Response;
    let result: { ok: boolean; error?: string; mode?: "sent" | "dry-run" };

    try {
      response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(formElement),
      });
      result = (await response.json()) as { ok: boolean; error?: string; mode?: "sent" | "dry-run" };
    } catch {
      setState({ status: "error", message: copy.genericError });
      return;
    }

    if (!response.ok || !result.ok) {
      setState({ status: "error", message: response.status === 429 ? (es ? "Llegaron varios mensajes seguidos. Esperá un minuto y probá de nuevo." : "Several messages arrived in a row. Wait a minute and try again.") : copy.genericError });
      return;
    }

    if (result.mode !== "sent") {
      setState({ status: "error", message: copy.dryRunSuccess });
      return;
    }
    formElement.reset();
    setState({
      status: "success",
      message: copy.success,
    });
  }

  return (
    <form aria-busy={state.status === "submitting"} className={styles.contactForm} onSubmit={handleSubmit}>
      <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className={styles.formGroup}>
        <span>{copy.name}</span>
        <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} placeholder=" " required />
      </label>
      <label className={styles.formGroup}>
        <span>{copy.email}</span>
        <input name="email" type="email" autoComplete="email" maxLength={120} placeholder=" " required />
      </label>
      <label className={styles.formGroup}>
        <span>{copy.company} <small>{es ? "(opcional)" : "(optional)"}</small></span>
        <input name="company" type="text" autoComplete="organization" maxLength={100} placeholder=" " />
      </label>
      <label className={styles.formGroup}>
        <span>{copy.message}</span>
        <textarea name="message" rows={6} minLength={20} maxLength={1600} placeholder=" " required />
      </label>
      <p className={styles.privacy}>{es ? "Usaré estos datos para responderte." : "I’ll use these details to reply."}</p>
      <button type="submit" disabled={state.status === "submitting"}>
        <Send size={17} />
        {state.status === "submitting" ? copy.submitting : copy.submit}
      </button>
      <p className={state.status === "error" ? styles.formError : styles.formMessage} data-status={state.status} aria-live="polite">
        {state.message}
        {state.status === "error" && <> {" "}<a href={`mailto:${content.profile.email}`}>{es ? "Escribime por email" : "Email me instead"}</a></>}
      </p>
    </form>
  );
}
