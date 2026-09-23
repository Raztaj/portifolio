import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { Divider } from "@/components/ui";
import { notes } from "@/lib/content/notes";

export const metadata: Metadata = {
  title: "NOTES — TAJELSIR SYSTEMS",
  description: "Engineering thinking — short notes on architecture, idempotency and local-first systems.",
};

export default function NotesPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        crumb="NOTES /"
        backHref="/"
        backLabel="SYSTEMS"
        title="ENGINEERING NOTES"
        sub="Short notes on decisions, trade-offs and the assumptions behind them."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {notes.map((n) => (
            <Link
              key={n.slug}
              href={`/notes/${n.slug}`}
              className="group flex flex-col justify-between border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  NOTE {n.index} · {n.date}
                </div>
                <h2 className="mt-3 font-sans text-lg font-semibold leading-snug tracking-tight text-fg group-hover:text-accent">
                  {n.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{n.intro}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {n.words}
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
                  READ →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Divider />
      <Footer />
    </main>
  );
}