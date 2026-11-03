import { ArrowUpRight } from "@/shared/icons";
import styles from "@/features/home/home.module.css";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "quiet";
  download?: boolean;
};

export function ExternalLink({ href, children, variant = "quiet", download }: ExternalLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      className={variant === "primary" ? styles.primaryLink : styles.quietLink}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      download={download}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} />
    </a>
  );
}
