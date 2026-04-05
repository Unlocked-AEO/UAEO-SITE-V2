import { sections, spacingSteps, gridSpecs } from "@/data/mock-brand-guidelines";
import { BrandSectionHeader } from "./BrandGuidelinesSectionHeader";

const sizeMap: Record<number, string> = {
  4: "size-1",
  8: "size-2",
  12: "size-3",
  16: "size-4",
  24: "size-6",
  32: "size-8",
  48: "size-12",
  64: "size-16",
  80: "size-20",
};

export function BrandGuidelinesSpacing() {
  const s = sections.spacing;

  return (
    <section className="flex flex-col pt-20 pb-16 gap-10 min-h-[560px] bg-[#F8FAFC] px-6 md:px-12 lg:px-30">
      <BrandSectionHeader
        number={s.number}
        label={s.label}
        title={s.title}
        description={s.description}
      />

      {/* Spacing scale */}
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[13px]/4">
          Spacing Scale
        </span>
        <div className="flex items-end rounded-2xl py-8 px-10 gap-2 bg-white border border-[#E2E8F0] overflow-x-auto">
          {spacingSteps.map((step) => (
            <div key={step.value} className="flex flex-col items-center gap-2">
              {step.value === 120 ? (
                <div className="w-30 h-30 rounded-xs bg-teal shrink-0" />
              ) : (
                <div className={`rounded-xs bg-teal shrink-0 ${sizeMap[step.value] || "size-1"}`} />
              )}
              <span className="text-navy font-sans font-bold text-[11px]/[14px]">
                {step.value}
              </span>
              <span className="text-[#94A3B8] font-sans text-[11px]/[14px]">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid specs */}
      <div className="flex flex-col md:flex-row gap-4">
        {gridSpecs.map((grid) => (
          <div
            key={grid.title}
            className="flex-1 flex flex-col rounded-2xl py-7 px-8 gap-4 bg-white border border-[#E2E8F0]"
          >
            <span className="text-navy font-sans font-bold text-sm/[18px]">
              {grid.title}
            </span>
            <div className="flex flex-col gap-2.5">
              {[
                ["Breakpoint", grid.breakpoint],
                ["Columns", grid.columns],
                ["Gutters", grid.gutters],
                ["Column gap", grid.columnGap],
                ["Max content width", grid.maxContentWidth],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[#64748B] font-sans text-[13px]/4">
                    {label}
                  </span>
                  <span className="text-navy font-sans font-semibold text-[13px]/4">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
