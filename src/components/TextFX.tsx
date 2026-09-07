"use client";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#01";

/* Decrypt / scramble-in effect. Content is drawn only from GLYPHS + the
   provided text, so dangerouslySetInnerHTML is safe here. */
export function Scramble({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [html, setHtml] = useState(() => text);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setHtml(text);
      return;
    }

    type Q = { to: string; start: number; end: number; c: string };
    const queue: Q[] = [];
    for (let i = 0; i < text.length; i++) {
      const start = Math.floor(Math.random() * 16);
      queue.push({ to: text[i], start, end: start + 14 + Math.floor(Math.random() * 22), c: "" });
    }

    let frame = 0;
    const tick = () => {
      let out = "";
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          done++;
          out += q.to;
        } else if (frame >= q.start) {
          if (q.to === " ") {
            out += " ";
          } else {
            if (!q.c || Math.random() < 0.3) q.c = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            out += `<span style="color:var(--violet);opacity:.75">${q.c}</span>`;
          }
        } else {
          out += q.to === " " ? " " : "";
        }
      }
      setHtml(out);
      if (done < queue.length) {
        frame++;
        raf.current = requestAnimationFrame(tick);
      } else {
        setHtml(text);
      }
    };

    const t = window.setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf.current);
    };
  }, [text, delay]);

  return <span className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 20,
  className,
  style,
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(text.length);
      return;
    }
    let i = 0;
    let id: number | undefined;
    const t = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length && id) window.clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(t);
      if (id) window.clearInterval(id);
    };
  }, [text, delay, speed]);

  const typing = n < text.length;
  return (
    <span className={className} style={style}>
      {text.slice(0, n)}
      {typing && (
        <span
          aria-hidden
          style={{ color: "var(--violet)", animation: "blink .8s step-end infinite" }}
        >
          ▋
        </span>
      )}
    </span>
  );
}
