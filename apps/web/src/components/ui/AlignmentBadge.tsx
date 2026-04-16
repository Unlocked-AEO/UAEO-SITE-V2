import type { Alignment } from "@/data/mock-risk-insights";

const CONFIG: Record<
  Alignment,
  { bg: string; text: string; label: string }
> = {
  on_strategy: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", label: "On strategy" },
  adjacent: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", label: "Adjacent" },
  off_strategy: { bg: "bg-[#FFF1F2]", text: "text-[#9F1239]", label: "Off strategy" },
};

export function AlignmentBadge({ alignment }: { alignment: Alignment }) {
  const cfg = CONFIG[alignment];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px]/4 font-bold uppercase tracking-[0.08em] ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
}
