"use client";

import { localizeHref } from "@/lib/urls";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

import { site } from "@/lib/site";
import LangToggle from "./lang-toggle";

const LOCALES: Locale[] = ["en", "ar"];

const NAV_LINKS: { id: "work" | "lab" | "research" | "notes" | "about"; href: string }[] = [
  { id: "work", href: "/#work" },
  { id: "lab", href: "/lab" },
  { id: "research", href: "/research" },
  { id: "notes", href: "/notes" },
  { id: "about", href: "/about" },
];

export default function Nav({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dict = getDictionary(lang);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const button = buttonRef.current;
    const focusables = () => [
      ...(button ? [button] : []),
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
    ];
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const [seenPath, setSeenPath] = useState(pathname);
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOpen(false);
  }

  const base = (() => {
    let rest = pathname ?? "";
    for (const l of LOCALES) {
      rest = rest.replace(new RegExp(`^/${l}(?=/|$)`), "");
    }
    return rest || "/";
  })();

  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (base !== "/" && activeSection !== null) {
    setActiveSection(null);
  }

  useEffect(() => {
    if (base !== "/") return;
    const el = document.getElementById("work");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setActiveSection(entry.isIntersecting ? "work" : null);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [base]);

  const isActive = (href: string) => {
    if (href === "/#work") return base === "/" && activeSection === "work";
    const match = href === "/" ? href : href.replace(/\/$/, "");
    return base === match || (match !== "/" && base.startsWith(`${match}/`));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={localizeHref(lang, "/")}
          className="font-mono text-sm font-semibold tracking-tight text-fg hover:text-accent"
        >
          TK<span className="text-accent">/</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.id}
                href={localizeHref(lang, link.href)}
                aria-current={active ? "page" : undefined}
                className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "text-accent underline underline-offset-4"
                    : "text-muted hover:text-accent"
                }`}
              >
                {dict.nav[link.id]}
              </Link>
            );
          })}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            {dict.nav.linkedin}
            <span className="text-accent transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href={site.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 border border-accent bg-accent px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-accent"
          >
            {dict.nav.whatsapp}
            <span className="text-white transition-transform group-hover:text-accent group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
              ↗
            </span>
          </a>
          <LangToggle
            lang={lang}
            otherLabel={lang === "en" ? "العربية" : "EN"}
            ariaLabel={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
            plain
          />
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-9 w-9 items-center justify-center text-fg hover:text-accent lg:hidden"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" ref={panelRef} className="border-t border-line bg-bg lg:hidden">
          <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.id}
                  href={localizeHref(lang, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border px-4 py-3 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "border-accent/40 bg-surface text-accent"
                      : "border-line bg-surface text-fg hover:text-accent"
                  }`}
                >
                  {dict.nav[link.id]}
                  <span className="text-muted">{String(NAV_LINKS.indexOf(link) + 1).padStart(2, "0")}</span>
                </Link>
              );
            })}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-line bg-surface px-4 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-fg transition-colors hover:text-accent"
            >
              {dict.nav.linkedin}
              <span className="text-accent">↗</span>
            </a>
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-accent bg-accent px-4 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-accent"
            >
              {dict.nav.whatsapp}
              <span aria-hidden>↗</span>
            </a>
            <div className="flex items-center justify-between px-1 pt-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {dict.footer.language}
              </span>
              <LangToggle
                lang={lang}
                otherLabel={lang === "en" ? "العربية" : "EN"}
                ariaLabel={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}