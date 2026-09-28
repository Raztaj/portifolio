"use client";

import { useEffect, useRef, useState } from "react";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatsStrip({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !ref.current) {
      const id = requestAnimationFrame(() => setStarted(true));
      return () => cancelAnimationFrame(id);
    }
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((s) => {
        const numeric = Number(s.value);
        const isNumber = s.value !== "AR/EN" && Number.isFinite(numeric);
        return (
          <Cell
            key={s.label}
            label={s.label}
            isNumber={isNumber}
            target={started && isNumber ? numeric : null}
            raw={s.value}
          />
        );
      })}
    </div>
  );
}

function Cell({
  label,
  isNumber,
  target,
  raw,
}: {
  label: string;
  isNumber: boolean;
  target: number | null;
  raw: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === null) return;
    const from = performance.now();
    const duration = 800;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - from) / duration, 1);
      setCount(Math.round(easeOut(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const display = isNumber
    ? target === null
      ? "00"
      : String(count).padStart(2, "0")
    : raw;

  return (
    <div className="border-l border-line pl-4">
      <div className="font-sans text-5xl font-semibold tracking-tight text-fg tabular-nums">
        {display}
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
    </div>
  );
}