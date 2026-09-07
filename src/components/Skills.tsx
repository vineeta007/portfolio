"use client";
import Reveal from "./Reveal";
import { STACK } from "@/lib/data";

const MARQUEE = [
  "TypeScript", "Next.js", "React", "Python", "RAG", "LLMs", "Neural Nets",
  "Firebase", "MongoDB", "Tailwind", "Framer Motion", "scikit-learn",
  "Node.js", "Vercel", "Git", "Qdrant", "FAISS", "Java", "R",
];

export default function Skills() {
  return (
    <section id="stack" style={{ background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.04), transparent)" }}>
      <div className="section" style={{ paddingBottom: 60 }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--cyan)" }}>// tech_stack</div>
          <h2 className="h2">What I work with</h2>
          <p className="lead">The tools behind the projects above — grouped by where they live in the stack.</p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 44,
          }}
        >
          {STACK.map((s, i) => (
            <Reveal key={s.group} delay={i * 80}>
              <div className="card" style={{ padding: 20, height: "100%" }}>
                <div
                  className="mono"
                  style={{ fontSize: 11, letterSpacing: "0.14em", color: s.color, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color }} />
                  {s.group.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {s.items.map((it) => (
                    <span key={it} className="chip">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "16px 0", maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
        <div style={{ display: "flex", gap: 40, width: "max-content", animation: "marquee 26s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="mono" style={{ fontSize: 13, color: "var(--text-mute)", letterSpacing: "0.05em" }}>
              {m} <span style={{ color: "var(--violet)" }}>/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
