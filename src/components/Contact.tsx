"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Reveal from "./Reveal";
import { PROFILE } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid var(--line)",
  borderRadius: 11,
  padding: "12px 15px",
  color: "var(--text)",
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  outline: "none",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10.5,
  letterSpacing: "0.14em",
  color: "var(--text-dim)",
  display: "block",
  marginBottom: 7,
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const valid = form.name.trim() && form.email.includes("@") && form.message.trim().length > 4;

  const submit = async () => {
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), { ...form, createdAt: serverTimestamp() });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section" style={{ maxWidth: 620 }}>
      <Reveal>
        <div className="eyebrow" style={{ color: "var(--violet)" }}>// contact</div>
        <h2 className="h2">Let&apos;s build something</h2>
        <p className="lead">
          Internships, freelance work, or just to talk shop about RAG and ML — the inbox is open.
        </p>
      </Reveal>

      <Reveal delay={90}>
        <div className="card" style={{ padding: 26, marginTop: 36 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>// name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="your name"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>// email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>// message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="what's on your mind?"
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <button
            onClick={submit}
            disabled={status === "sending" || (!valid && status === "idle")}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", opacity: !valid && status === "idle" ? 0.5 : 1 }}
          >
            {status === "idle" && "send message ↗"}
            {status === "sending" && "sending…"}
            {status === "sent" && "✓ sent — talk soon"}
            {status === "error" && "something broke — retry"}
          </button>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="chip" style={{ padding: "8px 14px" }}>
            github ↗
          </a>
          <a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer" className="chip" style={{ padding: "8px 14px" }}>
            instagram ↗
          </a>
          <a href={`mailto:${PROFILE.email}`} className="chip" style={{ padding: "8px 14px" }}>
            {PROFILE.email}
          </a>
        </div>
      </Reveal>

      <p className="mono" style={{ textAlign: "center", fontSize: 10.5, color: "var(--text-mute)", marginTop: 40, letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} Vineeta Devnani · built with Next.js + Three.js
      </p>
    </section>
  );
}
