import Particles from "./Particles";

export default function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#c8b8e8" }}>

      {/* Swirl rings */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: "3px solid rgba(160,120,220,0.4)", top: -100, left: -80, animation: "swirlBg 18s linear infinite" }} />
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", border: "2px solid rgba(200,160,255,0.3)", top: 20, right: -100, animation: "swirlBg 12s linear infinite reverse" }} />
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "2px solid rgba(180,140,240,0.25)", bottom: -60, left: "30%", animation: "swirlBg 9s linear infinite" }} />
      </div>

      {/* Scanline */}
      <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "rgba(160,100,220,0.2)", animation: "scanline 5s linear infinite", pointerEvents: "none" }} />

      <Particles />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
        <div className="mono" style={{
          margin: "0 auto 24px", width: 100, height: 100, borderRadius: "50%",
          border: "4px solid #7c3aed", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 36, fontWeight: 700, color: "#4c1d95",
          background: "rgba(180,150,230,0.3)", backdropFilter: "blur(4px)",
          animation: "pulseRing 3s ease-in-out infinite, borderPulseLav 2.5s ease-in-out infinite"
        }}>V</div>

        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6d28d9", marginBottom: 10 }}>// agent selected</div>

        <h1 className="mono" style={{ fontSize: 48, fontWeight: 700, color: "#2e1065", lineHeight: 1.15, marginBottom: 8, animation: "glitchX 6s ease-in-out infinite" }}>
          Vineeta<span style={{ color: "#7c3aed" }}>_</span>007
        </h1>

        <div className="mono" style={{
          fontSize: 15, color: "#6d28d9", overflow: "hidden", whiteSpace: "nowrap",
          borderRight: "2px solid #7c3aed", width: "fit-content", margin: "0 auto 24px",
          animation: "typewriter 2.5s steps(28,end) 1s both, blink .8s step-end infinite 3.5s"
        }}>
          Tech Dev · Game Builder · Creator
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {[
            { label: "React", color: "#4c1d95", border: "#7c3aed", bg: "rgba(167,139,250,0.2)" },
            { label: "Firebase", color: "#1e3a5f", border: "#2563eb", bg: "rgba(59,130,246,0.15)" },
            { label: "Unity", color: "#4a1942", border: "#a21caf", bg: "rgba(192,38,211,0.15)" },
            { label: "Next.js", color: "#14532d", border: "#16a34a", bg: "rgba(34,197,94,0.15)" },
            { label: "AI/ML", color: "#451a03", border: "#d97706", bg: "rgba(245,158,11,0.18)" },
          ].map((tag) => (
            <span key={tag.label} className="mono" style={{ fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99, border: `1.5px solid ${tag.border}`, color: tag.color, background: tag.bg }}>
              {tag.label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
          <a href="#projects" className="mono" style={{ fontSize: 13, fontWeight: 700, padding: "12px 24px", borderRadius: 12, border: "2px solid #7c3aed", color: "#4c1d95", background: "rgba(167,139,250,0.2)", textDecoration: "none" }}>
            view projects ↓
          </a>
          <a href="#contact" className="mono" style={{ fontSize: 13, fontWeight: 700, padding: "12px 24px", borderRadius: 12, border: "2px solid #a21caf", color: "#4a1942", background: "rgba(192,38,211,0.15)", textDecoration: "none" }}>
            contact me ↓
          </a>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(180,150,230,0.25)", border: "1px solid #9333ea", borderRadius: 99, padding: "6px 16px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="#9333ea" stroke="none"/></svg>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "#6d28d9" }}>@vineeta.007</span>
        </div>
      </div>
    </section>
  );
}