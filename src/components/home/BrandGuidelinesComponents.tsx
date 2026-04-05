import { sections, buttonSpecs } from "@/data/mock-brand-guidelines";
import { BrandSectionHeader } from "./BrandGuidelinesSectionHeader";

export function BrandGuidelinesComponents() {
  const s = sections.components;

  return (
    <section className="flex flex-col pt-20 pb-16 gap-12 min-h-[760px] bg-white px-6 md:px-12 lg:px-30">
      <BrandSectionHeader
        number={s.number}
        label={s.label}
        title={s.title}
        description={s.description}
      />

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[13px]/4">
          Buttons
        </span>
        <div className="flex flex-col rounded-2xl py-10 px-8 md:px-12 gap-8 bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center flex-wrap gap-4">
            <button
              className="rounded-lg py-3.5 px-7 bg-navy text-white font-sans font-semibold text-[15px]/5 cursor-pointer"
              onClick={() => console.log("ACTION: primary_cta")}
            >
              Get started ›
            </button>
            <button
              className="rounded-lg py-3.5 px-7 bg-teal text-navy font-sans font-semibold text-[15px]/5 cursor-pointer"
              onClick={() => console.log("ACTION: teal_cta")}
            >
              Get your free AEO score
            </button>
            <button
              className="rounded-lg py-3 px-7 bg-white border-[1.5px] border-[#E2E8F0] text-navy font-sans font-semibold text-[15px]/5 cursor-pointer"
              onClick={() => console.log("ACTION: outline_cta")}
            >
              Talk to sales
            </button>
            <button
              className="rounded-lg py-3 px-7 bg-navy border-[1.5px] border-white/25 text-white font-sans font-semibold text-[15px]/5 cursor-pointer"
              onClick={() => console.log("ACTION: ghost_cta")}
            >
              Contact us
            </button>
          </div>
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Height", value: buttonSpecs.height },
              { label: "Padding", value: buttonSpecs.padding },
              { label: "Border radius", value: buttonSpecs.borderRadius },
              { label: "Font", value: buttonSpecs.font },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-navy font-sans font-bold text-xs/4">
                  {item.label}
                </span>
                <span className="text-[#64748B] font-sans text-xs/4">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges & Pills */}
      <div className="flex flex-col gap-4">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[13px]/4">
          Badges & Pills
        </span>
        <div className="flex items-center flex-wrap rounded-2xl py-10 px-8 md:px-12 gap-3 bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="rounded-full py-1.5 px-3.5 bg-[#F0FDFA] border-[1.5px] border-teal text-teal font-sans font-semibold text-xs">
            Getting Started
          </span>
          <span className="rounded-full py-1.5 px-3 bg-[#F0FDFA] text-teal font-sans font-semibold text-xs">
            Pricing
          </span>
          <span className="rounded-full py-1.5 px-3.5 bg-navy text-white font-sans font-semibold text-xs">
            Most Popular
          </span>
          <span className="rounded-full py-1.5 px-3 bg-[#FEF3C7] text-[#92400E] font-sans font-semibold text-xs">
            Save 20%
          </span>
          <span className="rounded-full py-1.5 px-3 bg-[#F0FDF4] text-[#166534] font-sans font-semibold text-xs">
            Active
          </span>
          <span className="rounded-full py-1.5 px-3 bg-[#FFF1F2] text-[#9F1239] font-sans font-semibold text-xs">
            Error
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[13px]/4">
          Cards
        </span>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Default card */}
          <div className="flex-1 flex flex-col rounded-2xl gap-3 bg-white border border-[#E2E8F0] p-7">
            <div className="flex items-center justify-center rounded-[10px] bg-[#F0FDFA] shrink-0 size-10">
              <span className="text-xl">📊</span>
            </div>
            <span className="text-navy font-sans font-bold text-base/5">
              AEO Score
            </span>
            <span className="text-sm leading-[1.6] text-[#64748B] font-sans">
              See exactly how AI engines perceive and describe your brand across 7 platforms.
            </span>
            <span className="text-teal font-sans font-semibold text-[13px]/4">
              Default card — radius 16px · border #E2E8F0 · pad 28px
            </span>
          </div>

          {/* Elevated card */}
          <div className="flex-1 flex flex-col rounded-2xl gap-3 bg-white shadow-[0_4px_24px_rgba(10,37,64,0.08),0_1px_4px_rgba(10,37,64,0.04)] p-7">
            <div className="flex items-center justify-center rounded-[10px] bg-[#F0FDFA] shrink-0 size-10">
              <span className="text-xl">🏆</span>
            </div>
            <span className="text-navy font-sans font-bold text-base/5">
              Competitive Intel
            </span>
            <span className="text-sm leading-[1.6] text-[#64748B] font-sans">
              Track competitor visibility scores and see where you win or fall behind in AI answers.
            </span>
            <span className="text-teal font-sans font-semibold text-[13px]/4">
              Elevated card — shadow 0 4px 24px rgba(10,37,64,0.08)
            </span>
          </div>

          {/* Dark card */}
          <div className="flex-1 flex flex-col rounded-2xl gap-3 bg-navy border-[1.5px] border-teal p-7">
            <div className="flex items-center justify-center rounded-[10px] bg-[#4ECDC426] shrink-0 size-10">
              <span className="text-xl">⭐</span>
            </div>
            <span className="text-white font-sans font-bold text-base/5">
              Pro Plan
            </span>
            <span className="text-sm leading-[1.6] text-white/60 font-sans">
              The most popular plan for growth-stage brands serious about AI visibility.
            </span>
            <span className="text-teal font-sans font-semibold text-[13px]/4">
              Dark card — navy bg · teal 1.5px border
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
