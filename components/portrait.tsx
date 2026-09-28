import Image from "next/image";

export default function Portrait({
  caption,
  code,
  alt,
}: {
  caption: string;
  code: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface">
      <Image
        src="/portrait.png"
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover"
        priority
      />
      <div aria-hidden className="absolute right-0 top-0 z-10 h-12 w-12 bg-accent" />
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3">
        <span className="bg-surface px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
          {caption}
        </span>
        <span className="bg-accent px-2 font-mono text-[10px] tracking-[0.2em] text-white">
          {code}
        </span>
      </div>
    </div>
  );
}