import { aboutStats } from "@/data/mock-about";

export function AboutStats() {
  return (
    <section className="w-full flex items-center justify-around shrink-0 py-16 px-30 min-h-50 bg-navy">
      {aboutStats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-0">
          {i > 0 && (
            <div className="w-px h-14 bg-white/10 shrink-0 mr-[calc(100%/8)]" />
          )}
          <div>
            <div
              className={`text-[52px] tracking-[-2px] leading-none text-center font-sans ${
                stat.color === "teal" ? "text-teal" : "text-white"
              }`}
            >
              {stat.value}
            </div>
            <div className="mt-2 uppercase tracking-[0.6px] text-center text-white/45 font-sans text-xs/4">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
