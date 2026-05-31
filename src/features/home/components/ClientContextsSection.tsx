import Image from "next/image";
import { ExternalLink } from "@/features/home/components/ui/ExternalLink";
import { ScreenshotPreview } from "@/features/home/components/ScreenshotPreview";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

type ClientContextsSectionProps = {
  contexts: PortfolioContent["clientContexts"];
  section: PortfolioContent["sections"]["contexts"];
};

export function ClientContextsSection({ contexts, section }: ClientContextsSectionProps) {
  const HeaderIcon = section.icon;

  return (
    <section className={`${styles.section} ${styles.contextSection}`} id="contexts">
      <div className={styles.contextHeader}>
        <div className={styles.kicker}>
          <HeaderIcon size={17} />
          <span>{section.eyebrow}</span>
        </div>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
      <div className={styles.contextGrid}>
        {contexts.map((context, index) => {
          const Icon = context.icon;
          const cardClassName = [
            styles.contextCard,
            index === 0 ? styles.contextCardFeatured : "",
            index === 1 || index === 2 ? styles.contextCardHalf : "",
            index === 3 ? styles.contextCardWide : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <article className={cardClassName} key={context.name}>
              {context.visual ? (
                <ScreenshotPreview
                  alt={context.visual.alt}
                  className={styles.contextVisual}
                  height={360}
                  src={context.visual.src}
                  title={context.name}
                  width={620}
                />
              ) : null}
              <div className={styles.contextIcon}>
                {context.logo ? (
                  <Image
                    src={context.logo.src}
                    alt={context.logo.alt}
                    width={96}
                    height={42}
                    unoptimized={context.logo.src.endsWith(".svg")}
                  />
                ) : (
                  <Icon size={22} />
                )}
              </div>
              <div className={styles.contextContent}>
                <span>{context.type}</span>
                <h3>{context.name}</h3>
                <p>{context.description}</p>
              </div>
              <div className={styles.contextTags}>
                {context.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {context.url ? (
                <ExternalLink href={context.url} variant="quiet">
                  {context.linkLabel ?? context.name}
                </ExternalLink>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
