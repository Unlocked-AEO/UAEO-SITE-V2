import type { SentimentPolarity } from "@/data/mock-risk-insights";

const CONFIG: Record<
  SentimentPolarity,
  { bg: string; text: string; label: string }
> = {
  positive: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", label: "Positive" },
  neutral: { bg: "bg-[#F8FAFC]", text: "text-[#475569]", label: "Neutral" },
  mixed: { bg: "bg-[#FEF3C7]", text: "text-[#92400E]", label: "Mixed" },
  negative: { bg: "bg-[#FFF1F2]", text: "text-[#9F1239]", label: "Negative" },
};

export function SentimentPill({ polarity }: { polarity: SentimentPolarity }) {
  const cfg = CONFIG[polarity];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px]/4 font-bold uppercase tracking-[0.08em] ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
}
