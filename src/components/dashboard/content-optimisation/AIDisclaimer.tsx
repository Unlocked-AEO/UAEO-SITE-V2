interface AIDisclaimerProps {
  variant?: "inline" | "banner";
}

export function AIDisclaimer({ variant = "inline" }: AIDisclaimerProps) {
  if (variant === "banner") {
    return (
      <div className="flex items-start gap-3 rounded-xl px-5 py-3.5 bg-[#FFF8E1] border border-[#F0D97A]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 mt-px text-[#B28500]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div className="flex-1">
          <div className="text-navy font-semibold text-[13px]/4">AI-generated content</div>
          <p className="mt-0.5 text-slate-body text-[12px]/5">
            This draft was produced by the Unlocked AEO Content Engine. Always review for factual accuracy, brand alignment and legal/compliance requirements before publishing. The AEO score reflects structural optimisation, not claim verification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 text-slate-muted text-[11px]/4">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>
        AI-generated — always review for factual accuracy, brand alignment and compliance before publishing.
      </span>
    </div>
  );
}
