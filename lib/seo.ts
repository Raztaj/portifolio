import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/urls";

export { routeUrl, alternatesFor, localizeHref } from "@/lib/urls";

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
  };
}