import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: "en" | "ar" = isLocale(lang) ? lang : "en";
  return redirect(`/${locale}#work`);
}