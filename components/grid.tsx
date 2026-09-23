export default function Grid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid grid-cols-12 ${className}`}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="relative h-full">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line/40" />
        </div>
      ))}
    </div>
  );
}