import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
      <div className={styles.header}>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Portfolio
        </Link>
        <p className={styles.kicker}>Legal / {profile.handle}</p>
        <h1>{title}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.updated}>Última actualización: {updatedAt}</p>
      </div>

      <article className={styles.document}>
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>

      <footer className={styles.footer}>
        <span>{profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </main>
  );
}
