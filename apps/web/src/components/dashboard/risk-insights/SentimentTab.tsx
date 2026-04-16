import { SentimentPill } from "@/components/ui/SentimentPill";
import type {
  Risk,
  SentimentPolarity,
  SentimentSample,
} from "@/data/mock-risk-insights";

const POLARITIES: SentimentPolarity[] = ["positive", "neutral", "mixed", "negative"];

const POLARITY_COLOR: Record<SentimentPolarity, string> = {
  positive: "#27AE60",
  neutral: "#94A3B8",
  mixed: "#FF9F43",
  negative: "#E74C3C",
};

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SentimentTab({ risk }: { risk: Risk }) {
  const samples = risk.sentimentSamples ?? [];

  if (samples.length === 0) {
    return (
      <div className="py-8 text-center">
        <span className="text-[#64748B] text-[14px]/5">
          No sentiment samples available for this risk yet.
        </span>
      </div>
    );
  }

  // Counts per polarity
  const counts: Record<SentimentPolarity, number> = {
    positive: 0,
    neutral: 0,
    mixed: 0,
    negative: 0,
  };
  for (const s of samples) counts[s.polarity] += 1;
  const total = samples.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Polarity bar */}
      <div className="flex flex-col gap-2">
        <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
          Polarity distribution
        </span>
        <div className="flex rounded-full overflow-hidden h-6 border border-[#E2E8F0]">
          {POLARITIES.map((p) => {
            const pct = total > 0 ? (counts[p] / total) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={p}
                className="flex items-center justify-center text-[10px]/3.5 font-bold text-white"
                style={{ width: `${pct}%`, backgroundColor: POLARITY_COLOR[p] }}
                title={`${p}: ${counts[p]} / ${total}`}
              >
                {pct >= 14 && `${Math.round(pct)}%`}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]/4 text-[#475569]">
          {POLARITIES.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5">
              <span
                className="size-2 rounded-sm"
                style={{ backgroundColor: POLARITY_COLOR[p] }}
              />
              <span className="capitalize">{p}</span>
              <span className="text-navy font-semibold">{counts[p]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Samples */}
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
          Positioning samples ({samples.length})
        </span>
        <div className="flex flex-col gap-3">
          {samples.map((sample) => (
            <SampleCard key={sample.id} sample={sample} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SampleCard({ sample }: { sample: SentimentSample }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 text-[10px]/4 text-[#475569] font-bold uppercase tracking-[0.08em]">
            {ENGINE_LABEL[sample.engine] ?? sample.engine}
          </span>
          <SentimentPill polarity={sample.polarity} />
        </div>
        <span className="text-[11px]/4 text-[#64748B]">
          {formatDate(sample.detectedAt)}
        </span>
      </div>
      <span className="text-navy font-semibold text-[13px]/4">
        &ldquo;{sample.positioningPhrase}&rdquo;
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[11px]/4 text-[#64748B]">
          Prompt: &ldquo;{sample.prompt}&rdquo;
        </span>
        <p className="m-0 text-[13px]/[1.6] text-[#475569] italic">
          &ldquo;{sample.snippet}&rdquo;
        </p>
      </div>
    </div>
  );
}
