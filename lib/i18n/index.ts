import { dictionaryEn, type Dictionary } from "./dict";
import { dictionaryAr } from "./ar";
import type { Locale } from "./config";

export const dictionaries: Record<Locale, Dictionary> = {
  en: dictionaryEn,
  ar: dictionaryAr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export * from "./config";
export type { Dictionary };