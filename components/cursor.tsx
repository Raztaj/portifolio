"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !hover.matches) return;
    const id = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none");

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let active = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hit = Boolean((e.target as HTMLElement)?.closest?.("a, button, [data-tip]"));
      if (hit !== active && ringRef.current) {
        active = hit;
        ringRef.current.style.borderColor = active ? "rgba(63, 212, 255, 0.85)" : "rgba(154, 166, 181, 0.3)";
      }
    };

    const tick = () => {
      rx += (tx - rx) * 0.3;
      ry += (ty - ry) * 0.3;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`;
      }
      if (ringRef.current) {
        const scale = active ? 1.35 : 1;
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-accent"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="absolute h-8 w-8 rounded-full border"
        style={{
          transform: "translate(-100px, -100px) translate(-50%, -50%)",
          borderColor: "rgba(154, 166, 181, 0.3)",
          transition: "border-color 0.15s ease",
        }}
      />
    </div>
  );
}