import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import ArchDiagram from "@/components/arch-diagram";
import { MonoLabel, Chip, Divider } from "@/components/ui";
import { projects, getProject } from "@/lib/content/work";

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — WORK / TAJELSIR SYSTEMS`,
    description: project.description,
  };
}

function NumberedBlock({ index, title, body }: { index: string; title: string; body: string[] }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>
          {index}
          <span className="text-muted"> / </span>
          {title}
        </MonoLabel>
      </div>
      <div className="max-w-3xl space-y-4">
        {body.map((b, i) => (
          <p key={i} className="text-base leading-relaxed text-muted">
            <span className="mr-3 font-mono text-[11px] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-fg/90">{b}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

function ConstraintGrid({ labels }: { labels: { label: string; note?: string }[] }) {
  return (
    <section className="border-y border-line bg-surface py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>02 / CONSTRAINTS</MonoLabel>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
        {labels.map((c) => (
          <div key={c.label} className="bg-surface p-4">
            <div className="font-mono text-[11px] font-semibold leading-snug tracking-tight text-fg">
              {c.label}
            </div>
            {c.note && (
              <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                {c.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DecisionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-line bg-surface p-5">
      <div className="font-mono text-[11px] font-semibold tracking-tight text-accent">
        {title}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function TradeoffTable({ rows }: { rows: { decision: string; cost: string }[] }) {
  return (
    <section className="border-y border-line py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>05 / TRADE-OFFS</MonoLabel>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="py-3 pr-4 text-left font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
                Decision
              </th>
              <th className="py-3 pl-4 text-left font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.decision}>
                <td className="py-4 pr-4 font-mono text-[12px] uppercase tracking-[0.05em] text-fg">
                  {r.decision}
                </td>
                <td className="py-4 pl-4 text-sm text-muted">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WhatBroke({ items }: { items: { assumption: string; failure: string; solution: string }[] }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>06 / WHAT BROKE</MonoLabel>
      </div>
      <div className="space-y-6">
        {items.map((b, i) => (
          <div key={i} className="border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2">
              <span className="font-mono text-[11px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                assumption
              </span>
            </div>
            <p className="px-4 py-3 text-sm leading-relaxed text-fg/90">
              The first implementation assumed {b.assumption}
            </p>
            <div className="flex items-center gap-2 border-t border-line bg-bg px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-error">
                that failed
              </span>
            </div>
            <p className="bg-bg px-4 pb-3 text-sm leading-relaxed text-muted">{b.failure}</p>
            <div className="flex items-center gap-2 border-t border-line bg-bg px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-success">
                the fix
              </span>
            </div>
            <p className="bg-bg px-4 pb-4 text-sm leading-relaxed text-fg/90">{b.solution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <main>
      <Nav />
      <PageHeader
        crumb={`${project.index} / ${project.kind}`}
        backHref="/#work"
        backLabel="WORK"
        title={project.title}
        sub={project.description}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 py-6">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.2em] text-success">
            ● {project.status}
          </span>
        </div>

        <section className="border-t border-line py-10">
          <p className="max-w-2xl font-sans text-xl font-medium leading-snug tracking-tight text-fg sm:text-2xl">
            {project.tagline}
          </p>
          {project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href ?? "#"}
                  target={l.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="border border-line bg-surface-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      <NumberedBlock index="01" title="THE PROBLEM" body={project.problem} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ConstraintGrid labels={project.constraints} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <MonoLabel>03 / ARCHITECTURE</MonoLabel>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {project.architectureIntro}
          </p>
        </div>
        <ArchDiagram nodes={project.architectureNodes} edges={project.architectureEdges} />
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <div className="mb-8">
            <MonoLabel>04 / ENGINEERING DECISIONS</MonoLabel>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.decisions.map((d) => (
              <DecisionCard key={d.title} title={d.title} body={d.body} />
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TradeoffTable rows={project.tradeoffs} />
      </div>

      {project.security && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <section className="border-y border-line bg-surface-2/40 py-12 sm:py-16">
            <div className="mb-8">
              <MonoLabel>07 / SECURITY</MonoLabel>
              {project.security.note && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.security.note}
                </p>
              )}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Threat model
                </div>
                <ol className="space-y-2">
                  {project.security.threatModel.map((t, idx) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                      <span className="font-mono text-[11px] text-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Mitigation
                </div>
                <ul className="space-y-2">
                  {project.security.mitigation.map((m) => (
                    <li key={m} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                      <span className="text-success">✓</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <WhatBroke items={project.whatsBroken} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="border-t border-line py-12 sm:py-16">
          <div className="mb-8">
            <MonoLabel>08 / RESULT</MonoLabel>
          </div>
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {project.result.map((r) => (
              <div key={r.label} className="bg-bg p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {r.label}
                </div>
                <div className="mt-2 font-mono text-base font-semibold tracking-tight text-accent">
                  {r.value}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <Link
            href={`/work/${prev.slug}`}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            ← {prev.index} / {prev.title}
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            {next.index} / {next.title} →
          </Link>
        </div>
      </div>

      <Divider />
      <Footer />
    </main>
  );
}