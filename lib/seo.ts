import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/urls";
import { site } from "@/lib/site";

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

export function ogPageImage({
  locale,
  slug,
  alt,
}: {
  locale: Locale;
  slug: string;
  alt: string;
}) {
  return {
    url: `${site.origin}/og/${slug}${locale === "ar" ? "-ar" : ""}.png`,
    width: 1200,
    height: 630,
    alt,
    type: "image/png",
  };
}