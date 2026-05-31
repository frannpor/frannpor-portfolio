"use client";

import { ClientContextsSection } from "@/features/home/components/ClientContextsSection";
import { ContactSection } from "@/features/home/components/ContactSection";
import { ExperienceSection } from "@/features/home/components/ExperienceSection";
import { Footer } from "@/features/home/components/Footer";
import { HeroSection } from "@/features/home/components/HeroSection";
import { AgenticWorkflowSection } from "@/features/home/components/AgenticWorkflowSection";
import { PrinciplesSection } from "@/features/home/components/PrinciplesSection";
import { ProjectsSection } from "@/features/home/components/ProjectsSection";
import { ScrollAtmosphere } from "@/features/home/components/ScrollAtmosphere";
import { SiteHeader } from "@/features/home/components/SiteHeader";
import { StackSection } from "@/features/home/components/StackSection";
import { scrollAtmosphereColumns } from "@/features/home/data/atmosphere";
import { LanguageProvider, usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import styles from "@/features/home/home.module.css";

function HomeContent() {
  const { copy, locale, setLocale } = usePortfolioContent();

  return (
    <main className={styles.pageShell}>
      <ScrollAtmosphere columns={scrollAtmosphereColumns} />
      <SiteHeader
        languageSwitch={copy.languageSwitch}
        locale={locale}
        navigation={copy.navigation}
        onLocaleChange={setLocale}
        profile={copy.profile}
      />
      <div className={styles.localeFrame} key={locale}>
        <HeroSection hero={copy.hero} profile={copy.profile} />
        <PrinciplesSection principles={copy.principles} section={copy.sections.principles} />
        <AgenticWorkflowSection workflow={copy.agenticWorkflow} />
        <ExperienceSection experience={copy.experience} section={copy.sections.experience} />
        <ClientContextsSection contexts={copy.clientContexts} section={copy.sections.contexts} />
        <ProjectsSection projects={copy.projects} section={copy.sections.projects} />
        <StackSection section={copy.sections.stack} stack={copy.stack} />
        <ContactSection contact={copy.contact} profile={copy.profile} />
        <Footer footer={copy.footer} footerLegal={copy.footerLegal} profile={copy.profile} />
      </div>
    </main>
  );
}

export function HomePage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
