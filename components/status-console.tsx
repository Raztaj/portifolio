"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function StatusConsole({
  projects,
  labs,
}: {
  projects: number;
  labs: number;
}) {
  const [now, setNow] = useState<Date | null>(null);

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

  const parts = new Intl.DateTimeFormat("en-GB", {
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
          system status
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-success">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
          online
        </span>
      </div>
      <dl className="divide-y divide-line font-mono text-[11px]">
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">local time</dt>
          <dd className="tabular-nums text-fg">{now ? time : "--:--:--"}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">location</dt>
          <dd className="text-fg">{site.country}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">focus</dt>
          <dd className="text-accent">{site.focus}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">projects</dt>
          <dd className="text-fg">{pad(projects)}</dd>
        </div>
        <div className="flex justify-between px-3 py-1.5">
          <dt className="text-muted">labs</dt>
          <dd className="text-fg">{pad(labs)}</dd>
        </div>
      </dl>
    </div>
  );
}