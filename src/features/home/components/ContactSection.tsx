import { Mail, Route, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/features/home/components/ContactForm";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

type ContactSectionProps = {
  contact: PortfolioContent["contact"];
  profile: PortfolioContent["profile"];
};

export function ContactSection({ contact, profile }: ContactSectionProps) {
  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.contactCopy}>
        <div className={styles.kicker}>
          <Mail size={17} />
          <span>{contact.eyebrow}</span>
        </div>
        <h2>{contact.title}</h2>
        <p>{contact.description}</p>
        <a className={styles.emailLine} href={`mailto:${profile.email}`}>
          {contact.emailLine} {profile.email}
        </a>
      </div>
      <ContactForm form={contact.form} />
      <aside className={styles.fitGrid} aria-label={contact.fitTitle}>
        <div>
          <h3>
            <ShieldCheck size={17} />
            {contact.fitTitle}
          </h3>
          {contact.fitItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div>
          <h3>
            <Route size={17} />
            {contact.rhythmTitle}
          </h3>
          {contact.rhythmItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </aside>
    </section>
  );
}
