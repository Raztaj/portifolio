"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function StatusConsole({
  lang,
  projects,
  labs,
}: {
  lang: Locale;
  projects: number;
  labs: number;
}) {
  const dict = getDictionary(lang).status;
  const [now, setNow] = useState<Date | null>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let rafId = 0;
    const tick = () => setNow(new Date());
    rafId = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const full = site.role2;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setTyped(full));
      return () => cancelAnimationFrame(id);
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, []);

  const parts = new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now ?? new Date());

  const map = new Map(parts.map((p) => [p.type, p.value]));
  const time = `${map.get("hour") ?? "00"}:${map.get("minute") ?? "00"}:${
    map.get("second") ?? "00"
  }`;

  return (
    <div className="w-full border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {dict.title}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-success">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
          {dict.online}
        </span>
      </div>
      <dl className="divide-y divide-line font-mono text-[11px]">
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">{dict.localTime}</dt>
          <dd className="tabular-nums text-fg">
            {now ? time : "--:--:--"}
          </dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">{dict.location}</dt>
          <dd className="text-fg">{site.country}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">{dict.focus}</dt>
          <dd className="text-accent">{site.focus}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">{dict.projects}</dt>
          <dd className="text-fg">{pad(projects)}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">{dict.labs}</dt>
          <dd className="text-fg">{pad(labs)}</dd>
        </div>
      </dl>
      <div className="flex items-center gap-2 border-t border-line px-3 py-1.5">
        <span className="text-accent">$</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
          {typed}
        </span>
        <span aria-hidden className="caret inline-block h-3 w-1.5 bg-accent" />
      </div>
    </div>
  );
}