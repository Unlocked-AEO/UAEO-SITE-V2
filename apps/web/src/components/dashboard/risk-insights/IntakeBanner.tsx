import { useNavigate } from "react-router-dom";
import { useRiskInsights } from "./useRiskInsights";

/**
 * Surfaces on the Summary card when intake.status !== "complete".
 * The CFO audit (2026-04) frames this as the single action that shifts the page
 * from industry defaults to client-grounded numbers. One click to the form.
 */
export function IntakeBanner() {
  const navigate = useNavigate();
  const { intake } = useRiskInsights();

  if (intake.status === "complete") return null;

  const isDraft = intake.status === "draft";

  return (
    <div
      className="flex items-center justify-between gap-4 rounded-xl border p-4 flex-wrap"
      style={{
        backgroundColor: isDraft ? "#FFF8E1" : "#F0FDFA",
        borderColor: isDraft ? "#FCD34D" : "#5EEAD4",
      }}
    >
      <div className="flex items-start gap-3 min-w-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 mt-0.5"
        >
          <circle
            cx="8"
            cy="8"
            r="6.5"
            stroke={isDraft ? "#B45309" : "#0F766E"}
            strokeWidth="1.3"
          />
          <path
            d="M8 5v3.5M8 10.5v.01"
            stroke={isDraft ? "#B45309" : "#0F766E"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-navy font-bold text-[13px]/[1.5]">
            {isDraft
              ? "Intake has an unsaved draft"
              : "Confirm your pipeline tier"}
          </span>
          <span className="text-[#475569] text-[12px]/[1.5]">
            {isDraft
              ? "Pick up where you left off and mark the intake complete."
              : "Two questions, no exact dollars. AI exposure comes from your latest scan."}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate("/dashboard/risk-insights/intake")}
        className="inline-flex items-center gap-2 rounded-lg py-2.5 px-4 bg-navy border-none cursor-pointer hover:opacity-90 transition-opacity text-[12px]/4 text-white font-semibold shrink-0"
      >
        {isDraft ? "Resume intake" : "Complete intake"}
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
