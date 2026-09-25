import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function routeUrl(locale: Locale, path: string): string {
  if (locale === "ar") {
    return path === "/" ? `${site.origin}/ar` : `${site.origin}/ar${path}`;
  }
  return `${site.origin}${path}`;
}

export function alternatesFor(locale: Locale, path: string) {
  const en = routeUrl("en", path);
  const ar = routeUrl("ar", path);
  return {
    canonical: locale === "ar" ? ar : en,
    languages: {
      en,
      ar,
      "x-default": en,
    },
  };
}