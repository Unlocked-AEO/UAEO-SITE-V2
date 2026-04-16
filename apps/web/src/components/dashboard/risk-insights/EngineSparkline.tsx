import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { AIEngine } from "@/data/mock-risk-insights";

const ENGINE_COLOR: Record<AIEngine, string> = {
  chatgpt: "#10A37F",
  perplexity: "#635BFF",
  claude: "#D97757",
  gemini: "#4285F4",
  grok: "#0A2540",
};

const ENGINE_LABEL: Record<AIEngine, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

interface EngineSparklineProps {
  engine: AIEngine;
  points: Array<{ quarter: string; share: number }>;
  currentValue: number;
  delta: number;
}

export function EngineSparkline({
  engine,
  points,
  currentValue,
  delta,
}: EngineSparklineProps) {
  const color = ENGINE_COLOR[engine];
  const deltaClass = delta >= 0 ? "text-success" : "text-danger";
  const deltaSign = delta >= 0 ? "+" : "";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-navy font-semibold text-[13px]/4">
            {ENGINE_LABEL[engine]}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-navy font-bold text-base/5 tracking-[-0.2px]">
            {currentValue}%
          </span>
          <span className={`${deltaClass} text-[11px]/4 font-semibold`}>
            {deltaSign}
            {delta}
          </span>
        </div>
      </div>
      <div className="h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="quarter"
              tick={{ fontSize: 9, fill: "#8792A2" }}
              axisLine={{ stroke: "#E6EBF1" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#8792A2" }}
              axisLine={false}
              tickLine={false}
              width={24}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E6EBF1",
                fontSize: 11,
              }}
              formatter={(v) => [`${v}%`, "Share"]}
            />
            <Line
              type="monotone"
              dataKey="share"
              stroke={color}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
