import { expectItems } from "@/data/mock-schedule-call";
import type { ExpectItem } from "@/data/mock-schedule-call";

function ExpectIcon({ icon }: { icon: ExpectItem["icon"] }) {
  switch (icon) {
    case "scan":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
          <circle cx="8.5" cy="8.5" r="6" stroke="white" strokeWidth="1.5" />
          <path d="M13 13l4.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
          <path d="M3 17V9M8 17V5M13 17V10M18 17V3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
          <path d="M10 2a6 6 0 014 10.5V15a1 1 0 01-1 1H7a1 1 0 01-1-1v-2.5A6 6 0 0110 2z" stroke="white" strokeWidth="1.5" />
          <path d="M8 18h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "clock":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: '0' }}>
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.5" />
          <path d="M10 5v5l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ScheduleExpect() {
  return (
    <section className="py-16 px-10 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center mb-4 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-solid border-[#4ECDC459]">
            <div className="uppercase tracking-[0.8px] text-[#4ECDC4] font-sans text-[11px]/3.5">
              What to Expect
            </div>
          </div>
          <h2 className="text-[38px] tracking-[-1px] leading-[115%] text-center text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold">
            30 minutes. Zero fluff.
          </h2>
        </div>

        <div className="flex gap-6">
          {expectItems.map((item) => (
            <div key={item.title} className="grow shrink basis-[0%] rounded-2xl bg-[#F8FAFC] border border-solid border-[#E6EBF1] p-7">
              <div
                className="flex items-center justify-center mb-4 rounded-xl size-10"
                style={{ backgroundImage: 'linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)' }}
              >
                <ExpectIcon icon={item.icon} />
              </div>
              <div className="mb-2 text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[15px]/5">
                {item.title}
              </div>
              <div className="text-[13px] leading-[160%] text-[#64748B] font-sans">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
