const achievements = [
  { icon: "🏆", title: "Hackathon Winner", sub: "Smart India Hackathon 2023", xp: "+500 XP", bg: "#130b20", border: "#6b21a8", accent: "#c4b5fd" },
  { icon: "🚀", title: "Open Source Hero", sub: "5+ merged PRs · active contributor", xp: "+300 XP", bg: "#0c1520", border: "#0369a1", accent: "#7dd3fc" },
  { icon: "🎓", title: "Top 1% Developer", sub: "GitHub streak · consistent shipper", xp: "+400 XP", bg: "#0d1a0e", border: "#15803d", accent: "#86efac" },
];

const stats = [
  { num: "12+", label: "projects", color: "#c4b5fd", border: "#6b21a8", bg: "#130b20" },
  { num: "3", label: "hackathons", color: "#7dd3fc", border: "#0369a1", bg: "#0c1520" },
  { num: "500+", label: "commits", color: "#f9a8d4", border: "#9d174d", bg: "#1e0a18" },
  { num: "2k+", label: "lines", color: "#86efac", border: "#15803d", bg: "#0d1a0e" },
];

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: "80px 24px", background: "#0f0d1a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#86efac", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          // achievements_unlocked
          <div style={{ flex: 1, height: 1, background: "rgba(134,239,172,0.2)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {achievements.map((a) => (
            <div key={a.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${a.border}`, background: a.bg }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f0eaff" }}>{a.title}</div>
                <div style={{ fontSize: 12, marginTop: 2, color: "#8b9ab0" }}>{a.sub}</div>
              </div>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99, border: `1.5px solid ${a.border}`, color: a.accent, background: a.bg }}>
                {a.xp}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginTop: 32 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ borderRadius: 12, padding: "16px 8px", textAlign: "center", border: `1.5px solid ${s.border}`, background: s.bg }}>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7, color: s.color }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}