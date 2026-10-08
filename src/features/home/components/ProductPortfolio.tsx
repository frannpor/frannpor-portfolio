"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, Link2, ZoomIn } from "lucide-react";
import { useState } from "react";
import { usePortfolioContent } from "@/features/home/i18n/LanguageProvider";
import { ProjectGallery } from "./ProjectGallery";
import { PortraitPlayground } from "./PortraitPlayground";
import { PortfolioHeader, PortfolioFooter, PortfolioMotion } from "./PortfolioChrome";
import { ContactForm } from "@/features/home/components/ContactForm";
import type { ClientContext } from "@/features/home/data/types";
import styles from "./product-portfolio.module.css";

function CaseMedia({ item, label, onOpen }: { item: ClientContext; label: string; onOpen: () => void }) {
  if (!item.visual) {
    return <div className={`${styles.media} ${styles.brandMedia}`}>
      {item.logo ? <Image src={item.logo.src} alt={item.logo.alt} width={280} height={120} /> : <item.icon size={72} />}
      <span>{item.tags.join(" / ")}</span>
    </div>;
  }
  return <button className={styles.media} type="button" aria-label={`${label}: ${item.name}`} onClick={onOpen}>
    <Image src={item.visual.src} alt={item.visual.alt} width={1200} height={720} sizes="(max-width: 760px) 100vw, 50vw" />
    <span className={styles.zoom}><ZoomIn size={18} /><span>{label}</span></span>
  </button>;
}

