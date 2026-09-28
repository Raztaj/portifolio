import { localizeHref } from "@/lib/urls";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

import { site } from "@/lib/site";
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
  const cta = dict.footer.cta;
  return (
    <footer>
      <section className="border-t border-line bg-[#0b0b0b]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {dict.home.contactEyebrow}
          </div>
          <h2 className="mt-5 max-w-3xl font-sans text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl">
            {cta.title[0]}
            <br />
            {cta.title[1]}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">{cta.sub}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 border border-accent bg-accent px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-accent"
            >
              {cta.link}
              <span className="transition-transform group-hover:translate-x-1 rtl:-translate-x-1 rtl:rotate-180">
                →
              </span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-accent"
            >
              LINKEDIN
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-accent"
            >
              WHATSAPP
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
          <div className="mt-14 font-mono text-[11px] tracking-[0.3em] text-white/40">
            {dict.hero.motif}
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-mono text-sm font-semibold">
                TK<span className="text-accent">/</span>
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                © {site.year} {site.engineer}
                <br />
                {dict.footer.builtWith} {dict.footer.buildLine}
              </p>
              <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {SITE_LINKS.map((l) => (
                  <Link
                    key={l.id}
                    href={localizeHref(lang, l.href)}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                  >
                    {dict.nav[l.id]}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-end md:text-end">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                LINKEDIN ↗
              </a>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                EMAIL ↗
              </a>
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