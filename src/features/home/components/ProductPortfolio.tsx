"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Check, Download, GitBranch, Link2, ZoomIn } from "@/shared/icons";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import { useNightMapMotion } from "@/features/home/motion/motion";
import type { ClientContext, PortfolioContent, SectionCopy } from "@/features/home/data/portfolio";
import type { ImageRef } from "@/features/home/data/types";
import { ProjectGallery } from "./ProjectGallery";
import { PortraitPlayground } from "./PortraitPlayground";
import { PortfolioFooter, PortfolioHeader, SectionMap } from "./PortfolioChrome";
import { RequestReader } from "./RequestReader";
import { TopoCanvas } from "./TopoCanvas";
import { ContactForm } from "./ContactForm";
import { ExperienceRoute } from "./ExperienceRoute";
import { GlassAction } from "./ui/GlassAction";
import styles from "./product-portfolio.module.css";

const accentStyle = (accent: string) => ({ "--c": `color-mix(in srgb, ${accent} 32%, var(--text))` }) as CSSProperties;

function SectionHeading({ section, id }: { section: SectionCopy; id: string }) {
  return <div className={styles.sectionHeading} data-reveal="heading">
    <h2 id={id}>{section.title}{section.accent && <> <em>{section.accent}</em></>}</h2>
    <p>{section.description}</p>
  </div>;
}

/** Every project card names its brand with the same plate; without a logo the plate carries the name. */
function Brand({ logo, name }: { logo?: ImageRef; name: string }) {
  if (!logo) return <span className={styles.logo} data-plate="text">{name}</span>;
  return <span className={styles.logo} data-plate={logo.plate}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} sizes="220px" quality={95} /></span>;
}

function Screen({ item, label, onOpen, sizes }: { item: ClientContext; label: string; onOpen: () => void; sizes: string }) {
  if (!item.visual) return null;
  return <button className={styles.screen} style={{ "--shot-ratio": `${item.visual.width} / ${item.visual.height}` } as CSSProperties} type="button" aria-label={`${label} ${item.name}`} onClick={onOpen} data-tilt-target>
    <span className={styles.chrome} aria-hidden="true"><i /><i /><i /></span>
    <span className={styles.shot}><Image src={item.visual.src} alt={item.visual.alt} fill sizes={sizes} quality={95} /></span>
    <span className={styles.zoom} aria-hidden="true"><ZoomIn size={18} /></span>
  </button>;
}

