import Link from "next/link";
import { projects } from "@/lib/content/work";

export default function WorkRows() {
  return (
    <div>
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          className="group block border-b border-line"
        >
          <div className="grid grid-cols-12 items-center gap-4 py-8 transition-colors sm:py-10">
            <div className="col-span-2 sm:col-span-1">
              <span className="font-mono text-[12px] tracking-[0.2em] text-accent">
                {p.index}
              </span>
            </div>
            <div className="col-span-10 sm:col-span-5">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {p.kind} · {p.year}
              </div>
              <h3 className="font-sans text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-3xl">
                {p.title}
              </h3>
            </div>
            <div className="col-span-10 col-start-3 sm:col-span-4 sm:col-start-auto">
              <p className="text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-12 mt-4 flex items-center justify-between sm:col-span-2 sm:mt-0 sm:justify-end">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:hidden">
                {p.status}
              </span>
              <span className="hidden items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-accent sm:inline-flex">
                OPEN
                <span className="inline-block h-px w-6 bg-current transition-all group-hover:w-12" />
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}