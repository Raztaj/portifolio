import Link from "next/link";
import { site } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-fg hover:text-accent"
        >
          TK<span className="text-accent">/</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {site.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            GITHUB
            <span className="text-accent transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </nav>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-accent md:hidden"
        >
          GITHUB ↗
        </a>
      </div>
    </header>
  );
}