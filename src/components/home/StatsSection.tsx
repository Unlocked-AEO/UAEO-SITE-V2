import { statsSection } from "@/data/mock-landing";

export function StatsSection() {
  return (
    <section className="flex items-center gap-20 bg-surface p-20">
      {/* Left text */}
      <div className="grow-0 shrink-0 basis-[420px] flex flex-col">
        <span className="tracking-[0.06em] uppercase mb-4 text-teal font-semibold text-[13px]/4">
          {statsSection.label}
        </span>
        <h2 className="text-[38px] leading-[1.15] tracking-[-0.03em] mb-5 text-navy font-bold whitespace-pre-wrap m-0">
          {statsSection.headline}
        </h2>
        <p className="text-[16px] leading-[1.65] mb-8 text-slate-body m-0">
          {statsSection.description}
        </p>
        <button
          className="inline-flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
          onClick={() => console.log("ACTION: read_customer_stories")}
        >
          <span className="text-iris font-semibold text-sm/[18px]">
            {statsSection.cta}
          </span>
          <span className="text-iris font-semibold text-sm/[18px]">›</span>
        </button>
      </div>

      {/* Stats grid */}
      <div className="grow shrink basis-0 flex flex-col gap-8">
        <div className="flex gap-8">
          {statsSection.stats.slice(0, 2).map((stat) => (
            <StatCard key={stat.value} stat={stat} />
          ))}
        </div>
        <div className="flex gap-8">
          {statsSection.stats.slice(2).map((stat) => (
            <StatCard key={stat.value} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
}: {
  stat: { value: string; description: string; color: string };
}) {
  return (
    <div className="grow shrink basis-0 rounded-xl py-7 px-6 bg-white shadow-[0_1px_6px_#0A25400F]">
      <div
        className={`text-[42px] tracking-[-0.03em] leading-none ${stat.color} font-extrabold`}
      >
        {stat.value}
      </div>
      <p className="text-[14px] leading-[1.5] mt-2 text-slate-body m-0">
        {stat.description}
      </p>
    </div>
  );
}
