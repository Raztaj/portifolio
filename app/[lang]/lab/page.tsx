import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getLabEntries } from "@/lib/content/locale";
import { alternatesFor } from "@/lib/seo";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import LabList from "@/components/lab-list";
import { Divider } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return {
    title: "LAB — TAJELSIR SYSTEMS",
    description: dict.lab.sub,
    alternates: alternatesFor(locale, "/lab"),
  };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const entries = getLabEntries(locale);

  return (
    <main>
      <Nav lang={locale} />
      <PageHeader
        lang={locale}
        crumb="LAB /"
        backHref="/"
        backLabel={dict.lab.back}
        title={dict.lab.title}
        sub={dict.lab.sub}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <LabList lang={locale} entries={entries} />
      </div>
      <Divider />
      <Footer lang={locale} />
    </main>
  );
}