"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/shared/config/site";
import { LanguageProvider, usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import type { Locale } from "@/features/home/data/portfolio";
import { SystemHeader } from "@/features/system/SystemHeader";
import styles from "./legal.module.css";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  content: Record<Locale, {
    title: string;
    description: string;
    updatedAt: string;
    meta: {
      updated: string;
      oauth: string;
      publicDocument: string;
      cardTitle: string;
      cardDescription: string;
      index: string;
      notice: string;
      back: string;
      legalLabel: string;
    };
    sections: LegalSection[];
  }>;
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <LanguageProvider>
      <LegalPageContent content={content} />
    </LanguageProvider>
  );
}

function LegalPageContent({ content }: LegalPageProps) {
  const { profile } = siteConfig;
  const { locale } = usePortfolioContent();
  const copy = content[locale];

  return (
    <>
      <SystemHeader />
      <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.header}>
          <Link className={styles.backLink} href="/">
            <ArrowLeft size={18} aria-hidden="true" />
            {copy.meta.back}
          </Link>
          <p className={styles.kicker}>{copy.meta.legalLabel} / {profile.handle}</p>
          <h1>{copy.title}</h1>
          <p className={styles.description}>{copy.description}</p>
          <div className={styles.metaRow}>
            <span>
              <FileText size={15} />
              {copy.meta.updated}: {copy.updatedAt}
            </span>
            <span>
              <ShieldCheck size={15} />
              {copy.meta.oauth}
            </span>
            <span>
              <LockKeyhole size={15} />
              {copy.meta.publicDocument}
            </span>
          </div>
        </div>
        <div className={styles.heroCard} aria-hidden="true">
          <div className={styles.windowBar}>
            <i />
            <i />
            <i />
            <span>{copy.meta.cardTitle}</span>
          </div>
          <strong>{copy.sections.length}</strong>
          <p>{copy.meta.cardDescription}</p>
          <i />
          <i />
          <i />
        </div>
      </section>

      <div className={styles.contentGrid}>
        <aside className={styles.index} aria-label={copy.meta.index}>
          <span>{copy.meta.index}</span>
          {copy.sections.map((section, index) => (
            <a key={section.title} href={`#${slugify(section.title)}`}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {section.title}
            </a>
          ))}
        </aside>

        <article className={styles.document}>
          <div className={styles.notice}>
            <CheckCircle2 size={18} />
            <p>{copy.meta.notice}</p>
          </div>
          {copy.sections.map((section, index) => (
            <section id={slugify(section.title)} key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </div>

      <footer className={styles.footer}>
        <span>{profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </main>
    </>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
