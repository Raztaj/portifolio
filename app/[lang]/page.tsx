import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getLabEntries, getNotes, getProjects, localizeHref } from "@/lib/content/locale";
import { site, stack } from "@/lib/site";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Grid from "@/components/grid";
import StatusConsole from "@/components/status-console";
import WorkRows from "@/components/work-rows";
import { MonoLabel, SectionHeading, Divider, ArrowLink } from "@/components/ui";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const projects = getProjects(locale);
  const labEntries = getLabEntries(locale);
  const notes = getNotes(locale);

  const contactHrefs = [
    { label: dict.home.contactLinks[0], href: `mailto:${site.email}` },
    { label: dict.home.contactLinks[1], href: site.linkedin },
    { label: dict.home.contactLinks[2], href: site.waLink },
  ];

  return (
    <main>
      <Nav lang={locale} />

      <section className="relative overflow-hidden">
        <Grid className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <MonoLabel accent={false}>{dict.hero.eyebrow}</MonoLabel>
              <h1 className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
                {dict.hero.heading[0]}
                <br />
                {dict.hero.heading[1]}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                {dict.hero.blurb}
              </p>
              <p className="mt-3 max-w-md font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {dict.hero.marketing}
              </p>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/80">
                {dict.hero.sub}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
                {dict.hero.metaBar.map((m) => (
                  <span
                    key={m}
                    className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
                  >
                    <span className="inline-block h-1 w-1 rounded-full bg-accent/60" />
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={localizeHref(locale, "/#contact")}
                  className="group inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-bg transition-colors hover:bg-transparent hover:text-accent"
                >
                  {dict.hero.cta}
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
                <a
                  href={localizeHref(locale, "/#work")}
                  className="group inline-flex items-center gap-2 border border-line bg-surface-2 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  {dict.hero.viewWork}
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-2 font-mono text-[12px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  {dict.hero.linkedin}
                  <span className="text-accent transition-transform group-hover:translate-x-0.5 rtl:-translate-x-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <StatusConsole
                lang={locale}
                projects={projects.length}
                labs={labEntries.length}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {dict.home.quote[0]}
            <br />
            {dict.home.quote[1]}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.home.philosophy.map((p) => (
              <div
                key={p}
                className="border border-line bg-bg px-4 py-3 font-mono text-[12px] uppercase tracking-[0.15em] text-fg"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16" id="work">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index={dict.home.workIndex} title={dict.home.workTitle} accent />
            <MonoLabel accent={false}>
              {String(projects.length).padStart(2, "0")} {dict.home.systemsCount}
            </MonoLabel>
          </div>
          <WorkRows lang={locale} />
        </div>
      </section>

      <section className="border-y border-line bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-8">
            <SectionHeading index={dict.home.engIndex} title={dict.home.engTitle} />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {dict.home.engCards.map((item) => (
              <div key={item.index} className="border border-line bg-bg p-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-accent">
                  {item.index}
                </div>
                <div className="mt-3 font-mono text-sm font-semibold tracking-tight text-fg">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-end gap-4">
              <SectionHeading index={dict.home.labIndex} title={dict.home.labTitle} />
              <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {dict.home.expCount}
              </span>
            </div>
            <ArrowLink href={localizeHref(locale, "/lab")}>{dict.home.allEntries}</ArrowLink>
          </div>

          <div className="border border-line bg-bg">
            <div className="border-b border-line px-4 py-2.5 font-mono text-[11px] text-fg">
              <span className="text-accent">$</span> {dict.home.labCmd}
            </div>
            <div className="grid gap-x-8 gap-y-2 px-4 py-5 font-mono text-[12px] sm:grid-cols-2 lg:grid-cols-3">
              {labEntries
                .filter((e) => e.category !== "RESEARCH")
                .slice(0, 9)
                .map((e) => (
                  <Link
                    key={e.slug}
                    href={localizeHref(locale, `/lab/${e.slug}`)}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {e.name}/<span className="text-line">_</span>
                  </Link>
                ))}
              <Link
                href={localizeHref(locale, "/lab")}
                className="text-muted transition-colors hover:text-accent"
              >
                <span className="text-accent">…</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index={dict.home.researchIndex} title={dict.home.researchTitle} />
            <ArrowLink href={localizeHref(locale, "/research")}>
              {dict.home.viewResearch}
            </ArrowLink>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {labEntries
              .filter((e) => e.category === "RESEARCH")
              .map((e) => (
                <Link
                  key={e.slug}
                  href={localizeHref(locale, `/lab/${e.slug}`)}
                  className="group border border-line bg-bg p-5 transition-colors hover:border-accent"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {e.tag} / {e.status}
                  </div>
                  <div className="mt-3 font-sans text-lg font-semibold tracking-tight text-fg group-hover:text-accent">
                    {e.name}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {e.question}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index={dict.home.notesIndex} title={dict.home.notesTitle} />
            <ArrowLink href={localizeHref(locale, "/notes")}>{dict.home.allNotes}</ArrowLink>
          </div>
          <div className="divide-y divide-line border-b border-t border-line">
            {notes.map((n) => (
              <Link
                key={n.slug}
                href={localizeHref(locale, `/notes/${n.slug}`)}
                className="group flex flex-wrap items-baseline justify-between gap-2 py-5"
              >
                <span className="font-sans text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                  {n.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {n.date} · {n.words}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index={dict.home.aboutIndex} title={dict.home.aboutTitle} />
            <ArrowLink href={localizeHref(locale, "/about")}>
              {dict.home.fullProfile}
            </ArrowLink>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="max-w-md text-base leading-relaxed text-muted">
                {dict.home.aboutP1} {dict.home.aboutP2}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {dict.home.interests.map((i) => (
                  <div key={i} className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg/90">
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {dict.home.stackLabel}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-line bg-bg px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {dict.home.timelineLabel}
              </div>
              <div className="mt-3 space-y-3">
                {dict.home.timeline.map((t) => (
                  <div key={t.year} className="grid grid-cols-[64px_1fr] items-baseline gap-4">
                    <span className="font-mono text-[12px] text-accent">{t.year}</span>
                    <div>
                      <span className="font-sans text-sm font-medium text-fg">{t.role}</span>
                      <span className="font-mono text-[11px] text-muted"> — {t.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" id="contact">
        <Grid className="opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <MonoLabel>{dict.home.contactEyebrow}</MonoLabel>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
            {dict.home.contactText}
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {contactHrefs.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
              >
                {l.label} <span className="rtl:inline rtl:rotate-180">→</span>
              </a>
            ))}
          </div>
          <div className="mt-16 font-sans text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            {dict.home.letsBuild[0]}
            <br />
            {dict.home.letsBuild[1]}
            <br />
            {dict.home.letsBuild[2]}
            <span className="text-accent">.</span>
          </div>
        </div>
      </section>

      <Divider />
      <Footer lang={locale} />
    </main>
  );
}