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
    key: "lenskart",
    title: "Lenskart Clone",
    blurb:
      "Pixel-focused front-end rebuild of the Lenskart eyewear store — responsive product grid and layout, hand-written HTML/CSS.",
    tech: ["HTML", "CSS", "Responsive UI"],
    repo: "https://github.com/vineeta007/lenscart_clone",
    accent: "var(--violet)",
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
