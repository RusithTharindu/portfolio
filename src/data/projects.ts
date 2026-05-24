export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  year: string;
  status: string;
  heading: {
    before: string;
    emphasis: string;
    after: string;
  };
  lede: string;
  previewImage?: string;
  previewAlt?: string;
  actions: Array<{
    label: string;
    href: string;
  }>;
  overview: {
    problem: string;
    approach: string;
  };
  role: string;
  highlights: string[];
  stack: string[];
  glance: Array<[string, string]>;
};

export const projects: Project[] = [
  {
    slug: "doodledraw",
    number: "01",
    title: "DoodleDraw",
    shortTitle: "Doodle",
    description:
      "Local-first drawing app with Excalidraw editing, IndexedDB saves, imports, exports, and a gallery.",
    tags: ["Next.js", "Excalidraw", "IndexedDB"],
    year: "2026",
    status: "LIVE",
    heading: {
      before: "",
      emphasis: "DoodleDraw",
      after: "browser sketches, saved locally.",
    },
    lede:
      "A local-first drawing app built with Next.js and the embedded Excalidraw editor. It runs fully in the browser, stores drawings in IndexedDB, and gives users a practical workspace for creating, saving, reopening, importing, exporting, duplicating, renaming, and deleting designs without accounts or a backend service.",
    previewImage: "/projects/doodledraw/preview.webp",
    previewAlt:
      "DoodleDraw interface showing a browser-based Excalidraw drawing workspace with saved design controls.",
    actions: [
      {
        label: "Live app",
        href: "https://doodledraw-murex.vercel.app",
      },
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/doodledraw",
      },
    ],
    overview: {
      problem:
        "Drawing tools are often tied to accounts, remote storage, or single-session canvases. DoodleDraw needed to keep the creative loop immediate: open the app, draw, save locally, return later, and move work in or out through familiar file formats.",
      approach:
        "DoodleDraw uses a Next.js 16 App Router structure with an embedded Excalidraw canvas, browser-native IndexedDB persistence through idb, autosave status feedback, a saved-design gallery, route-based editing for existing drawings, and import/export utilities for Excalidraw, JSON, PNG, and SVG files. The storage layer is wrapped behind an abstraction so future sync or filesystem providers can be added without rewriting the editor UI.",
    },
    role:
      "Full-stack frontend engineer. Designed and implemented the local-first product experience, editor shell, autosave flow, IndexedDB storage model, gallery management, import/export path, thumbnail generation, responsive UI, and Vercel deployment.",
    highlights: [
      "Embedded Excalidraw canvas supports shapes, text, free draw, images, pan, zoom, undo, redo, selection, resizing, and object movement.",
      "IndexedDB persistence stores saved designs with elements, app state, binary files, timestamps, and generated PNG thumbnails for gallery previews.",
      "Autosave and manual save flows make in-progress work visible while still allowing empty or partial drawings to be captured intentionally.",
      "Gallery tools support reopening, renaming, duplicating, and deleting designs from local browser storage.",
      "Import and export flows cover .excalidraw, .json, .png, and .svg scene or image files without API routes, authentication, or a remote database.",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Tailwind CSS",
      "Excalidraw",
      "IndexedDB",
      "idb",
      "uuid",
      "date-fns",
      "lucide-react",
      "Vercel",
    ],
    glance: [
      ["Surface", "Local-first drawing web app"],
      ["Routes", "Home, editor, saved designs, design detail"],
      ["Editor", "Embedded Excalidraw canvas"],
      ["Storage", "IndexedDB via idb"],
      ["Status", "Live / public source"],
    ],
  },
  {
    slug: "spendshift",
    number: "02",
    title: "SpendShift",
    shortTitle: "SpendShift",
    description:
      "Personal expense tracker with budgets, insights, categories, auth, and CSV export.",
    tags: ["Next.js", "MongoDB", "Finance"],
    year: "2026",
    status: "LIVE",
    heading: {
      before: "",
      emphasis: "SpendShift",
      after: "personal spending, made visible.",
    },
    lede:
      "A web-based personal expense tracker built as a full-stack Next.js application. It helps users log expenses, organize categories, set monthly budgets, inspect spending patterns, customize the interface, and export their financial activity from a polished responsive dashboard.",
    previewImage: "/projects/spendshift/preview.webp",
    previewAlt:
      "SpendShift dashboard showing personal expense totals, spending charts, budgets, and recent activity.",
    actions: [
      {
        label: "Live app",
        href: "https://spendshift.vercel.app",
      },
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/spendshift",
      },
    ],
    overview: {
      problem:
        "Personal finance tools can become either too heavy for daily use or too shallow to reveal where money is actually going. The product needed a fast expense-entry flow, persistent account data, budget feedback, and useful visual summaries without turning routine tracking into spreadsheet work.",
      approach:
        "SpendShift uses a Next.js 16 App Router structure with authenticated app routes for dashboard, activity, budgets, categories, insights, and settings. API route handlers back the product with MongoDB and Mongoose models for users, expenses, budgets, and categories, while the client app coordinates optimistic-feeling state, onboarding, sample data seeding, theme and accent customization, currency preferences, charts, sheets, and export actions.",
    },
    role:
      "Full-stack engineer. Designed and implemented the product experience, authentication flow, database models, API routes, dashboard analytics, budget/category management, settings surface, responsive UI system, and Vercel deployment.",
    highlights: [
      "Authenticated account flow uses normalized email handling, scrypt password hashing, signed HTTP-only session cookies, protected app routes, and logout support.",
      "Expense tracking covers create, edit, delete, bulk sample seeding, recurring markers, merchant notes, category assignment, base currency display, and CSV export.",
      "Dashboard and insights surfaces show monthly KPIs, last-7-day totals, daily averages, 30-day spending bars, category breakdowns, merchant rankings, donut charts, and month heatmaps.",
      "Budget and category tools let users set monthly caps, compare spend against limits, manage custom category glyphs/colors, and reset or reseed app data.",
      "Personalization includes onboarding, light/dark/system themes, accent palettes, base currency selection, density/font tweaks, mobile sheets, reusable atoms, and a responsive app shell.",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "Vaul",
      "Vercel",
    ],
    glance: [
      ["Surface", "Personal finance web app"],
      ["Routes", "Dashboard, activity, budgets, categories, insights, settings"],
      ["Backend", "Next.js API routes + MongoDB"],
      ["Auth", "scrypt passwords + signed session cookies"],
      ["Status", "Live / public source"],
    ],
  },
  {
    slug: "passgo",
    number: "03",
    title: "Project PassGo",
    shortTitle: "PassGo",
    description:
      "Digital passport application, renewal, appointment, and document review platform.",
    tags: ["Next.js", "NestJS", "OCR"],
    year: "2025",
    status: "LIVE",
    heading: {
      before: "Project",
      emphasis: "PassGo",
      after: "passport services, digitized.",
    },
    lede:
      "A full-stack passport application submission and validation system for Sri Lankan citizens. It brings applicant forms, document uploads, appointment booking, admin review, renewals, notifications, OCR, and cloud file handling into one guided service flow.",
    actions: [
      {
        label: "Live portal",
        href: "https://passgo-portal.vercel.app",
      },
      {
        label: "Frontend source",
        href: "https://github.com/RusithTharindu/passgo-fe",
      },
      {
        label: "Backend source",
        href: "https://github.com/RusithTharindu/passgo-be",
      },
    ],
    overview: {
      problem:
        "Passport services depend on long forms, identity documents, scheduled verification, and back-office decisions. The rough edge is not one screen; it is the handoff between citizen submission, document quality, appointment logistics, and administrative review.",
      approach:
        "PassGo splits the product into a polished Next.js applicant/admin portal and a NestJS API. The frontend handles guided application and renewal journeys with TanStack Query, Zustand, document upload flows, and email-triggering API routes; the backend owns JWT role access, Mongo-backed workflows, AWS S3 uploads, throttling, and Google Document AI OCR.",
    },
    role:
      "Full-stack engineer. Designed and implemented the applicant experience, admin workflows, backend modules, document processing path, and cloud integrations across the paired frontend and backend repositories.",
    highlights: [
      "Applicant portal supports new passport applications, renewals, status tracking, document uploads, and appointment booking.",
      "Admin workspace covers application queues, appointment handling, status updates, notes, rejection reasons, and reporting surfaces.",
      "Document pipeline combines AWS S3 storage with Google Document AI OCR for uploaded NIC, birth certificate, passport photo, and supporting files.",
      "Backend modules cover authentication, users, applications, appointments, renewals, upload services, S3, and role-protected administration.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "MongoDB",
      "AWS S3",
      "Google Document AI",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
    ],
    glance: [
      ["Surface", "Applicant portal + admin API"],
      ["Frontend", "Next.js 15, React 19"],
      ["Backend", "NestJS 11, MongoDB"],
      ["Integrations", "AWS S3, Google Document AI"],
      ["Status", "Live portal / public source"],
    ],
  },
  {
    slug: "respawn-realm",
    number: "04",
    title: "RespawnRealm",
    shortTitle: "Respawn",
    description:
      "Gaming-inspired landing experience with cinematic motion and media-driven sections.",
    tags: ["Vite", "React", "GSAP"],
    year: "2024",
    status: "LIVE",
    heading: {
      before: "",
      emphasis: "RespawnRealm",
      after: "a gaming world in motion.",
    },
    lede:
      "A gaming-inspired web experience built with Vite, React, Tailwind CSS, GSAP, video assets, custom fonts, and audio. The project leans into visual storytelling: hero video transitions, animated titles, gallery moments, and sharp navigational pacing.",
    actions: [
      {
        label: "Live site",
        href: "https://respawn-realm.vercel.app",
      },
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/RespawnRealm",
      },
    ],
    overview: {
      problem:
        "A game-themed site has to feel alive from the first frame. Static marketing sections would flatten the concept, while heavy media can easily become janky or unreadable on smaller screens.",
      approach:
        "RespawnRealm uses a Vite React build with GSAP and @gsap/react for coordinated animation, Tailwind for responsive composition, and a curated asset set of videos, gallery images, custom fonts, and looped audio to carry the atmosphere without losing structure.",
    },
    role:
      "Frontend engineer. Built the single-page experience, motion system, section choreography, media layout, and deployment pipeline.",
    highlights: [
      "Hero and feature sections are driven by multiple MP4 assets for a cinematic first impression.",
      "GSAP-powered transitions, animated titles, and scroll-aware interactions give the page a game trailer rhythm.",
      "Custom font and image assets establish a distinct visual language beyond a stock component layout.",
      "Vite build keeps the project lightweight and fast to iterate while shipping as a static Vercel deployment.",
    ],
    stack: ["JavaScript", "React", "Vite", "GSAP", "Tailwind CSS", "Vercel"],
    glance: [
      ["Surface", "Interactive landing site"],
      ["Animation", "GSAP + @gsap/react"],
      ["Media", "Video, image, audio assets"],
      ["Build", "Vite + React"],
      ["Status", "Live / public source"],
    ],
  },
  {
    slug: "healthharmony",
    number: "05",
    title: "HealthHarmony",
    shortTitle: "Health",
    description:
      "Healthcare management system for patient intake, registration, and appointments.",
    tags: ["Next.js", "Appwrite", "Twilio"],
    year: "2024",
    status: "LIVE",
    heading: {
      before: "",
      emphasis: "HealthHarmony",
      after: "patient care, coordinated.",
    },
    lede:
      "A healthcare management system built with Next.js, Appwrite, shadcn-style UI primitives, typed forms, and appointment workflows. It guides patients from onboarding into registration and scheduling while giving administrators a protected entry point.",
    actions: [
      {
        label: "Live app",
        href: "https://health-harmony.vercel.app",
      },
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/HealthHarmony",
      },
    ],
    overview: {
      problem:
        "Healthcare intake asks for sensitive, structured information while also needing appointment scheduling and clear confirmation states. The interface has to be calm, validated, and direct enough for patients to complete without friction.",
      approach:
        "HealthHarmony uses server actions with Appwrite for users, patients, appointments, storage, and database records. React Hook Form and Zod shape patient, registration, and appointment forms, while a focused route structure handles onboarding, registration, scheduling, and success flows.",
    },
    role:
      "Full-stack developer. Built the patient onboarding flow, registration form system, appointment flow, Appwrite actions, file upload path, and admin access pattern.",
    highlights: [
      "Patient onboarding creates Appwrite users and routes returning users into registration and appointment flows.",
      "Registration captures medical and identification data with typed validation and file upload support.",
      "Appointment forms support create, schedule, and cancel modes with doctor selection and validation rules.",
      "Protected admin path uses a passkey modal pattern, while Sentry and Twilio topics indicate production-minded observability and communication concerns.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Appwrite",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
      "shadcn-ui",
      "Sentry",
      "Twilio",
    ],
    glance: [
      ["Surface", "Patient intake + appointments"],
      ["Backend", "Appwrite users, database, storage"],
      ["Forms", "React Hook Form + Zod"],
      ["UI", "Radix primitives + Tailwind"],
      ["Status", "Live / public source"],
    ],
  },
  {
    slug: "techie-sleuths-2024",
    number: "06",
    title: "Techie Sleuths 2024",
    shortTitle: "Sleuths",
    description:
      "FOSS NSBM puzzle-event frontend with clues, crosswords, auth, and leaderboard play.",
    tags: ["Next.js", "Redux", "Puzzles"],
    year: "2024",
    status: "PUBLIC SOURCE",
    heading: {
      before: "Techie",
      emphasis: "Sleuths",
      after: "event gameplay on the web.",
    },
    lede:
      "A Next.js frontend for FOSS NSBM's Techie Sleuths '24 event. It packages a playful competition experience with registration, login, clue routes, crossword gameplay, scoring actions, leaderboard views, and a themed Mario-inspired visual system.",
    actions: [
      {
        label: "Live site",
        href: "https://techiesleuths24.fossnsbm.org/",
      },
      {
        label: "Source",
        href: "https://github.com/fossnsbm/techie-sleuths-24-frontend",
      },
    ],
    overview: {
      problem:
        "Event sites need more than a landing page when the competition itself happens online. Players need guided entry, puzzles, feedback, scoring, and enough atmosphere to make the experience feel like a game rather than a form.",
      approach:
        "The frontend uses Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit, React Hook Form, Zod, Headless UI, Radix primitives, and Tremor. The route structure covers landing, registration, login, play, clue pages, crossword screens, and leaderboard views, while API modules handle auth, clues, puzzles, and score deductions.",
    },
    role:
      "Frontend contributor. Worked on the event-facing application experience, UI structure, puzzle surfaces, and API-connected gameplay flows.",
    highlights: [
      "Competition flow includes registration, login, play state, clue pages, crossword gameplay, and leaderboard pages.",
      "API modules organize auth, clue retrieval, clue marking, puzzle interaction, and score deduction behavior.",
      "The visual system uses themed assets, custom fonts, marquees, cards, and responsive layout components.",
      "Form and UI layers combine React Hook Form, Zod, Headless UI, Radix, Tailwind, and Redux Toolkit.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "Headless UI",
      "Radix UI",
    ],
    glance: [
      ["Organization", "FOSS NSBM"],
      ["Surface", "Event frontend + puzzle UI"],
      ["Routes", "Clues, crossword, play, leaderboard"],
      ["State", "Redux Toolkit"],
      ["Status", "Live / public source"],
    ],
  },
  {
    slug: "campus-housing-portal",
    number: "07",
    title: "Campus Housing Portal",
    shortTitle: "Housing",
    description:
      "React and Tailwind housing portal for students, landlords, wardens, and admins.",
    tags: ["React", "Vite", "Maps"],
    year: "2024",
    status: "PUBLIC SOURCE",
    heading: {
      before: "Campus",
      emphasis: "Housing",
      after: "rooms, requests, and reviews.",
    },
    lede:
      "A campus housing web application built with React, Vite, Tailwind CSS, React Router, Google Maps, typed forms, and role-specific screens for students, landlords, wardens, and administrators.",
    actions: [
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/Campus-Housing-Portal-Frontend",
      },
    ],
    overview: {
      problem:
        "Student housing workflows have several actors: students searching for places, landlords managing listings, wardens reviewing requests or properties, and administrators handling user and article records. A single flat interface would make those responsibilities collide.",
      approach:
        "The app uses a Vite React structure with separate page groups for hostels, property views, landlord dashboards, warden review screens, and admin management. Shared components cover property cards, maps, request details, accept/reject actions, auth context, image selection, forms, and reusable UI primitives.",
    },
    role:
      "Frontend engineer. Built role-aware portal screens, reusable property and request components, routing, authentication hooks, and responsive Tailwind layouts.",
    highlights: [
      "Role-specific routes cover students, landlords, wardens, and administrators.",
      "Property browsing includes card displays, detailed property views, and Google Maps integration.",
      "Landlord and warden flows include property management, request details, and accept/reject controls.",
      "Auth context and login/signup hooks keep access patterns organized across the portal.",
    ],
    stack: [
      "JavaScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Axios",
      "Google Maps API",
      "React Hook Form",
      "Zod",
    ],
    glance: [
      ["Surface", "Campus housing web portal"],
      ["Users", "Students, landlords, wardens, admins"],
      ["Maps", "Google Maps property views"],
      ["Build", "Vite + React"],
      ["Status", "Public source"],
    ],
  },
  {
    slug: "purrfectpal",
    number: "08",
    title: "PurrfectPal",
    shortTitle: "Purrfect",
    description:
      "React Native pet-care mobile app backed by Firebase auth, Firestore, and storage.",
    tags: ["React Native", "Firebase", "Mobile"],
    year: "2024",
    status: "PUBLIC SOURCE",
    heading: {
      before: "",
      emphasis: "PurrfectPal",
      after: "pet care in your pocket.",
    },
    lede:
      "A React Native mobile application for pet-focused workflows, built with Firebase authentication, Firestore, Firebase Storage, Google sign-in, native navigation, image picking, Lottie animation, and cross-platform Android/iOS project structure.",
    actions: [
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/PurrfectPal",
      },
    ],
    overview: {
      problem:
        "Pet-care apps need a mobile-first shape: account access, media uploads, persistent records, and quick navigation across everyday actions. The challenge is stitching those features together without losing the native feel.",
      approach:
        "PurrfectPal uses React Native 0.73 with Firebase services for authentication, Firestore data, and storage. Navigation is handled through native stack, stack, and bottom-tab navigators, while image picker, dropdowns, checkboxes, radio controls, vector icons, async storage, and Lottie support richer mobile interactions.",
    },
    role:
      "Mobile developer. Built the React Native app foundation, Firebase integration points, navigation structure, and reusable mobile UI flows.",
    highlights: [
      "Firebase stack includes app initialization, authentication, Firestore records, and storage support.",
      "Google sign-in and persistent async storage support smoother account access.",
      "Navigation combines native stack, stack, and bottom-tab patterns for mobile-friendly flows.",
      "Image picker, dropdowns, checkboxes, radio buttons, icons, and Lottie round out the native interaction set.",
    ],
    stack: [
      "JavaScript",
      "TypeScript",
      "React Native",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "React Navigation",
      "Lottie",
    ],
    glance: [
      ["Surface", "Mobile app"],
      ["Platform", "Android / iOS"],
      ["Backend", "Firebase"],
      ["Navigation", "Tabs + stacks"],
      ["Status", "Public source"],
    ],
  },
  {
    slug: "tasktrail",
    number: "09",
    title: "TaskTrail",
    shortTitle: "TaskTrail",
    description:
      "Flutter job and task marketplace with auth, listings, requests, profiles, and themes.",
    tags: ["Flutter", "Firebase", "Dart"],
    year: "2024",
    status: "PUBLIC SOURCE",
    heading: {
      before: "",
      emphasis: "TaskTrail",
      after: "jobs and requests on mobile.",
    },
    lede:
      "A Flutter application for job/task listing workflows, with Firebase-backed authentication and data services, listing creation, job detail views, request management, profile editing, saved ads, settings, and light/dark theme support.",
    actions: [
      {
        label: "Source",
        href: "https://github.com/RusithTharindu/TaskTrail",
      },
    ],
    overview: {
      problem:
        "Small job and service marketplaces need clear mobile flows for posting work, browsing categories, inspecting details, managing requests, and returning to saved listings. Without structure, the app quickly becomes a pile of screens.",
      approach:
        "TaskTrail organizes the Flutter codebase into components, models, pages, services, and themes. The visible modules include login/register, home, category views, add job, job detail, request viewing, profile editing, settings, Firestore services, and Firebase options.",
    },
    role:
      "Mobile developer. Built the Flutter app structure, listing flows, authentication screens, Firestore service layer, reusable UI components, and theme system.",
    highlights: [
      "Core pages cover splash, login/register, home, categories, add job, job detail, my ads, requests, settings, and data fetching.",
      "Reusable components include drawer navigation, job tiles, buttons, text fields, tab bars, sliver app bar, and detail views.",
      "Firebase and Firestore service files support authentication and data access.",
      "Light and dark theme providers give the mobile UI a configurable visual mode.",
    ],
    stack: [
      "Dart",
      "Flutter",
      "Firebase",
      "Firestore",
      "Provider",
      "Android",
      "iOS",
    ],
    glance: [
      ["Surface", "Flutter mobile marketplace"],
      ["Flows", "Jobs, requests, profiles"],
      ["Backend", "Firebase / Firestore"],
      ["Themes", "Light + dark mode"],
      ["Status", "Public source"],
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return undefined;
  }

  return projects[(index + 1) % projects.length];
}
