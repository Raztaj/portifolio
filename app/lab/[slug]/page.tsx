import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { MonoLabel, Divider } from "@/components/ui";
import { labEntries, getLabEntry, labCategoryLabel, type LabStatus } from "@/lib/content/lab";
import { site } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return labEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLabEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.name} — LAB / TAJELSIR SYSTEMS`,
    description: entry.question,
  };
}

const STATUS_COLOR: Record<LabStatus, string> = {
  ACTIVE: "text-success",
  RESOLVED: "text-success",
  PROTOTYPE: "text-accent",
  EXPERIMENT: "text-warning",
  RESEARCH: "text-muted",
};

function MetaBlock({ entry }: { entry: (typeof labEntries)[number] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">TYPE</div>
        <div className="mt-2 font-mono text-[13px] font-semibold text-fg">{entry.tag}</div>
      </div>
      <div className="bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">STATUS</div>
        <div className={`mt-2 font-mono text-[13px] font-semibold ${STATUS_COLOR[entry.status]}`}>
          ● {entry.status}
        </div>
      </div>
      <div className="bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">STACK</div>
        <div className="mt-2 font-mono text-[12px] leading-relaxed text-fg">
          {entry.stack.join(" / ")}
        </div>
      </div>
      <div className="bg-surface p-5 sm:col-span-2 lg:col-span-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">QUESTION</div>
        <div className="mt-2 font-sans text-lg font-medium leading-snug tracking-tight text-accent">
          {entry.question}
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-10">
      <div className="mb-5">
        <MonoLabel>
          {index}
          <span className="text-muted"> / </span>
          {title}
        </MonoLabel>
      </div>
      {children}
    </section>
  );
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLabEntry(slug);
  if (!entry) notFound();

  const i = labEntries.indexOf(entry);
  const prev = labEntries[(i - 1 + labEntries.length) % labEntries.length];
  const next = labEntries[(i + 1) % labEntries.length];

  return (
    <main>
      <Nav />
      <PageHeader
        crumb={`LAB / ${labCategoryLabel(entry.category)}`}
        backHref="/lab"
        backLabel="LAB"
        title={entry.name}
        sub={entry.question}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-10">
          <MetaBlock entry={entry} />
        </div>

        {entry.note && (
          <div className="mb-4 flex items-start gap-3 border border-warning/40 bg-warning/5 px-4 py-3">
            <span className="mt-0.5 font-mono text-[11px] text-warning">⚠</span>
            <p className="text-sm leading-relaxed text-warning/90">{entry.note}</p>
          </div>
        )}

        <SectionBlock index="01" title="WHY">
          <p className="max-w-3xl text-base leading-relaxed text-muted">{entry.why}</p>
        </SectionBlock>

        <SectionBlock index="02" title="APPROACH">
          <ol className="max-w-3xl space-y-3">
            {entry.approach.map((a, idx) => (
              <li key={idx} className="flex gap-4 text-sm leading-relaxed text-fg/90">
                <span className="font-mono text-[11px] text-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {a}
              </li>
            ))}
          </ol>
        </SectionBlock>

        {entry.flow && (
          <SectionBlock index="03" title="ARCHITECTURE / FLOW">
            <div className="inline-block border border-line bg-bg px-5 py-4">
              {entry.flow.map((line, idx) => (
                <div
                  key={idx}
                  className="whitespace-pre font-mono text-[12px] leading-relaxed text-fg/90"
                >
                  {line}
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {entry.result && (
          <SectionBlock index="04" title="RESULT">
            <p className="max-w-3xl text-base leading-relaxed text-fg/90">{entry.result}</p>
          </SectionBlock>
        )}

        {entry.learned && (
          <SectionBlock index="05" title="WHAT I LEARNED">
            <ul className="max-w-3xl space-y-3">
              {entry.learned.map((l, idx) => (
                <li key={idx} className="flex gap-4 text-sm leading-relaxed text-muted">
                  <span className="text-success">✓</span>
                  {l}
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}

        <SectionBlock index="06" title="SOURCE">
          <p className="font-mono text-[12px] text-muted">
            <span className="text-accent">$</span> archived locally · github.com/
            {site.githubHandle}
          </p>
        </SectionBlock>

        <div className="flex flex-col gap-3 border-t border-line pb-24 pt-6 sm:flex-row sm:justify-between">
          <Link
            href={`/lab/${prev.slug}`}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            ← {prev.index} / {prev.name}
          </Link>
          <Link
            href={`/lab/${next.slug}`}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            {next.index} / {next.name} →
          </Link>
        </div>
      </div>

      <Divider />
      <Footer />
    </main>
  );
}