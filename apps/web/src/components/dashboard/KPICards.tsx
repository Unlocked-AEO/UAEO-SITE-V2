import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { kpiCards, carouselCards, shareOfVoice } from "@/data/mock-dashboard";
import type { KPICard as KPICardType } from "@/data/mock-dashboard";
import { useCountUp } from "@/hooks/useCountUp";

// ─── Sparkline ─────────────────────────────────────────────

/**
 * Sparkline — animated mini trend chart.
 *
 * INTEGRATION NOTE: The sparkline data must come from the user's real
 * month-by-month metric history (e.g. last 10 months of "Total Visits").
 * The mock `sparkline` arrays in mock-dashboard.ts are placeholders —
 * replace them with actual historical values so the graph accurately
 * reflects the user's trend. The line color is automatic: teal for
 * uptrends, red for downtrends based on `changeDirection`.
 */
function Sparkline({
  data,
  trend,
  width = 120,
  height = 40,
}: {
  data: number[];
  trend: "up" | "down";
  width?: number;
  height?: number;
}) {
  const lineRef = useRef<SVGPolylineElement>(null);
  const fillRef = useRef<SVGPolygonElement>(null);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (width - pad * 2) + pad;
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const color = trend === "up" ? "#4ECDC4" : "#E74C3C";
  const gradientId = `spark-${trend}-${data[0]}-${data.length}`;

  useEffect(() => {
    const line = lineRef.current;
    const fill = fillRef.current;
    if (!line) return;

    const length = line.getTotalLength?.() || 300;

    // Draw-in animation
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.4,
    });

    // Fill fades in after line draws
    if (fill) {
      gsap.fromTo(
        fill,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out", delay: 1.0 }
      );
    }
  }, [data]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <polygon
        ref={fillRef}
        points={`${pad},${height} ${points} ${width - pad},${height}`}
        fill={`url(#${gradientId})`}
        opacity="0"
      />
      {/* Line */}
      <polyline
        ref={lineRef}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Change Indicator ──────────────────────────────────────

function ChangeIndicator({
  change,
  direction,
}: {
  change: string;
  direction: "up" | "down";
}) {
  const color = direction === "up" ? "text-success" : "text-danger";
  return (
    <div className="flex items-center gap-1">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
        {direction === "up" ? (
          <path d="M6.5 1.5L11 7H2L6.5 1.5Z" fill="#27AE60" />
        ) : (
          <path d="M6.5 11.5L2 6H11L6.5 11.5Z" fill="#E74C3C" />
        )}
      </svg>
      <span className={`${color} text-[13px]/4`}>{change}</span>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────

function StatCard({ card }: { card: KPICardType }) {
  const numericValue = parseInt(card.value.replace(/,/g, ""), 10);
  const animatedValue = useCountUp(numericValue);
  const displayValue = card.value.includes(",")
    ? animatedValue.toLocaleString()
    : String(animatedValue);

  return (
    <div className="grow shrink basis-0 flex flex-col rounded-xl py-5 px-6 bg-white border border-border-light shadow-sm">
      <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5">
        {card.label}
      </span>
      <div className="flex items-end justify-between mt-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[44px] tracking-[-2px] leading-none text-navy font-extrabold">
            {displayValue}
          </span>
          <div className="flex items-center gap-1">
            <ChangeIndicator change={card.change} direction={card.changeDirection} />
            <span className="text-slate-muted text-[11px]/3.5">{card.comparison}</span>
          </div>
        </div>
        <Sparkline data={card.sparkline} trend={card.changeDirection} />
      </div>
    </div>
  );
}

// ─── Share of Voice Card ───────────────────────────────────

function ShareOfVoiceCard() {
  const svgRef = useRef<SVGSVGElement>(null);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const segments = shareOfVoice.map((item) => {
    const dashArray = (item.percent / 100) * circumference;
    const rotation = (cumulativePercent / 100) * 360 - 90;
    cumulativePercent += item.percent;
    return { ...item, dashArray, gapArray: circumference - dashArray, rotation };
  });

  useEffect(() => {
    if (!svgRef.current) return;
    const rings = svgRef.current.querySelectorAll(".donut-seg");
    const ctx = gsap.context(() => {
      rings.forEach((ring, i) => {
        const target = segments[i].dashArray;
        gsap.fromTo(ring,
          { strokeDasharray: `0 ${circumference}` },
          { strokeDasharray: `${target} ${segments[i].gapArray}`, duration: 1.0, ease: "power2.out", delay: 0.3 + i * 0.15 }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="grow-[1.5] shrink basis-0 flex items-center rounded-xl py-5 px-6 gap-6 bg-white border border-border-light shadow-sm">
      <svg ref={svgRef} width="110" height="110" viewBox="0 0 120 120" className="shrink-0">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F0F4F8" strokeWidth="16" />
        {segments.map((seg) => (
          <circle
            key={seg.name}
            className="donut-seg"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="16"
            strokeDasharray={`0 ${circumference}`}
            transform={`rotate(${seg.rotation} 60 60)`}
          />
        ))}
        <text x="60" y="65" textAnchor="middle" fontFamily="Manrope" fontSize="16" fontWeight="800" fill="#0A2540">
          {shareOfVoice[0].percent}%
        </text>
      </svg>
      <div className="grow shrink basis-0 flex flex-col gap-2.5">
        <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5">
          Share of Voice
        </span>
        {shareOfVoice.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="shrink-0 rounded-xs size-2.5" style={{ backgroundColor: item.color }} />
            <span className="grow shrink basis-0 text-[13px]/4" style={{ color: item.name === shareOfVoice[0].name ? "#0A2540" : "#425466" }}>
              {item.name}
            </span>
            <span className="text-slate-body text-[13px]/4">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Carousel (Mentions) Card ──────────────────────────────

function MentionsCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const animatedValues = carouselCards.map((card) => {
    const numericValue = parseInt(card.value.replace(/,/g, ""), 10);
    return useCountUp(numericValue);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselCards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const card = carouselCards[activeIndex];
  const displayValue = animatedValues[activeIndex];

  return (
    <div className="grow-[1.2] shrink basis-0 flex flex-col rounded-xl py-5 px-6 bg-white border border-border-light shadow-sm">
      <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5">
        {card.label}
      </span>
      <div className="flex items-end justify-between mt-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[44px] tracking-[-2px] leading-none text-navy font-extrabold">
            {displayValue}
          </span>
          <div className="flex items-center gap-1">
            <ChangeIndicator change={card.change} direction={card.changeDirection} />
            <span className="text-slate-muted text-[11px]/3.5">{card.comparison}</span>
          </div>
        </div>
        <Sparkline data={card.sparkline} trend={card.changeDirection} />
      </div>
      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {carouselCards.map((_, i) => (
          <button
            key={i}
            className={`rounded-[3px] shrink-0 border-none cursor-pointer p-0 transition-all duration-300 ${
              i === activeIndex
                ? "w-5 h-1.5 bg-teal"
                : "size-1.5 bg-border-light hover:bg-slate-muted"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────

export function KPICards() {
  return (
    <div className="flex gap-4">
      {kpiCards.map((card) => (
        <StatCard key={card.label} card={card} />
      ))}
      <ShareOfVoiceCard />
      <MentionsCard />
    </div>
  );
}
