const images = [
  { src: "/images/reyna-wallpaper.jpg", label: "Reyna · neon", border: "#6b21a8" },
  { src: "/images/reyna1.png", label: "Reyna · magenta", border: "#9d174d" },
  { src: "/images/clove3.jpeg", label: "Clove · purple", border: "#0369a1" },
  { src: "/images/clove2.png", label: "Clove · swirl", border: "#4c1d95" },
  { src: "/images/clove1.jpeg", label: "Clove · butterfly", border: "#831843" },
  { src: "/images/clove.png", label: "Clove · lavender", border: "#7e22ce" },
];

export default function Gallery() {
  return (
    <section id="gallery" style={{ padding: "80px 24px", background: "#0a0812" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#f9a8d4", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          // gallery.frames
          <div style={{ flex: 1, height: 1, background: "rgba(249,168,212,0.2)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {images.map((img) => (
            <div
              key={img.label}
              style={{ borderRadius: 10, overflow: "hidden", border: `1.5px solid ${img.border}`, aspectRatio: "16/10", position: "relative", cursor: "pointer", background: "#110d1e", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            >
              <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
        <p className="mono" style={{ fontSize: 11, color: "#4a3060", marginTop: 16, textAlign: "center" }}>// copy your images to public/images/</p>
      </div>
    </section>
  );
}