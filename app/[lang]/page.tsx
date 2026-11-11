import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getLabEntries, getProjects } from "@/lib/content/locale";
import { localizeHref } from "@/lib/urls";
import { site, stack } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Ticker from "@/components/ticker";
import Portrait from "@/components/portrait";
import StatusConsole from "@/components/status-console";
import WhatBuild from "@/components/what-build";
import WorkPanels from "@/components/work-panels";
import LabAccordion from "@/components/lab-accordion";
import { MonoLabel, SectionHeading, Divider } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: "TAJELSIR / SYSTEMS",
    description: dict.metadata.description,
  });
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

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

  const buildItems = dict.home.whatBuildItems;

  return (
    <main>
      <Nav lang={locale} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <MonoLabel accent={false}>{dict.hero.eyebrow}</MonoLabel>
              <h1 className="mt-4 font-sans text-5xl font-semibold leading-[0.98] tracking-tight rtl:leading-[1.3] text-fg sm:text-7xl">
                {dict.hero.statement[0]}
                <br />
                {dict.hero.statement[1]}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                {dict.hero.blurb}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={localizeHref(locale, "/#work")}
                  className="group inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-accent"
                >
                  {dict.hero.viewWork}
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-2 font-mono text-[12px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  {dict.hero.linkedin}
                  <span className="text-accent transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">↗</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Portrait
                caption={dict.hero.eyebrow}
                code="TK/26"
                alt={locale === "ar" ? "صورة شخصية" : "Engineer portrait"}
              />
              <div className="mt-6">
                <StatusConsole lang={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker items={dict.ticker} />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index="02 / BUILD" title={dict.home.whatBuildTitle} accent />
          </div>
          <WhatBuild lang={locale} items={buildItems} stackLabel={dict.lab.stack} />
        </div>
      </section>

      <section className="scroll-mt-16" id="work">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index={dict.home.workIndex} title={dict.home.workTitle} accent />
            <MonoLabel accent={false}>
              {String(projects.length).padStart(2, "0")} {dict.home.systemsCount}
            </MonoLabel>
          </div>
        </div>
        <WorkPanels lang={locale} />
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <SectionHeading index={dict.home.labIndex} title={dict.home.labTitle} accent />
            <a
              href={localizeHref(locale, "/lab")}
              className="group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
            >
              {dict.home.allEntries}
              <span className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180">→</span>
            </a>
          </div>
          <LabAccordion
            lang={locale}
            entries={labEntries}
            readLabel={dict.home.readLab}
            stackLabel={dict.lab.stack}
          />
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {dict.home.quote[0]} {dict.home.quote[1]}
          </div>
          <h2 className="mt-6 max-w-4xl font-sans text-4xl font-semibold leading-[1.02] tracking-tight rtl:leading-[1.3] text-white sm:text-6xl">
            {dict.home.philosophyHead[0]}
            <br />
            {dict.home.philosophyHead[1]}
          </h2>
          <div className="mt-6 flex items-center gap-4 font-sans text-xl font-medium tracking-tight text-white/70 sm:text-2xl">
            <span className="inline-block h-px w-12 bg-accent" />
            {dict.home.philosophyBody}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {dict.home.philosophyChips.map((c) => (
              <span
                key={c}
                className="border border-white/20 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index={dict.home.aboutIndex} title={dict.home.aboutTitle} />
            <a
              href={localizeHref(locale, "/about")}
              className="group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
            >
              {dict.home.fullProfile}
              <span className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180">→</span>
            </a>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="max-w-md text-base leading-relaxed text-muted">{dict.home.aboutP1}</p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{dict.home.aboutP2}</p>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {dict.home.stackLabel}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-line bg-surface px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />
      <Footer lang={locale} />
    </main>
  );
}