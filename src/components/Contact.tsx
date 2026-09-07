"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Reveal from "./Reveal";
import { PROFILE } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const FORMSUBMIT = `https://formsubmit.co/ajax/${PROFILE.email}`;

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}
function GitIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" />
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid var(--line)",
  borderRadius: 11,
  padding: "12px 15px",
  color: "var(--text)",
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
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
  const [focus, setFocus] = useState<string | null>(null);

  const valid =
    form.name.trim().length > 1 && form.email.includes("@") && form.message.trim().length > 4;

  const submit = async () => {
    if (!valid || status === "sending") return;
    setStatus("sending");

    const payload = {
      name: form.name,
      email: form.email,
      message: form.message,
      _subject: `Portfolio message from ${form.name}`,
      _template: "table",
      _captcha: "false",
    };

    const results = await Promise.allSettled([
      addDoc(collection(db, "messages"), { ...form, createdAt: serverTimestamp() }),
      fetch(FORMSUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => {
        if (!r.ok) throw new Error("mail failed");
        return r.json();
      }),
    ]);

    if (results.some((r) => r.status === "fulfilled")) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  const field = (
    key: "name" | "email" | "message",
    label: string,
    placeholder: string,
    type: "text" | "email" | "area"
  ) => {
    const focused = focus === key;
    const style: React.CSSProperties = {
      ...inputBase,
      borderColor: focused ? "var(--violet)" : "var(--line)",
      boxShadow: focused ? "0 0 0 3px rgba(176,107,255,0.14)" : "none",
      background: focused ? "rgba(176,107,255,0.04)" : inputBase.background,
      ...(type === "area" ? { resize: "vertical", minHeight: 108 } : {}),
    };
    return (
      <div style={{ marginBottom: 15 }}>
        <label style={{ ...labelStyle, color: focused ? "var(--violet)" : "var(--text-dim)" }}>
          {label}
        </label>
        {type === "area" ? (
          <textarea
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            onFocus={() => setFocus(key)}
            onBlur={() => setFocus(null)}
            placeholder={placeholder}
            rows={4}
            style={style}
          />
        ) : (
          <input
            type={type}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            onFocus={() => setFocus(key)}
            onBlur={() => setFocus(null)}
            placeholder={placeholder}
            style={style}
          />
        )}
      </div>
    );
  };

  const channels = [
    { icon: <MailIcon />, label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: <GitIcon />, label: `@${PROFILE.githubUser}`, href: PROFILE.github },
    { icon: <InstaIcon />, label: "@vineeta.007", href: PROFILE.instagram },
  ];

  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="eyebrow" style={{ color: "var(--violet)" }}>// contact</div>
        <h2 className="h2">Let&apos;s build something</h2>
        <p className="lead">
          Internships, freelance work, or just to talk shop about RAG and ML — send a note and it
          lands straight in my inbox.
        </p>
      </Reveal>

      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 18, marginTop: 40 }}>
        {/* left: direct channels */}
        <Reveal>
          <div className="card" style={{ padding: 22, height: "100%", display: "flex", flexDirection: "column" }}>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "var(--text-mute)", marginBottom: 16 }}>
              DIRECT CHANNELS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="mono contact-chan"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    fontSize: 12,
                    color: "var(--text-dim)",
                    textDecoration: "none",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid var(--line)",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ color: "var(--violet)", display: "flex" }}>{c.icon}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</span>
                </a>
              ))}
            </div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--text-mute)", margin: "22px 0 10px" }}>
              GOOD FITS
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {["AI / RAG & LLM features", "Full-stack web apps (Next.js)", "ML prototyping & notebooks"].map((x) => (
                <li key={x} style={{ display: "flex", gap: 9, fontSize: 12, color: "var(--text-dim)" }}>
                  <span style={{ color: "var(--violet)" }}>▹</span>
                  {x}
                </li>
              ))}
            </ul>

            <div
              className="mono"
              style={{ marginTop: "auto", paddingTop: 22, fontSize: 10.5, color: "var(--text-mute)", lineHeight: 1.7 }}
            >
              <span style={{ color: "var(--lime)" }}>●</span> open to work · {PROFILE.location}
              <br />
              usually replies within a day
            </div>
          </div>
        </Reveal>

        {/* right: terminal form */}
        <Reveal delay={90}>
          <div className="card card-glow" style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderBottom: "1px solid var(--line)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--magenta)" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--amber)" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--lime)" }} />
              <span className="mono" style={{ marginLeft: 8, fontSize: 11, color: "var(--text-mute)" }}>
                new_message.txt
              </span>
              <span
                className="mono"
                style={{ marginLeft: "auto", fontSize: 10, color: status === "sent" ? "var(--lime)" : "var(--text-mute)" }}
              >
                {status === "sending" ? "transmitting…" : status === "sent" ? "delivered ✓" : "● ready"}
              </span>
            </div>

            <div style={{ padding: 22 }}>
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "26px 8px" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      margin: "0 auto 16px",
                      borderRadius: "50%",
                      border: "2px solid var(--lime)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--lime)",
                      fontSize: 24,
                      boxShadow: "0 0 30px -6px var(--lime)",
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Message sent</div>
                  <p className="mono" style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.6 }}>
                    it&apos;s in my inbox — I&apos;ll reply to your email soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn"
                    style={{ marginTop: 18 }}
                  >
                    send another
                  </button>
                </div>
              ) : (
                <>
                  {field("name", "// name", "your name", "text")}
                  {field("email", "// email", "you@email.com", "email")}
                  {field("message", "// message", "what's on your mind?", "area")}
                  <button
                    onClick={submit}
                    disabled={status === "sending" || !valid}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: 4, opacity: !valid ? 0.5 : 1 }}
                  >
                    {status === "sending" ? "sending…" : status === "error" ? "failed — retry ↻" : "send message ↗"}
                  </button>
                  {status === "error" && (
                    <p className="mono" style={{ fontSize: 11, color: "var(--magenta)", marginTop: 10, textAlign: "center" }}>
                      couldn&apos;t send — email me directly at {PROFILE.email}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <p className="mono" style={{ textAlign: "center", fontSize: 10.5, color: "var(--text-mute)", marginTop: 44, letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} Vineeta Devnani · built with Next.js + Three.js
      </p>

      <style>{`
        .contact-chan:hover {
          border-color: var(--violet) !important;
          background: rgba(176,107,255,0.06);
          color: var(--text) !important;
          transform: translateX(3px);
        }
        @media (max-width: 780px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