function WorkSection({ copy, onOpen }: { copy: PortfolioContent; onOpen: (name: string) => void }) {
  const featured = copy.clientContexts.slice(0, 3);
  const minor = copy.clientContexts.slice(3);
  const label = copy.ui.work.openScreenshot;
  return <section className={styles.section} id="contexts" aria-labelledby="contexts-title">
    <SectionHeading section={copy.sections.contexts} id="contexts-title" />
    {featured.map((item, index) => <article key={item.name} className={styles.stop} data-flip={index % 2 === 1} data-tilt data-reveal style={accentStyle(item.accent)}>
      <div className={styles.view}><Screen item={item} label={label} onOpen={() => onOpen(item.name)} sizes="(max-width: 900px) 100vw, 60vw" /></div>
      <div className={styles.info}>
        <div className={styles.infoTop}>
          <p className={styles.kind}>{item.type}</p>
        </div>
        <h3><Brand logo={item.logo} name={item.name} /></h3>
        <p className={styles.description}>{item.description}</p>
        {item.points && <ul className={styles.points}>{item.points.map(point => <li key={point}>{point}</li>)}</ul>}
        {item.stack && <ul className={styles.chips}>{item.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {item.url && <a className={styles.visit} href={item.url} target="_blank" rel="noreferrer">{item.linkLabel ?? item.name}<ArrowUpRight size={16} /></a>}
      </div>
    </article>)}
    <div className={styles.minor}>
      {minor.map(item => <article key={item.name} className={styles.mini} data-reveal style={accentStyle(item.accent)}>
        <Screen item={item} label={label} onOpen={() => onOpen(item.name)} sizes="(max-width: 760px) 92vw, 620px" />
        <div className={styles.miniInfo}>
          <p className={styles.kind}>{item.type}</p>
          <h3><Brand logo={item.logo} name={item.name} /></h3>
          <p className={styles.description}>{item.description}</p>
          {item.url && <a className={styles.visit} href={item.url} target="_blank" rel="noreferrer">{item.linkLabel ?? item.name}<ArrowUpRight size={16} /></a>}
        </div>
      </article>)}
    </div>
  </section>;
}

function MethodSection({ copy }: { copy: PortfolioContent }) {
  const { agenticWorkflow: ai } = copy;
  return <section className={styles.section} id="systems" aria-labelledby="systems-title">
    <SectionHeading section={copy.sections.principles} id="systems-title" />
    <div className={styles.method}>
      <ul className={styles.principles} data-reveal>{copy.principles.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>)}</ul>
      <div data-reveal><RequestReader copy={copy.ui.reader} /></div>
    </div>
    <div className={styles.ai} data-reveal>
      <h3>{ai.title}</h3>
      <div><p>{ai.description}</p><ol>{ai.steps.map(step => <li key={step}>{step}</li>)}</ol></div>
    </div>
    <details className={styles.stack} id="stack" data-reveal>
      <summary>{copy.ui.stack.summary}<span aria-hidden="true" /></summary>
      <dl>{copy.stack.map(group => <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(" · ")}</dd></div>)}</dl>
    </details>
  </section>;
}

function ExperienceSection({ copy }: { copy: PortfolioContent }) {
  return <section className={styles.section} id="work" aria-labelledby="work-title">
    <SectionHeading section={copy.sections.experience} id="work-title" />
    <div className={styles.experienceRunway}><ExperienceRoute items={copy.experience} copy={copy.ui.experience} /></div>
  </section>;
}

function ProjectsSection({ copy }: { copy: PortfolioContent }) {
  return <section className={styles.section} id="projects" aria-labelledby="projects-title">
    <SectionHeading section={copy.sections.projects} id="projects-title" />
    <div className={styles.own}>
      {copy.projects.map(item => <article key={item.name} className={styles.mini} data-reveal style={accentStyle(item.accent)}>
        {item.image
          ? <figure className={styles.figure}><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 860px) 92vw, 640px" /></figure>
          : item.art && <figure className={styles.art}><Image src={item.art.src} alt={item.art.alt} width={item.art.width} height={item.art.height} sizes="(max-width: 860px) 70vw, 380px" /></figure>}
        <div className={styles.miniInfo}>
          <p className={styles.status} data-tone={item.status.tone}>{item.status.label}</p>
          <h3><Brand logo={item.logo} name={item.name} /></h3>
          <p className={styles.description}>{item.summary}</p>
          <details>
            <summary>{copy.ui.projects.howBuilt}<span aria-hidden="true" /></summary>
            <p>{item.signal}</p>
            <ul className={styles.chips}>{item.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </details>
          <a className={styles.visit} href={item.links[0]?.href ?? `mailto:${copy.profile.email}`}>{copy.ui.projects.talk}<ArrowUpRight size={16} /></a>
        </div>
      </article>)}
    </div>
  </section>;
}

