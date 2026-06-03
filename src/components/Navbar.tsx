"use client";
import { useState, useEffect } from "react";

const navLinks = ["hero", "projects", "skills", "gallery", "achievements", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? "rgba(10,8,18,0.92)" : "transparent", borderBottom: scrolled ? "1px solid #1e1535" : "none", transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Space Mono, monospace", fontWeight: 700, fontSize: 15, color: "#b026ff" }}>V<span style={{ color: "#ff2d78" }}>.</span>007</span>
        <div style={{ display: "flex", gap: 4 }}>
          {navLinks.map((item) => (
            <a key={item} href={"#" + item} onClick={() => setActive(item)} style={{ fontFamily: "Space Mono, monospace", fontSize: 11, letterSpacing: "0.1em", padding: "5px 10px", borderRadius: 6, border: active === item ? "1.5px solid #e879f9" : "1.5px solid transparent", color: active === item ? "#e879f9" : "#a78bfa", textDecoration: "none", background: active === item ? "#1a0e2e" : "transparent" }}>
              ./{item}
            </a>
          ))}
        </div>
        <span style={{ fontFamily: "Space Mono, monospace", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99, border: "1.5px solid #15803d", color: "#86efac", background: "#0d2018" }}>? ONLINE</span>
      </div>
    </nav>
  );
}
