import type { ReactNode } from "react";

export function MonoLabel({
  children,
  accent = true,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
        accent ? "text-accent" : "text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  index,
  title,
  accent,
}: {
  index?: string;
  title: string;
  accent?: string | boolean;
}) {
  return (
    <div>
      {index && (
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          {index}
        </div>
      )}
      <h2 className="font-sans text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {title}
      </h2>
      {accent && (
        <div className="mt-3 h-px w-12 bg-accent" />
      )}
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
      {children}
    </span>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`border-t border-line ${className}`} />;
}

export function ArrowLink({
  children,
  href,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg ${className}`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5 rtl:-translate-x-0.5">
        →
      </span>
    </a>
  );
}