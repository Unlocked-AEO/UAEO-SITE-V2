import type { Rating } from "@/data/mock-risk-insights";
import { RATING_HEX } from "./ratingColor";

interface RatingChipProps {
  rating: Rating;
  size?: "sm" | "md" | "lg";
  label?: string;
}

// Brand-softer pill tones (per brand-guidelines §05 Badges & Pills).
// These are distinct from `ratingColor` which supplies the stronger data-viz hex
// used for bars, lines, and dots. Pills get the softer bg + text tone.
const RATING_CONFIG: Record<
  Rating,
  { bg: string; text: string; label: string }
> = {
  green: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", label: "Green" },
  amber: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", label: "Amber" },
  red: { bg: "bg-[#FFF1F2]", text: "text-[#9F1239]", label: "Red" },
};

export function RatingChip({ rating, size = "md", label }: RatingChipProps) {
  const cfg = RATING_CONFIG[rating];
  const displayLabel = label ?? cfg.label;

  const sizeClass =
    size === "sm"
      ? "px-2.5 py-1 text-[10px]/4 gap-1.5"
      : size === "lg"
        ? "px-3.5 py-1.5 text-xs gap-2"
        : "px-3 py-1 text-[11px]/4 gap-1.5";

  const dotSize = size === "lg" ? "size-2" : "size-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-[0.08em] ${cfg.bg} ${cfg.text} ${sizeClass}`}
      aria-label={`Rating: ${cfg.label}`}
    >
      <span
        className={`shrink-0 rounded-full ${dotSize}`}
        style={{ backgroundColor: RATING_HEX[rating] }}
      />
      {displayLabel}
    </span>
  );
}
