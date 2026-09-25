import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getLabEntries, localizeHref } from "@/lib/content/locale";
import type { LabEntry, LabStatus } from "@/lib/content/lab";
import { site } from "@/lib/site";
import { alternatesFor, routeUrl } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import JsonLd from "@/components/json-ld";
import { MonoLabel, Divider } from "@/components/ui";

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return locales.flatMap((lang) =>
    getLabEntries(lang).map((e) => ({ lang, slug: e.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const entry = getLabEntries(locale).find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.name} — LAB / TAJELSIR SYSTEMS`,
    description: entry.question,
    alternates: alternatesFor(locale, `/lab/${entry.slug}`),
  };
}

const STATUS_COLOR: Record<LabStatus, string> = {
  ACTIVE: "text-success",
  RESOLVED: "text-success",
  PROTOTYPE: "text-accent",
  EXPERIMENT: "text-warning",
  RESEARCH: "text-muted",
};

function MetaBlock({
  dict,
  entry,
}: {
  dict: ReturnType<typeof getDictionary>;
  entry: LabEntry;
}) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {dict.lab.type}
        </div>
        <div className="mt-2 font-mono text-[13px] font-semibold text-fg">{entry.tag}</div>
      </div>
      <div className="bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {dict.lab.status}
        </div>
        <div className={`mt-2 font-mono text-[13px] font-semibold ${STATUS_COLOR[entry.status]}`}>
          ● {entry.status}
        </div>
      </div>
      <div className="bg-surface p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {dict.lab.stack}
        </div>
        <div className="mt-2 font-mono text-[12px] leading-relaxed text-fg">
          {entry.stack.join(" / ")}
        </div>
      </div>
      <div className="bg-surface p-5 sm:col-span-2 lg:col-span-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {dict.lab.question}
        </div>
        <div className="mt-2 font-sans text-lg font-medium leading-snug tracking-tight text-accent">
          {entry.question}
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="py-10">
      <div className="mb-5">
        <MonoLabel>{label}</MonoLabel>
      </div>
      {children}
    </section>
  );
}

export default async function LabSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const entries = getLabEntries(locale);
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const i = entries.indexOf(entry);
  const prev = entries[(i - 1 + entries.length) % entries.length];
  const next = entries[(i + 1) % entries.length];

  return (
    <main>
      <Nav lang={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: entry.name,
          description: entry.question,
          url: routeUrl(locale, `/lab/${entry.slug}`),
          inLanguage: locale,
          datePublished: entry.year,
          author: { "@type": "Person", name: "Tajelsir Khalid" },
          publisher: { "@type": "Organization", name: "TAJELSIR / SYSTEMS" },
        }}
      />
      <PageHeader
        lang={locale}
        crumb={`LAB / ${dict.lab.categories[entry.category]}`}
        backHref="/lab"
        backLabel={dict.lab.back}
        title={entry.name}
        sub={entry.question}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-10">
          <MetaBlock dict={dict} entry={entry} />
        </div>

        {entry.note && (
          <div className="mb-4 flex items-start gap-3 border border-warning/40 bg-warning/5 px-4 py-3">
            <span className="mt-0.5 font-mono text-[11px] text-warning">⚠</span>
            <p className="text-sm leading-relaxed text-warning/90">{entry.note}</p>
          </div>
        )}

        <SectionBlock label={`01 / ${dict.lab.why}`}>
          <p className="max-w-3xl text-base leading-relaxed text-muted">{entry.why}</p>
        </SectionBlock>

        <SectionBlock label={`02 / ${dict.lab.approach}`}>
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
          <SectionBlock label={`03 / ${dict.lab.flow}`}>
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
          <SectionBlock label={`04 / ${dict.lab.result}`}>
            <p className="max-w-3xl text-base leading-relaxed text-fg/90">{entry.result}</p>
          </SectionBlock>
        )}

        {entry.learned && (
          <SectionBlock label={`05 / ${dict.lab.learned}`}>
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

        <SectionBlock label={`06 / ${dict.lab.source}`}>
          <p className="font-mono text-[12px] text-muted">
            <span className="text-accent">$</span> {dict.lab.sourceCmd}
            {site.linkedinHandle}
          </p>
        </SectionBlock>

        <div className="flex flex-col gap-3 border-t border-line pb-24 pt-6 sm:flex-row sm:justify-between">
          <Link
            href={localizeHref(locale, `/lab/${prev.slug}`)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            <span className="rtl:inline rtl:rotate-180">←</span> {prev.index} / {prev.name}
          </Link>
          <Link
            href={localizeHref(locale, `/lab/${next.slug}`)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            {next.index} / {next.name} <span className="rtl:inline rtl:rotate-180">→</span>
          </Link>
        </div>
      </div>

      <Divider />
      <Footer lang={locale} />
    </main>
  );
}