export default function Ticker({ items }: { items: readonly string[] }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex shrink-0 items-center">
          <span className="px-7 font-mono text-[13px] uppercase tracking-[0.25em] text-white/90">
            {t}
          </span>
          <span aria-hidden className="text-accent">
            ×
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-line bg-[#0b0b0b] py-3">
      <div className="ticker-track flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}