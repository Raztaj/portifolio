import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getNotes } from "@/lib/content/locale";
import { localizeHref } from "@/lib/urls";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { Divider } from "@/components/ui";

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
    path: "/notes",
    title: "NOTES — TAJELSIR SYSTEMS",
    description: dict.notes.sub,
  });
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const notes = getNotes(locale);

  return (
    <main>
      <Nav lang={locale} />
      <PageHeader
        lang={locale}
        crumb="NOTES /"
        backHref="/"
        backLabel={dict.notes.back}
        title={dict.notes.title}
        sub={dict.notes.sub}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {notes.map((n) => (
            <Link
              key={n.slug}
              href={localizeHref(locale, `/notes/${n.slug}`)}
              className="group flex flex-col justify-between border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {dict.notes.note} {n.index} · {n.date}
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
                  {dict.notes.read} <span className="rtl:inline rtl:rotate-180">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Divider />
      <Footer lang={locale} />
    </main>
  );
}