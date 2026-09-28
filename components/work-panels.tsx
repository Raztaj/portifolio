import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getProjects } from "@/lib/content/locale";
import { localizeHref } from "@/lib/urls";
import type { Project } from "@/lib/content/types";

const PANELS: {
  dark: boolean;
  wrap: string;
  text: string;
  label: string;
  desc: string;
  chip: string;
}[] = [
  {
    dark: false,
    wrap: "bg-surface",
    text: "text-fg",
    label: "text-muted",
    desc: "text-muted",
    chip: "text-muted/80",
  },
  {
    dark: true,
    wrap: "bg-[#0b0b0b]",
    text: "text-white",
    label: "text-white/50",
    desc: "text-white/70",
    chip: "text-white/50",
  },
];

export default function WorkPanels({ lang }: { lang: Locale }) {
  const projects = getProjects(lang);
  const open = getDictionary(lang).work.open;

  return (
    <div className="border-y border-line">
      {projects.map((p, i) => <Panel key={p.slug} project={p} open={open} tones={PANELS[i % PANELS.length]} lang={lang} />)}
    </div>
  );
}

function Panel({
  project,
  lang,
  open,
  tones,
}: {
  project: Project;
  lang: Locale;
  open: string;
  tones: (typeof PANELS)[number];
}) {
  const img = project.media?.[0];
  return (
    <Link
      href={localizeHref(lang, `/work/${project.slug}`)}
      className={`group block transition-all duration-300 ${
        tones.dark ? "hover:bg-[#101013]" : "hover:bg-bg hover:shadow-[0_32px_90px_-60px_rgba(21,94,239,0.5)]"
      } ${tones.wrap}`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-4 gap-y-4 px-4 py-10 sm:px-6 sm:py-16">
        <div className="col-span-2 font-mono text-lg tracking-[0.2em] text-accent sm:col-span-1">
          {project.index}
        </div>
        <div className="col-span-10 sm:col-span-4">
          <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${tones.label}`}>
            {project.kind} · {project.year}
          </div>
          <h3
            className={`mt-1 font-sans text-3xl font-semibold tracking-tight underline decoration-accent decoration-2 underline-offset-8 transition-[color,text-decoration-color] duration-300 group-hover:text-accent sm:text-4xl ${
              tones.text
            }`}
          >
            {project.title}
          </h3>
        </div>
        <div className={`col-span-12 ${img ? "sm:col-span-4" : "sm:col-span-5"}`}>
          <p className={`text-sm leading-relaxed ${tones.desc}`}>{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <span key={s} className={`font-mono text-[10px] uppercase tracking-[0.15em] ${tones.chip}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
        {img ? (
          <div className="col-span-12 sm:col-span-3">
            <div className="overflow-hidden border border-line/70 bg-surface">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 22vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors group-hover:text-accent ${
                  tones.dark ? "text-white" : "text-muted"
                }`}
              >
                {open}
                <span className="rtl:inline rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:-translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div className="col-span-12 sm:col-span-2 sm:text-end">
            <span
              className={`inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors group-hover:text-accent ${
                tones.dark ? "text-white" : "text-muted"
              }`}
            >
              {open}
              <span className="rtl:inline rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:-translate-x-1">
                →
              </span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}