import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Code2,
  Database,
  GitBranch,
  Leaf,
  MessagesSquare,
  Network,
  PanelsTopLeft,
  Radio,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Workflow,
} from "@/shared/icons";
import { sharedProfile } from "@/features/home/data/shared";
import type { PortfolioContent } from "@/features/home/data/types";

export const en: PortfolioContent = {
  ui: {
    skipToContent: "Skip to content",
    navigationLabel: "Sections",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageNames: { es: "Español", en: "English" },
    sectionMap: { label: "Page map", top: "Top" },
    hero: {
      status: "Building at Brace Developers",
      place: "Lobos, Buenos Aires",
      explore: "Explore my work",
      downloadCv: "Download CV",
      portraitLabel: "Portrait of Francisco. Drag it to turn it.",
      portraitHint: "Drag the portrait or tap it to point the compass.",
      portraitKeyboard: "With a keyboard: arrow keys turn it, Enter points the compass and Escape puts it back.",
    },
    work: {
      openScreenshot: "View screenshot of",
    },
    reader: {
      title: "How I read a request",
      tabsLabel: "Example requests",
      blocks: {
        actors: "who takes part",
        states: "what it goes through",
        rules: "what limits it",
        question: "the question nobody asked",
      },
      note: "Situations that come up in many projects. They aren’t from my clients.",
      replay: "Read it again",
      hint: "Hover, tap or focus a highlighted term to see why I ask about it.",
      why: "Why I ask it",
      cases: [
        {
          tab: "Online payments",
          ask: [
            { text: "We want the " },
            { text: "customer", mark: "actor", note: "I need to know whether they buy with an account or as a guest: it decides how I tell them a payment failed and who gets the refund." },
            { text: " to pay by card and the order to become " },
            { text: "paid", mark: "state", note: "I need to know who decides it’s paid. If the browser redirect marks it, a declined payment can end up looking approved." },
            { text: " once the " },
            { text: "payment provider", mark: "actor", note: "I need to know how the provider notifies us and how often it retries: that keeps an order from hanging if a notification gets lost." },
            { text: " confirms it, " },
            { text: "without charging twice", mark: "rule", note: "I need a unique key per payment attempt. If the customer taps twice or the notification repeats, the system has to recognize it." },
            { text: "." },
          ],
          actors: ["Customer", "Payment provider", "Warehouse"],
          states: ["created", "awaiting payment", "paid", "being prepared", "cancelled"],
          rules: [
            "The order is marked paid by the provider’s notification, not by the browser redirect.",
            "Each notification is processed once, even if it arrives twice.",
            "An unpaid order is cancelled after 30 minutes and releases its stock.",
          ],
          question: "If the approval arrives after the order was cancelled, do we bring it back or refund the money?",
          questionNote: "It’s the case that shows up in production and nobody designed. If we don’t decide it upfront, someone fixes it by hand, differently each time.",
        },
        {
          tab: "Appointments",
          ask: [
            { text: "We need " },
            { text: "patients", mark: "actor", note: "I need to know whether someone can book for another person, like a child: it changes who gets the reminders and whose name is on it." },
            { text: " to book with any of our " },
            { text: "practitioners", mark: "actor", note: "I need to know whether they work in more than one place or specialty: it decides if the schedule belongs to the person or to each office." },
            { text: ", each one " },
            { text: "managing their own schedule", mark: "rule", note: "I need to know what each one can change without the front desk. Blocking a day off isn’t the same as moving booked appointments." },
            { text: ", and every booking " },
            { text: "confirmed", mark: "state", note: "I need to know who confirms and what happens if nobody does: it decides whether the slot keeps blocking the schedule or frees up." },
            { text: " by message." },
          ],
          actors: ["Patient", "Practitioner", "Front desk"],
          states: ["open", "booked", "confirmed", "attended", "no-show"],
          rules: [
            "A practitioner can’t have two overlapping appointments.",
            "Patients can cancel for free up to 24 hours before.",
            "The front desk can double-book; patients can’t.",
          ],
          question: "If a practitioner changes their hours, what happens to the appointments already booked in the slot they drop?",
          questionNote: "Schedules change all the time. If this isn’t defined, appointments are left orphaned and the patient finds out at the door.",
        },
        {
          tab: "Multi-warehouse stock",
          ask: [
            { text: "We want to see the stock of every " },
            { text: "warehouse", mark: "actor", note: "I need to know whether each warehouse sells on its own or they all supply the same store: it changes where every order ships from." },
            { text: " in one place, and the " },
            { text: "store", mark: "actor", note: "I need to know which stock the store sees: one warehouse, the sum of all of them, or only what can ship today." },
            { text: " should " },
            { text: "never sell what isn’t there", mark: "rule", note: "I need to know when stock gets reserved: in the cart, at payment or at confirmation. Each option fails in a different way." },
            { text: ", even with goods " },
            { text: "on their way", mark: "state", note: "I need to know who owns goods while they travel. If they count for no warehouse, they vanish from the numbers for a few days." },
            { text: " from one warehouse to another." },
          ],
          actors: ["Store", "Warehouse", "Logistics"],
          states: ["available", "reserved", "in transit", "received"],
          rules: [
            "A sale reserves stock from a warehouse that can ship it.",
            "A transfer subtracts from the origin when it leaves and adds to the destination when it arrives.",
            "Reserved stock is never shown as available.",
          ],
          question: "Can goods in transit between warehouses be sold? And if so, which warehouse do they ship from?",
          questionNote: "Selling goods in transit speeds up sales, but it promises a date that depends on a truck. It’s a business decision before it’s a technical one.",
        },
      ],
    },
    experience: {
      contribution: "My contribution",
      stopsLabel: "Stops along the way",
      now: "today",
    },
    projects: {
      howBuilt: "How I built it",
      talk: "Let’s talk about the project",
    },
    stack: {
      summary: "The tools I use",
    },
    contact: {
      heading: "Let’s talk.",
      inbox: "straight to my inbox",
      copy: "Copy email",
      copied: "Copied",
      copyFailed: "Couldn’t copy it. Select the address instead.",
      cvPdf: "CV as PDF",
      cvWord: "CV as Word",
      formTitle: "Tell me a little",
      formLead: "What do you have in mind?",
      optional: "(optional)",
      privacy: "I’ll only use these details to reply.",
      rateLimited: "Several messages arrived in a row. Wait a minute and try again.",
      emailInstead: "Email me instead",
    },
    gallery: {
      eyebrow: "A look at the product",
      close: "Close gallery",
      previous: "Previous screenshot",
      next: "Next screenshot",
      choose: "Choose project",
      visit: "Visit website",
    },
    footer: {
      place: "Lobos, Buenos Aires",
      backToTop: "Back to top",
    },
  },
  profile: {
    ...sharedProfile,
    cv: "/Francisco_Porciel_CV_2026.pdf",
    tagline: "Interfaces, backend and integrations.",
    intro: "I build web applications and work with clients to define what they need. I care about how an interface feels to use and how the system works behind it: data, integrations and day-to-day operations. I also use AI tools throughout my development process.",
  },
  languageSwitch: {
    label: "Change language",
    es: "ES",
    en: "EN",
  },
  navigation: [
  {
    "label": "Work",
    "href": "#contexts"
  },
  {
    "label": "Approach",
    "href": "#systems"
  },
  {
    "label": "Experience",
    "href": "#work"
  },
  {
    "label": "Projects",
    "href": "#projects"
  },
  {
    "label": "Contact",
    "href": "#contact"
  }
],
  hero: {
    actions: {
      contact: "Contact",
      cv: "CV",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    panelTitle: "From context to delivery",
    panelLinks: {
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    commandLines: [
  "Listen to the client",
  "Design the experience",
  "Build the system",
  "Validate with evidence",
  "Deliver and improve"
],
    metrics: [
  {
    "label": "Now",
    "value": "Brace Developers",
    "detail": "Full Stack Developer"
  },
  {
    "label": "Product",
    "value": "UI + Backend",
    "detail": "People, flows and data"
  },
  {
    "label": "Method",
    "value": "Responsible AI",
    "detail": "Research, build, validate"
  },
  {
    "label": "English",
    "value": "B2",
    "detail": "Technical communication"
  }
],
  },
  sections: {
    principles: {
      eyebrow: "How I work",
      title: "How I",
      accent: "approach the work",
      description: "I like to understand the business and talk to the people using the system. That helps me decide what to build and how to build it.",
      icon: ShieldCheck,
    },
    experience: {
      eyebrow: "Experience",
      title: "Experience",
      accent: "from 2023 to today",
      description: "My work with development teams and client projects.",
      icon: BriefcaseBusiness,
    },
    contexts: {
      eyebrow: "Selected work",
      title: "Projects",
      accent: "and clients",
      description: "Products with real users and daily operations. For each one, what I built.",
      icon: Network,
    },
    projects: {
      eyebrow: "Own projects",
      title: "Personal",
      accent: "projects",
      description: "I also build ideas that interest me outside of work.",
      icon: Code2,
    },
    stack: {
      eyebrow: "Stack",
      title: "Tools by responsibility",
      description: "Grouped by the role they play inside a system.",
      icon: Network,
    },
  },
  principles: [
    {
      title: "Understand the need",
      description: "I talk with the client, learn how they work and define what the system needs to do.",
      icon: MessagesSquare,
    },
    {
      title: "Care for the interface",
      description: "I work on navigation, forms and states so each task is easy to follow.",
      icon: PanelsTopLeft,
    },
    {
      title: "Connect the parts",
      description: "I build frontend, backend and integrations, taking care of data and permissions.",
      icon: Workflow,
    },
    {
      title: "Review the work",
      description: "I test changes, review code and fix issues that come up when using the application.",
      icon: ShieldCheck,
    },
  ],
  agenticWorkflow: {
    eyebrow: "AI as a tool",
    title: "Using AI responsibly.",
    description:
      "I use it to review code, explore alternatives and help with implementation. I define what I need, review its suggestions and test the result before adding it to the project.",
    steps: ["Understand the context", "Explore alternatives", "Implement", "Review and test"],
  },
  experience: [
    {
      role: "Full Stack Developer",
      company: "Brace Developers",
      period: "Oct 2025 - Present",
      context: "Full stack development for clients in different industries, working with the Brace Developers team.",
      icon: BriefcaseBusiness,
      logo: {
        src: "/showcase/bracedevelopers_logo.jpg",
        alt: "Brace Developers logo.",
      },
      highlights: ["Interfaces, APIs and databases using React, Next.js, NestJS and PostgreSQL.", "Client collaboration, requirements definition and usability improvements.", "Role-based permissions, multi-tenant applications and integrations with external APIs and AI.", "AWS services, deployments, code review and CI/CD workflows."],
      stack: ["TypeScript", "React", "NestJS", "TypeORM", "PostgreSQL", "AWS"],
    },
{
  "role": "Full Stack Developer",
  "company": "Firenze",
  "period": "2026",
  "context": "Digital storefront and branch operations for an ice cream shop and café.",
  "icon": ShoppingCart,
  "logo": {
    "src": "/showcase/firenze-logo.png",
    "alt": "Firenze logo."
  },
  "highlights": ["Storefront and management console for catalog, orders and branch operations.", "Infrastructure as code with AWS CDK and CloudFormation; ECS/EC2 containers, RDS and S3/SQS services.", "IAM permissions, secrets management, observability and GitHub Actions deployment workflows.", "OpenAPI contracts, an Android app and receipt printing; preparation of WhatsApp and Mercado Pago integrations."],
  "stack": ["Next.js", "NestJS", "PostgreSQL", "AWS CDK", "Docker", "OpenAPI", "Android"]
},
{
  "role": "Full Stack Developer · Internship",
  "company": "Robolytics",
  "period": "Jul 2025 - Nov 2025",
  "context": "Pricing platform with scraping, data ingestion and microservices.",
  "icon": Database,
  "highlights": [
    "Three NestJS services with direct PostgreSQL clients, schemas and migrations without an ORM.",
    "Puppeteer and Playwright scraping, LLM normalization and configurable source management.",
    "Next.js frontend, Ant Design and Recharts; CI/CD collaboration with GitLab and GitHub."
  ],
  "stack": [
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "Puppeteer",
    "Playwright"
  ]
},
{
  "role": "Full Stack Developer",
  "company": "Nisaley",
  "period": "Dec 2024 - Jan 2025",
  "context": "E-commerce MVP with catalog and checkout.",
  "icon": ShoppingCart,
  "highlights": [
    "Functional MVP in under six weeks with products, Mercado Pago, QR codes and S3 images.",
    "TanStack Query queries and cache, Zustand state and Drizzle authentication."
  ],
  "stack": [
    "Next.js",
    "tRPC",
    "Drizzle",
    "AWS S3"
  ]
},
    {
      role: "Backend Developer",
      company: "Trabajo en Digital",
      period: "Mar 2024 - Sep 2024",
      context: "Backend development for job listings and applications, focused on validation, queries and stability.",
      icon: Database,
      logo: {
        src: "/showcase/trabajoendigital_logo.jpg",
        alt: "Trabajo en Digital logo.",
      },
      highlights: [
        "Database schemas, endpoints, validations and mutations.",
        "Critical bugs, middleware, routes and performance work.",
        "Testing, optimization scripts and configuration migration.",
      ],
      stack: ["Node.js", "tRPC", "PostgreSQL", "Testing"],
    },
    {
      role: "Teaching Assistant",
      company: "Henry",
      period: "May 2023 - Jul 2023",
      context: "Full-stack support, debugging and technical guidance.",
      icon: Workflow,
      logo: {
        src: "/showcase/henryok_logo.jpg",
        alt: "Henry logo.",
      },
      highlights: ["Pair programming, technical questions and problem solving.", "Helping students understand problems and solve them independently."],
      stack: ["JavaScript", "React", "Node.js", "Mentoring"],
    },
  ],
  clientContexts: [
    {
      name: "PLY",
      url: "https://www.ply-tech.com/",
      type: "Logistics SaaS · Brace Developers",
      description: "A logistics SaaS platform that grew out of Llano Envíos. I worked on interfaces, backend services and features for daily operations, with support for multiple organizations.",
      icon: Truck,
      accent: "#ff6a52",
      points: [
        "Several organizations in one system, each with its own data.",
        "Role-based permissions for everyone who operates it.",
        "Integrations with external APIs and AWS services.",
      ],
      stack: ["TypeScript", "React", "NestJS", "PostgreSQL", "AWS"],
      tags: ["SaaS", "Multi-tenant", "Full stack"],
      linkLabel: "Public site",
      logo: { src: "/showcase/ply-logo.svg", alt: "PLY", width: 1382, height: 489 },
      visual: { src: "/screenshots/ply.webp", alt: "Public PLY page, a logistics SaaS platform.", width: 1600, height: 767 },
    },
    {
      name: "Firenze",
      url: "https://heladeriafirenze.com/",
      type: "Commerce and branch operations",
      description: "A storefront and management system for an ice cream shop and café. I built the catalog, ordering and branch operations, along with the backend and the AWS infrastructure.",
      icon: ShoppingCart,
      accent: "#f2b66d",
      points: [
        "Management console per branch: catalog, orders and operations.",
        "Infrastructure as code with AWS CDK and deployments with GitHub Actions.",
        "Android app, receipt printing and OpenAPI contracts.",
      ],
      stack: ["Next.js", "NestJS", "PostgreSQL", "AWS CDK", "Docker", "Android"],
      tags: ["UI/UX", "Backend", "AWS"],
      linkLabel: "Visit the store",
      logo: { src: "/showcase/firenze-logo.webp", alt: "Firenze", width: 640, height: 236 },
      visual: { src: "/screenshots/firenze.webp", alt: "Firenze online store.", width: 1600, height: 866 },
    },
    {
      name: "Avateen",
      type: "Mental health · Brace Developers",
      description: "I built the frontend and backend of a mental health support platform for teenagers, with spaces for their caregivers and their psychologists.",
      icon: PanelsTopLeft,
      accent: "#e266d8",
      points: [
        "One portal per role: teenager, caregiver, psychologist and admin.",
        "A daily check-in with an emotional traffic light.",
        "AI over anonymized data and an audit log of every access.",
      ],
      stack: ["Next.js", "NestJS", "TypeORM", "PostgreSQL", "AWS"],
      tags: ["Frontend", "Backend", "Role-based access"],
      logo: { src: "/showcase/avateen-logo.webp", alt: "Avateen", width: 640, height: 170 },
      visual: { src: "/screenshots/avateen-login.webp", alt: "Avateen sign-in screen.", width: 1600, height: 1021 },
    },
    {
      name: "EIA Campo Guamal",
      url: "https://eiacampoguamal.com/",
      type: "Public site with a CMS",
      description: "A website with content managed in PayloadCMS. I worked on the frontend and the CMS integration.",
      icon: Leaf,
      accent: "#7ddc8c",
      tags: ["Frontend", "CMS", "Content"],
      linkLabel: "Public site",
      visual: { src: "/screenshots/guamal.webp", alt: "EIA Campo Guamal content manager.", width: 917, height: 552 },
    },
    {
      name: "Incolflex",
      url: "https://www.incolflex.co/",
      type: "E-commerce and admin",
      description: "I worked on catalog, product, banner and stock features for the store and its admin panel.",
      icon: ShoppingCart,
      accent: "#7cc4ff",
      tags: ["E-commerce", "Catalog", "Admin"],
      linkLabel: "Public site",
      visual: { src: "/screenshots/incolflex.webp", alt: "Incolflex admin panel.", width: 1083, height: 732 },
    },
  ],
  projects: [
    {
      name: "WePlay",
      eyebrow: "Gaming platform / community",
      meta: "Personal project",
      summary: "WePlay comes from something I’ve always enjoyed: meeting people through games. I want to build a place to find teammates, share matches and learn together, with room for different personalities and levels of experience.",
      signalLabel: "Technical decision",
      signal: "I built rooms and participants with PostgreSQL and tRPC, real-time sync with SSE and Redis, authentication with Auth.js and voice with LiveKit.",
      initials: "WP",
      icon: Radio,
      accent: "#a78bfa",
      status: { label: "Paused, I want to pick it up again", tone: "paused" },
      image: { src: "/screenshots/weplay.webp", alt: "WePlay home screen.", width: 1379, height: 770 },
      stack: ["Next.js", "tRPC", "Drizzle", "Redis", "LiveKit", "AWS S3"],
      links: [{ label: "Write me to know more", href: `mailto:${sharedProfile.email}`, kind: "contact" }],
    },
    {
      name: "GameVault",
      eyebrow: "Desktop app",
      meta: "Personal project",
      summary: "A launcher for my collection of classic games, with controller profiles and a console mode for playing from the couch.",
      signalLabel: "How it’s built",
      signal: "A native WPF interface with the logic in Python. It detects controllers with SDL and saves players, buttons and dead zones per game. It works entirely with a keyboard or a controller.",
      initials: "GV",
      icon: Blocks,
      accent: "#ffb84d",
      status: { label: "In use", tone: "active" },
      art: { src: "/showcase/gamevault-wordmark.webp", alt: "GameVault", width: 1100, height: 350 },
      mark: { src: "/showcase/gamevault-mark.webp", alt: "", width: 256, height: 256 },
      stack: ["C#", "WPF", "Python", "SDL"],
      links: [],
    },
  ],
  stack: [
    { label: "Languages", icon: Code2, items: ["TypeScript", "JavaScript"] },
    { label: "Frontend", icon: Blocks, items: ["React", "Next.js", "Tailwind", "CSS Modules", "Radix UI"] },
    { label: "Backend", icon: ServerCog, items: ["Node.js", "NestJS", "tRPC", "REST", "Socket.IO", "JWT"] },
    { label: "Data", icon: Database, items: ["PostgreSQL", "TypeORM", "Drizzle", "Redis"] },
    { label: "Infrastructure", icon: GitBranch, items: ["AWS CDK", "CloudFormation", "ECS / EC2", "ECR", "RDS", "S3", "SQS", "CloudFront", "Cognito"] },
    { label: "Delivery & operations", icon: Workflow, items: ["Docker", "GitHub Actions / OIDC", "GitLab CI", "IAM", "Secrets Manager", "CloudWatch", "Cloudflare"] },
    { label: "Automation", icon: Bot, items: ["Claude", "OpenAI", "Agents", "Playwright", "Puppeteer"] },
  ],
  contact: {
    eyebrow: "Contact",
    title: "Have a project in mind?",
    description: "We can talk about your idea or a job opportunity. I’m interested in continuing to build applications and taking part in product decisions.",
    emailLine: "or write me at",
    fitTitle: "Good fit",
    fitItems: ["Products with real business logic", "End-to-end development", "Clear interfaces and product decisions"],
    rhythmTitle: "How I start",
    rhythmItems: ["Understand the problem first", "Define scope before estimating", "Validate, deliver and improve"],
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      message: "Message",
      submit: "Send",
      submitting: "Sending",
      sending: "Sending...",
      genericError: "Something went wrong. Try again in a moment.",
      dryRunSuccess: "This form does not send messages yet. Please use the email shown in this section.",
      success: "Message sent. I will reply as soon as I can.",
    },
  },
  footerLegal: {
    privacy: "Privacy",
    terms: "Terms",
  },
  footer: "Available for work / 2026",
};
