import type { ProductFeature } from "@/data/mock-product";

function FeatureIcon({ icon }: { icon: ProductFeature["icon"] }) {
  switch (icon) {
    case "scan":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: '0' }}>
          <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
          <path d="M18 18l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "plan":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: '0' }}>
          <rect x="4" y="3" width="20" height="22" rx="3" stroke="white" strokeWidth="2" />
          <path d="M9 10l2 2 4-4M9 17h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "competitive":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: '0' }}>
          <path d="M4 24V14M10 24V8M16 24V12M22 24V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 14l6-6 6 4 6-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "risk":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: '0' }}>
          <path d="M14 3L2 24h24L14 3z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 11v6M14 20v1" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "agentic":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: '0' }}>
          <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="2" />
          <path d="M14 8v6l4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 4l2-2M8 4L6 2M24 10l2-1M4 10L2 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function MockPreview({ icon }: { icon: ProductFeature["icon"] }) {
  // Simplified mock UI previews for each feature
  const previewBg = "bg-[#F8FAFC]";

  if (icon === "scan") {
    return (
      <div className={`rounded-2xl ${previewBg} border border-solid border-[#E6EBF1] p-6 h-full flex flex-col gap-4`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-xl bg-[#FFF4E6] flex items-center justify-center">
            <span className="text-[#FF9F43] font-['Inter',system-ui,sans-serif] font-extrabold text-xl">72</span>
          </div>
          <div>
            <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm">AEO Score</div>
            <div className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-xs">acme-corp.com</div>
          </div>
        </div>
        {["AI Visibility", "Brand Accuracy", "Sentiment", "Schema", "Freshness", "EEAT"].map((label, i) => {
          const widths = [68, 81, 74, 45, 77, 61];
          const colors = ["#FF9F43", "#4ECDC4", "#4ECDC4", "#EF4444", "#4ECDC4", "#FF9F43"];
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="w-24 text-[#64748B] font-['Inter',system-ui,sans-serif] text-[11px] shrink-0">{label}</span>
              <div className="grow h-1.5 rounded-full bg-[#E6EBF1]">
                <div className="h-full rounded-full" style={{ width: `${widths[i]}%`, backgroundColor: colors[i] }} />
              </div>
              <span className="w-6 text-right text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[11px]">{widths[i]}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (icon === "plan") {
    return (
      <div className={`rounded-2xl ${previewBg} border border-solid border-[#E6EBF1] p-6 h-full flex flex-col gap-3`}>
        <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm mb-1">Improvement Plan</div>
        {[
          { task: "Add FAQ schema markup", impact: "+15 pts", done: true },
          { task: "Update Grok entity data", impact: "+12 pts", done: true },
          { task: "Publish 3 fresh articles", impact: "+8 pts", done: false },
          { task: "Add author bios & bylines", impact: "+6 pts", done: false },
          { task: "Fix pricing hallucination", impact: "+5 pts", done: false },
        ].map((item) => (
          <div key={item.task} className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-white border border-solid border-[#E6EBF1]">
            <div className={`size-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-[#4ECDC4]" : "border-[1.5px] border-solid border-[#E2E8F0]"}`}>
              {item.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className={`grow text-[12px] font-['Inter',system-ui,sans-serif] ${item.done ? "text-[#94A3B8] line-through" : "text-[#0A2540]"}`}>{item.task}</span>
            <span className="text-[#4ECDC4] font-['Inter',system-ui,sans-serif] font-semibold text-[11px] shrink-0">{item.impact}</span>
          </div>
        ))}
      </div>
    );
  }

  if (icon === "competitive") {
    return (
      <div className={`rounded-2xl ${previewBg} border border-solid border-[#E6EBF1] p-6 h-full flex flex-col gap-3`}>
        <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm mb-1">Share of Voice</div>
        {[
          { name: "Your Brand", score: 74, color: "#4ECDC4", highlight: true },
          { name: "Competitor A", score: 82, color: "#0A2540", highlight: false },
          { name: "Competitor B", score: 68, color: "#64748B", highlight: false },
          { name: "Competitor C", score: 55, color: "#94A3B8", highlight: false },
        ].map((item) => (
          <div key={item.name} className={`flex items-center gap-3 py-2.5 px-3 rounded-lg ${item.highlight ? "bg-[#F0FDFA] border border-solid border-[#4ECDC4]" : "bg-white border border-solid border-[#E6EBF1]"}`}>
            <span className={`w-24 font-['Inter',system-ui,sans-serif] text-[12px] shrink-0 ${item.highlight ? "text-[#4ECDC4] font-semibold" : "text-[#0A2540]"}`}>{item.name}</span>
            <div className="grow h-2 rounded-full bg-[#E6EBF1]">
              <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
            </div>
            <span className="w-6 text-right font-['Inter',system-ui,sans-serif] font-semibold text-[12px]" style={{ color: item.color }}>{item.score}</span>
          </div>
        ))}
      </div>
    );
  }

  if (icon === "risk") {
    return (
      <div className={`rounded-2xl ${previewBg} border border-solid border-[#E6EBF1] p-6 h-full flex flex-col gap-3`}>
        <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm mb-1">Active Risks</div>
        {[
          { title: "Grok brand gap widening", level: "High", bg: "#FEF2F2", color: "#EF4444", dotColor: "#EF4444" },
          { title: "Schema below industry avg", level: "Medium", bg: "#FFF7ED", color: "#F97316", dotColor: "#F97316" },
          { title: "EEAT declining 2 months", level: "Medium", bg: "#FFF7ED", color: "#F97316", dotColor: "#F97316" },
          { title: "Sentiment slightly softened", level: "Low", bg: "#F0FDF4", color: "#22C55E", dotColor: "#22C55E" },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3 py-3 px-3.5 rounded-lg border border-solid border-[#E6EBF1] bg-white">
            <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: item.dotColor }} />
            <span className="grow text-[#0A2540] font-['Inter',system-ui,sans-serif] text-[12px]">{item.title}</span>
            <span className="rounded-md py-0.5 px-2 font-['Inter',system-ui,sans-serif] font-semibold text-[11px]" style={{ backgroundColor: item.bg, color: item.color }}>{item.level}</span>
          </div>
        ))}
      </div>
    );
  }

  // Agentic
  return (
    <div className={`rounded-2xl ${previewBg} border border-solid border-[#E6EBF1] p-6 h-full flex flex-col gap-3`}>
      <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm mb-1">Agent Activity</div>
      {[
        { action: "Generated FAQ schema for /pricing", status: "Awaiting approval", statusBg: "#FFF7ED", statusColor: "#F97316" },
        { action: "Rewrote meta description for /features", status: "Approved", statusBg: "#F0FDF4", statusColor: "#22C55E" },
        { action: "Injected HowTo markup on /guides", status: "Deployed", statusBg: "#F0FDF4", statusColor: "#22C55E" },
        { action: "Drafting content refresh for /blog/aeo", status: "In progress", statusBg: "#F0FDFA", statusColor: "#4ECDC4" },
      ].map((item) => (
        <div key={item.action} className="flex items-start gap-3 py-2.5 px-3 rounded-lg bg-white border border-solid border-[#E6EBF1]">
          <div className="size-5 rounded-full bg-[#4ECDC4] flex items-center justify-center shrink-0 mt-0.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="2" fill="white" /></svg>
          </div>
          <div className="grow">
            <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] text-[12px] block">{item.action}</span>
            <span className="font-['Inter',system-ui,sans-serif] text-[11px] mt-0.5 inline-block rounded-md py-0.5 px-1.5" style={{ backgroundColor: item.statusBg, color: item.statusColor }}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductFeatureSection({ feature }: { feature: ProductFeature }) {
  const isRight = feature.layout === "right";

  return (
    <section className={`py-20 px-10 ${isRight ? "bg-[#F8FAFC]" : "bg-white"}`}>
      <div className="max-w-[1100px] mx-auto flex items-center gap-16">
        {/* Text */}
        <div className={`grow shrink basis-[0%] ${isRight ? "order-2" : "order-1"}`}>
          {/* Badge */}
          <div className="inline-flex items-center mb-5 rounded-[20px] py-1.25 px-3.5 gap-2 bg-[#F0FDFA] border border-solid border-[#4ECDC459]">
            <div
              className="flex items-center justify-center rounded-md size-5"
              style={{ backgroundImage: 'linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)' }}
            >
              <FeatureIcon icon={feature.icon} />
            </div>
            <span className="uppercase tracking-[0.8px] text-[#4ECDC4] font-sans text-[11px]/3.5">
              {feature.badge}
            </span>
            {feature.comingSoon && (
              <span className="rounded-[20px] py-0.5 px-2 bg-[#FEF3C7] text-[#92400E] font-['Inter',system-ui,sans-serif] font-semibold text-[10px]/3">
                Coming Soon
              </span>
            )}
          </div>

          {/* Headline */}
          <h2 className="text-[36px] leading-[115%] tracking-[-1px] mb-5 text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold whitespace-pre-line">
            {feature.headline}
          </h2>

          {/* Description */}
          <p className="text-[16px] leading-[170%] mb-7 text-[#64748B] font-['Inter',system-ui,sans-serif] m-0">
            {feature.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-3">
            {feature.highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0 rounded-full bg-[#F0FDFA] size-6">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: '0' }}>
                    <path d="M2 6l3 3 5-5" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[#475569] font-['Inter',system-ui,sans-serif] text-[15px]/5">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className={`w-[440px] shrink-0 ${isRight ? "order-1" : "order-2"}`}>
          <MockPreview icon={feature.icon} />
        </div>
      </div>
    </section>
  );
}
