import { GitBranch, Link2, Mail } from "lucide-react";
import Link from "next/link";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

type FooterProps = {
  footer: string;
  profile: PortfolioContent["profile"];
};

export function Footer({ footer, profile }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span>
        {profile.name} / {footer}
      </span>
      <div>
        <Link href="/privacy">Privacidad</Link>
        <Link href="/terms">Términos</Link>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitBranch size={18} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Link2 size={18} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
}
