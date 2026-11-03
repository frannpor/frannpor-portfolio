import type { Icon } from "@/shared/icons";
import styles from "@/features/home/home.module.css";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  icon: Icon;
};

export function SectionHeader({ eyebrow, title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.kicker}>
        <Icon size={17} />
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