export function ProductPortfolio() {
  const { copy, locale } = usePortfolioContent();
  const es = locale === "es";
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const galleryItems = copy.clientContexts.filter(item => item.visual);
  const [copied, setCopied] = useState(false);
  const projects = [...copy.projects].sort((a,b) => Number(b.name === "WePlay") - Number(a.name === "WePlay"));
  async function copyEmail() {
    try { await navigator.clipboard.writeText(copy.profile.email); setCopied(true); }
    catch { setCopied(false); }
  }
  return <div className={styles.page}>
    <PortfolioMotion />
    <PortfolioHeader />
    {galleryIndex !== null && <ProjectGallery items={galleryItems} initialIndex={galleryIndex} onClose={() => setGalleryIndex(null)} />}
    <main>
      <section className={styles.hero} id="profile">
        <div className={styles.heroTop}><span>FULL STACK DEVELOPER</span><span>{copy.profile.location} <span aria-hidden="true">↗</span></span></div>
        <div className={styles.heroMain}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.profile.tagline}</p>
            <h1>Francisco<br /><span>Porciel<span className={styles.nameDot}>.</span></span></h1>
            <p className={styles.intro}>{copy.profile.intro}</p>
            <div className={styles.actions}><a className={styles.primary} href="#contexts">{es ? "Explorá mi trabajo" : "Explore my work"}<ArrowDown size={18} /></a><a className={styles.secondary} href={copy.profile.cv} download><Download size={17} />{es ? "Descargar CV" : "Download CV"}</a></div>
          </div>
          <PortraitPlayground locale={locale} />
        </div>
        <div className={styles.heroBottom}><span><i />{es ? "Construyendo en Brace Developers" : "Building at Brace Developers"}</span><a href={copy.profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a><span>{es ? "Ideas, interfaces y sistemas." : "Ideas, interfaces and systems."}</span></div>
      </section>

      <section className={styles.section} id="contexts">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / {copy.sections.contexts.eyebrow}</p><h2>{copy.sections.contexts.title}</h2></div><p>{copy.sections.contexts.description}</p></div>
        <div className={styles.cases}>{copy.clientContexts.map((item,index) => <article key={item.name} className={`${styles.case} ${index < 3 ? styles.featuredCase : styles.smallCase}`}>
          <div className={styles.casePreview}><div className={styles.previewBar}><span className={styles.previewDots} aria-hidden="true"><i /><i /><i /></span><span>{item.name}</span><ArrowUpRight size={14} aria-hidden="true" /></div><CaseMedia item={item} label={es ? "Ver captura" : "View screenshot"} onOpen={() => setGalleryIndex(galleryItems.findIndex(entry => entry.name === item.name))} /></div>
          <div className={styles.caseBody}><div className={styles.caseMeta}><span>{item.type}</span><span>/{String(index+1).padStart(2,"0")}</span></div><h3>{item.name}</h3><p>{item.description}</p><ul className={styles.tags}>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>{item.url && <a className={styles.textLink} href={item.url} target="_blank" rel="noreferrer">{item.linkLabel ?? item.name}<ArrowUpRight size={18} /></a>}</div>
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.approach}`} id="systems">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / {copy.sections.principles.eyebrow}</p><h2>{copy.sections.principles.title}</h2></div><p>{copy.sections.principles.description}</p></div>
        <div className={styles.principles}>{copy.principles.map((item,index) => <article key={item.title}><div className={styles.principleTop}><span>0{index+1}</span><item.icon size={28} strokeWidth={1.25} aria-hidden="true" /></div><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowRight className={styles.principleArrow} size={22} aria-hidden="true" /></article>)}</div>
        <div className={styles.ai}><div><p className={styles.eyebrow}>{copy.agenticWorkflow.eyebrow}</p><h3>{copy.agenticWorkflow.title}</h3></div><div><p>{copy.agenticWorkflow.description}</p><ol>{copy.agenticWorkflow.steps.map((step,index) => <li key={step}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span>{step}</li>)}</ol></div></div>
        <details className={styles.stack} id="stack"><summary>{es ? "Las herramientas que uso" : "The tools I use"}<span>+</span></summary><div>{copy.stack.map(group => <div key={group.label}><strong>{group.label}</strong><p>{group.items.join(" · ")}</p></div>)}</div></details>
      </section>

      <section className={styles.section} id="work">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>03 / {copy.sections.experience.eyebrow}</p><h2>{copy.sections.experience.title}</h2></div><p>{copy.sections.experience.description}</p></div>
        <div className={styles.experience}>{copy.experience.map((item,index) => <article key={`${item.company}-${item.role}`}><div className={styles.experienceRail}><span className={styles.timelineDot} /><span className={styles.period}>{item.period}</span><span className={styles.experienceNumber}>{String(index+1).padStart(2,"0")}</span></div><div className={styles.experienceCard}><div className={styles.experienceTitle}><div><h3>{item.company}</h3><p className={styles.role}>{item.role}</p></div><span className={styles.experienceIcon}><item.icon size={24} strokeWidth={1.5} aria-hidden="true" /></span></div><p>{item.context}</p><details><summary>{es ? "Mi aporte" : "My contribution"}<span>+</span></summary><ul>{item.highlights.map(line => <li key={line}>{line}</li>)}</ul><p className={styles.experienceStack}>{item.stack.join(" · ")}</p></details></div></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.projects}`} id="projects">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>04 / {copy.sections.projects.eyebrow}</p><h2>{copy.sections.projects.title}</h2></div><p>{copy.sections.projects.description}</p></div>
        {projects.map(item => <article className={styles.project} key={item.name}><div className={styles.projectVisual}><span className={styles.projectWatermark} aria-hidden="true">PLAY</span><div className={styles.projectWindow}><div className={styles.previewBar}><span className={styles.previewDots} aria-hidden="true"><i /><i /><i /></span><span>{item.name}</span><item.icon size={16} aria-hidden="true" /></div>{item.image ? <Image src={item.image.src} alt={item.image.alt} width={850} height={600} sizes="(max-width:760px) 100vw, 45vw" /> : <item.icon size={96} />}</div><span className={styles.projectNote}>{es ? "Una idea que quiero seguir construyendo." : "An idea I want to keep building."}</span></div><div className={styles.projectBody}><span className={styles.eyebrow}>{item.meta}</span><h3>{item.name}</h3><p>{item.summary}</p><details><summary>{es ? "Cómo lo construí" : "How I built it"}<span>+</span></summary><p>{item.signal}</p><ul className={styles.tags}>{item.stack.map(tag => <li key={tag}>{tag}</li>)}</ul></details><a className={styles.textLink} href={item.links[0]?.href ?? `mailto:${copy.profile.email}`}>{es ? "Conversemos sobre el proyecto" : "Let’s talk about the project"}<ArrowUpRight size={18} /></a></div></article>)}
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="contact">
        <div className={styles.contactLayout}><div className={styles.contactIntro}><p className={styles.eyebrow}>05 / {copy.contact.eyebrow}</p><h2>{copy.contact.title}</h2><p>{copy.contact.description}</p>
          <div className={styles.contactEmail}><span>{es ? "Directo a mi inbox" : "Straight to my inbox"}</span><a href={`mailto:${copy.profile.email}`}>{copy.profile.email}<ArrowUpRight size={20} /></a><button type="button" onClick={copyEmail} aria-live="polite">{copied ? <Check size={14} /> : <Link2 size={14} />}{copied ? (es ? "Copiado" : "Copied") : (es ? "Copiar email" : "Copy email")}</button></div>
          <div className={styles.contactLinks}><a href={copy.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={17} /></a><a href={copy.profile.cv} download><Download size={17} />CV {locale.toUpperCase()}<span>PDF</span></a><a href={copy.profile.cv.replace(/\.pdf$/, ".docx")} download>{es ? "CV en Word" : "Word CV"}<Download size={16} /></a></div>
          <div className={styles.contactSignature} aria-hidden="true"><Image src="/brand/franpor-color.png" alt="" width={52} height={52} /><span>Francisco Porciel<small>{es ? "Nos leemos." : "Talk soon."}</small></span></div>
        </div><div className={styles.contactPanel}><div className={styles.contactPanelHeading}><span className={styles.contactMark} aria-hidden="true"><ArrowUpRight size={26} /></span><div><h3>{es ? "Contame un poco" : "Tell me a little"}</h3><p>{es ? "¿Qué tenés en mente?" : "What do you have in mind?"}</p></div></div><ContactForm form={copy.contact.form} /></div></div>
      </section>
    </main>
    <PortfolioFooter />
  </div>;
}
