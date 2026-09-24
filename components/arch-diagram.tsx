"use client";

import { useMemo, useState } from "react";
import type { ArchNode, ArchEdge } from "@/lib/content/types";

const BOX_W = 168;
const BOX_H = 52;
const COL_W = 230;
const ROW_H = 92;
const PAD = 24;

export default function ArchDiagram({
  nodes,
  edges,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const layout = useMemo(() => {
    const depth = new Map<string, number>();
    for (const n of nodes) depth.set(n.id, 0);
    let changed = true;
    let guard = 0;
    while (changed && guard < nodes.length * nodes.length) {
      changed = false;
      guard++;
      for (const e of edges) {
        const cur = depth.get(e.to) ?? 0;
        const next = (depth.get(e.from) ?? 0) + 1;
        if (next > cur) {
          depth.set(e.to, next);
          changed = true;
        }
      }
    }
    const maxDepth = Math.max(0, ...depth.values());
    const cols = new Map<number, number>();
    const rows = new Map<string, number>();
    for (const n of nodes) {
      const d = depth.get(n.id) ?? 0;
      const r = cols.get(d) ?? 0;
      cols.set(d, r + 1);
      rows.set(n.id, r);
    }
    const width = PAD * 2 + (maxDepth + 1) * COL_W;
    const maxRows = Math.max(0, ...cols.values());
    const height = PAD * 2 + maxRows * ROW_H;
    const pos = new Map<
      string,
      { x: number; y: number; d: number; r: number; count: number }
    >();
    for (const n of nodes) {
      pos.set(n.id, {
        x: PAD + (depth.get(n.id) ?? 0) * COL_W,
        y: PAD + (rows.get(n.id) ?? 0) * ROW_H,
        d: depth.get(n.id) ?? 0,
        r: rows.get(n.id) ?? 0,
        count: cols.get(depth.get(n.id) ?? 0) ?? 1,
      });
    }
    return { pos, width, height };
  }, [nodes, edges]);

  const connectedTo = (id: string | null) => {
    const set = new Set<string>();
    if (!id) return set;
    set.add(id);
    for (const e of edges) {
      if (e.from === id) set.add(e.to);
      if (e.to === id) set.add(e.from);
    }
    return set;
  };

  const active = hovered ? connectedTo(hovered) : null;

  return (
    <div className="overflow-x-auto border border-line bg-surface">
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="mx-auto block"
        role="img"
        aria-label="Interactice architecture diagram"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#3fd4ff" />
          </marker>
        </defs>

        {edges.map((e) => {
          const a = layout.pos.get(e.from);
          const b = layout.pos.get(e.to);
          if (!a || !b) return null;
          const lit =
            active?.has(e.from) && active.has(e.to);
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={a.x + BOX_W}
              y1={a.y + BOX_H / 2}
              x2={b.x}
              y2={b.y + BOX_H / 2}
              stroke={lit ? "#3fd4ff" : "#34414e"}
              strokeWidth={lit ? 1.5 : 1}
              markerEnd="url(#arrow)"
            />
          );
        })}

        {nodes.map((n) => {
          const p = layout.pos.get(n.id);
          if (!p) return null;
          const lit = active?.has(n.id);
          return (
            <g
              key={n.id}
              transform={`translate(${p.x}, ${p.y})`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <rect
                width={BOX_W}
                height={BOX_H}
                rx={6}
                fill={lit ? "#1d2530" : "#141a22"}
                stroke={lit ? "#3fd4ff" : "#34414e"}
                strokeWidth={lit ? 1.5 : 1}
              />
              <text
                x={BOX_W / 2}
                y={BOX_H / 2 - 4}
                textAnchor="middle"
                fontFamily="JetBrains Mono, ui-monospace, monospace"
                fontSize="11"
                letterSpacing="1.5"
                fill={lit ? "#3fd4ff" : "#f2f5f8"}
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={BOX_W / 2}
                  y={BOX_H / 2 + 14}
                  textAnchor="middle"
                  fontFamily="IBM Plex Sans Arabic, ui-sans-serif, system-ui, sans-serif"
                  fontSize="9"
                  letterSpacing="0.5"
                  fill="#9aa6b5"
                >
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}