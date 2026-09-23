"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
  );
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = (e.target as HTMLElement)?.closest?.("a, button, [data-tip]");
      setActive(Boolean(target));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999] hidden md:block"
    >
      <div
        className="absolute h-1.5 w-1.5 rounded-full bg-accent"
        style={{
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
          transition: "transform 0.05s linear",
        }}
      />
      <div
        className={`absolute h-8 w-8 rounded-full border transition-all duration-150 ${
          active ? "border-accent/80" : "border-muted/30"
        }`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) ${
            active ? "scale(1.35)" : "scale(1)"
          }`,
        }}
      />
    </div>
  );
}