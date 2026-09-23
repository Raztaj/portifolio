import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { localizeHref } from "@/lib/content/locale";
import { site, socials } from "@/lib/site";
import LangToggle from "./lang-toggle";

const SITE_LINKS: { id: "work" | "lab" | "research" | "notes" | "about"; href: string }[] = [
  { id: "work", href: "/#work" },
  { id: "lab", href: "/lab" },
  { id: "research", href: "/research" },
  { id: "notes", href: "/notes" },
  { id: "about", href: "/about" },
];

export default function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-mono text-sm font-semibold">
              TK<span className="text-accent">/</span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {dict.footer.role}
              <br />
              {site.location}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {dict.footer.site}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {SITE_LINKS.map((l) => (
                <Link
                  key={l.id}
                  href={localizeHref(lang, l.href)}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg transition-colors hover:text-accent"
                >
                  {dict.nav[l.id]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {dict.footer.elsewhere}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="md:text-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {dict.footer.colophon}
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted">
              {dict.footer.builtWith} {site.builtWith}
              <br />© {site.year} {site.engineer}
              <br />
              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-fg"
              >
                {dict.footer.viewSource} ↗
              </Link>
            </p>
            <div className="mt-4 md:flex md:justify-end">
              <LangToggle
                lang={lang}
                otherLabel={lang === "en" ? "العربية" : "EN"}
                ariaLabel={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}