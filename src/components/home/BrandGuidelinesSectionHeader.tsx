interface BrandSectionHeaderProps {
  number: string;
  label: string;
  title: string;
  description: string;
}

export function BrandSectionHeader({ number, label, title, description }: BrandSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="tracking-[0.12em] uppercase text-teal font-sans font-bold text-[11px]/[14px]">
        {number} — {label}
      </span>
      <h2 className="tracking-[-1px] text-navy font-sans font-extrabold text-4xl/[44px] m-0">
        {title}
      </h2>
      <p className="text-base max-w-[560px] leading-[1.7] text-[#64748B] font-sans m-0">
        {description}
      </p>
    </div>
  );
}
