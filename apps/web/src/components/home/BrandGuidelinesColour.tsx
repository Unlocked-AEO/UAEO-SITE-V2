import {
  sections,
  primaryColors,
  secondaryColors,
} from "@/data/mock-brand-guidelines";
import { BrandSectionHeader } from "./BrandGuidelinesSectionHeader";

export function BrandGuidelinesColour() {
  const s = sections.colour;

  return (
    <section className="flex flex-col pt-20 pb-16 gap-10 min-h-[680px] bg-[#F8FAFC] px-6 md:px-12 lg:px-30">
      <BrandSectionHeader
        number={s.number}
        label={s.label}
        title={s.title}
        description={s.description}
      />

      {/* Primary colours */}
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[13px]/4">
          Primary
        </span>
        <div className="flex flex-col md:flex-row gap-3">
          {primaryColors.map((color) => (
            <div
              key={color.hex}
              className="flex-1 rounded-2xl overflow-clip border border-[#E2E8F0]"
            >
              <div
                className="h-35"
                style={{ backgroundColor: color.hex }}
              >
                {color.hex === "#FFFFFF" && (
                  <div className="h-full border-b border-[#E2E8F0]" />
                )}
              </div>
              <div className="flex flex-col py-4 px-5 gap-1 bg-white">
                <span className="text-navy font-sans font-bold text-[15px]/[18px]">
                  {color.name}
                </span>
                <span className="text-[#64748B] font-sans text-[13px]/4">
                  {color.description}
                </span>
                <div className="flex mt-2 gap-4">
                  <span className="text-navy font-sans font-semibold text-xs/4">
                    {color.hex}
                  </span>
                  <span className="text-[#94A3B8] font-sans text-xs/4">
                    {color.rgb}
                  </span>
                  <span className="text-[#94A3B8] font-sans text-xs/4">
                    {color.hsl}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary & Utility colours */}
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.08em] text-navy font-sans font-bold text-[13px]/4">
          Secondary & Utility
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {secondaryColors.map((color) => (
            <div
              key={color.hex}
              className="rounded-2xl overflow-clip border border-[#E2E8F0]"
            >
              <div
                className="h-20"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex flex-col py-3.5 px-4.5 gap-0.5 bg-white">
                <span className="text-navy font-sans font-bold text-sm/[18px]">
                  {color.name}
                </span>
                <span className="text-[#64748B] font-sans text-xs/4">
                  {color.description}
                </span>
                <span className="mt-1.5 text-navy font-sans font-semibold text-xs/4">
                  {color.hex}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
