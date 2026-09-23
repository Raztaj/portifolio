import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/content/locale";
import { MonoLabel } from "@/components/ui";

export default function PageHeader({
  lang,
  crumb,
  backHref,
  backLabel,
  title,
  sub,
}: {
  lang: Locale;
  crumb: string;
  backHref: string;
  backLabel: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
        <div className="flex items-center justify-between">
          <MonoLabel accent={false}>{crumb}</MonoLabel>
          <Link
            href={localizeHref(lang, backHref)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden className="rtl:hidden">
              ←
            </span>
            <span aria-hidden className="hidden rtl:inline">
              →
            </span>
            {backLabel}
          </Link>
        </div>
        <h1 className="mt-6 font-sans text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}