import type { Locale } from "@/lib/i18n";
import "./parity";
import { projects } from "./work";
import { arProjects } from "./ar";
import { labEntries } from "./lab";
import { arLabEntries } from "./ar";
import { notes } from "./notes";
import { arNotes } from "./ar";

export function getProjects(locale: Locale) {
  return locale === "ar" ? arProjects : projects;
}

export function getProjectBySlug(slug: string, locale: Locale) {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getLabEntries(locale: Locale) {
  return locale === "ar" ? arLabEntries : labEntries;
}

export function getLabEntryBySlug(slug: string, locale: Locale) {
  return getLabEntries(locale).find((e) => e.slug === slug);
}

export function getNotes(locale: Locale) {
  return locale === "ar" ? arNotes : notes;
}

export function getNoteBySlug(slug: string, locale: Locale) {
  return getNotes(locale).find((n) => n.slug === slug);
}