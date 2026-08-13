export function Squiggle({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 120 20" className={className} aria-hidden="true">
      <path
        d="M0 10 Q7.5 2 15 10 T30 10 T45 10 T60 10 T75 10 T90 10 T105 10 T120 10"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
