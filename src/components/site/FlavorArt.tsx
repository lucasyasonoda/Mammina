type FlavorArtProps = {
  color: string;
  accent: string;
  className?: string;
};

/** A small stylised brigadeiro-in-a-cup illustration, recolored per flavor. */
export function FlavorArt({ color, accent, className }: FlavorArtProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <ellipse cx="100" cy="150" rx="70" ry="14" fill={color} opacity="0.12" />
      <path
        d="M45 118 L60 178 Q100 190 140 178 L155 118 Z"
        fill={accent}
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M45 118 L60 178 Q100 190 140 178 L155 118"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={i}
          x1={52 + i * 15}
          y1="118"
          x2={45 + i * 17}
          y2="176"
          stroke={color}
          strokeWidth="1.4"
          opacity="0.35"
        />
      ))}
      <circle cx="100" cy="92" r="52" fill={color} />
      <circle cx="78" cy="72" r="10" fill="white" opacity="0.18" />
      <circle cx="118" cy="108" r="6" fill="black" opacity="0.08" />
    </svg>
  );
}
