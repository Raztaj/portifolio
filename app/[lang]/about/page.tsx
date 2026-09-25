import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { stack, socials } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { MonoLabel, Divider } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return {
    title: "ABOUT — TAJELSIR / SYSTEMS",
    description: dict.about.statementLead,
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);

  return (
    <main>
      <Nav lang={locale} />
      <PageHeader
        lang={locale}
        crumb="ABOUT /"
        backHref="/"
        backLabel={dict.about.back}
        title="Tajelsir Khalid"
        sub={dict.about.statementLead}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MonoLabel accent={false}>{dict.about.statement}</MonoLabel>
            <p className="mt-4 max-w-2xl font-sans text-xl font-medium leading-relaxed tracking-tight text-fg sm:text-2xl">
              {dict.about.statementLead}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {dict.about.statementBody}
            </p>

            <div className="mt-10">
              <MonoLabel accent={false}>{dict.about.interests}</MonoLabel>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {dict.home.interests.map((i) => (
                  <div
                    key={i}
                    className="border border-line bg-surface px-4 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-fg"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <MonoLabel accent={false}>{dict.about.contact}</MonoLabel>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                  >
                    {s.label} <span className="rtl:inline rtl:rotate-180">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <MonoLabel accent={false}>{dict.about.stack}</MonoLabel>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <MonoLabel accent={false}>{dict.about.timeline}</MonoLabel>
              <div className="mt-4 space-y-4">
                {dict.home.timeline.map((t) => (
                  <div key={t.year} className="border-s border-line ps-4">
                    <div className="font-mono text-[12px] text-accent">{t.year}</div>
                    <div className="mt-1 font-sans text-sm font-semibold text-fg">
                      {t.role}
                    </div>
                    <div className="font-mono text-[11px] text-muted">{t.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Divider />
      <Footer lang={locale} />
    </main>
  );
}