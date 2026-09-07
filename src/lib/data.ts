/* Real content — sourced from github.com/vineeta007 and deployed project READMEs. */

export const PROFILE = {
  name: "Vineeta Devnani",
  handle: "vineeta_007",
  role: "AI & Full-Stack Developer",
  tagline: "B.Tech CS · building voice-RAG systems, full-stack apps & neural nets",
  bio: "B.Tech Computer Science student and AI enthusiast. I build voice-enabled retrieval-augmented chatbots, ship full-stack Next.js apps, and train neural networks for coursework and side projects. Currently going deep on explainable AI and production RAG pipelines.",
  location: "India",
  github: "https://github.com/vineeta007",
  githubUser: "vineeta007",
  instagram: "https://instagram.com/vineeta.007",
  email: "devnanivineeta@gmail.com",
};

export type Project = {
  key: string;
  title: string;
  blurb: string;
  tech: string[];
  repo?: string;
  live?: string;
  accent: string;
  year: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    key: "voice-rag",
    title: "Voice RAG Chatbot",
    blurb:
      "Conversational AI that combines speech I/O with retrieval-augmented generation. Answers are grounded in a vector store, returned with confidence scores and cited evidence sources, and it speaks back in English or Hindi.",
    tech: ["React", "RAG", "Qdrant / FAISS", "Gemini / OpenAI", "ElevenLabs TTS", "Framer Motion"],
    repo: "https://github.com/vineeta007/Voice-Rag-Chat",
    live: "https://voice-rag-chat.vercel.app",
    accent: "var(--violet)",
    year: "2026",
    featured: true,
  },
  {
    key: "stock-system",
    title: "Stock Management System",
    blurb:
      "Full-stack inventory platform — product CRUD, stock tracking, context-based state and seed scripts. 400+ commits of iteration, deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "React Context", "Tailwind CSS", "Vercel"],
    repo: "https://github.com/vineeta007/stocksystem",
    live: "https://stocksystem-self.vercel.app",
    accent: "var(--cyan)",
    year: "2026",
    featured: true,
  },
  {
    key: "tracking-system",
    title: "Tracking System",
    blurb:
      "Next.js web app for tracking records and status through a workflow. TypeScript end-to-end with an AI-assisted build setup.",
    tech: ["Next.js", "TypeScript", "App Router"],
    repo: "https://github.com/vineeta007/trackingsystem",
    accent: "var(--magenta)",
    year: "2026",
  },
  {
    key: "portfolio",
    title: "This Portfolio",
    blurb:
      "The site you're on — Next.js 16 App Router with a Three.js hero, live GitHub API stats, a Firestore-backed contact form and a hand-built design system. No UI kit.",
    tech: ["Next.js", "TypeScript", "Three.js / R3F", "Firebase", "Framer Motion"],
    repo: "https://github.com/vineeta007/portfolio",
    live: "https://portfolio-opal-three-54.vercel.app",
    accent: "var(--cyan)",
    year: "2026",
  },
  {
    key: "ann",
    title: "Artificial Neural Network",
    blurb:
      "Neural network experiments from scratch and with frameworks — forward/back-prop, activation functions and training loops, worked through in notebooks.",
    tech: ["Python", "Jupyter", "NumPy", "Deep Learning"],
    repo: "https://github.com/vineeta007/ARTIFICAL-NEURAL-NETWORK",
    accent: "var(--lime)",
    year: "2024",
  },
  {
    key: "ml",
    title: "Machine Learning Lab",
    blurb:
      "A collection of ML notebooks — supervised models, feature engineering and evaluation across classic datasets.",
    tech: ["Python", "scikit-learn", "pandas", "Jupyter"],
    repo: "https://github.com/vineeta007/Machine-Learning-",
    accent: "var(--amber)",
    year: "2024",
  },
  {
    key: "sms-java",
    title: "Student Management System",
    blurb:
      "Desktop Java/Swing app from 4th-sem coursework — student enrolment, marks tracking, login/auth, admin dashboards and a messaging module, built with an OOP manager-class architecture.",
    tech: ["Java", "Swing", "OOP"],
    repo: "https://github.com/vineeta007/Java-Project-Final-Sem-4",
    accent: "var(--magenta)",
    year: "2024",
  },
  {
    key: "r-prime",
    title: "Prime Video Data Analysis",
    blurb:
      "R summative assessment — exploratory analysis of an Amazon Prime Video catalogue dataset, from an Excel source through cleaning to insights.",
    tech: ["R", "Data Analysis", "Excel"],
    repo: "https://github.com/vineeta007/R-summative-Assesment",
    accent: "var(--cyan)",
    year: "2024",
  },
  {
    key: "cafe-order",
    title: "Online Cafe Ordering",
    blurb:
      "Training-project ordering page — a café menu with per-item quantity selectors and a live running total.",
    tech: ["HTML", "JavaScript"],
    repo: "https://github.com/vineeta007/Professional-Training",
    accent: "var(--amber)",
    year: "2024",
  },
];

export const STACK: { group: string; items: string[]; color: string }[] = [
  {
    group: "Languages",
    color: "var(--violet)",
    items: ["TypeScript", "JavaScript", "Python", "Java", "R", "SQL"],
  },
  {
    group: "Frontend",
    color: "var(--magenta)",
    items: ["React", "Next.js", "App Router", "Tailwind CSS", "Framer Motion", "HTML / CSS"],
  },
  {
    group: "AI / ML",
    color: "var(--lime)",
    items: ["RAG pipelines", "LLM integration", "Neural networks", "scikit-learn", "Vector DBs (Qdrant / FAISS)", "Speech-to-text / TTS"],
  },
  {
    group: "Backend & Tools",
    color: "var(--cyan)",
    items: ["Node.js", "Firebase / Firestore", "MongoDB", "REST APIs", "Git & GitHub", "Vercel"],
  },
];

/* Fallback numbers if the GitHub API is rate-limited (60 req/hr per IP, unauth). */
export const GH_FALLBACK = {
  public_repos: 12,
  followers: 0,
  following: 0,
  created_at: "2023-07-30T15:05:00Z",
  topLanguages: ["TypeScript", "Jupyter Notebook", "JavaScript", "Java", "R"],
};
