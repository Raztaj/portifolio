"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const KNOWN: Locale[] = ["en", "ar"];

export default function LangToggle({
  lang,
  otherLabel,
  ariaLabel,
  plain,
}: {
  lang: Locale;
  otherLabel: string;
  ariaLabel: string;
  plain?: boolean;
}) {
  const pathname = usePathname();

  const target: Locale = lang === "en" ? "ar" : "en";

  const href = (() => {
    let rest = pathname ?? "";
    for (const l of KNOWN) {
      rest = rest.replace(new RegExp(`^/${l}(?=/|$)`), "");
    }
    if (target === "ar") return rest ? `/ar${rest}` : "/ar";
    return rest || "/";
  })();

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`font-mono text-[11px] tracking-[0.2em] transition-colors ${
        plain
          ? "text-muted hover:text-accent"
          : "border border-line bg-surface px-3 py-1.5 text-accent hover:text-fg"
      }`}
    >
      {otherLabel}
    </a>
  );
}