"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { PROFILE, GH_FALLBACK } from "@/lib/data";

type Stats = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  topLanguages: string[];
};

function yearsSince(iso: string) {
  const then = new Date(iso).getTime();
  return ((Date.now() - then) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
}

export default function GitHub() {
  const [stats, setStats] = useState<Stats>(GH_FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const key = "gh_stats_v1";
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        setStats(JSON.parse(cached));
        setLive(true);
        return;
      }
    } catch {}

    const ctrl = new AbortController();
    (async () => {
      try {
        const u = PROFILE.githubUser;
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${u}`, { signal: ctrl.signal }),
          fetch(`https://api.github.com/users/${u}/repos?per_page=100`, { signal: ctrl.signal }),
        ]);
        if (!profileRes.ok || !reposRes.ok) return;
        const profile = await profileRes.json();
        const repos: { language: string | null; fork: boolean }[] = await reposRes.json();

        const counts = new Map<string, number>();
        repos.filter((r) => !r.fork).forEach((r) => {
          if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
        });
        const topLanguages = [...counts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([l]) => l);

        const next: Stats = {
          public_repos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
          created_at: profile.created_at,
          topLanguages: topLanguages.length ? topLanguages : GH_FALLBACK.topLanguages,
        };
        setStats(next);
        setLive(true);
        try {
          sessionStorage.setItem(key, JSON.stringify(next));
        } catch {}
      } catch {
        /* keep fallback */
      }
    })();

    return () => ctrl.abort();
  }, []);

  const tiles = [
    { n: stats.public_repos, l: "public repos", c: "var(--violet)" },
    { n: `${yearsSince(stats.created_at)}y`, l: "on GitHub", c: "var(--magenta)" },
    { n: stats.topLanguages.length, l: "languages shipped", c: "var(--cyan)" },
    { n: 3, l: "live deployments", c: "var(--lime)" },
  ];

  return (
    <section id="github" className="section">
      <Reveal>
        <div className="eyebrow" style={{ color: "var(--lime)" }}>// git_activity</div>
        <h2 className="h2">Building in the open</h2>
        <p className="lead">
          {live ? "Pulled live from" : "From"} the GitHub API — no vanity numbers, just what&apos;s actually on{" "}
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--lime)" }}>
            @{PROFILE.githubUser}
          </a>
          .
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 14,
          marginTop: 44,
        }}
      >
        {tiles.map((t, i) => (
          <Reveal key={t.l} delay={i * 70}>
            <div className="card" style={{ padding: "22px 18px", textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 30, fontWeight: 700, color: t.c }}>{t.n}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 6, letterSpacing: "0.02em" }}>{t.l}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="card" style={{ padding: 22, marginTop: 16 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--text-mute)", marginBottom: 14 }}>
            MOST-USED LANGUAGES
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stats.topLanguages.map((l, i) => (
              <span
                key={l}
                className="chip"
                style={{
                  borderColor: "var(--line)",
                  color: "var(--text)",
                  background: `linear-gradient(90deg, rgba(176,107,255,${0.16 - i * 0.025}), transparent)`,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ marginTop: 24 }}
        >
          full profile on GitHub →
        </a>
      </Reveal>
    </section>
  );
}
