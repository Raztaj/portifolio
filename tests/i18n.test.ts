import { describe, expect, it } from "vitest";
import { dictionaries } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  const out: string[] = [];
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const p = prefix ? `${prefix}.${k}` : k;
    out.push(...keyPaths(v, p));
  }
  return out;
}

describe("dictionaries", () => {
  it("exposes both locales", () => {
    expect(Object.keys(dictionaries).sort()).toEqual(["ar", "en"]);
  });

  it("Arabic and English share an identical key structure", () => {
    const en = keyPaths(dictionaries.en).sort();
    const ar = keyPaths(dictionaries.ar as Dictionary).sort();
    expect(ar).toEqual(en);
  });

  it("has a non-empty description in both locales", () => {
    expect(dictionaries.en.metadata.description.trim().length).toBeGreaterThan(0);
    expect(dictionaries.ar.metadata.description.trim().length).toBeGreaterThan(0);
  });
});