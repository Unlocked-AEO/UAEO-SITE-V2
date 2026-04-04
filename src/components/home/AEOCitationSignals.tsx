import { citationSignalsSection, citationSignals } from "@/data/mock-what-is-aeo";
import type { CitationSignal } from "@/data/mock-what-is-aeo";

function SignalIcon({ icon }: { icon: CitationSignal["icon"] }) {
  switch (icon) {
    case "star":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
          <path
            d="M11 3l1.5 4.5H17l-3.75 2.75L14.75 15 11 12.25 7.25 15l1.5-4.75L5 7.5h4.5L11 3Z"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "structure":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
          <rect x="4" y="4" width="14" height="14" rx="3" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M7 8h8M7 11h5M7 14h6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "entity":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
          <circle cx="11" cy="11" r="4" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M11 4v2M11 16v2M4 11h2M16 11h2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "depth":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
          <path d="M4 16V8l7-4 7 4v8l-7 4-7-4Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M11 4v12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export function AEOCitationSignals() {
  return (
    <section className="py-20 px-10 lg:px-[120px] bg-surface">
      {/* Section header */}
      <div className="flex flex-col items-center mb-13">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-[5px] px-3.5 bg-teal/6 border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-center text-teal text-[11px]/3.5">
            {citationSignalsSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-center text-navy font-bold">
          {citationSignalsSection.headline}
        </h2>
      </div>

      {/* Signal cards */}
      <div className="flex gap-6">
        {citationSignals.map((signal) => (
          <div
            key={signal.title}
            className="grow shrink basis-0 rounded-2xl bg-white border border-border-light p-7"
          >
            <div
              className="flex items-center justify-center mb-4 rounded-xl size-11"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)",
              }}
            >
              <SignalIcon icon={signal.icon} />
            </div>
            <h3 className="mb-2 text-navy text-base/5">{signal.title}</h3>
            <p className="text-[13px] leading-[1.6] text-[#64748B]">
              {signal.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
