"use client";

import { useState } from "react";
import Link from "next/link";
import { localizeHref } from "@/lib/urls";
import type { Locale } from "@/lib/i18n";
import type { LabCategory, LabEntry } from "@/lib/content/lab";

const CAT_COLOR: Record<LabCategory, string> = {
  SECURITY: "bg-cat-security text-cat-security",
  AUTOMATION: "bg-cat-automation text-cat-automation",
  SYSTEMS: "bg-cat-systems text-cat-systems",
  RESEARCH: "bg-cat-research text-cat-research",
};

export default function LabAccordion({
  lang,
  entries,
  readLabel,
  stackLabel,
}: {
  lang: Locale;
  entries: LabEntry[];
  readLabel: string;
  stackLabel: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="border-t border-line">
      {entries.map((entry, i) => {
        const expanded = open === i;
        const color = CAT_COLOR[entry.category];
        return (
          <li key={entry.slug} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="group flex w-full items-center gap-4 px-4 py-4 text-start transition-colors hover:bg-surface sm:px-6"
            >
              <span className="font-mono text-sm tracking-[0.2em] text-accent">
                {entry.index}
              </span>
              <span className="flex flex-1 items-center gap-3">
                <span
                  aria-hidden
                  className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${color.split(" ")[0]}`}
                />
                <span className="font-mono text-sm font-semibold tracking-tight text-fg">
                  {entry.name}
                </span>
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-muted sm:inline">
                {entry.tag} / {entry.status}
              </span>
              <span
                aria-hidden
                className={`ms-auto font-mono text-xl leading-none text-accent sm:ms-0 sm:ps-2`}
              >
                {expanded ? "×" : "+"}
              </span>
            </button>
            {expanded && (
              <div className="border-t border-line bg-surface-2/50 px-4 pb-6 sm:px-6">
                <div className="grid gap-x-10 gap-y-2 pt-5 sm:grid-cols-[240px_1fr]">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {stackLabel}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-fg">
                      {entry.stack.join(" · ")}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] ${color.split(" ")[1]}`}
                    >
                      {entry.category} · {entry.status}
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                      {entry.question}
                    </p>
                    <Link
                      href={localizeHref(lang, `/lab/${entry.slug}`)}
                      className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                    >
                      {readLabel}
                      <span className="rtl:inline rtl:rotate-180">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}