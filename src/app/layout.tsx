import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--f-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--f-mono",
  display: "swap",
});

const SITE = "https://portfolio-opal-three-54.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Vineeta Devnani — AI & Full-Stack Developer",
  description:
    "B.Tech CS student building voice-enabled RAG systems, full-stack Next.js apps, and neural networks. Portfolio, projects and GitHub activity.",
  keywords: [
    "Vineeta Devnani",
    "AI developer",
    "full-stack developer",
    "Next.js",
    "RAG",
    "machine learning",
    "portfolio",
  ],
  authors: [{ name: "Vineeta Devnani" }],
  creator: "Vineeta Devnani",
  openGraph: {
    type: "website",
    url: SITE,
    title: "Vineeta Devnani — AI & Full-Stack Developer",
    description:
      "Voice RAG systems, full-stack Next.js apps and neural networks. Real projects, live GitHub activity.",
    siteName: "Vineeta Devnani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineeta Devnani — AI & Full-Stack Developer",
    description:
      "Voice RAG systems, full-stack Next.js apps and neural networks.",
  },
};

export const viewport: Viewport = {
  themeColor: "#06060d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vineeta Devnani",
  jobTitle: "AI & Full-Stack Developer",
  url: SITE,
  sameAs: [
    "https://github.com/vineeta007",
    "https://instagram.com/vineeta.007",
  ],
  knowsAbout: [
    "Retrieval-Augmented Generation",
    "Next.js",
    "React",
    "Machine Learning",
    "Neural Networks",
    "TypeScript",
    "Python",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
