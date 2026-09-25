import { workSlugs, labSlugs, noteSlugs } from "./registry";
import { projects } from "./work";
import { arProjects, arLabEntries, arNotes } from "./ar";
import { labEntries } from "./lab";
import { notes } from "./notes";

function missing(expected: readonly string[], actual: readonly string[]) {
  return expected.filter((slug) => !actual.includes(slug));
}

const groups: Record<string, { expected: readonly string[]; actual: readonly string[] }> = {
  workEn: { expected: workSlugs, actual: projects.map((p) => p.slug) },
  workAr: { expected: workSlugs, actual: arProjects.map((p) => p.slug) },
  labEn: { expected: labSlugs, actual: labEntries.map((e) => e.slug) },
  labAr: { expected: labSlugs, actual: arLabEntries.map((e) => e.slug) },
  notesEn: { expected: noteSlugs, actual: notes.map((n) => n.slug) },
  notesAr: { expected: noteSlugs, actual: arNotes.map((n) => n.slug) },
};

const failures = Object.entries(groups).filter(([, g]) => missing(g.expected, g.actual).length > 0);

if (failures.length > 0) {
  throw new Error(
    "Content parity check failed — missing content slugs (see registry.ts):\n" +
      failures
        .map(([group, g]) => `  ${group}: ${missing(g.expected, g.actual).join(", ")}`)
        .join("\n")
  );
}