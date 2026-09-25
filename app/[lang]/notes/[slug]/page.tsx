import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getNoteBySlug, getNotes } from "@/lib/content/locale";
import { localizeHref } from "@/lib/urls";
import { pageMetadata, routeUrl } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import JsonLd from "@/components/json-ld";
import { MonoLabel, Divider } from "@/components/ui";

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return locales.flatMap((lang) =>
    getNotes(lang).map((n) => ({ lang, slug: n.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const note = getNoteBySlug(slug, locale);
  if (!note) return {};
  return pageMetadata({
    locale,
    path: `/notes/${note.slug}`,
    title: `${note.title} — NOTES / TAJELSIR SYSTEMS`,
    description: note.intro,
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const notes = getNotes(locale);
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();

  const others = notes.filter((n) => n.slug !== slug);

  return (
    <main>
      <Nav lang={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          description: note.intro,
          url: routeUrl(locale, `/notes/${note.slug}`),
          inLanguage: locale,
          datePublished: note.date,
          author: { "@type": "Person", name: "Tajelsir Khalid" },
        }}
      />
      <PageHeader
        lang={locale}
        crumb={`${dict.notes.note} ${note.index}`}
        backHref="/notes"
        backLabel={dict.notes.back}
        title={note.title}
        sub={`${note.date} · ${note.words}`}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-10 border-s-2 border-accent ps-4 font-sans text-lg font-medium leading-relaxed tracking-tight text-fg">
          {note.intro}
        </p>
        <div className="space-y-12">
          {note.sections.map((section, idx) => (
            <section key={section.heading}>
              <div className="mb-4">
                <MonoLabel>
                  {String(idx + 1).padStart(2, "0")}
                  <span className="text-muted"> / </span>
                  {section.heading}
                </MonoLabel>
              </div>
              <div className="space-y-4">
                {section.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          {others.length > 0 ? (
            <a
              href={localizeHref(locale, `/notes/${others[0].slug}`)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              <span className="rtl:inline rtl:rotate-180">←</span> {dict.notes.next} /{" "}
              {others[0].title}
            </a>
          ) : (
            <span />
          )}
          <Link
            href={localizeHref(locale, "/notes")}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            {dict.notes.all} <span className="rtl:inline rtl:rotate-180">→</span>
          </Link>
        </div>
      </div>

      <Divider />
      <Footer lang={locale} />
    </main>
  );
}