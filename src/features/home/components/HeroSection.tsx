import { Download, GitBranch, Link2, Mail, TerminalSquare } from "@/shared/icons";
import { ExternalLink } from "@/features/home/components/ui/ExternalLink";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

type HeroSectionProps = {
  hero: PortfolioContent["hero"];
  profile: PortfolioContent["profile"];
};

export function HeroSection({ hero, profile }: HeroSectionProps) {
  return (
    <section className={styles.hero} id="profile">
      <div className={styles.heroCopy}>
        <div className={styles.heroMeta}>
          <TerminalSquare size={18} />
          <span>{profile.tagline}</span>
        </div>
        <h1>{profile.name}</h1>
        <p>{profile.intro}</p>
        <div className={styles.heroActions}>
          <a className={styles.actionPrimary} href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {hero.actions.contact}
          </a>
          <a className={styles.actionSecondary} href={profile.cv} download>
            <Download size={18} />
            {hero.actions.cv}
          </a>
          <a className={styles.iconAction} href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={hero.actions.github}>
            <GitBranch size={19} />
          </a>
          <a className={styles.iconAction} href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={hero.actions.linkedin}>
            <Link2 size={19} />
          </a>
        </div>
        <a className={styles.scrollIndicator} href="#systems" aria-label="Scroll to method section">
          <span>scroll</span>
          <i />
        </a>
      </div>

      <aside className={styles.systemPanel} aria-label={profile.title}>
        <div className={styles.panelHeader}>
          <span />
          <span />
          <span />
          <strong>{hero.panelTitle}</strong>
        </div>
        <div className={styles.commandList}>
          {hero.commandLines.map((line, index) => (
            <div className={index === hero.commandLines.length - 1 ? styles.commandLineActive : undefined} key={line}>
              <span>0{index + 1}</span>
              <code>{line}</code>
              {index === hero.commandLines.length - 1 ? <b aria-hidden="true">OK</b> : null}
            </div>
          ))}
        </div>
        <div className={styles.metricGrid}>
          {hero.metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
        <div className={styles.panelFooter}>
          <ExternalLink href={profile.github}>{hero.panelLinks.github}</ExternalLink>
          <ExternalLink href={profile.linkedin}>{hero.panelLinks.linkedin}</ExternalLink>
        </div>
      </aside>
    </section>
  );
}
