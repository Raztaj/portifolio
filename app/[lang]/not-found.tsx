import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { localizeHref } from "@/lib/content/locale";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang = "en" } = (await params) ?? {};
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return {
    title: `404 — ${dict.notFound.title} / TAJELSIR SYSTEMS`,
    description: dict.notFound.sub,
  };
}

export default async function NotFound({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang = "en" } = (await params) ?? {};
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return (
    <main>
      <Nav lang={locale} />
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <div className="font-mono text-[12px] tracking-[0.3em] text-accent">
          HTTP / 404
        </div>
        <h1 className="mt-6 font-sans text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          {dict.notFound.sub}
        </p>
        <Link
          href={localizeHref(locale, "/")}
          className="mt-8 font-mono text-[12px] uppercase tracking-[0.25em] text-accent transition-colors hover:text-fg"
        >
          {dict.notFound.backHome} →
        </Link>
      </div>
      <Footer lang={locale} />
    </main>
  );
}