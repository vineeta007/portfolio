"use client";
import { useRef } from "react";
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

function Card({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <Reveal delay={i * 70}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="card card-glow"
        style={{
          padding: 22,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.18s ease-out, box-shadow 0.3s",
          willChange: "transform",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -30,
            right: -10,
            fontFamily: "var(--font-mono)",
            fontSize: 90,
            fontWeight: 700,
            color: p.accent,
            opacity: 0.07,
            lineHeight: 1,
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>{p.title}</h3>
          <span className="mono" style={{ fontSize: 11, color: "var(--text-mute)" }}>{p.year}</span>
        </div>

        <p style={{ marginTop: 10, fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.6, flex: 1 }}>
          {p.blurb}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {p.tech.map((t) => (
            <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
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
              className="mono"
              style={{ fontSize: 11.5, color: "var(--text-dim)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}
            >
              <GitIcon /> code
            </a>
          )}
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
          {" "}— shipped apps, AI experiments and coursework I kept iterating on.
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
          marginTop: 44,
        }}
      >
        {PROJECTS.map((p, i) => (
          <Card key={p.key} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
