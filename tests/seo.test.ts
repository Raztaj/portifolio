import { describe, expect, it } from "vitest";
import { pageMetadata, ogPageImage } from "@/lib/seo";
import { site } from "@/lib/site";

describe("pageMetadata", () => {
  it("emits a complete openGraph block with the page's own url", () => {
    const m = pageMetadata({ locale: "ar", path: "/work/hasdo", title: "T", description: "D" });
    const og = m.openGraph as Record<string, unknown>;
    expect(og.title).toBe("T");
    expect(og.description).toBe("D");
    expect(og.url).toBe(`${site.origin}/ar/work/hasdo`);
    expect(og.locale).toBe("ar_AR");
    expect(og.siteName).toBe(site.name);
  });

  it("uses the page image for both openGraph and twitter when given", () => {
    const image = ogPageImage({ locale: "en", slug: "hasdo", alt: "a" });
    const m = pageMetadata({ locale: "en", path: "/work/hasdo", title: "T", description: "D", image });
    expect((m.openGraph as { images: unknown[] }).images).toEqual([image]);
    expect((m.twitter as { images: unknown[] }).images).toEqual([image]);
  });

  it("falls back to the site-wide wide twitter banner", () => {
    const m = pageMetadata({ locale: "en", path: "/about", title: "T", description: "D" });
    expect((m.twitter as { images: string[] }).images[0]).toMatch(/social-tw\.png$/);
  });
});
