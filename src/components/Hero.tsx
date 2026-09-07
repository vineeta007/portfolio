"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PROFILE } from "@/lib/data";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const TAGS = ["TypeScript", "Next.js", "RAG / LLMs", "Machine Learning", "Python"];

export default function Hero() {
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
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
      <div className="hero-canvas" style={{ position: "absolute", inset: 0, left: "28%", zIndex: 0 }}>
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
          zIndex: 0,
          background:
            "linear-gradient(90deg, var(--bg) 0%, rgba(6,6,13,0.85) 34%, rgba(6,6,13,0.2) 55%, transparent 75%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "150px 24px 110px",
          width: "100%",
        }}
      >
        <div
          className="mono reveal in"
          style={{ fontSize: 12, letterSpacing: "0.24em", color: "var(--violet)", marginBottom: 18 }}
        >
          {"// agent_online"}
        </div>

        <h1
          className="reveal in"
          style={{
            fontSize: "clamp(44px, 9vw, 92px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            animationDelay: "80ms",
            textShadow: "0 0 60px rgba(176,107,255,0.25)",
          }}
        >
          Vineeta
          <br />
          Devnani
          <span style={{ color: "var(--magenta)" }}>_</span>
        </h1>

        <p
          className="reveal in lead"
          style={{ marginTop: 22, fontSize: 17, animationDelay: "160ms", maxWidth: "44ch" }}
        >
          {PROFILE.role}. {PROFILE.tagline}.
        </p>

        <div
          className="reveal in"
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26, animationDelay: "240ms" }}
        >
          {TAGS.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div
          className="reveal in"
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34, animationDelay: "320ms" }}
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
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        style={{
          position: "absolute",
          bottom: 26,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
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
        @media (max-width: 900px) {
          .hero-canvas { left: 0 !important; opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
