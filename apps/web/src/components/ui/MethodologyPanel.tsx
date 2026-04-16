import { useMethodology } from "./useMethodology";
import type { MethodologySpec } from "@/data/mock-risk-insights";

interface MethodologyPanelProps {
  spec: MethodologySpec;
  title: string;
  /** Optional compact variant used inline inside narrow cells. */
  compact?: boolean;
}

/**
 * Click-to-open inline methodology trigger. Opens the site-wide
 * MethodologySheet. Replaces the old hover-only MethodologyTooltip —
 * hover was losing the exec audience for methodology content.
 */
export function MethodologyPanel({
  spec,
  title,
  compact = false,
}: MethodologyPanelProps) {
  const { open } = useMethodology();

  return (
    <button
      type="button"
      onClick={() => open(spec, title)}
      className={`inline-flex items-center justify-center rounded-full bg-transparent border border-[#E2E8F0] text-[#64748B] cursor-pointer hover:border-[#64748B] hover:text-[#475569] focus:border-navy focus:text-navy focus:outline-none transition-colors ${
        compact ? "size-3.5" : "size-4"
      }`}
      aria-label={`Open methodology for ${title}`}
      title="View methodology"
    >
      <svg
        width={compact ? "7" : "8"}
        height={compact ? "7" : "8"}
        viewBox="0 0 8 8"
        fill="none"
      >
        <path
          d="M4 5.5V3.5M4 2V2.01"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
