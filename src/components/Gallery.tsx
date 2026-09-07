"use client";
import Reveal from "./Reveal";
import { PROFILE } from "@/lib/data";

const NOW = [
  "Production RAG — chunking, reranking, eval harnesses",
  "Explainable AI: confidence scoring + source attribution",
  "Shipping full-stack side projects end to end",
  "Deepening DSA + system design fundamentals",
];

export default function Gallery() {
  return (
    <section id="about" className="section">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          gap: 40,
          alignItems: "center",
        }}
        className="about-grid"
      >
        <Reveal>
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: "radial-gradient(circle at 50% 20%, rgba(176,107,255,0.25), transparent 70%)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 55%, rgba(6,6,13,0.9))",
                zIndex: 1,
              }}
            />
            <img
              src="/images/pic1.png"
              alt="Vineeta Devnani"
              style={{ width: "100%", display: "block", position: "relative" }}
            />
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
                zIndex: 2,
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "var(--text-dim)",
              }}
            >
              @{PROFILE.handle}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="eyebrow" style={{ color: "var(--magenta)" }}>// about</div>
          <h2 className="h2">The person behind the commits</h2>
          <p style={{ color: "var(--text-dim)", fontSize: 15.5, lineHeight: 1.7 }}>{PROFILE.bio}</p>

          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--text-mute)", margin: "26px 0 12px" }}>
            CURRENTLY FOCUSED ON
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
            {NOW.map((n) => (
              <li key={n} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--text-dim)" }}>
                <span style={{ color: "var(--magenta)" }}>▹</span>
                {n}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
            <a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer" className="btn">
              instagram
            </a>
            <a href={`mailto:${PROFILE.email}`} className="btn">
              email me
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}
