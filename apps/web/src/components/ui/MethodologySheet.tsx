import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMethodology } from "./useMethodology";
import type { AIEngine } from "@/data/mock-risk-insights";

const ENGINE_LABEL: Record<AIEngine, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

const METHOD_LABEL: Record<string, string> = {
  human_review: "Human review",
  llm_judge: "LLM-as-judge",
  automated_scrape: "Automated scrape",
  hybrid: "Hybrid (LLM-judge + human QA)",
};

export function MethodologySheet() {
  const { spec, title, close } = useMethodology();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!spec) return;
    previousFocus.current = document.activeElement as HTMLElement | null;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(panelRef.current, { x: "0%" });
    }

    requestAnimationFrame(() => closeBtnRef.current?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus?.();
    };
  }, [spec, close]);

  if (!spec) return null;

  return (
    <>
      <div
        ref={backdropRef}
        onClick={close}
        className="fixed inset-0 bg-[#0A254066] backdrop-blur-[2px] z-[60]"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Methodology: ${title}`}
        className="fixed top-0 right-0 h-screen w-[420px] max-w-full flex flex-col bg-white shadow-[-12px_0_32px_rgba(15,23,42,0.08)] z-[61]"
      >
        <div className="flex items-center justify-between shrink-0 h-14 px-7 border-b border-[#E2E8F0]">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="uppercase tracking-[0.08em] text-navy font-bold text-[10px]/3.5">
              Methodology
            </span>
            <h2 className="text-navy font-bold text-base/5 m-0 tracking-[-0.2px] truncate">
              {title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center size-9 rounded-lg bg-transparent border-none cursor-pointer hover:bg-[#F8FAFC] transition-colors shrink-0"
            aria-label="Close methodology"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3L11 11M11 3L3 11"
                stroke="#475569"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="grow overflow-y-auto p-7 flex flex-col gap-6">
          <p className="m-0 text-[14px]/[1.6] text-[#475569]">
            {spec.shortBlurb}
          </p>

          <Row label="Denominator">{spec.denominator}</Row>
          <Row label="Prompt universe">{spec.promptUniverse}</Row>
          <Row label="Sampling window">{spec.samplingWindow}</Row>
          <Row label="Sample size">{spec.sampleSize.toLocaleString()}</Row>

          {spec.confidenceInterval && (
            <Row label={`Confidence interval (${spec.confidenceInterval.level}%)`}>
              {spec.confidenceInterval.lowPct}% to {spec.confidenceInterval.highPct}%
            </Row>
          )}

          <Row label="Detection method">
            {METHOD_LABEL[spec.detectionMethod] ?? spec.detectionMethod}
          </Row>

          <div className="flex flex-col gap-2">
            <SectionLabel>Engines included</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {spec.engines.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 text-[11px]/4 text-[#475569] font-semibold"
                >
                  {ENGINE_LABEL[e]}
                </span>
              ))}
            </div>
          </div>

          {spec.sources && spec.sources.length > 0 && (
            <div className="flex flex-col gap-2">
              <SectionLabel>Sources</SectionLabel>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {spec.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-0.5 rounded-lg border border-[#E2E8F0] bg-white p-3 no-underline hover:border-[#64748B] transition-colors"
                    >
                      <span className="text-navy font-semibold text-[13px]/4">
                        {s.label}
                      </span>
                      <span className="text-[11px]/4 text-[#64748B]">
                        {s.publisher} · {s.year}
                        {s.accessedAt && ` · Accessed ${s.accessedAt}`}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <SectionLabel>{label}</SectionLabel>
      <span className="text-navy text-[13px]/[1.6]">{children}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppercase tracking-[0.08em] text-navy font-bold text-[10px]/3.5">
      {children}
    </span>
  );
}
