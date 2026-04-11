import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { trendLines, trendData } from "@/data/mock-dashboard";

export function ScoreTrends() {
  const [activeLines, setActiveLines] = useState<Record<string, boolean>>(
    Object.fromEntries(trendLines.map((l) => [l.dataKey, l.active]))
  );

  const toggleLine = (dataKey: string) => {
    setActiveLines((prev) => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  return (
    <div className="grow-[2.2] shrink basis-0 flex flex-col rounded-xl py-5 px-6 gap-3.5 h-[428px] bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-navy text-[13px]/4">Score Trends</span>
        <div className="flex flex-wrap gap-1.5">
          {trendLines.map((line) => (
            <button
              key={line.label}
              className="rounded-[20px] py-1 px-2.5 border-none cursor-pointer transition-colors"
              style={{
                backgroundColor: activeLines[line.dataKey]
                  ? line.color
                  : "#E6EBF1",
                color: activeLines[line.dataKey] ? "#FFFFFF" : "#8792A2",
              }}
              onClick={() => toggleLine(line.dataKey)}
            >
              <span className="text-[10px]/3">{line.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grow shrink basis-0 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
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
              tick={{ fontSize: 10, fill: "#8792A2", fontFamily: "Manrope" }}
              dy={10}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#C0C8D4", fontFamily: "Manrope" }}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A2540",
                border: "none",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 12,
                fontFamily: "Manrope",
              }}
              itemStyle={{ color: "#FFFFFF", padding: "2px 0" }}
              labelStyle={{
                color: "#8792A2",
                fontSize: 11,
                marginBottom: 4,
              }}
              cursor={{ stroke: "#E6EBF1", strokeWidth: 1 }}
            />
            {trendLines.map(
              (line) =>
                activeLines[line.dataKey] && (
                  <Line
                    key={line.dataKey}
                    type="monotone"
                    dataKey={line.dataKey}
                    name={line.label}
                    stroke={line.color}
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{
                      r: 4,
                      fill: line.color,
                      stroke: "#FFFFFF",
                      strokeWidth: 2,
                    }}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
