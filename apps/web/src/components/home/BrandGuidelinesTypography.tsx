import { sections, typographyRows } from "@/data/mock-brand-guidelines";
import { BrandSectionHeader } from "./BrandGuidelinesSectionHeader";

function getPreviewClasses(style: string): string {
  switch (style) {
    case "Display":
      return "text-[42px] tracking-[-2px] leading-[1.05] font-sans font-extrabold text-navy";
    case "Heading 1":
      return "tracking-[-1.5px] font-sans font-bold text-[32px]/10 text-navy";
    case "Heading 2":
      return "tracking-[-0.8px] font-sans font-bold text-2xl/[30px] text-navy";
    case "Body":
      return "text-base leading-[1.6] font-sans text-[#475569]";
    case "Label / UI":
      return "font-sans font-medium text-sm/[18px] text-navy";
    case "Caption / Overline":
      return "tracking-[0.12em] uppercase font-sans font-bold text-[11px]/[14px] text-teal";
    default:
      return "font-sans text-navy";
  }
}

export function BrandGuidelinesTypography() {
  const s = sections.typography;

  return (
    <section className="flex flex-col pt-20 pb-16 gap-12 min-h-[800px] bg-white px-6 md:px-12 lg:px-30">
      <BrandSectionHeader
        number={s.number}
        label={s.label}
        title={s.title}
        description={s.description}
      />

      {/* Manrope specimen */}
      <div className="flex flex-col rounded-[20px] py-12 px-8 md:px-14 gap-2 bg-[#F8FAFC] border border-[#E2E8F0]">
        <span className="tracking-widest uppercase mb-4 text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
          Manrope — Primary Typeface
        </span>
        <div className="text-[48px] md:text-[72px] tracking-[-3px] leading-none text-navy font-sans font-extrabold">
          Aa Bb Cc
        </div>
        <div className="tracking-[-0.5px] mt-3 text-[#64748B] font-sans text-xl md:text-[28px]/[34px]">
          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
        </div>
        <div className="tracking-[-0.5px] text-[#94A3B8] font-sans text-xl md:text-[28px]/[34px]">
          a b c d e f g h i j k l m n o p q r s t u v w x y z
        </div>
        <div className="text-[#94A3B8] font-sans text-xl md:text-[28px]/[34px]">
          0 1 2 3 4 5 6 7 8 9 ! @ # $ % & * ( ) . , ?
        </div>
      </div>

      {/* Type scale table */}
      <div className="flex flex-col rounded-2xl overflow-clip border border-[#E2E8F0]">
        {/* Header */}
        <div className="hidden lg:flex py-3 px-6 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="flex-[1.2] uppercase tracking-[0.08em] text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
            Style
          </div>
          <div className="flex-[2] uppercase tracking-[0.08em] text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
            Preview
          </div>
          <div className="flex-1 uppercase tracking-[0.08em] text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
            Size
          </div>
          <div className="flex-1 uppercase tracking-[0.08em] text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
            Weight
          </div>
          <div className="flex-1 uppercase tracking-[0.08em] text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
            Line Height
          </div>
          <div className="flex-[1.5] uppercase tracking-[0.08em] text-[#94A3B8] font-sans font-bold text-[11px]/[14px]">
            Usage
          </div>
        </div>

        {/* Rows */}
        {typographyRows.map((row, i) => (
          <div
            key={row.style}
            className={`flex flex-col lg:flex-row lg:items-center py-5 px-6 border-b border-[#E2E8F0] last:border-b-0 ${
              i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
            }`}
          >
            <div className="lg:flex-[1.2] text-navy font-sans font-semibold text-[13px]/4 mb-2 lg:mb-0">
              {row.style}
            </div>
            <div className={`lg:flex-[2] mb-3 lg:mb-0 ${getPreviewClasses(row.style)}`}>
              {row.preview}
            </div>
            <div className="lg:flex-1 text-[#64748B] font-sans text-[13px]/4">
              {row.size}
            </div>
            <div className="lg:flex-1 text-[#64748B] font-sans text-[13px]/4">
              {row.weight}
            </div>
            <div className="lg:flex-1 text-[#64748B] font-sans text-[13px]/4">
              {row.lineHeight}
            </div>
            <div className="lg:flex-[1.5] text-[#64748B] font-sans text-[13px]/4">
              {row.usage}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
