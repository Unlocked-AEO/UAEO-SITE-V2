import { trendLines, trendMonths } from "@/data/mock-dashboard";

export function ScoreTrends() {
  return (
    <div className="grow-[2.2] shrink basis-0 flex flex-col rounded-xl py-5 px-6 gap-3.5 h-[428px] bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-navy text-[13px]/4">Score Trends</span>
        <div className="flex flex-wrap gap-1.5">
          {trendLines.map((line) => (
            <button
              key={line.label}
              className="rounded-[20px] py-1 px-2.5 border-none cursor-pointer"
              style={{
                backgroundColor: line.active ? line.color : "#E6EBF1",
                color: line.active ? "#FFFFFF" : "#8792A2",
              }}
              onClick={() =>
                console.log("ACTION: toggle_trend_line", {
                  line: line.label,
                })
              }
            >
              <span className="text-[10px]/3">{line.label}</span>
            </button>
          ))}
        </div>
      </div>
      <svg
        width="100%"
        height="360"
        viewBox="0 0 800 340"
        preserveAspectRatio="none"
        className="shrink-0"
      >
        {/* Grid lines */}
        {[20, 85, 150, 215, 280].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#F0F4F8" />
        ))}
        {/* Y-axis labels */}
        <text x="810" y="24" fontFamily="Inter" fontSize="9" fill="#C0C8D4">100</text>
        <text x="810" y="89" fontFamily="Inter" fontSize="9" fill="#C0C8D4">75</text>
        <text x="810" y="154" fontFamily="Inter" fontSize="9" fill="#C0C8D4">50</text>
        <text x="810" y="219" fontFamily="Inter" fontSize="9" fill="#C0C8D4">25</text>
        {/* AI Visibility line (orange) */}
        <path
          d="M 0,114 C 40,116 53,115 133,119 C 213,123 186,123 266,127 C 346,131 320,131 400,132 C 480,133 453,124 533,129 C 613,134 586,131 666,137 C 746,143 760,139 800,140"
          fill="none"
          stroke="#FF9F43"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brand Accuracy line (green) */}
        <path
          d="M 0,80 C 40,78 53,77 133,75 C 213,73 186,74 266,72 C 346,70 320,70 400,69 C 480,68 453,70 533,69 C 613,68 586,68 666,67 C 746,66 760,67 800,67"
          fill="none"
          stroke="#27AE60"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sentiment line (teal) */}
        <path
          d="M 0,93 C 40,95 53,100 133,98 C 213,97 186,91 266,88 C 346,85 320,85 400,88 C 480,91 453,96 533,98 C 613,100 586,97 666,95 C 746,93 760,92 800,90"
          fill="none"
          stroke="#4ECDC4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* X-axis labels */}
        {trendMonths.map((month, i) => {
          const x = i === 0 ? 0 : i === trendMonths.length - 1 ? 800 : (800 / (trendMonths.length - 1)) * i;
          const anchor = i === 0 ? "start" : i === trendMonths.length - 1 ? "end" : "middle";
          return (
            <text
              key={month}
              x={x}
              y="300"
              fontFamily="Inter"
              fontSize="10"
              fill="#8792A2"
              textAnchor={anchor}
            >
              {month}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
