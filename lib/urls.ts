import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function routeUrl(locale: Locale, path: string): string {
  if (locale === "ar") {
    return path === "/" ? `${site.origin}/ar` : `${site.origin}/ar${path}`;
  }
  return path === "/" ? site.origin : `${site.origin}${path}`;
}

export function localizeHref(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path.startsWith("/#")) return `/ar${path.slice(1)}`;
  if (path === "/") return "/ar";
  return `/ar${path}`;
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