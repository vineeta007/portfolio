"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), { ...form, createdAt: serverTimestamp() });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", background: "#1a0e2e", border: "1.5px solid #2d1f4a",
    borderRadius: 12, padding: "12px 16px", color: "#f0eaff",
    fontFamily: "'Space Mono', monospace", fontSize: 13, outline: "none",
    boxSizing: "border-box" as const,
  };
  const labelStyle = { fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#a78bfa", letterSpacing: "0.1em", display: "block", marginBottom: 8 };

  return (
    <section id="contact" style={{ padding: "80px 24px", background: "#0a0812" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#a78bfa", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          // contact.init
          <div style={{ flex: 1, height: 1, background: "rgba(167,139,250,0.2)" }} />
        </div>
        <div style={{ background: "#110d1e", border: "1px solid #1e1535", borderRadius: 20, padding: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>// name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="your name" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>// email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>// message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="let's build something cool..." rows={4} style={{ ...inputStyle, resize: "none" }} />
          </div>
          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, padding: "12px", borderRadius: 12, border: "2px solid #7c3aed", color: "#c4b5fd", background: "#1a0e2e", cursor: "pointer", transition: "all 0.2s", opacity: status === "sending" ? 0.5 : 1 }}
          >
            {status === "idle" && "send message ↗"}
            {status === "sending" && "sending..."}
            {status === "sent" && "✓ message sent!"}
            {status === "error" && "error — try again"}
          </button>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", paddingBottom: 40 }}>
          <div className="mono" style={{ fontSize: 10, color: "#4a3060", letterSpacing: "0.15em", marginBottom: 8 }}>// find me at</div>
          <a href="https://instagram.com/vineeta.007" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(147,51,234,0.15)", border: "1.5px solid #9333ea", borderRadius: 99, padding: "6px 16px", textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="#c084fc" stroke="none"/></svg>
            <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "#c084fc" }}>@vineeta.007</span>
          </a>
        </div>
      </div>
    </section>
  );
}