import type { Trend } from "@/data/mock-risk-insights";

interface TrendArrowProps {
  trend: Trend;
  // `invert: true` flips semantic color. Use when "up" is bad (e.g. rising risk).
  invert?: boolean;
  label?: string;
  size?: number;
}

export function TrendArrow({
  trend,
  invert = false,
  label,
  size = 13,
}: TrendArrowProps) {
  // Default semantics: up = good (green), down = bad (red).
  // Inverted semantics: up = bad, down = good. Used when rising values are worsening.
  const colorForUp = invert ? "#E74C3C" : "#27AE60";
  const colorForDown = invert ? "#27AE60" : "#E74C3C";
  const flatColor = "#8792A2";

  const color =
    trend === "up" ? colorForUp : trend === "down" ? colorForDown : flatColor;

  const a11yLabel =
    trend === "up"
      ? "Trending up"
      : trend === "down"
        ? "Trending down"
        : "Holding steady";

  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={a11yLabel}
      role="img"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 13 13"
        fill="none"
        className="shrink-0"
      >
        {trend === "up" && <path d="M6.5 1.5L11 7H2L6.5 1.5Z" fill={color} />}
        {trend === "down" && (
          <path d="M6.5 11.5L2 6H11L6.5 11.5Z" fill={color} />
        )}
        {trend === "flat" && (
          <rect x="2" y="5.5" width="9" height="2" rx="1" fill={color} />
        )}
      </svg>
      {label && (
        <span style={{ color }} className="text-[12px]/4 font-medium">
          {label}
        </span>
      )}
    </span>
  );
}
