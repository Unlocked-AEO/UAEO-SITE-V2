import { featuredArticle } from "@/data/mock-blog";

export function BlogFeaturedArticle() {
  const a = featuredArticle;

  return (
    <section className="py-14 px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex rounded-[20px] overflow-clip border border-border-light shadow-[0px_4px_24px_rgba(10,37,64,0.07)]">
          {/* Left — text */}
          <div className="grow-0 shrink-0 basis-[560px] flex flex-col justify-center py-13 px-14 gap-5 bg-white">
            <div className="flex items-center gap-2.5">
              <span className={`rounded-md py-1 px-2.5 ${a.categoryBg}`}>
                <span
                  className={`tracking-[0.05em] uppercase ${a.categoryColor} font-bold text-[11px]/3.5`}
                >
                  {a.category.label}
                </span>
              </span>
              <span className="text-[#94A3B8] text-xs/4">Featured</span>
            </div>

            <h2 className="text-[30px] tracking-[-0.8px] leading-[1.2] text-navy font-extrabold">
              {a.title}
            </h2>

            <p className="text-[15px] leading-[1.7] text-slate-body">
              {a.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center shrink-0 rounded-full size-8"
                style={{ backgroundImage: a.author.gradient }}
              >
                <span className="text-white font-bold text-xs/4">
                  {a.author.initials}
                </span>
              </div>
              <div>
                <div className="text-navy font-semibold text-[13px]/4">
                  {a.author.name}
                </div>
                <div className="text-[#94A3B8] text-xs/4">
                  {a.date} · {a.readTime}
                </div>
              </div>
            </div>

            <button
              className="mt-1 text-navy font-sans text-base/5 bg-transparent border-none cursor-pointer p-0 text-left hover:opacity-70 transition-opacity"
              onClick={() =>
                console.log("ACTION: read_article", {
                  title: a.title,
                  featured: true,
                })
              }
            >
              Read article ›
            </button>
          </div>

          {/* Right — visualization */}
          <div
            className="grow shrink basis-0 relative min-h-[380px] flex items-center justify-center overflow-clip"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 135deg, oklab(26% -0.019 -0.057) 0%, oklab(32.5% -0.023 -0.085) 60%, oklab(25.5% 0.012 -0.092) 100%)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-[280px] h-[280px] rounded-full bg-teal/8" />
            <div className="absolute -bottom-[60px] -left-[30px] w-[200px] h-[200px] rounded-full bg-teal/5" />

            {/* Citation card */}
            <div className="relative w-[260px] rounded-2xl py-5 px-6 bg-white/6 border border-white/12 backdrop-blur-[10px] shrink-0">
              <div className="uppercase tracking-[0.08em] mb-3.5 text-white/40 font-bold text-[10px]/3">
                Citation Probability
              </div>

              <div className="flex flex-col gap-2.5">
                {a.citationBars.map((bar) => (
                  <div key={bar.engine} className="flex items-center gap-2">
                    <div
                      className="shrink-0 rounded-sm size-4"
                      style={{
                        backgroundColor: bar.iconColor,
                        border: bar.iconBorder
                          ? `1px solid ${bar.iconBorder}`
                          : undefined,
                      }}
                    />
                    <span className="grow shrink basis-0 text-white/70 text-[11px]/3.5">
                      {bar.engine}
                    </span>
                    <div className="grow shrink basis-0 h-1 rounded-xs bg-white/10">
                      <div
                        className="h-full rounded-xs"
                        style={{
                          width: `${bar.percentage}%`,
                          backgroundColor: bar.barColor,
                        }}
                      />
                    </div>
                    <span
                      className="font-semibold shrink-0 text-[11px]/3.5"
                      style={{ color: bar.barColor }}
                    >
                      {bar.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 rounded-lg py-2 px-3 bg-teal/12 border border-teal/20">
                <span className="block text-center text-teal text-sm/5">
                  {a.citationFooter}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
