import { howWeHelpSection, helpCards } from "@/data/mock-what-is-aeo";

export function AEOHowWeHelp() {
  return (
    <section className="py-20 px-10 lg:px-[120px] bg-white">
      {/* Section header */}
      <div className="flex flex-col items-center mb-13">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-[5px] px-3.5 bg-teal/6 border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-center text-teal text-[11px]/3.5">
            {howWeHelpSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-center text-navy font-bold">
          {howWeHelpSection.headline}
        </h2>
      </div>

      {/* Help cards */}
      <div className="flex gap-6">
        {helpCards.map((card) => (
          <div
            key={card.title}
            className="grow shrink basis-0 rounded-2xl bg-surface border border-border-light p-8"
          >
            <h3 className="mb-2.5 text-navy text-[17px]/[22px]">
              {card.title}
            </h3>
            <p className="text-sm leading-[1.6] text-[#64748B]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
