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
    <div className="grow shrink basis-0 flex flex-col rounded-xl py-5 px-6 overflow-clip gap-3 min-h-[170px] bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="uppercase tracking-[0.06em] text-slate-muted font-sans font-semibold text-[11px]/3.5">
          Score Improvement
        </div>
        <div className="flex items-center gap-4">
          {scoreImprovement.legends.map((legend) => (
            <div key={legend.label} className="flex items-center gap-1.25">
              <div
                className="w-2.5 h-0.5 rounded-[1px] shrink-0"
                style={{ backgroundColor: legend.color }}
              />
              <div className="text-slate-muted font-sans text-[11px]/3.5">
                {legend.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="flex items-center grow shrink basis-0 min-h-0">
        {/* Current score */}
        <div className="shrink-0 flex flex-col items-center justify-center mr-4 min-w-[85px] pr-4 border-r border-border-light">
          <div className="uppercase tracking-[0.08em] mb-1 text-center text-[#94A3B8] font-sans font-bold text-[9px]/3">
            Current Score
          </div>
          <div className="text-[48px] tracking-[-1.5px] leading-none text-center text-navy font-sans font-black">
            {scoreImprovement.currentScore}
          </div>
          <div className="inline-flex items-center mt-1.5 rounded-[20px] py-0.75 px-2 gap-0.75 bg-[#F0FDFA] border border-[#4ECDC459]">
            <div className="text-center text-teal font-sans font-semibold text-[10px]/3 whitespace-nowrap">
              {scoreImprovement.changeLabel}
            </div>
          </div>
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
                tick={{ fontSize: 11, fill: "#8792A2" }}
                dy={4}
              />
              <YAxis
                domain={[40, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#8792A2" }}
                ticks={[40, 60, 80, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #E6EBF1",
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: "Inter, system-ui, sans-serif",
                  boxShadow: "0 2px 8px rgba(10,37,64,0.08)",
                }}
                itemStyle={{ padding: "2px 0" }}
              />
              <Line
                type="monotone"
                dataKey="aeo"
                name="AEO Score"
                stroke="#4ECDC4"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="citations"
                name="Citations"
                stroke="#27AE60"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="structure"
                name="Structure"
                stroke="#FF9F43"
                strokeWidth={2.5}
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
