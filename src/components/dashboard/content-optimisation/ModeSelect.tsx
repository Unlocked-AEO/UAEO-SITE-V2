import type { ContentMode } from "@/data/mock-content-optimisation";

interface ModeSelectProps {
  onSelect: (mode: ContentMode) => void;
}

const modes: {
  key: ContentMode;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}[] = [
  {
    key: "generate",
    badge: "Create",
    title: "Generate New Content",
    subtitle: "Create a fresh AEO-optimised asset",
    description: "Brief the engine on the topic and audience — it structures the output for AI citation from the ground up.",
    bullets: ["Pillar pages", "FAQ pages", "Comparison articles", "Thought leadership"],
  },
  {
    key: "optimize",
    badge: "Transform",
    title: "Optimize Existing Content",
    subtitle: "Rework live content for AI visibility",
    description: "Paste or upload existing content — the engine restructures it to maximise citation probability in AI answer engines.",
    bullets: ["Underperforming blog posts", "Product pages never cited", "Docs that should be canonical"],
  },
];

export function ModeSelect({ onSelect }: ModeSelectProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-1.5 text-navy font-semibold text-lg/6">How would you like to start?</div>
        <p className="text-slate-muted text-[13px]/5 whitespace-nowrap">
          Every asset the engine produces is scored against our proprietary AEO framework before you see it.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 items-stretch">
        {modes.map((m) => (
          <button
            key={m.key}
            className="mode-card flex flex-col h-full text-left rounded-xl p-7 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] cursor-pointer transition-all hover:border-teal hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_#0A254017]"
            onClick={() => {
              console.log("ACTION: content_select_mode", { mode: m.key });
              onSelect(m.key);
            }}
          >
            <div className="inline-flex self-start items-center rounded-full px-2.5 py-1 mb-4 bg-teal/10 text-teal text-[10px] uppercase tracking-[0.4px] font-semibold">
              {m.badge}
            </div>
            <div className="mb-1 text-navy font-semibold text-base/6 min-h-6">{m.title}</div>
            <div className="mb-3 text-slate-muted text-[12px]/4 min-h-4">{m.subtitle}</div>
            <p className="mb-5 text-slate-body text-[13px]/5 min-h-15">{m.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {m.bullets.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-md px-2 py-1 bg-[#F5F8FB] text-slate-body text-[11px]/3"
                >
                  {b}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
