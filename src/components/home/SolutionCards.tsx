import {
  solutionsIntro,
  visibilityScoreCard,
  contentIntelCard,
  engineScores,
} from "@/data/mock-landing";
import { EngineIcon } from "@/components/home/EngineIcon";

export function SolutionCards() {
  return (
    <>
      {/* Section intro */}
      <section className="flex flex-col items-start max-w-[680px] pt-20 pb-12 bg-white px-20">
        <span className="tracking-[0.06em] uppercase mb-4 text-teal font-semibold text-[13px]/4">
          {solutionsIntro.label}
        </span>
        <h2 className="text-[42px] leading-[1.15] tracking-[-0.03em] mb-5 text-navy font-bold whitespace-pre-wrap m-0">
          {solutionsIntro.headline}
        </h2>
        <p className="text-[17px] leading-[1.65] mb-8 text-slate-body m-0">
          {solutionsIntro.description}
        </p>
        <button
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
          onClick={() => console.log("ACTION: explore_solutions")}
        >
          <span className="text-iris font-semibold text-[15px]/[18px]">
            {solutionsIntro.cta}
          </span>
          <span className="text-iris font-semibold text-lg/[22px]">›</span>
        </button>
      </section>

      {/* Two main cards */}
      <section className="flex pb-6 gap-5 bg-white px-20">
        {/* AI Visibility Score */}
        <div className="grow shrink basis-0 flex flex-col min-h-[400px] relative rounded-2xl overflow-clip bg-surface p-10">
          <span className="tracking-[0.08em] uppercase mb-4 text-teal font-semibold text-xs/4">
            {visibilityScoreCard.label}
          </span>
          <h3 className="text-[24px] leading-[1.3] tracking-[-0.02em] mb-3 text-navy font-bold m-0">
            {visibilityScoreCard.headline}
          </h3>
          <p className="text-[14px] leading-[1.6] mb-8 max-w-[340px] text-slate-body m-0">
            {visibilityScoreCard.description}
          </p>

          {/* Score card */}
          <div className="flex flex-col w-full rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0_1px_4px_#0A25400F]">
            <span className="mb-4 tracking-[-0.1px] text-navy font-medium text-[13px]/4">
              {visibilityScoreCard.chartTitle}
            </span>
            {engineScores.map((engine, i) => (
              <ScoreRow
                key={engine.slug}
                engine={engine}
                isLast={i === engineScores.length - 1}
              />
            ))}
          </div>

          {/* Decorative gradient */}
          <div
            className="absolute top-0 right-0 w-[300px] h-[200px] rounded-tr-2xl rounded-bl-[60px]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017 / 15%) 0%, oklab(57.8% 0.034 -0.232 / 10%) 100%)",
            }}
          />
        </div>

        {/* Content Intelligence */}
        <div className="grow shrink basis-0 flex flex-col min-h-[400px] relative rounded-2xl overflow-clip bg-navy p-10">
          <span className="tracking-[0.08em] uppercase mb-4 text-teal font-semibold text-xs/4">
            {contentIntelCard.label}
          </span>
          <h3 className="text-[24px] leading-[1.3] tracking-[-0.02em] mb-3 text-white font-bold m-0">
            {contentIntelCard.headline}
          </h3>
          <p className="text-[14px] leading-[1.6] mb-8 max-w-[340px] text-white/65 m-0">
            {contentIntelCard.description}
          </p>

          <div className="rounded-[10px] py-[18px] px-[18px] bg-white/7 border border-white/10">
            {contentIntelCard.checklist.map((item) => (
              <p
                key={item}
                className="mb-1 text-[12px] leading-[1.7] text-teal m-0"
              >
                ✓ {item}
              </p>
            ))}
            <p className="mb-0 text-[12px] leading-[1.7] text-white/40 m-0">
              → {contentIntelCard.projection}
            </p>
          </div>

          <div
            className="absolute -bottom-10 -right-10 w-[200px] h-[200px] rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 25%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
            }}
          />
        </div>
      </section>
    </>
  );
}

interface ScoreRowProps {
  engine: {
    name: string;
    score: number;
    change: number;
    slug: string;
  };
  isLast: boolean;
}

function ScoreRow({ engine, isLast }: ScoreRowProps) {
  const isPositive = engine.change >= 0;
  const scoreColor =
    engine.score >= 70
      ? "text-success"
      : engine.score >= 50
        ? "text-warning"
        : "text-danger";
  const barColor =
    engine.score >= 70
      ? "bg-success"
      : engine.score >= 50
        ? "bg-warning"
        : "bg-danger";
  const changeColor = isPositive ? "text-success" : "text-danger";

  return (
    <div className={`flex flex-col ${isLast ? "" : "mb-4"} gap-[5px]`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[7px]">
          <EngineIcon slug={engine.slug} variant="badge" />
          <span className="text-slate-body text-xs/4">{engine.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${changeColor} font-semibold text-[10px]/3`}>
            {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
            {engine.change}
          </span>
          <span className={`${scoreColor} font-semibold text-[13px]/4`}>
            {engine.score}
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-[3px] bg-[#F0F4F8] shrink-0">
        <div
          className={`h-full rounded-[3px] ${barColor}`}
          style={{ width: `${engine.score}%` }}
        />
      </div>
    </div>
  );
}
