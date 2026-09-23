import Link from "next/link";
import { site, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-mono text-sm font-semibold">
              TK<span className="text-accent">/</span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Software Engineer
              <br />
              {site.location}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Elsewhere
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
          <div className="md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Colophon
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-muted">
              Built with {site.builtWith}
              <br />© {site.year} {site.engineer}
              <br />
              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-fg"
              >
                [ VIEW SOURCE ↗ ]
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}