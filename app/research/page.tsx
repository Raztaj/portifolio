import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { MonoLabel, Divider } from "@/components/ui";
import { labEntries } from "@/lib/content/lab";

export const metadata: Metadata = {
  title: "RESEARCH — TAJELSIR SYSTEMS",
  description:
    "Investigations and baselines from public surfaces — including the Sudan Internet Atlas.",
};

export default function ResearchPage() {
  const research = labEntries.filter((e) => e.category === "RESEARCH");
  const atlas = labEntries.find((e) => e.slug === "sudan-security-atlas");

  return (
    <main>
      <Nav />
      <PageHeader
        crumb="RESEARCH /"
        backHref="/"
        backLabel="SYSTEMS"
        title="INVESTIGATIONS"
        sub="Baselines, inventories and open questions — kept observational and honest about what is research, not a finished system."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {atlas && (
          <div className="mb-12 border border-line bg-surface">
            <div className="border-b border-line px-5 py-3">
              <MonoLabel accent={false}>FEATURED</MonoLabel>
            </div>
            <div className="grid gap-6 p-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {atlas.tag} / {atlas.status}
                </div>
                <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {atlas.name}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {atlas.question}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/80">
                  A roughly 1,730-line Markdown inventory spanning domains, DNS/DNSSEC,
                  TLS, servers, APIs, cloud, telecom, fintech, government, universities,
                  healthcare and NGOs — a sourced baseline for one country&apos;s public internet.
                </p>
              </div>
              <div className="flex items-start justify-between lg:flex-col lg:justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-success">
                  ● {atlas.status}
                </span>
                <Link
                  href={`/lab/${atlas.slug}`}
                  className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                >
                  OPEN CASE FILE →
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <MonoLabel>ALL RESEARCH ENTRIES</MonoLabel>
        </div>
        <div className="divide-y divide-line border-t border-b border-line">
          {research.map((e) => (
            <Link
              key={e.slug}
              href={`/lab/${e.slug}`}
              className="group flex flex-wrap items-baseline justify-between gap-3 py-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-accent">{e.index}</span>
                <span className="font-sans text-lg font-medium tracking-tight text-fg group-hover:text-accent">
                  {e.name}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {e.tag} / {e.status} → OPEN
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Divider />
      <Footer />
    </main>
  );
}