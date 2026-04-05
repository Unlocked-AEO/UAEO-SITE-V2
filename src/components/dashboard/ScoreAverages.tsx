import { scoreAverages } from "@/data/mock-dashboard";
import type { ScoreAverage } from "@/data/mock-dashboard";
import { useCountUp } from "@/hooks/useCountUp";

function ScoreGauge({ item }: { item: ScoreAverage }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const animatedScore = useCountUp(item.score, 1400);
  const filled = (animatedScore / 100) * circumference;

  const strokeColor =
    item.color === "green"
      ? "#27AE60"
      : item.color === "warning"
        ? "#FF9F43"
        : "#E74C3C";

  const isPositive = item.change >= 0;

  return (
    <div className="w-[30%] flex flex-col items-center gap-1.5">
      <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0">
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="#F0F4F8"
          strokeWidth="8"
        />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 38 38)"
        />
        <text
          x="38"
          y="38"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Inter"
          fontSize="14"
          fontWeight="800"
          fill="#0A2540"
        >
          {animatedScore}
        </text>
      </svg>
      <div>
        <div className="text-center text-navy text-[11px]/3.5">
          {item.label}
        </div>
        <div className="flex items-center justify-center mt-0.5 gap-0.5 py-0.5 px-[7px]">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="shrink-0">
            {isPositive ? (
              <path d="M4.5 1L8 5.5H1L4.5 1Z" fill="#27AE60" />
            ) : (
              <path d="M4.5 8L1 3.5H8L4.5 8Z" fill="#E74C3C" />
            )}
          </svg>
          <span
            className={`text-center text-[10px]/3 ${isPositive ? "text-success" : "text-danger"}`}
          >
            {isPositive ? "+" : ""}
            {item.change}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ScoreAverages() {
  return (
    <div className="grow-[1.6] shrink basis-0 rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mb-4 text-navy text-[13px]/4">
        Monthly Score Averages
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        {scoreAverages.map((item) => (
          <ScoreGauge key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
