import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata = {
  title: "404 — NOT FOUND / TAJELSIR SYSTEMS",
};

export default function RootNotFound() {
  const dict = getDictionary("en");
  return (
    <main>
      <Nav lang="en" />
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <div className="w-full max-w-xl overflow-hidden border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              TK/ · 404
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              SIGNAL LOST
            </span>
          </div>
          <div dir="ltr" className="space-y-2 px-4 py-6 text-start font-mono text-[11px] leading-relaxed">
            <div className="text-accent">
              0x00F404 &gt; take_chute // route_miss
            </div>
            <div className="text-muted">
              404_unknown: address unreachable — handler dropped the packet
            </div>
            <div className="break-all text-fg">
              9AF2 0x1E :: 404_EDGE — d41d8cd98f00b204e9800998ecf8427e (drop)
            </div>
          </div>
        </div>
        <h1 className="mt-10 font-sans text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          {dict.notFound.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.25em]">
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-accent bg-accent px-6 py-3.5 text-white transition-colors hover:bg-transparent hover:text-accent"
          >
            {dict.notFound.beamHome}
          </Link>
          <Link
            href="/ar"
            className="text-muted transition-colors hover:text-accent"
          >
            العربية ↺
          </Link>
        </div>
      </div>
      <Footer lang="en" />
    </main>
  );
}