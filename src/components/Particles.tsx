"use client";
import { useEffect, useRef } from "react";

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ["#c4b5fd", "#e879f9", "#ddd6fe", "#f0abfc", "#a78bfa"];

    const spawn = () => {
      const p = document.createElement("div");
      const dx = (Math.random() - 0.5) * 60;
      p.style.cssText = `position:absolute;width:5px;height:5px;border-radius:50%;pointer-events:none;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:particleDrift ${2 + Math.random() * 2}s ease-out both;--dx:${dx}px;opacity:0.6;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    };

    const interval = setInterval(spawn, 250);
    for (let i = 0; i < 12; i++) setTimeout(spawn, i * 80);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}