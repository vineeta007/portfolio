"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PROFILE } from "@/lib/data";
import { Scramble, Typewriter } from "./TextFX";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const TAGS = ["TypeScript", "Next.js", "RAG / LLMs", "Machine Learning", "Python"];

export default function Hero() {
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 900px)").matches;
    setRich(!reduced && !small);
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
      <div className="hero-canvas" style={{ position: "absolute", inset: 0, left: "26%", zIndex: 1 }}>
        {rich ? (
          <Scene />
        ) : (
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
        )}
      </div>

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

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "150px 24px 110px",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.24em",
            color: "var(--violet)",
            marginBottom: 18,
          }}
        >
          {"// "}
          <Typewriter text="agent_online" speed={45} />
        </div>

        <h1
          className="hero-name"
          style={{
            fontSize: "clamp(44px, 9vw, 92px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            textShadow: "0 0 60px rgba(176,107,255,0.28)",
          }}
        >
          <Scramble text="Vineeta" delay={120} />
          <br />
          <Scramble text="Devnani" delay={340} />
          <span className="hero-caret" style={{ color: "var(--magenta)" }}>
            _
          </span>
        </h1>

        <p className="lead" style={{ marginTop: 22, fontSize: 17, maxWidth: "44ch", minHeight: "4.6em" }}>
          <Typewriter text={`${PROFILE.role}. ${PROFILE.tagline}.`} delay={900} speed={14} />
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
          {TAGS.map((t, i) => (
            <span
              key={t}
              className="chip reveal in"
              style={{ animationDelay: `${1150 + i * 80}ms` }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="reveal in"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 34,
            animationDelay: "1500ms",
            pointerEvents: "auto",
          }}
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

        <div
          className="mono"
          style={{ marginTop: 20, fontSize: 10.5, letterSpacing: "0.16em", color: "var(--text-mute)" }}
        >
          {"// drag the core · it spins as you scroll"}
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        style={{
          position: "absolute",
          bottom: 26,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "var(--text-mute)",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        SCROLL
        <span
          style={{
            width: 1,
            height: 34,
            background: "linear-gradient(var(--violet), transparent)",
            animation: "floaty 2s ease-in-out infinite",
          }}
        />
      </a>

      <style>{`
        .hero-caret { animation: blink 0.9s step-end infinite; }
        .hero-name:hover { animation: glitchX 0.4s ease-in-out; }
        @media (max-width: 900px) {
          .hero-canvas { left: 0 !important; opacity: 0.55; }
        }
      `}</style>
    </section>
  );
}
