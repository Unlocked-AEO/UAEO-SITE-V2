import { sections } from "@/data/mock-brand-guidelines";
import { LogoIcon } from "./BrandGuidelinesHero";
import { BrandSectionHeader } from "./BrandGuidelinesSectionHeader";

export function BrandGuidelinesLogo() {
  const s = sections.logo;

  return (
    <section className="flex flex-col pt-20 pb-16 gap-10 min-h-[500px] bg-white px-6 md:px-12 lg:px-30">
      <BrandSectionHeader number={s.number} label={s.label} title={s.title} description={s.description} />

      {/* Logo variants */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Primary - Light */}
        <div className="flex-1 flex flex-col items-start rounded-2xl py-12 px-10 gap-6 bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg shrink-0 size-9"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4ECDC4 0%, #3DBDB5 100%)",
              }}
            >
              <LogoIcon size={20} />
            </div>
            <span className="tracking-[-0.3px] text-navy font-sans font-bold text-lg/[22px]">
              Unlocked AEO
            </span>
          </div>
          <span className="tracking-[0.06em] uppercase text-[#64748B] font-sans font-semibold text-xs/4">
            Primary — Light Background
          </span>
        </div>

        {/* Reversed - Dark */}
        <div className="flex-1 flex flex-col items-start rounded-2xl py-12 px-10 gap-6 bg-navy">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg shrink-0 size-9"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4ECDC4 0%, #3DBDB5 100%)",
              }}
            >
              <LogoIcon size={20} />
            </div>
            <span className="tracking-[-0.3px] text-white font-sans font-bold text-lg/[22px]">
              Unlocked AEO
            </span>
          </div>
          <span className="tracking-[0.06em] uppercase text-white/40 font-sans font-semibold text-xs/4">
            Reversed — Dark Background
          </span>
        </div>

        {/* Icon Mark Only */}
        <div className="flex-1 flex flex-col items-start rounded-2xl py-12 px-10 gap-6 bg-[#F0FDFA] border border-[#CCFAF7]">
          <div
            className="flex items-center justify-center rounded-[14px] shrink-0 size-14"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #4ECDC4 0%, #3DBDB5 100%)",
            }}
          >
            <LogoIcon size={28} />
          </div>
          <span className="tracking-[0.06em] uppercase text-[#64748B] font-sans font-semibold text-xs/4">
            Icon Mark Only
          </span>
        </div>
      </div>

      {/* Clearspace warning */}
      <div className="flex items-center rounded-xl py-5 px-6 gap-3 bg-[#FFF9F0] border-[1.5px] border-[#FDE68A]">
        <span className="text-lg/[22px] shrink-0">⚠️</span>
        <span className="text-sm leading-[1.5] text-[#92400E] font-sans">
          Clearspace rule: Always maintain a minimum clearspace equal to the height of the "U" in
          Unlocked around all sides of the logo. Never place other elements inside this zone.
        </span>
      </div>
    </section>
  );
}
