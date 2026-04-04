import {
  comparisonSection,
  comparisonPlanNames,
  comparisonRows,
} from "@/data/mock-pricing";
import type { CellValue } from "@/data/mock-pricing";

function CellContent({
  value,
  isProColumn,
}: {
  value: CellValue;
  isProColumn: boolean;
}) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <span className="text-center text-teal font-bold text-[15px]/[18px]">
          ✓
        </span>
      );
    }
    return (
      <span className="text-center text-[#CBD5E1] text-[15px]/[18px]">—</span>
    );
  }
  return (
    <span
      className={`text-center text-[15px]/[18px] ${isProColumn ? "text-[#475569]" : "text-[#475569]"}`}
    >
      {value}
    </span>
  );
}

export function PricingComparison() {
  return (
    <section className="py-20 px-10 lg:px-[120px] bg-white">
      {/* Section header */}
      <div className="flex flex-col items-center mb-12 gap-3">
        <div className="inline-block rounded-[20px] py-1.5 px-3.5 bg-teal/6">
          <span className="tracking-[0.08em] uppercase text-teal font-bold text-[13px]/4">
            {comparisonSection.badge}
          </span>
        </div>
        <h2 className="text-center text-navy font-bold text-4xl/[44px]">
          {comparisonSection.headline}
        </h2>
      </div>

      {/* Comparison table */}
      <div className="flex flex-col rounded-2xl overflow-clip border-[1.5px] border-[#E2E8F0]">
        {/* Header row */}
        <div className="flex bg-surface border-b-[1.5px] border-[#E2E8F0]">
          <div className="grow-[2] shrink basis-0 uppercase tracking-[0.06em] text-[#64748B] font-bold py-5 px-6 text-sm/[18px]">
            Feature
          </div>
          {comparisonPlanNames.map((name, i) => {
            const isPro = name === "Pro";
            return (
              <div
                key={name}
                className={`grow shrink basis-0 py-5 px-6 border-l ${
                  isPro
                    ? "bg-navy border-[#1E3A5F]"
                    : "border-[#E2E8F0]"
                }`}
              >
                <span
                  className={`block text-center font-bold text-[15px]/[18px] ${isPro ? "text-white" : "text-navy"}`}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Data rows */}
        {comparisonRows.map((row, rowIdx) => {
          const isLast = rowIdx === comparisonRows.length - 1;
          return (
            <div
              key={row.feature}
              className={`flex ${row.striped ? "bg-[#FAFBFC]" : ""} ${!isLast ? "border-b border-[#E2E8F0]" : ""}`}
            >
              <div className="grow-[2] shrink basis-0 text-navy font-medium py-[18px] px-6 text-[15px]/[18px]">
                {row.feature}
              </div>
              {row.values.map((value, colIdx) => {
                const isPro = colIdx === 1;
                return (
                  <div
                    key={colIdx}
                    className={`grow shrink basis-0 py-[18px] px-6 border-l border-[#E2E8F0] ${
                      isPro
                        ? row.striped
                          ? "bg-[#F4F8FF]"
                          : "bg-[#F8FBFF]"
                        : ""
                    }`}
                  >
                    <CellContent value={value} isProColumn={isPro} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
