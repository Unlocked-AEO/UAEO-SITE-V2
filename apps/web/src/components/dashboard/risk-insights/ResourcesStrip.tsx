import { resourceCards } from "@/data/mock-risk-insights";

export function ResourcesStrip() {
  return (
    <section id="resources" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex flex-col gap-1.5">
        <h2 className="tracking-[-0.3px] text-navy font-bold text-2xl/[30px] m-0">Resources</h2>
        <span className="text-[14px]/[160%] text-[#475569]">
          Briefings and playbooks tied to the risks above
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {resourceCards.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(10,37,64,0.06),0_1px_4px_rgba(10,37,64,0.04)] p-8 min-h-[220px]"
          >
            <h3 className="text-navy font-bold text-base/5 m-0">{r.title}</h3>
            <p className="grow text-[14px]/[160%] text-[#475569] m-0">{r.summary}</p>
            <button
              type="button"
              onClick={() => console.log("ACTION: open_resource", { id: r.id })}
              className="self-start inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 text-[13px]/4 font-semibold text-teal hover:underline"
            >
              {r.ctaLabel}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M2 5.5h7m0 0L6 2.5m3 3L6 8.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
