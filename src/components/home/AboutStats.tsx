import { aboutStats } from "@/data/mock-about";
import { useInView } from "@/hooks/useInView";
import { useScrollCountUp } from "@/hooks/useScrollCountUp";

function AnimatedStatValue({ value, color }: { value: string; color: string }) {
  // Parse numeric part: "89%" → 89, "12K+" → 12, "$2.4B" → 2.4, "6" → 6
  const numMatch = value.match(/([\d.]+)/);
  const num = numMatch ? parseFloat(numMatch[1]) : 0;
  const prefix = value.match(/^[^\d]*/)?.[0] || "";
  const suffix = value.match(/[^\d.]*$/)?.[0] || "";
  const isDecimal = value.includes(".");

  const [ref, animatedValue] = useScrollCountUp(Math.round(num * (isDecimal ? 10 : 1)), 1400);
  const displayValue = isDecimal
    ? (animatedValue / 10).toFixed(1)
    : String(animatedValue);

  return (
    <div
      ref={ref}
      className={`text-[52px] tracking-[-2px] leading-none text-center font-sans ${
        color === "teal" ? "text-teal" : "text-white"
      }`}
    >
      {prefix}{displayValue}{suffix}
    </div>
  );
}

export function AboutStats() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`w-full flex items-center justify-around shrink-0 py-16 px-30 min-h-50 bg-navy transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {aboutStats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-0">
          {i > 0 && (
            <div className="w-px h-14 bg-white/10 shrink-0 mr-[calc(100%/8)]" />
          )}
          <div>
            <AnimatedStatValue value={stat.value} color={stat.color} />
            <div className="mt-2 uppercase tracking-[0.6px] text-center text-white/45 font-sans text-xs/4">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
