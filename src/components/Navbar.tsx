"use client";
import { useState, useEffect } from "react";

const LINKS = ["home", "work", "stack", "github", "about", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 11.5,
    letterSpacing: "0.08em",
    padding: "6px 11px",
    borderRadius: 8,
    border: `1px solid ${isActive ? "var(--violet)" : "transparent"}`,
    color: isActive ? "var(--text)" : "var(--text-dim)",
    background: isActive ? "rgba(176,107,255,0.12)" : "transparent",
    textDecoration: "none",
    transition: "all 0.2s",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled || open ? "rgba(8,7,16,0.82)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled || open ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          VD<span style={{ color: "var(--magenta)" }}>_</span>007
        </a>

        <div className="nav-desktop" style={{ display: "flex", gap: 4 }}>
          {LINKS.map((l) => (
            <a key={l} href={`#${l}`} style={linkStyle(active === l)}>
              ./{l}
            </a>
          ))}
        </div>

        <span
          className="nav-status"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            fontWeight: 600,
            padding: "5px 12px",
            borderRadius: 99,
            border: "1px solid rgba(110,231,135,0.3)",
            color: "var(--lime)",
            background: "rgba(110,231,135,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--lime)",
              animation: "pulseDot 2s infinite",
            }}
          />
          OPEN TO WORK
        </span>

        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid var(--line)",
            borderRadius: 8,
            color: "var(--text)",
            padding: "7px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {open && (
        <div
          className="nav-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            padding: "8px 24px 18px",
            gap: 4,
            background: "#0a0912",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--line)",
            boxShadow: "0 24px 40px -20px rgba(0,0,0,0.8)",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={() => setOpen(false)}
              style={{ ...linkStyle(active === l), padding: "10px 12px" }}
            >
              ./{l}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 780px) {
          .nav-desktop, .nav-status { display: none !important; }
          .nav-burger { display: block !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
