import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/shared/config/site";
import styles from "./legal.module.css";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPage({ title, description, updatedAt, sections }: LegalPageProps) {
  const { profile } = siteConfig;

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.header}>
          <Link className={styles.backLink} href="/">
            <ArrowLeft size={18} aria-hidden="true" />
            Portfolio
          </Link>
          <p className={styles.kicker}>Legal / {profile.handle}</p>
          <h1>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.metaRow}>
            <span>
              <FileText size={15} />
              Última actualización: {updatedAt}
            </span>
            <span>
              <ShieldCheck size={15} />
              Google OAuth ready
            </span>
          </div>
        </div>
        <div className={styles.heroCard} aria-hidden="true">
          <span>policy.md</span>
          <strong>{sections.length}</strong>
          <p>secciones públicas, claras y enlazables.</p>
          <i />
          <i />
          <i />
        </div>
      </section>

      <div className={styles.contentGrid}>
        <aside className={styles.index} aria-label="Índice de documento">
          <span>Índice</span>
          {sections.map((section, index) => (
            <a key={section.title} href={`#${slugify(section.title)}`}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {section.title}
            </a>
          ))}
        </aside>

        <article className={styles.document}>
          <div className={styles.notice}>
            <CheckCircle2 size={18} />
            <p>
              Documento público para usuarios, revisores y servicios de autenticación. El texto debe mantenerse alineado con el uso real de datos del proyecto.
            </p>
          </div>
          {sections.map((section, index) => (
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
