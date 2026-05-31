import type { LucideIcon } from "lucide-react";

export type Locale = "es" | "en";

export type NavItem = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type Principle = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  context: string;
  icon: LucideIcon;
  logo?: {
    src: string;
    alt: string;
  };
  highlights: string[];
  stack: string[];
};

export type ClientContext = {
  name: string;
  url?: string;
  type: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  linkLabel?: string;
  logo?: {
    src: string;
    alt: string;
  };
  visual?: {
    src: string;
    alt: string;
  };
};

export type Project = {
  name: string;
  eyebrow: string;
  meta: string;
  summary: string;
  signalLabel: string;
  signal: string;
  initials: string;
  logo?: {
    src: string;
    alt: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  icon: LucideIcon;
  stack: string[];
  links: Array<{
    label: string;
    href: string;
    kind: "live" | "repo" | "contact";
  }>;
};

export type StackGroup = {
  label: string;
  icon: LucideIcon;
  items: string[];
};

export type ScrollAtmosphereColumn = {
  id: string;
  lines: string[];
};

export type AgenticWorkflow = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ContactCopy = {
  eyebrow: string;
  title: string;
  description: string;
  emailLine: string;
  fitTitle: string;
  fitItems: string[];
  rhythmTitle: string;
  rhythmItems: string[];
  form: {
    name: string;
    email: string;
    company: string;
    message: string;
    submit: string;
    submitting: string;
    sending: string;
    genericError: string;
    dryRunSuccess: string;
    success: string;
  };
};

export type PortfolioContent = {
  profile: {
    name: string;
    handle: string;
    title: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    cv: string;
    tagline: string;
    intro: string;
  };
  languageSwitch: {
    label: string;
    es: string;
    en: string;
  };
  navigation: NavItem[];
  hero: {
    actions: {
      contact: string;
      cv: string;
      github: string;
      linkedin: string;
    };
    panelTitle: string;
    panelLinks: {
      github: string;
      linkedin: string;
    };
    metrics: Metric[];
    commandLines: string[];
  };
  sections: {
    principles: SectionCopy;
    experience: SectionCopy;
    contexts: SectionCopy;
    projects: SectionCopy;
    stack: SectionCopy;
  };
  principles: Principle[];
  agenticWorkflow: AgenticWorkflow;
  experience: Experience[];
  clientContexts: ClientContext[];
  projects: Project[];
  stack: StackGroup[];
  contact: ContactCopy;
  footerLegal: {
    privacy: string;
    terms: string;
  };
  footer: string;
};
