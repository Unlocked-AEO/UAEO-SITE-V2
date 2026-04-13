import { useEffect, useState } from "react";
import { processingSteps } from "@/data/mock-content-optimisation";

interface ProcessingStageProps {
  onComplete: () => void;
}

export function ProcessingStage({ onComplete }: ProcessingStageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= processingSteps.length) {
      const done = setTimeout(onComplete, 600);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setCurrentStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [currentStep, onComplete]);

  return (
    <div className="rounded-xl py-10 px-8 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-3 mb-1">
          <div className="relative size-2.5">
            <div className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full bg-teal" />
          </div>
          <span className="text-teal font-semibold text-[11px] uppercase tracking-[0.4px]">
            Processing
          </span>
        </div>
        <div className="mb-1 text-navy font-semibold text-lg/6">
          Analysing and structuring for AEO
        </div>
        <p className="mb-7 text-slate-muted text-[13px]/5">
          Running your draft through the Unlocked AEO framework — entities, citation signals, answer structure and depth.
        </p>

        <div className="flex flex-col gap-2.5">
          {processingSteps.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div
                key={step.key}
                className={`flex items-start gap-3 rounded-lg p-3 border transition-colors ${
                  isActive
                    ? "border-teal bg-teal/5"
                    : isDone
                    ? "border-border-light bg-white"
                    : "border-border-light bg-[#FAFBFC]"
                }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 rounded-full size-5 text-[10px] font-semibold ${
                    isDone
                      ? "bg-teal text-white"
                      : isActive
                      ? "bg-white border-2 border-teal text-teal"
                      : "bg-[#F0F4F8] text-slate-muted"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
                <div className="flex-1">
                  <div
                    className={`text-[13px]/4 font-semibold ${
                      isActive || isDone ? "text-navy" : "text-slate-muted"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="mt-0.5 text-slate-muted text-[11px]/4">
                    {step.description}
                  </div>
                </div>
                {isActive && (
                  <div className="flex items-center gap-1 pt-1">
                    <div className="size-1 rounded-full bg-teal animate-bounce [animation-delay:-0.3s]" />
                    <div className="size-1 rounded-full bg-teal animate-bounce [animation-delay:-0.15s]" />
                    <div className="size-1 rounded-full bg-teal animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
