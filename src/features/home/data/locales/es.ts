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

export const es: PortfolioContent = {
  ui: {
    skipToContent: "Ir al contenido",
    navigationLabel: "Secciones",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    languageNames: { es: "Español", en: "English" },
    sectionMap: { label: "Recorrido de la página", top: "Inicio" },
    hero: {
      status: "Construyendo en Brace Developers",
      coordinates: "35°11′ S · 59°05′ O",
      place: "Lobos, Buenos Aires",
      explore: "Explorá mi trabajo",
      downloadCv: "Descargar CV",
      portraitLabel: "Retrato de Francisco. Arrastralo para girarlo.",
      portraitHint: "Arrastrá el retrato o tocalo para orientar la brújula.",
      portraitKeyboard: "Con el teclado: las flechas lo giran, Enter orienta la brújula y Escape lo vuelve a su lugar.",
    },
    work: {
      openScreenshot: "Ver captura de",
    },
    reader: {
      title: "Así leo un pedido",
      tabsLabel: "Ejemplos de pedidos",
      blocks: {
        actors: "quién participa",
        states: "por dónde pasa",
        rules: "qué lo limita",
        question: "la pregunta que nadie hizo",
      },
      note: "Situaciones que aparecen en muchos proyectos. No son casos de mis clientes.",
      replay: "Leer de nuevo",
      cases: [
        {
          tab: "Cobros online",
          ask: [
            { text: "Queremos que el " },
            { text: "cliente", mark: "actor" },
            { text: " pague con tarjeta y que el pedido pase a " },
            { text: "pagado", mark: "state" },
            { text: " cuando la " },
            { text: "pasarela", mark: "actor" },
            { text: " lo confirme, " },
            { text: "sin cobrar dos veces", mark: "rule" },
            { text: "." },
          ],
          actors: ["Cliente", "Pasarela de pago", "Depósito"],
          states: ["creado", "esperando pago", "pagado", "en preparación", "cancelado"],
          rules: [
            "El pedido se marca pagado con el aviso de la pasarela, no con la vuelta del navegador.",
            "Cada aviso se procesa una sola vez, aunque llegue repetido.",
            "Un pedido sin pago se cancela a los 30 minutos y libera el stock.",
          ],
          question: "Si la aprobación llega después de que el pedido se canceló, ¿lo reactivamos o devolvemos el dinero?",
        },
        {
          tab: "Agenda de turnos",
          ask: [
            { text: "Necesitamos que los " },
            { text: "pacientes", mark: "actor" },
            { text: " saquen turno con cualquiera de los " },
            { text: "profesionales", mark: "actor" },
            { text: " y que cada uno " },
            { text: "maneje su propia agenda", mark: "rule" },
            { text: ", y cada turno " },
            { text: "confirmado", mark: "state" },
            { text: " por mensaje." },
          ],
          actors: ["Paciente", "Profesional", "Recepción"],
          states: ["libre", "reservado", "confirmado", "atendido", "ausente"],
          rules: [
            "Un profesional no puede tener dos turnos superpuestos.",
            "El paciente cancela sin costo hasta 24 horas antes.",
            "Recepción puede dar sobreturnos; el paciente no.",
          ],
          question: "Si un profesional cambia su horario, ¿qué pasa con los turnos que ya estaban dados en la franja que deja?",
        },
        {
          tab: "Stock en depósitos",
          ask: [
            { text: "Queremos ver el stock de cada " },
            { text: "depósito", mark: "actor" },
            { text: " en un solo lugar y que la " },
            { text: "tienda", mark: "actor" },
            { text: " " },
            { text: "no venda lo que no hay", mark: "rule" },
            { text: ", aunque haya mercadería " },
            { text: "viajando", mark: "state" },
            { text: " de un depósito a otro." },
          ],
          actors: ["Tienda", "Depósito", "Logística"],
          states: ["disponible", "reservado", "en tránsito", "recibido"],
          rules: [
            "Una venta reserva stock del depósito que puede despacharla.",
            "Una transferencia descuenta en el origen al salir y suma en el destino al llegar.",
            "Lo reservado no se muestra como disponible.",
          ],
          question: "La mercadería que viaja entre depósitos, ¿se puede vender? Y si se puede, ¿de cuál de los dos sale?",
        },
      ],
    },
    experience: {
      contribution: "Mi aporte",
    },
    projects: {
      howBuilt: "Cómo lo construí",
      talk: "Conversemos sobre el proyecto",
    },
    stack: {
      summary: "Las herramientas que uso",
    },
    contact: {
      heading: "Hablemos.",
      inbox: "directo a mi correo",
      copy: "Copiar email",
      copied: "Copiado",
      copyFailed: "No se pudo copiar. Seleccioná la dirección.",
      cvPdf: "CV en PDF",
      cvWord: "CV en Word",
      formTitle: "Contame un poco",
      formLead: "¿Qué tenés en mente?",
      optional: "(opcional)",
      privacy: "Uso estos datos solo para responderte.",
      rateLimited: "Llegaron varios mensajes seguidos. Esperá un minuto y probá de nuevo.",
      emailInstead: "Escribime por email",
    },
    gallery: {
      eyebrow: "Una mirada al producto",
      close: "Cerrar galería",
      previous: "Captura anterior",
      next: "Siguiente captura",
      choose: "Elegir proyecto",
      visit: "Visitar sitio",
    },
    footer: {
      place: "Lobos, Buenos Aires",
      backToTop: "Volver arriba",
    },
  },
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
      title: "Mi forma",
      accent: "de trabajar",
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
      title: "Proyectos",
      accent: "y clientes",
      description: "Productos con usuarios reales y operación diaria. En cada uno cuento qué construí.",
      icon: Network,
    },
    projects: {
      eyebrow: "Proyectos propios",
      title: "Proyectos",
      accent: "personales",
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
      accent: "#ff6a52",
      points: [
        "Varias organizaciones en un mismo sistema, cada una con sus datos.",
        "Permisos por rol para cada persona que opera.",
        "Integraciones con APIs externas y servicios de AWS.",
      ],
      stack: ["TypeScript", "React", "NestJS", "PostgreSQL", "AWS"],
      tags: ["SaaS", "Multi-tenant", "Full stack"],
      linkLabel: "Sitio público",
      logo: { src: "/showcase/ply-logo.svg", alt: "PLY", width: 1382, height: 489 },
      visual: { src: "/screenshots/ply.webp", alt: "Página pública de PLY, plataforma SaaS logística.", width: 1600, height: 767 },
    },
    {
      name: "Firenze",
      url: "https://heladeriafirenze.com/",
      type: "Comercio y operación por sucursal",
      description: "Tienda y sistema de gestión para una heladería y cafetería. Desarrollé el catálogo, los pedidos y la operación por sucursal, junto con el backend y la infraestructura en AWS.",
      icon: ShoppingCart,
      accent: "#f2b66d",
      points: [
        "Consola de gestión por sucursal: catálogo, pedidos y operación.",
        "Infraestructura como código con AWS CDK y despliegues con GitHub Actions.",
        "App Android, impresión de tickets y contratos OpenAPI.",
      ],
      stack: ["Next.js", "NestJS", "PostgreSQL", "AWS CDK", "Docker", "Android"],
      tags: ["UI/UX", "Backend", "AWS"],
      linkLabel: "Ver tienda",
      logo: { src: "/showcase/firenze-logo.webp", alt: "Firenze", width: 640, height: 236 },
      visual: { src: "/screenshots/firenze.webp", alt: "Tienda online de Firenze.", width: 1600, height: 866 },
    },
    {
      name: "Avateen",
      type: "Salud mental · Brace Developers",
      description: "Desarrollé el frontend y el backend de una plataforma de acompañamiento en salud mental para adolescentes, con espacios para sus cuidadores y sus psicólogos.",
      icon: PanelsTopLeft,
      accent: "#e266d8",
      points: [
        "Un portal por rol: adolescente, cuidador, psicólogo y administración.",
        "Check-in diario con un semáforo emocional.",
        "IA sobre datos anonimizados y registro de auditoría de cada acceso.",
      ],
      stack: ["Next.js", "NestJS", "TypeORM", "PostgreSQL", "AWS"],
      tags: ["Frontend", "Backend", "Permisos por rol"],
      logo: { src: "/showcase/avateen-logo.webp", alt: "Avateen", width: 640, height: 170 },
      visual: { src: "/screenshots/avateen-login.webp", alt: "Pantalla de ingreso de Avateen.", width: 1600, height: 1021 },
    },
    {
      name: "EIA Campo Guamal",
      url: "https://eiacampoguamal.com/",
      type: "Sitio público con CMS",
      description: "Sitio web con administración de contenidos en PayloadCMS. Participé en el frontend y en la integración del gestor de contenidos.",
      icon: Leaf,
      accent: "#7ddc8c",
      tags: ["Frontend", "CMS", "Contenido"],
      linkLabel: "Sitio público",
      visual: { src: "/screenshots/guamal.webp", alt: "Administrador de contenidos de EIA Campo Guamal.", width: 917, height: 552 },
    },
    {
      name: "Incolflex",
      url: "https://www.incolflex.co/",
      type: "E-commerce y administración",
      description: "Trabajé en funciones de catálogo, productos, banners y stock para la tienda y su administración.",
      icon: ShoppingCart,
      accent: "#7cc4ff",
      tags: ["E-commerce", "Catálogo", "Administración"],
      linkLabel: "Sitio público",
      visual: { src: "/screenshots/incolflex.webp", alt: "Panel de administración de Incolflex.", width: 1083, height: 732 },
    },
  ],
  projects: [
    {
      name: "WePlay",
      eyebrow: "Plataforma gaming / comunidad",
      meta: "Proyecto personal",
      summary: "WePlay nace de algo que siempre disfruté: conocer gente jugando. Quiero crear un espacio para encontrar compañeros, compartir partidas y aprender juntos, con lugar para distintas formas de ser y niveles de experiencia.",
      signalLabel: "Decisión técnica",
      signal: "Desarrollé salas y participantes con PostgreSQL y tRPC, sincronización en tiempo real con SSE y Redis, autenticación con Auth.js y voz con LiveKit.",
      initials: "WP",
      icon: Radio,
      accent: "#a78bfa",
      status: { label: "En pausa, quiero retomarlo", tone: "paused" },
      image: { src: "/screenshots/weplay.webp", alt: "Pantalla de inicio de WePlay.", width: 1379, height: 770 },
      stack: ["Next.js", "tRPC", "Drizzle", "Redis", "LiveKit", "AWS S3"],
      links: [{ label: "Escribime para saber más", href: `mailto:${sharedProfile.email}`, kind: "contact" }],
    },
    {
      name: "GameVault",
      eyebrow: "Aplicación de escritorio",
      meta: "Proyecto personal",
      summary: "Un lanzador para mi colección de juegos clásicos, con perfiles de mando y un modo consola para jugar desde el sillón.",
      signalLabel: "Cómo está hecho",
      signal: "Interfaz nativa en WPF con la lógica en Python. Reconoce los mandos con SDL y guarda, por juego, jugadores, botones y zonas muertas. Se usa entera con teclado o con mando.",
      initials: "GV",
      icon: Blocks,
      accent: "#ffb84d",
      status: { label: "En uso", tone: "active" },
      art: { src: "/showcase/gamevault-wordmark.webp", alt: "GameVault", width: 1100, height: 350 },
      mark: { src: "/showcase/gamevault-mark.webp", alt: "", width: 256, height: 256 },
      stack: ["C#", "WPF", "Python", "SDL"],
      links: [],
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
