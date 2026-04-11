import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { scoreImprovement, scoreChartData } from "@/data/mock-improvement-plan";

export function ScoreImprovementChart() {
  return (
    <div className="grow shrink basis-0 flex flex-col rounded-xl py-5 px-6 overflow-clip gap-3 min-h-[170px] bg-white border border-border-light shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5">
          Score Improvement
        </span>
        <div className="flex items-center gap-4">
          {scoreImprovement.legends.map((legend) => (
            <div key={legend.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-0.5 rounded-sm shrink-0"
                style={{ backgroundColor: legend.color }}
              />
              <span className="text-slate-muted text-[11px]/3.5">
                {legend.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="flex items-center grow shrink basis-0 min-h-0">
        {/* Current score */}
        <div className="shrink-0 flex flex-col items-center justify-center mr-5 min-w-[90px] pr-5 border-r border-border-light">
          <span className="uppercase tracking-wider mb-1 text-center text-[#94A3B8] font-semibold text-[9px]/3">
            Current Score
          </span>
          <span className="text-[46px] tracking-[-1.5px] leading-none text-center text-navy font-extrabold">
            {scoreImprovement.currentScore}
          </span>
          <span className="inline-flex items-center mt-2 rounded-full py-1 px-2.5 bg-[#F0FDFA] border border-teal/25">
            <span className="text-center text-teal font-semibold text-[10px]/3 whitespace-nowrap">
              {scoreImprovement.changeLabel}
            </span>
          </span>
        </div>

        {/* Recharts graph */}
        <div className="grow shrink basis-0 min-w-0 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={scoreChartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#F0F4F8"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "Manrope" }}
                dy={4}
              />
              <YAxis
                domain={[40, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: "Manrope" }}
                ticks={[40, 60, 80, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #E6EBF1",
                  borderRadius: 10,
                  fontSize: 12,
                  fontFamily: "Manrope, sans-serif",
                  boxShadow: "0 4px 12px rgba(10,37,64,0.08)",
                  padding: "8px 12px",
                }}
                itemStyle={{ padding: "2px 0" }}
              />
              <Line
                type="monotone"
                dataKey="aeo"
                name="AEO Score"
                stroke="#4ECDC4"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="citations"
                name="Citations"
                stroke="#27AE60"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="structure"
                name="Structure"
                stroke="#FF9F43"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
