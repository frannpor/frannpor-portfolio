import type { Icon } from "@/shared/icons";

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
  icon: Icon;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  context: string;
  icon: Icon;
  logo?: {
    src: string;
    alt: string;
  };
  highlights: string[];
  stack: string[];
};

export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ClientContext = {
  name: string;
  url?: string;
  type: string;
  description: string;
  icon: Icon;
  tags: string[];
  /** Color of the light that marks this project along the route. */
  accent: string;
  /** What I built, shown on the featured projects. */
  points?: string[];
  stack?: string[];
  linkLabel?: string;
  logo?: ImageRef;
  visual?: ImageRef;
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
  image?: ImageRef;
  icon: Icon;
  accent: string;
  status: {
    label: string;
    tone: "active" | "paused";
  };
  /** Logo used as artwork when there is no screenshot. */
  art?: ImageRef;
  mark?: ImageRef;
  stack: string[];
  links: Array<{
    label: string;
    href: string;
    kind: "live" | "repo" | "contact";
  }>;
};

export type StackGroup = {
  label: string;
  icon: Icon;
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
  /** Second half of the heading, set in the condensed italic voice. */
  accent?: string;
  description: string;
  icon: Icon;
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
    errorTitle: string;
    validation: {
      summary: string;
      nameRequired: string;
      nameShort: string;
      nameLong: string;
      emailRequired: string;
      emailInvalid: string;
      emailLong: string;
      companyLong: string;
      messageRequired: string;
      messageShort: string;
      messageLong: string;
    };
    dryRunSuccess: string;
    success: string;
  };
};

export type ReaderMark = "actor" | "state" | "rule";

export type ReaderCase = {
  tab: string;
  /** Marked parts carry a short note on why I ask about them. */
  ask: Array<{ text: string; mark?: ReaderMark; note?: string }>;
  actors: string[];
  states: string[];
  rules: string[];
  question: string;
  questionNote: string;
};

export type InterfaceCopy = {
  skipToContent: string;
  navigationLabel: string;
  menuOpen: string;
  menuClose: string;
  languageNames: Record<Locale, string>;
  sectionMap: {
    label: string;
    top: string;
  };
  hero: {
    status: string;
    place: string;
    explore: string;
    downloadCv: string;
    portraitLabel: string;
    portraitHint: string;
    portraitKeyboard: string;
  };
  work: {
    openScreenshot: string;
  };
  reader: {
    title: string;
    tabsLabel: string;
    blocks: {
      actors: string;
      states: string;
      rules: string;
      question: string;
    };
    note: string;
    replay: string;
    hint: string;
    why: string;
    cases: ReaderCase[];
  };
  experience: {
    contribution: string;
    stopsLabel: string;
    chooseStop: string;
    now: string;
  };
  projects: {
    howBuilt: string;
    talk: string;
  };
  stack: {
    summary: string;
  };
  contact: {
    heading: string;
    inbox: string;
    copy: string;
    copied: string;
    copyFailed: string;
    cvPdf: string;
    cvWord: string;
    formTitle: string;
    formLead: string;
    optional: string;
    privacy: string;
    rateLimited: string;
    emailInstead: string;
  };
  gallery: {
    eyebrow: string;
    close: string;
    previous: string;
    next: string;
    choose: string;
    visit: string;
  };
  footer: {
    place: string;
    backToTop: string;
  };
};

export type PortfolioContent = {
  ui: InterfaceCopy;
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
