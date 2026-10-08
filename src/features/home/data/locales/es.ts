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

export const es: PortfolioContent = {
  profile: {
    ...sharedProfile,
    cv: "/Francisco_Porciel_CV_2026_ES.pdf",
    tagline: "Interfaces, backend e integraciones.",
    intro: "Desarrollo aplicaciones web y trabajo con clientes para definir lo que necesitan. Me interesa cómo se usa una interfaz y cómo funciona el sistema detrás: los datos, las integraciones y la operación. Hoy también uso herramientas de IA en mi proceso de desarrollo.",
  },
  languageSwitch: {
    label: "Cambiar idioma",
    es: "ES",
    en: "EN",
  },
  navigation: [
  {
    "label": "Trabajo",
    "href": "#contexts"
  },
  {
    "label": "Cómo trabajo",
    "href": "#systems"
  },
  {
    "label": "Experiencia",
    "href": "#work"
  },
  {
    "label": "Proyectos",
    "href": "#projects"
  },
  {
    "label": "Contacto",
    "href": "#contact"
  }
],
  hero: {
    actions: {
      contact: "Contacto",
      cv: "CV",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    panelTitle: "Del contexto a la entrega",
    panelLinks: {
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    commandLines: [
  "Escuchar al cliente",
  "Diseñar la experiencia",
  "Construir el sistema",
  "Validar con evidencia",
  "Entregar y mejorar"
],
    metrics: [
  {
    "label": "Actual",
    "value": "Brace Developers",
    "detail": "Full Stack Developer"
  },
  {
    "label": "Producto",
    "value": "UI + Backend",
    "detail": "Personas, flujos y datos"
  },
  {
    "label": "Método",
    "value": "IA con responsabilidad",
    "detail": "Investigar, construir, validar"
  },
  {
    "label": "Inglés",
    "value": "B2",
    "detail": "Comunicación técnica"
  }
],
  },
  sections: {
    principles: {
      eyebrow: "Cómo trabajo",
      title: "Mi forma de trabajar",
      description: "Me gusta entender cómo funciona el negocio y hablar con las personas que usan el sistema. Eso me ayuda a decidir qué construir y cómo hacerlo.",
      icon: ShieldCheck,
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Experiencia",
      description: "Mi recorrido en equipos de desarrollo y proyectos para clientes.",
      icon: BriefcaseBusiness,
    },
    contexts: {
      eyebrow: "Trabajo seleccionado",
      title: "Proyectos y clientes",
      description: "Una selección de trabajos en los que participé, junto con algunos desarrollos propios.",
      icon: Network,
    },
    projects: {
      eyebrow: "Proyectos propios",
      title: "Proyectos personales",
      description: "También desarrollo ideas que me interesan por fuera del trabajo.",
      icon: Code2,
    },
    stack: {
      eyebrow: "Stack",
      title: "Herramientas por responsabilidad",
      description: "Separadas por el rol que cumplen dentro de un sistema.",
      icon: Network,
    },
  },
  principles: [
    {
      title: "Entender lo que hace falta",
      description: "Converso con el cliente, reviso cómo trabaja y definimos qué necesita el sistema.",
      icon: MessagesSquare,
    },
    {
      title: "Cuidar la interfaz",
      description: "Trabajo en la navegación, los formularios y los estados para que cada tarea sea fácil de seguir.",
      icon: PanelsTopLeft,
    },
    {
      title: "Conectar las partes",
      description: "Desarrollo frontend, backend e integraciones, cuidando los datos y los permisos.",
      icon: Workflow,
    },
    {
      title: "Revisar lo que entrego",
      description: "Pruebo los cambios, reviso el código y corrijo lo que aparece al usar la aplicación.",
      icon: ShieldCheck,
    },
  ],
  agenticWorkflow: {
    eyebrow: "IA como herramienta",
    title: "IA con responsabilidad.",
    description:
      "La uso para revisar código, explorar alternativas y avanzar con implementaciones. Defino lo que necesito, reviso lo que propone y pruebo el resultado antes de incorporarlo al proyecto.",
    steps: ["Entender el contexto", "Probar alternativas", "Implementar", "Revisar y probar"],
  },
  experience: [
    {
      role: "Full Stack Developer",
      company: "Brace Developers",
      period: "Oct 2025 - Actualidad",
      context: "Desarrollo full stack para clientes de distintos sectores, trabajando con el equipo de Brace Developers.",
      icon: BriefcaseBusiness,
      logo: {
        src: "/showcase/bracedevelopers_logo.jpg",
        alt: "Logo de Brace Developers.",
      },
      highlights: ["Interfaces, APIs y bases de datos con React, Next.js, NestJS y PostgreSQL.", "Contacto con clientes, definición de requerimientos y mejoras en la experiencia de uso.", "Permisos por rol, aplicaciones multi-tenant e integraciones con APIs e IA.", "Trabajo con servicios AWS, despliegues, revisión de código y CI/CD."],
      stack: ["TypeScript", "React", "NestJS", "TypeORM", "PostgreSQL", "AWS"],
    },
{
  "role": "Full Stack Developer",
  "company": "Firenze",
  "period": "2026",
  "context": "Tienda digital y operación de heladería y cafetería por sucursal.",
  "icon": ShoppingCart,
  "logo": {
    "src": "/showcase/firenze-logo.png",
    "alt": "Logo de Firenze."
  },
  "highlights": ["Tienda y consola de gestión para catálogo, pedidos y operación por sucursal.", "Infraestructura como código con AWS CDK y CloudFormation; contenedores ECS/EC2, RDS y servicios S3/SQS.", "Permisos IAM, gestión de secretos, observabilidad y flujos de despliegue con GitHub Actions.", "Contratos OpenAPI, aplicación Android e impresión de tickets; preparación de integraciones con WhatsApp y Mercado Pago."],
  "stack": ["Next.js", "NestJS", "PostgreSQL", "AWS CDK", "Docker", "OpenAPI", "Android"]
},
{
  "role": "Full Stack Developer · Pasantía",
  "company": "Robolytics",
  "period": "Jul 2025 - Nov 2025",
  "context": "Plataforma de pricing con scraping, ingesta de datos y microservicios.",
  "icon": Database,
  "highlights": [
    "Tres servicios NestJS con PostgreSQL directo, esquemas y migraciones sin ORM.",
    "Scraping con Puppeteer y Playwright, normalización mediante LLM y gestión configurable de fuentes.",
    "Frontend Next.js, Ant Design y Recharts; colaboración en CI/CD con GitLab y GitHub."
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
  "period": "Dic 2024 - Ene 2025",
  "context": "MVP de e-commerce con catálogo y checkout.",
  "icon": ShoppingCart,
  "highlights": [
    "MVP funcional en menos de seis semanas con productos, Mercado Pago, QR e imágenes en S3.",
    "Consultas y caché con TanStack Query, estado con Zustand y autenticación con Drizzle."
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
      context: "Desarrollo backend para publicaciones de empleo y postulaciones, con foco en validaciones, consultas y estabilidad.",
      icon: Database,
      logo: {
        src: "/showcase/trabajoendigital_logo.jpg",
        alt: "Logo de Trabajo en Digital.",
      },
      highlights: [
        "Diseño de esquemas, endpoints, validaciones y mutaciones.",
        "Resolución de bugs críticos, mejoras de performance y trabajo sobre middlewares y rutas.",
        "Testing, scripts de optimización y migración de configuraciones.",
      ],
      stack: ["Node.js", "tRPC", "PostgreSQL", "Testing"],
    },
    {
      role: "Teaching Assistant",
      company: "Henry",
      period: "May 2023 - Jul 2023",
      context: "Acompañamiento técnico a estudiantes de desarrollo full-stack.",
      icon: Workflow,
      logo: {
        src: "/showcase/henryok_logo.jpg",
        alt: "Logo de Henry.",
      },
      highlights: [
        "Pair programming, resolución de dudas y debugging en tiempo real.",
        "Acompañamiento para que los estudiantes pudieran entender el problema y resolverlo con autonomía.",
      ],
      stack: ["JavaScript", "React", "Node.js", "Mentoring"],
    },
  ],
  clientContexts: [
    {
      name: "PLY",
      url: "https://www.ply-tech.com/",
      type: "SaaS logístico · Brace Developers",
      description: "Plataforma SaaS logística, evolucionada desde Llano Envíos. Trabajé en interfaces, backend y funciones para la operación diaria, con soporte para múltiples organizaciones.",
      icon: Truck,
      tags: ["SaaS", "Multi-tenant", "Full stack"],
      linkLabel: "Sitio público",
      logo: {
        src: "/showcase/ply-logo.svg",
        alt: "Logo de PLY.",
      },
      visual: {
        src: "/screenshots/ply.jpg",
        alt: "Página pública de PLY, plataforma SaaS logística.",
      },
    },
    {
      name: "Avateen",
      type: "Salud mental · Brace Developers",
      description: "Participé en frontend y backend de una plataforma de acompañamiento en salud mental. Mi trabajo incluye flujos de usuario, permisos e integraciones con servicios externos.",
      icon: PanelsTopLeft,
      tags: ["Frontend", "Backend", "Integraciones"],
      logo: {
        src: "/showcase/avateen-logo.svg",
        alt: "Logo de Avateen.",
      },
    },
{
  "name": "Firenze",
  "url": "https://heladeriafirenze.com/",
  "type": "Comercio + operación por sucursal",
  "description": "Tienda y sistema de gestión para una heladería y cafetería. Desarrollé el catálogo, los pedidos y la operación por sucursal, junto con el backend y la infraestructura en AWS.",
  "icon": ShoppingCart,
  "tags": ["UI/UX", "Backend", "AWS"],
  "linkLabel": "Ver tienda",
  "logo": {
    "src": "/showcase/firenze-logo.png",
    "alt": "Logo de Firenze."
  },
  "visual": {
    "src": "/screenshots/firenze.jpg",
    "alt": "Captura pública de la tienda Firenze."
  }
},
    {
      name: "EIA Campo Guamal",
      url: "https://eiacampoguamal.com/",
      type: "Sitio público + CMS",
      description: "Sitio web con administración de contenidos mediante PayloadCMS. Participé en el frontend y la integración del gestor de contenidos.",
      icon: Leaf,
      tags: ["Frontend", "CMS", "Contenido"],
      linkLabel: "Sitio público",
      logo: {
        src: "/showcase/guamal-logo.png",
        alt: "Logo de EIA Campo Guamal.",
      },
      visual: {
        src: "/screenshots/guamal.png",
        alt: "Captura de EIA Campo Guamal usada como contexto visual de trabajo profesional.",
      },
    },
    {
      name: "Incolflex",
      url: "https://www.incolflex.co/",
      type: "E-commerce y admin",
      description: "Trabajé en funciones de catálogo, productos, banners y stock para la tienda y su administración.",
      icon: ShoppingCart,
      tags: ["E-commerce", "Catálogo", "Administración"],
      linkLabel: "Sitio público",
      logo: {
        src: "/showcase/incolflex-logo.svg",
        alt: "Logo de Incolflex.",
      },
      visual: {
        src: "/screenshots/incolflex.png",
        alt: "Captura de Incolflex usada como contexto visual de trabajo profesional.",
      },
    },
  ],
  projects: [
    {
      name: "WePlay",
      eyebrow: "Plataforma gaming / comunidad",
      meta: "Proyecto personal · En pausa",
      summary: "WePlay nace de algo que siempre disfruté: conocer gente jugando. Quiero crear un espacio para encontrar compañeros, compartir partidas y aprender juntos, con lugar para distintas formas de ser y niveles de experiencia.",
      signalLabel: "Decisión técnica",
      signal: "Desarrollé salas y participantes con PostgreSQL y tRPC, sincronización en tiempo real con SSE y Redis, autenticación con Auth.js y voz con LiveKit. Está en pausa y quiero retomarlo.",
      initials: "WP",
      logo: {
        src: "/showcase/weplay-logo.svg",
        alt: "Logo de WePlay.",
      },
      image: {
        src: "/screenshots/weplay.png",
        alt: "Captura de WePlay, plataforma gaming y de comunidad.",
      },
      icon: Radio,
      stack: ["Next.js", "tRPC", "Drizzle", "Redis", "LiveKit", "AWS S3"],
      links: [{ label: "Escribime para saber más", href: `mailto:${sharedProfile.email}`, kind: "contact" }],
    },
  ],
  stack: [
    { label: "Lenguajes", icon: Code2, items: ["TypeScript", "JavaScript"] },
    { label: "Frontend", icon: Blocks, items: ["React", "Next.js", "Tailwind", "CSS Modules", "Radix UI"] },
    { label: "Backend", icon: ServerCog, items: ["Node.js", "NestJS", "tRPC", "REST", "Socket.IO", "JWT"] },
    { label: "Datos", icon: Database, items: ["PostgreSQL", "TypeORM", "Drizzle", "Redis"] },
    { label: "Infraestructura", icon: GitBranch, items: ["AWS CDK", "CloudFormation", "ECS / EC2", "ECR", "RDS", "S3", "SQS", "CloudFront", "Cognito"] },
    { label: "Entrega y operación", icon: Workflow, items: ["Docker", "GitHub Actions / OIDC", "GitLab CI", "IAM", "Secrets Manager", "CloudWatch", "Cloudflare"] },
    { label: "Automatización", icon: Bot, items: ["Claude", "OpenAI", "Agents", "Playwright", "Puppeteer"] },
  ],
  contact: {
    eyebrow: "Contacto",
    title: "¿Tenés un proyecto en mente?",
    description: "Podemos conversar sobre tu idea o sobre una oportunidad de trabajo. Me interesa seguir desarrollando aplicaciones y participar en las decisiones del producto.",
    emailLine: "o escribime a",
    fitTitle: "Me va bien en",
    fitItems: [
      "Productos con lógica de negocio real",
      "Desarrollo de punta a punta",
      "Interfaces claras y decisiones de producto",
    ],
    rhythmTitle: "Cómo arranco",
    rhythmItems: [
      "Entender el problema primero",
      "Definir el alcance antes de estimar",
      "Validar, entregar y mejorar",
    ],
    form: {
      name: "Nombre",
      email: "Email",
      company: "Empresa",
      message: "Mensaje",
      submit: "Enviar",
      submitting: "Enviando",
      sending: "Enviando...",
      genericError: "Algo falló. Probá de nuevo en un momento.",
      dryRunSuccess: "El formulario todavía no envía mensajes. Escribime al email que aparece en esta sección.",
      success: "Mensaje enviado. Te respondo apenas pueda.",
    },
  },
  footerLegal: {
    privacy: "Privacidad",
    terms: "Términos",
  },
  footer: "Disponible para trabajar / 2026",
};
