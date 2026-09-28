"use client";

import { useState } from "react";
import Link from "next/link";
import { localizeHref } from "@/lib/urls";
import type { Locale } from "@/lib/i18n";

export interface BuildItem {
  index: string;
  title: string;
  stack: string;
  desc: string;
  cta: string;
  href: string;
}

export default function WhatBuild({
  lang,
  items,
  stackLabel,
}: {
  lang: Locale;
  items: readonly BuildItem[];
  stackLabel: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <li key={item.index} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="group flex w-full items-center gap-4 px-4 py-4 text-start transition-colors hover:bg-surface sm:px-6 sm:py-5"
            >
              <span className="font-mono text-sm tracking-[0.2em] text-accent">
                {item.index}
              </span>
              <span className="font-sans text-lg font-semibold tracking-tight text-fg sm:text-xl">
                {item.title}
              </span>
              <span
                aria-hidden
                className={`ms-auto font-mono text-xl leading-none text-accent transition-transform ${
                  expanded ? "" : "rotate-0"
                }`}
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
                    <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-fg">
                      {item.stack}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {item.title}
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                    <Link
                      href={localizeHref(lang, item.href)}
                      className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                    >
                      {item.cta}
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