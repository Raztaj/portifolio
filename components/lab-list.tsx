"use client";

import { localizeHref } from "@/lib/urls";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

import type { LabCategory, LabEntry, LabStatus } from "@/lib/content/lab";

const FILL: Record<LabStatus, number> = {
  ACTIVE: 100,
  RESOLVED: 100,
  PROTOTYPE: 80,
  EXPERIMENT: 50,
  RESEARCH: 35,
};

const COLOR: Record<LabStatus, string> = {
  ACTIVE: "text-success",
  RESOLVED: "text-success",
  PROTOTYPE: "text-accent",
  EXPERIMENT: "text-warning",
  RESEARCH: "text-muted",
};

type Filter = "ALL" | LabCategory;

const CATEGORIES: LabCategory[] = ["SECURITY", "AUTOMATION", "SYSTEMS", "RESEARCH"];

export default function LabList({ lang, entries }: { lang: Locale; entries: LabEntry[] }) {
  const dict = getDictionary(lang);
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? entries : entries.filter((e) => e.category === filter)),
    [entries, filter]
  );

  const filterLabel = (f: Filter) =>
    f === "ALL" ? dict.lab.filters[0] : dict.lab.categories[f];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line pb-4">
        <button
          onClick={() => setFilter("ALL")}
          aria-pressed={filter === "ALL"}
          className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
            filter === "ALL"
              ? "border-accent bg-surface-2 text-accent"
              : "border-line bg-transparent text-muted hover:text-fg"
          }`}
        >
          [{filterLabel("ALL")}]
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              filter === c
                ? "border-accent bg-surface-2 text-accent"
                : "border-line bg-transparent text-muted hover:text-fg"
            }`}
          >
            [{dict.lab.categories[c]}]
          </button>
        ))}
        <span className="ms-auto font-mono text-[11px] tracking-[0.2em] text-muted">
          {String(filtered.length).padStart(2, "0")}
        </span>
      </div>

      <div className="divide-y divide-line">
        {filtered.map((entry) => (
          <Link
            key={entry.slug}
            href={localizeHref(lang, `/lab/${entry.slug}`)}
            className="group block py-5 transition-colors hover:bg-surface"
          >
            <div className="grid grid-cols-12 items-baseline gap-2 sm:gap-4">
              <span className="col-span-2 font-mono text-[11px] tracking-[0.2em] text-accent sm:col-span-1">
                {entry.index}
              </span>
              <div className="col-span-10 sm:col-span-4">
                <div className="font-mono text-sm font-semibold tracking-tight text-fg group-hover:text-accent">
                  {entry.name}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  {entry.tag} / {entry.status}
                </div>
              </div>
              <div className="col-span-6 col-start-3 sm:col-span-4 sm:col-start-auto">
                <div className="font-mono text-[11px] text-muted">
                  {entry.stack.join(" · ")}
                </div>
                <div className="mt-1.5 block font-mono text-[11px] leading-none tracking-tight">
                  <span className={COLOR[entry.status]}>
                    {"█".repeat(Math.max(1, Math.round(FILL[entry.status] / 5)))}
                  </span>
                  <span className="text-line">
                    {"░".repeat(Math.max(0, 20 - Math.round(FILL[entry.status] / 5)))}
                  </span>
                </div>
              </div>
              <div className="col-span-6 flex justify-end sm:col-span-2">
                <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted group-hover:text-accent">
                  {dict.lab.open}
                  <span className="rtl:inline rtl:rotate-180"> →</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}