function ContactSection({ copy }: { copy: PortfolioContent }) {
  const { ui, profile } = copy;
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied("done"); }
    catch { setCopied("failed"); }
  }
  return <section className={`${styles.section} ${styles.contact}`} id="contact" aria-labelledby="contact-title">
    <div className={styles.contactIntro} data-reveal="glass">
      <span className={styles.xmark} aria-hidden="true" />
      <h2 id="contact-title">{ui.contact.heading} <em>{copy.contact.title}</em></h2>
      <p className={styles.description}>{copy.contact.description}</p>
      <div className={styles.mail}>
        <p className={styles.kind}>{ui.contact.inbox}</p>
        <a href={`mailto:${profile.email}`}>{profile.email.split("@")[0]}<wbr />@{profile.email.split("@")[1]}</a>
        <GlassAction><button type="button" className={styles.ghost} onClick={copyEmail} aria-live="polite">{copied === "done" ? <Check size={16} /> : <Link2 size={16} />}{copied === "done" ? ui.contact.copied : copied === "failed" ? ui.contact.copyFailed : ui.contact.copy}</button></GlassAction>
      </div>
      <div className={styles.contactLinks}>
        <GlassAction><a className={styles.ghost} href={profile.cv} download><Download size={17} />{ui.contact.cvPdf}</a></GlassAction>
        <GlassAction><a className={styles.ghost} href={profile.cv.replace(/\.pdf$/, ".docx")} download><Download size={17} />{ui.contact.cvWord}</a></GlassAction>
        <GlassAction><a className={styles.ghost} href={profile.linkedin} target="_blank" rel="noreferrer">{copy.hero.actions.linkedin}<ArrowUpRight size={16} /></a></GlassAction>
        <GlassAction><a className={styles.ghost} href={profile.github} target="_blank" rel="noreferrer">{copy.hero.actions.github}<ArrowUpRight size={16} /></a></GlassAction>
      </div>
    </div>
    <div className={styles.formCard} data-reveal>
      <h3>{ui.contact.formTitle}</h3>
      <p>{ui.contact.formLead}</p>
      <ContactForm form={copy.contact.form} />
    </div>
  </section>;
}

export function ProductPortfolio() {
  const { copy } = usePortfolioContent();
  const { profile, ui } = copy;
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const galleryItems = copy.clientContexts.filter(item => item.visual);
  const [firstName, ...lastNames] = profile.name.split(" ");
  useNightMapMotion();

  return <div className={styles.page}>
    <PortfolioHeader />
    <SectionMap />
    {galleryIndex !== null && <ProjectGallery items={galleryItems} initialIndex={galleryIndex} onClose={() => setGalleryIndex(null)} />}
    <main>
      <section className={styles.hero} id="profile" aria-labelledby="hero-title">
        <TopoCanvas className={styles.topo} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy} data-hero-motion>
            <p className={styles.heroMeta}><span className={styles.live}>{ui.hero.status}</span><span>{ui.hero.place}</span></p>
            <h1 id="hero-title"><span>{firstName}</span> <span>{lastNames.join(" ")}<span className={styles.dot}>.</span></span></h1>
            <p className={styles.claim}>{profile.tagline}</p>
            <p className={styles.intro}>{profile.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#contexts" data-magnet>{ui.hero.explore}<ArrowDown size={18} /></a>
              <GlassAction><a className={styles.secondary} href={profile.cv} download><Download size={17} />{ui.hero.downloadCv}</a></GlassAction>
              <GlassAction><a className={styles.iconButton} href={profile.github} target="_blank" rel="noreferrer" aria-label={copy.hero.actions.github}><GitBranch size={20} /></a></GlassAction>
            </div>
            <dl className={styles.hud}>{copy.hero.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}<span>{metric.detail}</span></dd></div>)}</dl>
          </div>
          <div className={styles.heroPortrait} data-hero-motion>
            <PortraitPlayground copy={{ label: ui.hero.portraitLabel, hint: ui.hero.portraitHint, keyboard: ui.hero.portraitKeyboard }} />
          </div>
        </div>
      </section>
      <div className={styles.shell}>
        <WorkSection copy={copy} onOpen={name => setGalleryIndex(galleryItems.findIndex(entry => entry.name === name))} />
        <MethodSection copy={copy} />
        <ExperienceSection copy={copy} />
        <ProjectsSection copy={copy} />
        <ContactSection copy={copy} />
      </div>
    </main>
    <PortfolioFooter />
  </div>;
}
