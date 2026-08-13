import { cn } from "@/lib/utils";

type StampPhotoProps = {
  src: string;
  alt: string;
  rotate?: number;
  tag?: string;
  className?: string;
};

/** A photo framed like a torn postage stamp, slightly rotated, with an optional pill tag. */
export function StampPhoto({ src, alt, rotate = -3, tag, className }: StampPhotoProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="stamp-edge bg-paper-soft p-3 shadow-[0_22px_45px_-20px_rgba(74,25,23,0.45)]">
        <img src={src} alt={alt} className="block w-full object-cover" />
      </div>
      {tag && (
        <span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sky px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-wine-dark shadow-md"
          style={{ transform: `translateX(-50%) rotate(${-rotate}deg)` }}
        >
          {tag}
        </span>
      )}
    </div>
  );
}
