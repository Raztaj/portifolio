import type { MetadataRoute } from "next";
import { getProjects, getLabEntries, getNotes } from "@/lib/content/locale";

const base = "https://portifolio-pink-gamma.vercel.app";

export const dynamic = "force-static";

const locales: ("en" | "ar")[] = ["en", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const topLevel = ["", "/lab", "/notes", "/research", "/about"];
  for (const locale of locales) {
    for (const path of topLevel) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  for (const locale of locales) {
    const projects = getProjects(locale);
    const labs = getLabEntries(locale);
    const notes = getNotes(locale);

    for (const p of projects) {
      entries.push({
        url: `${base}/${locale}/work/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.9,
      });
    }
    for (const l of labs) {
      entries.push({
        url: `${base}/${locale}/lab/${l.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
    for (const n of notes) {
      entries.push({
        url: `${base}/${locale}/notes/${n.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}