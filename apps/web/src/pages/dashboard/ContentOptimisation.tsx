import { useCallback, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { StageStepper } from "@/components/dashboard/content-optimisation/StageStepper";
import { ModeSelect } from "@/components/dashboard/content-optimisation/ModeSelect";
import { ConfigureForm } from "@/components/dashboard/content-optimisation/ConfigureForm";
import { ProcessingStage } from "@/components/dashboard/content-optimisation/ProcessingStage";
import { ReviewStage } from "@/components/dashboard/content-optimisation/ReviewStage";
import { OutputStage } from "@/components/dashboard/content-optimisation/OutputStage";
import { ContentLibrary } from "@/components/dashboard/content-optimisation/ContentLibrary";
import { BackButton } from "@/components/dashboard/content-optimisation/BackButton";
import {
  type ContentMode,
  type ContentConfig,
  type AEOSignal,
  type OptimisationNote,
  type IterationEntry,
} from "@/data/mock-content-optimisation";
import { createJob, iterateDraft, approveDraft, getDraft } from "@/lib/api/client";
import type { DoneEvent } from "@/lib/api/sse";

// "success" leaves DEMO_STATE off; "empty" forces the empty-state card.
const DEMO_STATE: "success" | "empty" = "success";

type Stage = "input" | "configure" | "processing" | "review" | "output";
type View = "engine" | "library";

const stageOrder: Stage[] = ["input", "configure", "processing", "review", "output"];

interface DraftState {
  draftId: string;
  markdown: string;
  signals: AEOSignal[];
  totalScore: number;
  notes: OptimisationNote[];
  iterations: IterationEntry[];
}

export default function ContentOptimisation() {
  const [view, setView] = useState<View>("engine");
  const [stage, setStage] = useState<Stage>("input");
  const [mode, setMode] = useState<ContentMode | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [libraryRefreshKey, setLibraryRefreshKey] = useState(0);

  const completedStages = stageOrder.slice(0, stageOrder.indexOf(stage));

  const resetFlow = () => {
    setStage("input");
    setMode(null);
    setJobId(null);
    setDraft(null);
    setError(null);
  };

  const startNewFromLibrary = () => {
    resetFlow();
    setView("engine");
  };

  // Fired when user submits the Configure form. Posts a job to the API,
  // stores the jobId, and advances to Processing where the SSE stream
  // takes over.
  const handleConfigureSubmit = useCallback(
    async (config: ContentConfig, uploadIds: string[]) => {
      setError(null);
      try {
        const { jobId } = await createJob(config, uploadIds);
        setJobId(jobId);
        setStage("processing");
      } catch (e: any) {
        setError(e?.message ?? "Failed to start generation");
      }
    },
    [],
  );

  // Fired when SSE `done` lands. Hydrate draft state and jump to Review.
  const handleProcessingComplete = useCallback((done: DoneEvent) => {
    setDraft({
      draftId: done.draftId,
      markdown: done.markdown,
      signals: done.signals,
      totalScore: done.totalScore,
      notes: done.notes,
      iterations: [
        // Synthesise the v1 entry from the done payload — for subsequent
        // iterations the backend appends to draft.iterations and we'll
        // re-fetch via getDraft.
        { version: done.version, timestamp: new Date().toISOString(), score: done.totalScore },
      ],
    });
    setStage("review");
  }, []);

  // Fired by ReviewStage when user clicks Regenerate.
  const handleRegenerate = useCallback(
    async (feedback: string, mode: "refine" | "new-base") => {
      if (!draft) return;
      setError(null);
      try {
        const { jobId } = await iterateDraft(draft.draftId, feedback, mode);
        setJobId(jobId);
        setStage("processing");
      } catch (e: any) {
        setError(e?.message ?? "Failed to regenerate");
      }
    },
    [draft],
  );

  // Fired when user clicks Approve in Review.
  const handleApprove = useCallback(async () => {
    if (!draft) return;
    try {
      await approveDraft(draft.draftId);
      // Re-fetch to pick up updated iterations + status from the server.
      const fresh = await getDraft(draft.draftId);
      setDraft({
        draftId: fresh.id,
        markdown: fresh.markdown,
        signals: fresh.signals,
        totalScore: fresh.totalScore,
        notes: fresh.notes,
        iterations: fresh.iterations,
      });
      setStage("output");
      // Library is likely about to gain an entry — bump to refetch.
      setLibraryRefreshKey(k => k + 1);
    } catch (e: any) {
      setError(e?.message ?? "Approve failed");
    }
  }, [draft]);

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
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-danger/40 bg-danger/5 px-4 py-3 text-danger text-[13px]/5">
          {error}
        </div>
      )}

      {DEMO_STATE === "empty" ? (
        <EmptyState onStart={() => setView("engine")} />
      ) : view === "library" ? (
        <ContentLibrary
          refreshKey={libraryRefreshKey}
          onNewContent={startNewFromLibrary}
          onOpenItem={async (item) => {
            // For now, opening a library item just hops back into Review
            // with whatever last-loaded draft we have. To open the actual
            // saved item we'd need a /library/:id/draft endpoint that
            // returns the full DraftRecord — backlog item.
            console.log("open library item", item.id);
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
              onSubmit={handleConfigureSubmit}
            />
          )}

          {stage === "processing" && (
            <ProcessingStage
              jobId={jobId}
              onComplete={handleProcessingComplete}
              onError={(msg) => {
                setError(msg);
                setStage("configure");
              }}
            />
          )}

          {stage === "review" && draft && (
            <ReviewStage
              draftId={draft.draftId}
              markdown={draft.markdown}
              signals={draft.signals}
              totalScore={draft.totalScore}
              iterations={draft.iterations}
              onApprove={handleApprove}
              onRegenerate={handleRegenerate}
            />
          )}

          {stage === "output" && draft && (
            <OutputStage
              draftId={draft.draftId}
              markdown={draft.markdown}
              signals={draft.signals}
              totalScore={draft.totalScore}
              notes={draft.notes}
              onStartNew={resetFlow}
            />
          )}
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
