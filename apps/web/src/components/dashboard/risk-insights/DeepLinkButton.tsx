import { useNavigate } from "react-router-dom";
import type { DeepLinkTarget } from "@/data/mock-risk-insights";

interface DeepLinkButtonProps {
  target: DeepLinkTarget;
  riskId: string;
  /** "pill" = compact inline pill for row meta. "cta" = full button for expand-panel. */
  variant: "pill" | "cta";
}

/**
 * Contextual deep-link into the analyst module that owns a risk's remediation.
 * Part of the hub-and-spoke model where Risk Insights is the executive hub and
 * Competitors / Content Optimisation / Scans are the analyst modules.
 *
 * Routes that target unbuilt modules (Competitors) still fire navigate and
 * log the intended query params. Integration dev wires filter state when
 * those modules exist.
 */
export function DeepLinkButton({ target, riskId, variant }: DeepLinkButtonProps) {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("ACTION: deep_link_risk", {
      riskId,
      module: target.module,
      route: target.route,
    });
    navigate(target.route);
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1 rounded-full bg-transparent border-none cursor-pointer p-0 text-[11px]/4 text-teal font-semibold hover:underline"
        title={target.reason}
        aria-label={`Open in ${target.label}`}
      >
        <span aria-hidden="true">↗</span>
        {target.label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg py-3 px-5 bg-navy border-none cursor-pointer hover:opacity-90 transition-opacity text-[13px]/4 text-white font-semibold"
      title={target.reason}
    >
      <span>Open this risk in {target.label}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h7m0 0L6 3m3 3L6 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
