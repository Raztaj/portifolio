"use client";

import { useState } from "react";

export default function CopyLink({
  url,
  label,
  copied,
  className = "",
}: {
  url: string;
  label: string;
  copied: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(url).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }}
      aria-label={label}
      className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
        done ? "text-success" : "text-accent hover:text-fg"
      } ${className}`}
    >
      {done ? copied : `${label} ↗`}
    </button>
  );
}