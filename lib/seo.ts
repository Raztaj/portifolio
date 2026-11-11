import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { alternatesFor, routeUrl } from "@/lib/urls";
import { site } from "@/lib/site";

export { routeUrl, alternatesFor, localizeHref } from "@/lib/urls";

type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
};

/** Site-wide default social images, used when a page has no image of its own. */
export function defaultOgImage(locale: Locale): OgImage {
  return {
    url: `${site.origin}${locale === "ar" ? "/social-og-ar.png" : "/social-og.png"}`,
    width: 1080,
    height: 1080,
    alt: `${site.name} — software for real-world constraints`,
  };
}

function defaultTwitterImage(locale: Locale): string {
  return `${site.origin}${locale === "ar" ? "/social-tw-ar.png" : "/social-tw.png"}`;
}

/**
 * Full per-page metadata. Next merges metadata shallowly, so a page that sets
 * `openGraph` replaces the layout's block entirely — this always emits the
 * complete openGraph/twitter objects so no page loses title, description or url.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: OgImage;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url: routeUrl(locale, path),
      siteName: site.name,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_AR",
      type,
      images: [image ?? defaultOgImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? defaultTwitterImage(locale)],
    },
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
}): OgImage {
  return {
    url: `${site.origin}/og/${slug}${locale === "ar" ? "-ar" : ""}.png`,
    width: 1200,
    height: 630,
    alt,
    type: "image/png",
  };
}
