import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { StageStepper } from "@/components/dashboard/content-optimisation/StageStepper";
import { ModeSelect } from "@/components/dashboard/content-optimisation/ModeSelect";
import { ConfigureForm } from "@/components/dashboard/content-optimisation/ConfigureForm";
import { ProcessingStage } from "@/components/dashboard/content-optimisation/ProcessingStage";
import { ReviewStage } from "@/components/dashboard/content-optimisation/ReviewStage";
import { OutputStage } from "@/components/dashboard/content-optimisation/OutputStage";
import { ContentLibrary } from "@/components/dashboard/content-optimisation/ContentLibrary";
import { BackButton } from "@/components/dashboard/content-optimisation/BackButton";
import { libraryItems, type ContentMode, type ContentConfig } from "@/data/mock-content-optimisation";

// Change this to see different versions: "success" | "empty"
const DEMO_STATE: "success" | "empty" = "success";

type Stage = "input" | "configure" | "processing" | "review" | "output";
type View = "engine" | "library";

const stageOrder: Stage[] = ["input", "configure", "processing", "review", "output"];

export default function ContentOptimisation() {
  const [view, setView] = useState<View>("engine");
  const [stage, setStage] = useState<Stage>("input");
  const [mode, setMode] = useState<ContentMode | null>(null);
  const [, setConfig] = useState<ContentConfig | null>(null);

  const completedStages = stageOrder.slice(0, stageOrder.indexOf(stage));

  const resetFlow = () => {
    setStage("input");
    setMode(null);
    setConfig(null);
  };

  const startNewFromLibrary = () => {
    resetFlow();
    setView("engine");
  };

  return (
    <DashboardShell activeTab="content-optimisation">
      {/* Hero */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full px-2.5 py-1 mb-2 bg-teal/10 text-teal text-[10px] uppercase tracking-[0.4px] font-semibold">
            AEO Content Engine
          </div>
          <h1 className="text-navy font-semibold text-2xl/8 tracking-[-0.4px] m-0">
            Content Optimisation
          </h1>
          <p className="mt-1.5 text-slate-muted text-[13px]/5 max-w-2xl m-0">
            Generate brand-new AI-engine-optimised content, or transform existing content into AEO-ready assets — scored against our proprietary framework before you see it.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {view === "engine" && stage !== "input" && (
            <BackButton label="Start over" onClick={resetFlow} />
          )}

          {/* View toggle */}
          <div className="relative flex items-center rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] p-1">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-teal shadow-[0px_2px_6px_#0A254019] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                view === "library" ? "translate-x-[calc(100%+0px)]" : "translate-x-0"
              }`}
            />
            <button
              onClick={() => setView("engine")}
              className={`relative z-10 flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px]/4 font-semibold cursor-pointer bg-transparent border-none transition-colors duration-200 ${
                view === "engine" ? "text-white" : "text-slate-muted hover:text-navy"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Engine
            </button>
            <button
              onClick={() => setView("library")}
              className={`relative z-10 flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px]/4 font-semibold cursor-pointer bg-transparent border-none transition-colors duration-200 ${
                view === "library" ? "text-white" : "text-slate-muted hover:text-navy"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Library
              <span className={`inline-flex items-center justify-center rounded-full px-1.5 min-w-5 h-[18px] text-[11px] font-semibold transition-colors duration-200 ${
                view === "library" ? "bg-white/25 text-white" : "bg-[#F0F4F8] text-slate-muted"
              }`}>
                {libraryItems.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {DEMO_STATE === "empty" ? (
        <EmptyState onStart={() => setView("engine")} />
      ) : view === "library" ? (
        <ContentLibrary
          onNewContent={startNewFromLibrary}
          onOpenItem={(item) => {
            console.log("ACTION: library_open_item", { id: item.id });
            setStage("review");
            setMode(item.mode);
            setView("engine");
          }}
        />
      ) : (
        <>
          <StageStepper
            activeStage={stage}
            completedStages={completedStages}
            onJump={(s) => setStage(s as Stage)}
          />

          {stage === "input" && (
            <ModeSelect
              onSelect={(m) => {
                setMode(m);
                setStage("configure");
              }}
            />
          )}

          {stage === "configure" && mode && (
            <ConfigureForm
              mode={mode}
              onBack={() => setStage("input")}
              onSubmit={(c) => {
                setConfig(c);
                setStage("processing");
              }}
            />
          )}

          {stage === "processing" && (
            <ProcessingStage onComplete={() => setStage("review")} />
          )}

          {stage === "review" && (
            <ReviewStage
              onApprove={() => setStage("output")}
              onRegenerate={() => setStage("processing")}
            />
          )}

          {stage === "output" && <OutputStage onStartNew={resetFlow} />}
        </>
      )}
    </DashboardShell>
  );
}

function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="grow flex flex-col items-center justify-center rounded-xl bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F] p-12 text-center">
      <h2 className="text-navy font-semibold text-lg/6 m-0">No content generated yet</h2>
      <p className="mt-2 max-w-md text-slate-muted text-[13px]/5 m-0">
        Run your first AEO audit, then turn its recommendations into publishable, citation-ready content in minutes.
      </p>
      <button
        onClick={onStart}
        className="mt-6 flex items-center rounded-lg py-2.5 px-5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
      >
        <span className="text-white font-semibold text-[13px]/4">Start your first piece</span>
      </button>
    </div>
  );
}
