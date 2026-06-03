const skills = [
  { name: "Frontend (React/Next.js)", pct: 88, color: "#b026ff", textColor: "#e0b0ff" },
  { name: "Backend / Firebase", pct: 79, color: "#0369a1", textColor: "#7dd3fc" },
  { name: "Game Dev (Unity)", pct: 65, color: "#9d174d", textColor: "#f9a8d4" },
  { name: "AI / ML", pct: 72, color: "#15803d", textColor: "#86efac" },
  { name: "DevOps / Vercel", pct: 58, color: "#b45309", textColor: "#fcd34d" },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "80px 24px", background: "#0f0d1a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#7dd3fc", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          // skill_tree.json
          <div style={{ flex: 1, height: 1, background: "rgba(56,189,248,0.2)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {skills.map((s) => (
            <div key={s.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: s.textColor }}>{s.name}</span>
                <span className="mono" style={{ fontSize: 12, color: s.color }}>{s.pct}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 99, background: s.color, width: `${s.pct}%`, animation: "skillFill 1.5s cubic-bezier(.4,0,.2,1) both" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}