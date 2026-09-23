import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Grid from "@/components/grid";
import StatusConsole from "@/components/status-console";
import WorkRows from "@/components/work-rows";
import { MonoLabel, SectionHeading, Divider, ArrowLink } from "@/components/ui";
import { site, philosophy, interests, stack, timeline } from "@/lib/site";
import { projects } from "@/lib/content/work";
import { labEntries } from "@/lib/content/lab";
import { notes } from "@/lib/content/notes";

export default function Home() {
  return (
    <main>
      <Nav />

      <section className="relative overflow-hidden">
        <Grid className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <MonoLabel accent={false}>SOFTWARE ENGINEER</MonoLabel>
              <h1 className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
                SYSTEMS
                <br />
                BUILDER<span className="text-accent">.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                I build software for real-world constraints.
              </p>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/80">
                Software · Automation · Security
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 border border-line bg-surface-2 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  VIEW WORK
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-2 font-mono text-[12px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  GITHUB
                  <span className="text-accent transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <StatusConsole projects={projects.length} labs={labEntries.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            I don&apos;t collect technologies.
            <br />
            I build systems.
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p) => (
              <div
                key={p}
                className="border border-line bg-bg px-4 py-3 font-mono text-[12px] uppercase tracking-[0.15em] text-fg"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16" id="work">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index="01 / WORK" title="Selected Work" accent />
            <MonoLabel accent={false}>{String(projects.length).padStart(2, "0")} SYSTEMS</MonoLabel>
          </div>
          <WorkRows />
        </div>
      </section>

      <section className="border-y border-line bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-8">
            <SectionHeading index="02 / ENGINEERING" title="Where the work lives" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "A",
                t: "ARCHITECTURE",
                d: "Every system includes decisions, trade-offs, and the shape that fell out of them.",
              },
              {
                n: "B",
                t: "SECURITY",
                d: "Threat models where they matter — not theater everywhere.",
              },
              {
                n: "C",
                t: "AUTOMATION",
                d: "Removing keystrokes from repetitive work, cheap and observable.",
              },
            ].map((item) => (
              <div key={item.n} className="border border-line bg-bg p-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-accent">
                  {item.n}
                </div>
                <div className="mt-3 font-mono text-sm font-semibold tracking-tight text-fg">
                  {item.t}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index="03 / LAB" title="Experiments" />
            <ArrowLink href="/lab">ALL ENTRIES</ArrowLink>
          </div>

          <div className="border border-line bg-bg">
            <div className="border-b border-line px-4 py-2.5 font-mono text-[11px] text-fg">
              <span className="text-accent">$</span> ls experiments
            </div>
            <div className="grid gap-x-8 gap-y-2 px-4 py-5 font-mono text-[12px] sm:grid-cols-2 lg:grid-cols-3">
              {labEntries
                .filter((e) => e.category !== "RESEARCH")
                .slice(0, 9)
                .map((e) => (
                  <Link
                    key={e.slug}
                    href={`/lab/${e.slug}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {e.name.toLowerCase()}/<span className="text-line">_</span>
                  </Link>
                ))}
              <Link
                href="/lab"
                className="text-muted transition-colors hover:text-accent"
              >
                <span className="text-accent">…</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index="04 / RESEARCH" title="Investigations" />
            <ArrowLink href="/research">VIEW RESEARCH</ArrowLink>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {labEntries
              .filter((e) => e.category === "RESEARCH")
              .map((e) => (
                <Link
                  key={e.slug}
                  href={`/lab/${e.slug}`}
                  className="group border border-line bg-bg p-5 transition-colors hover:border-accent"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {e.tag} / {e.status}
                  </div>
                  <div className="mt-3 font-sans text-lg font-semibold tracking-tight text-fg group-hover:text-accent">
                    {e.name}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {e.question}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index="05 / NOTES" title="Engineering Notes" />
            <ArrowLink href="/notes">ALL NOTES</ArrowLink>
          </div>
          <div className="divide-y divide-line border-b border-t border-line">
            {notes.map((n) => (
              <Link
                key={n.slug}
                href={`/notes/${n.slug}`}
                className="group flex flex-wrap items-baseline justify-between gap-2 py-5"
              >
                <span className="font-sans text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                  {n.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {n.date} · {n.words}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <SectionHeading index="06 / ABOUT" title="Tajelsir Khalid" />
            <ArrowLink href="/about">FULL PROFILE</ArrowLink>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="max-w-md text-base leading-relaxed text-muted">
                Software engineer focused on building practical systems, automation
                and security-oriented software. I enjoy working where the obvious
                solution stops working because the environment is messy.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {interests.map((i) => (
                  <div key={i} className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg/90">
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Stack
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-line bg-bg px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Timeline
              </div>
              <div className="mt-3 space-y-3">
                {timeline.map((t) => (
                  <div key={t.year} className="grid grid-cols-[64px_1fr] items-baseline gap-4">
                    <span className="font-mono text-[12px] text-accent">{t.year}</span>
                    <div>
                      <span className="font-sans text-sm font-medium text-fg">{t.role}</span>
                      <span className="font-mono text-[11px] text-muted"> — {t.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" id="contact">
        <Grid className="opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <MonoLabel>HAVE A PROBLEM?</MonoLabel>
          <h2 className="mt-4 max-w-2xl font-sans text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
            If you have a project, system, or particularly annoying technical
            problem:
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "EMAIL", href: `mailto:${site.email}` },
              { label: "GITHUB", href: site.github },
              { label: "LINKEDIN", href: site.linkedin },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
              >
                {l.label} →
              </a>
            ))}
          </div>
          <div className="mt-16 font-sans text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            LET&apos;S<br />
            BUILD<br />
            SOMETHING<span className="text-accent">.</span>
          </div>
        </div>
      </section>

      <Divider />
      <Footer />
    </main>
  );
}