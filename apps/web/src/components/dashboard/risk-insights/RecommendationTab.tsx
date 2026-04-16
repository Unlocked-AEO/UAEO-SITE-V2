import { AlignmentBadge } from "@/components/ui/AlignmentBadge";
import type { Risk, RecommendationContext } from "@/data/mock-risk-insights";

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

export function RecommendationTab({ risk }: { risk: Risk }) {
  const contexts = risk.recommendationContexts ?? [];

  if (contexts.length === 0) {
    return (
      <div className="py-8 text-center">
        <span className="text-[#64748B] text-[14px]/5">
          No recommendation-context data for this risk yet.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="uppercase tracking-[0.08em] text-navy font-bold text-[11px]/4">
          Recommendation contexts ({contexts.length})
        </span>
        <span className="text-[11px]/4 text-[#64748B]">
          Use cases where AI engines recommend Acme, and whether each is on strategy.
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {contexts.map((c) => (
          <ContextRow key={c.id} context={c} />
        ))}
      </div>
    </div>
  );
}

function ContextRow({ context }: { context: RecommendationContext }) {
  const isLeak = context.alignment === "off_strategy";
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 rounded-xl border bg-white p-4"
      style={{
        borderColor: isLeak ? "#FECACA" : "#E2E8F0",
        backgroundColor: isLeak ? "#FFF8F8" : "#FFFFFF",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-navy font-semibold text-[14px]/5">
            {context.useCase}
          </span>
          <AlignmentBadge alignment={context.alignment} />
          {isLeak && (
            <span className="rounded-full bg-[#FFF1F2] text-[#9F1239] px-2 py-0.5 text-[10px]/4 font-bold uppercase tracking-[0.08em]">
              Positioning leak
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="grow h-1.5 rounded-full bg-[#F8FAFC] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, context.sharePct * 2)}%`,
                backgroundColor: isLeak
                  ? "#E74C3C"
                  : context.alignment === "adjacent"
                    ? "#FF9F43"
                    : "#27AE60",
              }}
            />
          </div>
          <span className="text-navy text-[12px]/4 font-semibold w-12 text-right">
            {context.sharePct}%
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[10px]/4 uppercase tracking-[0.08em] text-[#64748B] font-bold">
          {ENGINE_LABEL[context.exampleEngine] ?? context.exampleEngine} example
        </span>
        <p className="m-0 text-[13px]/[1.6] text-[#475569] italic">
          &ldquo;{context.exampleSnippet}&rdquo;
        </p>
      </div>
    </div>
  );
}
