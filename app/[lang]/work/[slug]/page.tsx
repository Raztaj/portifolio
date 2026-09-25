import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getProjectBySlug, getProjects } from "@/lib/content/locale";
import { localizeHref } from "@/lib/urls";
import type { MediaImage } from "@/lib/content/types";
import { site } from "@/lib/site";
import { pageMetadata, routeUrl } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import ArchDiagram from "@/components/arch-diagram";
import JsonLd from "@/components/json-ld";
import { MonoLabel, Chip, Divider } from "@/components/ui";

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return locales.flatMap((lang) =>
    getProjects(lang).map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const project = getProjectBySlug(slug, locale);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/work/${project.slug}`,
    title: `${project.title} — WORK / TAJELSIR SYSTEMS`,
    description: project.description,
  });
}

type Labels = {
  problem: string;
  constraints: string;
  architecture: string;
  decisions: string;
  tradeoffs: string;
  whatBroke: string;
  security: string;
  result: string;
  interface: string;
  interfaceNote: string;
  decision: string;
  cost: string;
  threatModel: string;
  mitigation: string;
  assumption: string;
  failed: string;
  fix: string;
};

function NumberedBlock({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string[];
}) {
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
            <span className="ms-3 font-mono text-[11px] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-fg/90">{b}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

function ConstraintGrid({
  labels,
  list,
}: {
  labels: Labels;
  list: { label: string; note?: string }[];
}) {
  return (
    <section className="border-y border-line bg-surface py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>{labels.constraints}</MonoLabel>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
        {list.map((c) => (
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

function TradeoffTable({
  labels,
  rows,
}: {
  labels: Labels;
  rows: { decision: string; cost: string }[];
}) {
  return (
    <section className="border-y border-line py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>{labels.tradeoffs}</MonoLabel>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="py-3 pe-4 text-start font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
                {labels.decision}
              </th>
              <th className="py-3 ps-4 text-start font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
                {labels.cost}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.decision}>
                <td className="py-4 pe-4 font-mono text-[12px] uppercase tracking-[0.05em] text-fg">
                  {r.decision}
                </td>
                <td className="py-4 ps-4 text-sm text-muted">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WhatBroke({
  labels,
  items,
}: {
  labels: Labels;
  items: { assumption: string; failure: string; solution: string }[];
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mb-8">
        <MonoLabel>{labels.whatBroke}</MonoLabel>
      </div>
      <div className="space-y-6">
        {items.map((b, i) => (
          <div key={i} className="border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2">
              <span className="font-mono text-[11px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {labels.assumption}
              </span>
            </div>
            <p className="px-4 py-3 text-sm leading-relaxed text-fg/90">
              {b.assumption}
            </p>
            <div className="flex items-center gap-2 border-t border-line bg-bg px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-error">
                {labels.failed}
              </span>
            </div>
            <p className="bg-bg px-4 pb-3 text-sm leading-relaxed text-muted">{b.failure}</p>
            <div className="flex items-center gap-2 border-t border-line bg-bg px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-success">
                {labels.fix}
              </span>
            </div>
            <p className="bg-bg px-4 pb-4 text-sm leading-relaxed text-fg/90">{b.solution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MediaGallery({
  labels,
  media,
}: {
  labels: Labels;
  media: MediaImage[];
}) {
  const [first, ...rest] = media;
  return (
    <section className="py-14 sm:py-16">
      <div className="mb-8">
        <MonoLabel>{labels.interface}</MonoLabel>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {labels.interfaceNote}
        </p>
      </div>
      <div className="overflow-hidden border border-line bg-surface">
        <Image
          src={first.src}
          alt={first.alt}
          width={1080}
          height={675}
          priority
          className="block h-auto w-full"
        />
        <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
          <span className="font-mono text-[11px] text-accent">01</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {first.caption}
          </span>
        </div>
      </div>
      {rest.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rest.map((m, i) => (
            <figure key={m.src} className="border border-line bg-surface">
              <Image
                src={m.src}
                alt={m.alt}
                width={1080}
                height={675}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="block h-auto w-full"
              />
              <figcaption className="flex items-center gap-2 border-t border-line px-4 py-2.5">
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {m.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const projects = getProjects(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const labels: Labels = {
    problem: dict.work.problem,
    constraints: dict.work.constraints,
    architecture: dict.work.architecture,
    decisions: dict.work.decisions,
    tradeoffs: dict.work.tradeoffs,
    whatBroke: dict.work.whatBroke,
    security: dict.work.security,
    result: dict.work.result,
    interface: dict.work.interface,
    interfaceNote: dict.work.interfaceNote,
    decision: dict.work.decision,
    cost: dict.work.cost,
    threatModel: dict.work.threatModel,
    mitigation: dict.work.mitigation,
    assumption: dict.work.assumption,
    failed: dict.work.failed,
    fix: dict.work.fix,
  };

  return (
    <main>
      <Nav lang={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          url: routeUrl(locale, `/work/${project.slug}`),
          inLanguage: locale,
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
          datePublished: project.year,
          author: { "@type": "Person", name: "Tajelsir Khalid" },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <PageHeader
        lang={locale}
        crumb={`${project.index} / ${project.kind}`}
        backHref="/#work"
        backLabel={dict.work.back}
        title={project.title}
        sub={project.description}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 py-6">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          <span className="ms-auto font-mono text-[11px] uppercase tracking-[0.2em] text-success">
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

        {project.media && project.media.length > 0 && (
          <MediaGallery labels={labels} media={project.media} />
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <NumberedBlock
          index="01"
          title={labels.problem.split(" / ")[1]}
          body={project.problem}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ConstraintGrid labels={labels} list={project.constraints} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <MonoLabel>{labels.architecture}</MonoLabel>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {project.architectureIntro}
          </p>
        </div>
        <ArchDiagram nodes={project.architectureNodes} edges={project.architectureEdges} />
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <div className="mb-8">
            <MonoLabel>{labels.decisions}</MonoLabel>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.decisions.map((d) => (
              <DecisionCard key={d.title} title={d.title} body={d.body} />
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TradeoffTable labels={labels} rows={project.tradeoffs} />
      </div>

      {project.security && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <section className="border-y border-line bg-surface-2/40 py-12 sm:py-16">
            <div className="mb-8">
              <MonoLabel>{labels.security}</MonoLabel>
              {project.security.note && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.security.note}
                </p>
              )}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {labels.threatModel}
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
                  {labels.mitigation}
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
        <WhatBroke labels={labels} items={project.whatsBroken} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="border-t border-line py-12 sm:py-16">
          <div className="mb-8">
            <MonoLabel>{labels.result}</MonoLabel>
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="border-y border-line bg-surface py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <MonoLabel>{dict.work.cta.title}</MonoLabel>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                {dict.work.cta.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-bg transition-colors hover:bg-transparent hover:text-accent"
              >
                {dict.work.cta.email}
                <span className="transition-transform group-hover:-translate-y-0.5">→</span>
              </a>
              <a
                href={site.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-line bg-surface-2 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {dict.work.cta.whatsapp} ↗
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <Link
            href={localizeHref(locale, `/work/${prev.slug}`)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            <span className="rtl:inline rtl:rotate-180">←</span> {prev.index} / {prev.title}
          </Link>
          <Link
            href={localizeHref(locale, `/work/${next.slug}`)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            {next.index} / {next.title} <span className="rtl:inline rtl:rotate-180">→</span>
          </Link>
        </div>
      </div>

      <Divider />
      <Footer lang={locale} />
    </main>
  );
}