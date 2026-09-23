import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { MonoLabel, Divider } from "@/components/ui";
import { notes, getNote } from "@/lib/content/notes";

export const dynamicParams = false;

export async function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} — NOTES / TAJELSIR SYSTEMS`,
    description: note.intro,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const others = notes.filter((n) => n.slug !== slug);

  return (
    <main>
      <Nav />
      <PageHeader
        crumb={`NOTE ${note.index}`}
        backHref="/notes"
        backLabel="NOTES"
        title={note.title}
        sub={`${note.date} · ${note.words}`}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-10 border-l-2 border-accent pl-4 font-sans text-lg font-medium leading-relaxed tracking-tight text-fg">
          {note.intro}
        </p>
        <div className="space-y-12">
          {note.sections.map((section, idx) => (
            <section key={section.heading}>
              <div className="mb-4">
                <MonoLabel>
                  {String(idx + 1).padStart(2, "0")}
                  <span className="text-muted"> / </span>
                  {section.heading}
                </MonoLabel>
              </div>
              <div className="space-y-4">
                {section.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          {others.length > 0 ? (
            <a
              href={`/notes/${others[0].slug}`}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              ← NEXT NOTE / {others[0].title}
            </a>
          ) : (
            <span />
          )}
          <Link
            href="/notes"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            ALL NOTES →
          </Link>
        </div>
      </div>

      <Divider />
      <Footer />
    </main>
  );
}