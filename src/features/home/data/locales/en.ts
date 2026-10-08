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
} from "lucide-react";
import { sharedProfile } from "@/features/home/data/shared";
import type { PortfolioContent } from "@/features/home/data/types";

export const en: PortfolioContent = {
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
      title: "How I approach the work",
      description: "I like to understand the business and talk to the people using the system. That helps me decide what to build and how to build it.",
      icon: ShieldCheck,
    },
    experience: {
      eyebrow: "Experience",
      title: "Experience",
      description: "My work with development teams and client projects.",
      icon: BriefcaseBusiness,
    },
    contexts: {
      eyebrow: "Selected work",
      title: "Projects and clients",
      description: "A selection of projects I contributed to, along with some of my own work.",
      icon: Network,
    },
    projects: {
      eyebrow: "Own projects",
      title: "Personal projects",
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
      description: "A logistics SaaS platform evolved from Llano Envíos. I worked on interfaces, backend services and daily operations features, with support for multiple organizations.",
      icon: Truck,
      tags: ["SaaS", "Multi-tenant", "Full stack"],
      linkLabel: "Public site",
      logo: {
        src: "/showcase/ply-logo.svg",
        alt: "PLY logo.",
      },
      visual: {
        src: "/screenshots/ply.jpg",
        alt: "Public PLY page, a logistics SaaS platform.",
      },
    },
    {
      name: "Avateen",
      type: "Mental health · Brace Developers",
      description: "I contributed to frontend and backend development for a mental health support platform. My work includes user flows, permissions and integrations with external services.",
      icon: PanelsTopLeft,
      tags: ["Frontend", "Backend", "Integrations"],
      logo: {
        src: "/showcase/avateen-logo.svg",
        alt: "Avateen logo.",
      },
    },
{
  "name": "Firenze",
  "url": "https://heladeriafirenze.com/",
  "type": "Commerce + branch operations",
  "description": "A storefront and management system for an ice cream shop and café. I built the catalog, ordering and branch operations features, along with the backend and AWS infrastructure.",
  "icon": ShoppingCart,
  "tags": ["UI/UX", "Backend", "AWS"],
  "linkLabel": "Visit storefront",
  "logo": {
    "src": "/showcase/firenze-logo.png",
    "alt": "Firenze logo."
  },
  "visual": {
    "src": "/screenshots/firenze.jpg",
    "alt": "Public screenshot of the Firenze storefront."
  }
},
    {
      name: "EIA Campo Guamal",
      url: "https://eiacampoguamal.com/",
      type: "Public site + CMS",
      description: "A website with content management through PayloadCMS. I contributed to the frontend and CMS integration.",
      icon: Leaf,
      tags: ["Frontend", "CMS", "Content"],
      linkLabel: "Public site",
      logo: {
        src: "/showcase/guamal-logo.png",
        alt: "EIA Campo Guamal logo.",
      },
      visual: {
        src: "/screenshots/guamal.png",
        alt: "EIA Campo Guamal screenshot used as professional work context.",
      },
    },
    {
      name: "Incolflex",
      url: "https://www.incolflex.co/",
      type: "E-commerce and admin",
      description: "I worked on catalog, product, banner and stock features for the storefront and its administration.",
      icon: ShoppingCart,
      tags: ["E-commerce", "Catalog", "Administration"],
      linkLabel: "Public site",
      logo: {
        src: "/showcase/incolflex-logo.svg",
        alt: "Incolflex logo.",
      },
      visual: {
        src: "/screenshots/incolflex.png",
        alt: "Incolflex screenshot used as professional work context.",
      },
    },
  ],
  projects: [
    {
      name: "WePlay",
      eyebrow: "Gaming platform / community",
      meta: "Personal project · Paused",
      summary: "WePlay comes from something I’ve always enjoyed: meeting people through games. I want to build a place to find teammates, share games and learn together, welcoming different personalities and levels of experience.",
      signalLabel: "Technical decision",
      signal: "I built rooms and participant management with PostgreSQL and tRPC, real-time synchronization with SSE and Redis, Auth.js authentication and LiveKit voice. It is currently paused, and I plan to return to it.",
      initials: "WP",
      logo: {
        src: "/showcase/weplay-logo.svg",
        alt: "WePlay logo.",
      },
      image: {
        src: "/screenshots/weplay.png",
        alt: "WePlay screenshot, a gaming and community platform.",
      },
      icon: Radio,
      stack: ["Next.js", "tRPC", "Drizzle", "Redis", "LiveKit", "AWS S3"],
      links: [{ label: "Write me to know more", href: `mailto:${sharedProfile.email}`, kind: "contact" }],
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
