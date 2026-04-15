interface Stage {
  key: string;
  label: string;
}

const stages: Stage[] = [
  { key: "input", label: "Input" },
  { key: "configure", label: "Configure" },
  { key: "processing", label: "Processing" },
  { key: "review", label: "Review" },
  { key: "output", label: "Output" },
];

interface StageStepperProps {
  activeStage: string;
  completedStages: string[];
  onJump?: (stage: string) => void;
}

export function StageStepper({ activeStage, completedStages, onJump }: StageStepperProps) {
  return (
    <div className="rounded-xl py-4 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center">
        {stages.map((stage, i) => {
          const isActive = stage.key === activeStage;
          const isCompleted = completedStages.includes(stage.key);
          const clickable = isCompleted && onJump;
          return (
            <div key={stage.key} className="flex items-center flex-1 last:flex-none">
              <button
                className={`flex items-center gap-2.5 bg-transparent border-none p-0 ${
                  clickable ? "cursor-pointer hover:opacity-80" : "cursor-default"
                }`}
                onClick={() => clickable && onJump(stage.key)}
                disabled={!clickable}
              >
                <div
                  className={`flex items-center justify-center rounded-full size-6 text-[11px] font-semibold transition-colors ${
                    isActive
                      ? "bg-teal text-white"
                      : isCompleted
                      ? "bg-teal/15 text-teal"
                      : "bg-[#F0F4F8] text-slate-muted"
                  }`}
                >
                  {isCompleted ? "✓" : i + 1}
                </div>
                <span
                  className={`text-[13px]/4 whitespace-nowrap ${
                    isActive
                      ? "text-navy font-semibold"
                      : isCompleted
                      ? "text-slate-body"
                      : "text-slate-muted"
                  }`}
                >
                  {stage.label}
                </span>
              </button>
              {i < stages.length - 1 && (
                <div
                  className={`flex-1 h-px mx-4 ${
                    isCompleted ? "bg-teal/40" : "bg-border-light"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
