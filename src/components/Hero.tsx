"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PROFILE } from "@/lib/data";
import { Scramble, Typewriter } from "./TextFX";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const TAGS = ["TypeScript", "Next.js", "RAG / LLMs", "Machine Learning", "Python"];
const TICKER = [
  "AI & FULL-STACK DEVELOPER",
  "VOICE-RAG SYSTEMS",
  "NEURAL NETWORKS",
  "NEXT.JS · REACT · PYTHON",
  "B.TECH COMPUTER SCIENCE",
  "OPEN TO WORK",
];

const GHOST = `const vineeta = {
  role: "AI & Full-Stack Dev",
  focus: ["RAG", "LLMs", "neural-nets"],
  stack: ["next.js", "react", "python"],
  status: "OPEN_TO_WORK",
  ship: () => build().test().deploy(),
};

while (awake) { vineeta.ship(); }`;

type Mode = "none" | "full" | "compact";

export default function Hero() {
  const [mode, setMode] = useState<Mode>("none");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const set = () =>
      setMode(window.matchMedia("(max-width: 900px)").matches ? "compact" : "full");
    set();
    const mq = window.matchMedia("(max-width: 900px)");
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 3D / fallback */}
      <div
        className="hero-canvas"
        style={{
          position: "absolute",
          inset: 0,
          left: mode === "full" ? "40%" : 0,
          zIndex: 1,
          opacity: mode === "compact" ? 0.5 : 1,
        }}
      >
        {mode === "none" ? (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              width: 340,
              height: 340,
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(176,107,255,0.45), rgba(255,61,138,0.15) 45%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        ) : (
          <Scene interactive={mode === "full"} compact={mode === "compact"} />
        )}
      </div>

      {/* decorative reticle rings + ghost code */}
      <div aria-hidden className="hero-deco">
        <span className="hero-ring hero-ring-1" />
        <span className="hero-ring hero-ring-2" />
        <span className="hero-cross hero-cross-a" />
        <span className="hero-cross hero-cross-b" />
        <pre className="hero-ghost mono">{GHOST}</pre>
      </div>

      {/* readability wash */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, var(--bg) 0%, rgba(6,6,13,0.82) 32%, rgba(6,6,13,0.15) 52%, transparent 72%)",
        }}
      />

      {/* HUD corner brackets */}
      <div aria-hidden className="hud">
        <span className="hud-c hud-tl" />
        <span className="hud-c hud-tr" />
        <span className="hud-c hud-bl" />
        <span className="hud-c hud-br" />
        <span className="mono hud-label hud-label-tl">SYS//007 · ONLINE</span>
      </div>

      {/* left vertical rail */}
      <div aria-hidden className="hero-rail mono">
        <span className="hero-rail-line" />
        PORTFOLIO_v007 · MMXXVI
        <span className="hero-rail-line" />
      </div>

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "150px 24px 120px",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <span aria-hidden className="hero-bloom" />
          <h1
            className="hero-name"
            style={{
              position: "relative",
              fontSize: "clamp(46px, 9.5vw, 104px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            <Scramble text="Vineeta" delay={120} />
            <br />
            <Scramble text="Devnani" delay={340} />
            <span className="hero-caret" style={{ color: "var(--magenta)" }}>
              _
            </span>
          </h1>
        </div>

        <p className="lead" style={{ marginTop: 22, fontSize: 17, maxWidth: "44ch", minHeight: "4.6em" }}>
          <Typewriter text={`${PROFILE.role}. ${PROFILE.tagline}.`} delay={900} speed={14} />
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
          {TAGS.map((t, i) => (
            <span key={t} className="chip reveal in" style={{ animationDelay: `${1150 + i * 80}ms` }}>
              {t}
            </span>
          ))}
        </div>

        <div
          className="reveal in"
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32, animationDelay: "1500ms", pointerEvents: "auto" }}
        >
          <a href="#work" className="btn btn-primary">
            view work →
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn">
            github
          </a>
          <a href="#contact" className="btn">
            contact
          </a>
        </div>

        <div className="mono" style={{ marginTop: 18, fontSize: 10.5, letterSpacing: "0.16em", color: "var(--text-mute)" }}>
          {mode === "full" ? "// drag the core · it spins as you scroll" : "// it spins as you scroll"}
        </div>
      </div>

      {/* bottom status ticker */}
      <div aria-hidden className="hero-ticker">
        <div className="hero-ticker-track mono">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <span style={{ color: "var(--violet)", margin: "0 22px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <a href="#work" aria-label="Scroll to work" className="mono hero-scroll">
        SCROLL <span>↓</span>
      </a>

      <style>{`
        .hero-name {
          color: #f4f1ff;
          text-shadow:
            0 0 44px rgba(176,107,255,0.35),
            1.5px 0 rgba(255,61,138,0.45),
            -1.5px 0 rgba(53,224,232,0.45);
          animation: chroma 4.5s ease-in-out infinite;
        }
        .hero-name:hover { animation: glitchX 0.4s ease-in-out; }
        .hero-caret { animation: blink 0.9s step-end infinite; }
        @keyframes chroma {
          0%,100% { text-shadow: 0 0 44px rgba(176,107,255,0.35), 1.5px 0 rgba(255,61,138,0.45), -1.5px 0 rgba(53,224,232,0.45); }
          50%     { text-shadow: 0 0 60px rgba(176,107,255,0.55), -1.5px 0 rgba(255,61,138,0.45), 1.5px 0 rgba(53,224,232,0.45); }
        }

        .hero-bloom {
          position: absolute;
          left: -8%;
          top: 8%;
          width: 116%;
          height: 84%;
          background: radial-gradient(60% 60% at 30% 50%, rgba(176,107,255,0.32), transparent 70%);
          filter: blur(26px);
          z-index: -1;
          animation: shimmer 5s ease-in-out infinite;
        }

        .hero-deco { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .hero-ring { position: absolute; border-radius: 50%; }
        .hero-ring-1 {
          width: 340px; height: 340px; top: -120px; left: -110px;
          border: 1px dashed rgba(176,107,255,0.25);
          animation: spinSlow 40s linear infinite;
        }
        .hero-ring-2 {
          width: 200px; height: 200px; top: -50px; left: -40px;
          border: 1px solid rgba(255,61,138,0.16);
          border-top-color: rgba(255,61,138,0.4);
          animation: spinSlow 22s linear infinite reverse;
        }
        .hero-cross { position: absolute; width: 10px; height: 10px; }
        .hero-cross::before, .hero-cross::after { content: ""; position: absolute; background: rgba(176,107,255,0.4); }
        .hero-cross::before { left: 4px; top: 0; width: 1px; height: 10px; }
        .hero-cross::after { top: 4px; left: 0; height: 1px; width: 10px; }
        .hero-cross-a { top: 120px; right: 46%; }
        .hero-cross-b { bottom: 120px; left: 40px; }
        .hero-ghost {
          position: absolute; bottom: 46px; left: 40px; margin: 0;
          font-size: 12px; line-height: 1.9; white-space: pre;
          color: rgba(198,178,255,0.06); user-select: none;
        }

        .hud { position: absolute; inset: 16px; z-index: 2; pointer-events: none; }
        .hud-c { position: absolute; width: 22px; height: 22px; border: 2px solid rgba(176,107,255,0.4); }
        .hud-tl { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        .hud-tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        .hud-bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        .hud-br { bottom: 0; right: 0; border-left: 0; border-top: 0; }
        .hud-label { position: absolute; font-size: 9px; letter-spacing: 0.2em; color: var(--text-mute); }
        .hud-label-tl { top: 2px; left: 34px; }
        .hud-label-br { bottom: 2px; right: 34px; }

        .hero-rail {
          position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
          z-index: 2; pointer-events: none;
          writing-mode: vertical-rl; text-orientation: mixed;
          font-size: 10px; letter-spacing: 0.35em; color: var(--text-mute);
          display: flex; align-items: center; gap: 16px;
        }
        .hero-rail-line { width: 1px; height: 60px; background: linear-gradient(var(--violet), transparent); }

        .hero-ticker {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          overflow: hidden; pointer-events: none;
          border-top: 1px solid var(--line);
          background: rgba(6,6,13,0.55);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          padding: 13px 0;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .hero-ticker-track {
          display: flex; align-items: center; width: max-content; gap: 0;
          font-size: 10.5px; line-height: 1; letter-spacing: 0.16em; color: var(--text-dim);
          animation: marquee 34s linear infinite;
        }

        .hero-scroll {
          position: absolute; bottom: 44px; right: 26px; z-index: 3;
          font-size: 10px; letter-spacing: 0.22em; color: var(--text-mute);
          text-decoration: none; display: flex; align-items: center; gap: 8px;
        }
        .hero-scroll span { animation: floaty 1.8s ease-in-out infinite; }

        @media (max-width: 900px) {
          .hero-canvas { left: 0 !important; opacity: 0.5; }
          .hero-ghost, .hero-rail, .hero-cross, .hud-label { display: none; }
          .hud { inset: 12px; }
          .hero-scroll { bottom: 52px; right: 20px; }
        }
      `}</style>
    </section>
  );
}
