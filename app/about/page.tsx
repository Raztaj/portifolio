import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { MonoLabel, Divider } from "@/components/ui";
import { interests, stack, timeline, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "ABOUT — TAJELSIR / SYSTEMS",
  description: "Software engineer focused on practical systems, automation and security-oriented software.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        crumb="ABOUT /"
        backHref="/"
        backLabel="SYSTEMS"
        title="Tajelsir Khalid"
        sub="Software engineer focused on building practical systems, automation and security-oriented software."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MonoLabel accent={false}>01 / STATEMENT</MonoLabel>
            <p className="mt-4 max-w-2xl font-sans text-xl font-medium leading-relaxed tracking-tight text-fg sm:text-2xl">
              I build software for real-world constraints — systems that keep working
              when the environment stops cooperating.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              I enjoy working where the obvious solution stops working because the
              environment is messy: unreliable networks, Arabic-first audiences, field
              teams, zero budgets. The interesting engineering lives in the gap between
              what the tutorials assume and what actually happens.
            </p>

            <div className="mt-10">
              <MonoLabel accent={false}>02 / CURRENTLY INTERESTED IN</MonoLabel>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {interests.map((i) => (
                  <div
                    key={i}
                    className="border border-line bg-surface px-4 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-fg"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <MonoLabel accent={false}>03 / CONTACT</MonoLabel>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                  >
                    {s.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <MonoLabel accent={false}>STACK</MonoLabel>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <MonoLabel accent={false}>TIMELINE</MonoLabel>
              <div className="mt-4 space-y-4">
                {timeline.map((t) => (
                  <div key={t.year} className="border-l border-line pl-4">
                    <div className="font-mono text-[12px] text-accent">{t.year}</div>
                    <div className="mt-1 font-sans text-sm font-semibold text-fg">
                      {t.role}
                    </div>
                    <div className="font-mono text-[11px] text-muted">{t.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Divider />
      <Footer />
    </main>
  );
}