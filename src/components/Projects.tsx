"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { PROJECTS, type Project } from "@/lib/data";

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function stop(e: React.MouseEvent) {
  e.stopPropagation();
}

function Card({ p, i }: { p: Project; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const num = String(i + 1).padStart(2, "0");

  return (
    <Reveal delay={i * 70}>
      <div
        className="flip"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${p.title} — ${flipped ? "hide" : "show"} details`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div className="flip-inner" style={{ transform: flipped ? "rotateY(180deg)" : "none" }}>
          {/* FRONT */}
          <div className="flip-face card" style={{ padding: 22, justifyContent: "center" }}>
            <span
              aria-hidden
              className="mono"
              style={{
                position: "absolute",
                top: 14,
                right: 18,
                fontSize: 72,
                fontWeight: 700,
                color: p.accent,
                opacity: 0.09,
                lineHeight: 1,
              }}
            >
              {num}
            </span>
            <span
              aria-hidden
              style={{ position: "absolute", top: 0, left: 0, width: 40, height: 3, background: p.accent, opacity: 0.9 }}
            />

            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-mute)", marginBottom: 8 }}>
                {p.year}
              </div>
              <h3 style={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.15 }}>
                {p.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>
                ))}
              </div>
            </div>

            <div
              className="mono"
              style={{
                position: "absolute",
                left: 22,
                bottom: 20,
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: p.accent,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              tap for details <span style={{ fontSize: 13 }}>⇄</span>
            </div>
          </div>

          {/* BACK */}
          <div className="flip-face flip-back card" style={{ padding: 22, borderColor: p.accent }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{p.title}</h3>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--text-mute)" }}>{p.year}</span>
            </div>

            <p style={{ marginTop: 10, fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.55, overflow: "auto" }}>
              {p.blurb}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto", paddingTop: 12 }}>
              {p.tech.map((t) => (
                <span key={t} className="chip" style={{ fontSize: 9.5, padding: "3px 8px" }}>{t}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 12, alignItems: "center" }}>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  className="mono"
                  style={{ fontSize: 11.5, color: p.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  live <ArrowIcon />
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  className="mono"
                  style={{ fontSize: 11.5, color: "var(--text-dim)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  <GitIcon /> code
                </a>
              )}
              <span className="mono" style={{ marginLeft: "auto", fontSize: 10, color: "var(--text-mute)" }}>⇄ back</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <Reveal>
        <div className="eyebrow" style={{ color: "var(--violet)" }}>// selected_work</div>
        <h2 className="h2">Things I&apos;ve built</h2>
        <p className="lead">
          Real projects from{" "}
          <a href="https://github.com/vineeta007" target="_blank" rel="noopener noreferrer" style={{ color: "var(--violet)" }}>
            github.com/vineeta007
          </a>
          {" "}— tap a card to flip it for the details.
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 44,
        }}
      >
        {PROJECTS.map((p, i) => (
          <Card key={p.key} p={p} i={i} />
        ))}
      </div>

      <style>{`
        .flip {
          perspective: 1400px;
          height: 296px;
          cursor: pointer;
          border-radius: 16px;
          outline: none;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .flip:hover { transform: translateY(-3px); box-shadow: 0 22px 50px -26px var(--glow-violet); }
        .flip:focus-visible { box-shadow: 0 0 0 2px var(--violet); }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-face {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-back { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}
