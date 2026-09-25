import { describe, expect, it } from "vitest";
import { workSlugs, labSlugs, noteSlugs } from "@/lib/content/registry";
import { projects } from "@/lib/content/work";
import { arProjects, arLabEntries, arNotes } from "@/lib/content/ar";
import { labEntries } from "@/lib/content/lab";
import { notes } from "@/lib/content/notes";

describe("content parity", () => {
  it("registers the exact slugs present in the English work list", () => {
    expect([...projects.map((p) => p.slug)].sort()).toEqual([...workSlugs].sort());
  });

  it("every work slug has an Arabic entry", () => {
    expect([...arProjects.map((p) => p.slug)].sort()).toEqual([...workSlugs].sort());
  });

  it("every lab slug has both an English and an Arabic entry", () => {
    expect([...labEntries.map((e) => e.slug)].sort()).toEqual([...labSlugs].sort());
    expect([...arLabEntries.map((e) => e.slug)].sort()).toEqual([...labSlugs].sort());
  });

  it("every note slug exists in English and Arabic", () => {
    expect([...notes.map((n) => n.slug)].sort()).toEqual([...noteSlugs].sort());
    expect([...arNotes.map((n) => n.slug)].sort()).toEqual([...noteSlugs].sort());
  });
});