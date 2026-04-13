import { mockDraft, optimisationNotes, totalAEOScore, maxAEOScore } from "@/data/mock-content-optimisation";
import { AEOScoreCard } from "./AEOScoreCard";
import { AIDisclaimer } from "./AIDisclaimer";
import { Button } from "@/components/ui/Button";

const categoryColor: Record<string, { bg: string; text: string; label: string }> = {
  entity: { bg: "bg-teal/10", text: "text-teal", label: "Entity" },
  citation: { bg: "bg-navy/10", text: "text-navy", label: "Citation" },
  structure: { bg: "bg-[#FFF0E4]", text: "text-warning", label: "Structure" },
  depth: { bg: "bg-[#E8F0FE]", text: "text-[#1E5AE4]", label: "Depth" },
  freshness: { bg: "bg-[#FFF8E1]", text: "text-[#B28500]", label: "Freshness" },
};

interface OutputStageProps {
  onStartNew: () => void;
}

export function OutputStage({ onStartNew }: OutputStageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(mockDraft).catch(() => {});
    console.log("ACTION: content_copy_to_clipboard");
  };

  return (
    <div className="flex flex-col gap-5">
      <AIDisclaimer variant="banner" />

      {/* Success banner */}
      <div className="rounded-xl py-5 px-6 bg-gradient-to-r from-teal/10 to-teal/5 border border-teal/30">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full size-10 bg-teal text-white font-semibold text-lg/5">
              ✓
            </div>
            <div>
              <div className="text-navy font-semibold text-base/5">Content approved — ready to ship</div>
              <div className="mt-0.5 text-slate-body text-[13px]/4">
                Final AEO score: <span className="text-navy font-semibold">{totalAEOScore}/{maxAEOScore}</span> · Above publish threshold
              </div>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log("ACTION: content_download", { format: "md" })}>
              Download .md
            </Button>
            <Button variant="primary" size="sm" onClick={() => console.log("ACTION: content_download", { format: "docx" })}>
              Download .docx
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        {/* Final Output */}
        <div className="flex flex-col gap-5">
          <div className="rounded-xl py-6 px-7 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
            <div className="flex items-center justify-between mb-5">
              <div className="text-navy font-semibold text-[15px]/5">Final content</div>
              <span className="text-slate-muted text-[11px]/4">Markdown preview</span>
            </div>
            <pre className="whitespace-pre-wrap break-words font-sans text-slate-body text-[13px]/6 max-h-[440px] overflow-y-auto">{mockDraft}</pre>
          </div>

          {/* What changed */}
          <div className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
            <div className="mb-1 text-navy font-semibold text-[13px]/4">What the engine changed</div>
            <p className="mb-4 text-slate-muted text-[12px]/4">
              Each optimisation mapped to an AEO signal improvement.
            </p>
            <div className="flex flex-col gap-2.5">
              {optimisationNotes.map((note, i) => {
                const c = categoryColor[note.category];
                return (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-[#FAFBFC] p-3.5 border border-border-light">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] uppercase tracking-[0.4px] font-semibold ${c.bg} ${c.text}`}>
                      {c.label}
                    </span>
                    <div className="flex-1">
                      <div className="text-navy text-[13px]/4 font-semibold">{note.change}</div>
                      <div className="mt-0.5 text-slate-muted text-[12px]/4">{note.impact}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CMS Publish (Future) */}
          <div className="rounded-xl py-5 px-6 bg-white border border-dashed border-border-input">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-navy font-semibold text-[13px]/4">Publish to CMS</div>
                <div className="mt-0.5 text-slate-muted text-[11px]/4">Coming soon — V3 release</div>
              </div>
              <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-[#F0F4F8] text-slate-muted text-[10px] uppercase tracking-[0.4px] font-semibold">
                Future
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {["WordPress", "HubSpot", "Webflow", "Custom API"].map((cms) => (
                <button
                  key={cms}
                  disabled
                  className="rounded-lg py-3 px-3 bg-[#FAFBFC] border border-border-light text-slate-muted text-[12px]/4 font-semibold cursor-not-allowed"
                >
                  {cms}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <AEOScoreCard />

          <div className="rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
            <div className="mb-2 text-navy font-semibold text-[13px]/4">Next steps</div>
            <p className="mb-4 text-slate-muted text-[12px]/4">
              Content is publish-ready. Generate another piece or iterate on this one.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="primary" size="sm" onClick={onStartNew}>
                Generate another piece
              </Button>
              <Button variant="outline" size="sm" onClick={() => console.log("ACTION: content_save_draft")}>
                Save to library
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
