import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { scoreAverages, trendLines, trendData } from "@/data/mock-dashboard";
import type { ScoreAverage } from "@/data/mock-dashboard";
import { useCountUp } from "@/hooks/useCountUp";

// ─── Score Gauge ───────────────────────────────────────────

function ScoreGauge({ item, index }: { item: ScoreAverage; index: number }) {
  const ringRef = useRef<SVGCircleElement>(null);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const animatedScore = useCountUp(item.score, 1200);
  const filled = (animatedScore / 100) * circumference;

  const strokeColor =
    item.color === "green" ? "#27AE60" : item.color === "warning" ? "#FF9F43" : "#E74C3C";
  const isPositive = item.change >= 0;

  useEffect(() => {
    if (!ringRef.current) return;
    gsap.fromTo(
      ringRef.current,
      { strokeDasharray: `0 ${circumference}` },
      {
        strokeDasharray: `${(item.score / 100) * circumference} ${circumference - (item.score / 100) * circumference}`,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3 + index * 0.1,
      }
    );
  }, []);

  return (
    <button
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer bg-transparent border-none hover:bg-surface transition-colors duration-150 w-full text-left group"
      onClick={() => console.log("ACTION: view_score_detail", { label: item.label })}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#F0F4F8" strokeWidth="6" />
        <circle
          ref={ringRef}
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
        <text x="32" y="32" textAnchor="middle" dominantBaseline="central" fontFamily="Manrope" fontSize="14" fontWeight="800" fill="#0A2540">
          {animatedScore}
        </text>
      </svg>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-navy text-[12px]/4 font-medium group-hover:text-teal transition-colors duration-150 truncate">
          {item.label}
        </span>
        <div className="flex items-center gap-1">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
            {isPositive ? (
              <path d="M4 0.5L7 4.5H1L4 0.5Z" fill="#27AE60" />
            ) : (
              <path d="M4 7.5L1 3.5H7L4 7.5Z" fill="#E74C3C" />
            )}
          </svg>
          <span className={`text-[10px]/3 font-semibold ${isPositive ? "text-success" : "text-danger"}`}>
            {isPositive ? "+" : ""}{item.change}
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── Combined Score Overview ───────────────────────────────

export function ScoreOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLines, setActiveLines] = useState<Record<string, boolean>>(
    Object.fromEntries(trendLines.map((l) => [l.dataKey, l.active]))
  );

  const toggleLine = (dataKey: string) => {
    setActiveLines((prev) => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex rounded-xl overflow-clip bg-white border border-border-light shadow-sm"
    >
      {/* Left: Score gauges */}
      <div className="w-[280px] shrink-0 flex flex-col py-5 px-4 border-r border-border-light">
        <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5 px-3 mb-2">
          Score Averages
        </span>
        <div className="flex flex-col gap-0.5">
          {scoreAverages.map((item, i) => (
            <ScoreGauge key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Right: Trend chart */}
      <div className="grow flex flex-col py-5 px-6 gap-3 min-w-0">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5">
            Score Trends
          </span>
          <div className="flex flex-wrap gap-1.5">
            {trendLines.map((line) => {
              const isActive = activeLines[line.dataKey];
              return (
                <button
                  key={line.label}
                  className="rounded-full py-1 px-2.5 border-none cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? line.color : "#F0F4F8",
                    color: isActive ? "#FFFFFF" : "#8792A2",
                  }}
                  onClick={() => toggleLine(line.dataKey)}
                >
                  <span className="text-[10px]/3 font-medium">{line.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grow min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="0" stroke="#F0F4F8" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "Manrope" }}
                dy={8}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#CBD5E1", fontFamily: "Manrope" }}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A2540",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 12,
                  fontFamily: "Manrope",
                  boxShadow: "0 8px 24px rgba(10,37,64,0.2)",
                }}
                itemStyle={{ color: "#FFFFFF", padding: "2px 0" }}
                labelStyle={{ color: "#94A3B8", fontSize: 11, marginBottom: 4 }}
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
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        r: 4,
                        fill: line.color,
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                      }}
                      animationDuration={1200}
                      animationEasing="ease-out"
                    />
                  )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
