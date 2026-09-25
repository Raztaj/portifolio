import { describe, expect, it } from "vitest";
import { alternatesFor, localizeHref, routeUrl } from "@/lib/urls";
import { site } from "@/lib/site";

describe("routeUrl", () => {
  it("keeps English unprefixed", () => {
    expect(routeUrl("en", "/")).toBe(site.origin);
    expect(routeUrl("en", "/work/hasdo")).toBe(`${site.origin}/work/hasdo`);
  });

  it("prefixes Arabic and never double-hashes the root", () => {
    expect(routeUrl("ar", "/")).toBe(`${site.origin}/ar`);
    expect(routeUrl("ar", "/work/hasdo")).toBe(`${site.origin}/ar/work/hasdo`);
  });
});

describe("alternatesFor", () => {
  const en = alternatesFor("en", "/work/hasdo");
  const ar = alternatesFor("ar", "/work/hasdo");

  it("canonical follows the requested locale", () => {
    expect(en.canonical).toBe(`${site.origin}/work/hasdo`);
    expect(ar.canonical).toBe(`${site.origin}/ar/work/hasdo`);
  });

  it("always exposes both locales and x-default pointing to English", () => {
    expect(en.languages).toEqual({
      en: `${site.origin}/work/hasdo`,
      ar: `${site.origin}/ar/work/hasdo`,
      "x-default": `${site.origin}/work/hasdo`,
    });
    expect(ar.languages).toEqual(en.languages);
  });
});

describe("localizeHref", () => {
  it("returns the path untouched for English", () => {
    expect(localizeHref("en", "/#work")).toBe("/#work");
    expect(localizeHref("en", "/lab")).toBe("/lab");
  });

  it("prefixes /ar but keeps anchors intact", () => {
    expect(localizeHref("ar", "/#work")).toBe("/ar#work");
    expect(localizeHref("ar", "/lab")).toBe("/ar/lab");
    expect(localizeHref("ar", "/")).toBe("/ar");
  });
});