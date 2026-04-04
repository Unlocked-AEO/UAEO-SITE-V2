import { storySection, problemCard } from "@/data/mock-about";

export function AboutStory() {
  return (
    <section className="w-full flex items-center shrink-0 py-20 px-30 gap-18 min-h-105 bg-surface">
      {/* Problem card */}
      <div className="shrink-0 w-[440px] rounded-[20px] bg-white border border-border-light shadow-[0_4px_24px_#0A25400F] p-7">
        <div className="uppercase tracking-[0.8px] mb-4 text-slate-muted font-sans text-[10px]/3">
          {problemCard.title}
        </div>
        <div className="flex flex-col gap-2.5">
          {problemCard.items.map((item, i) => {
            const isProblem = item.variant === "problem";
            return (
              <div key={item.text}>
                {/* Divider before solution item */}
                {!isProblem && i > 0 && (
                  <div className="h-px bg-border-light shrink-0 my-1 mx-0 mb-3.5" />
                )}
                <div
                  className={`flex items-center rounded-[10px] py-2.75 px-3.5 gap-3 border ${
                    isProblem
                      ? "bg-[#FFF5F5] border-[#EF44441F]"
                      : "bg-[#F0FDFA] border-teal/25"
                  }`}
                >
                  <div
                    className={`w-1.75 h-1.75 shrink-0 rounded-full ${
                      isProblem ? "bg-[#EF4444]" : "bg-teal"
                    }`}
                  />
                  <span className="grow shrink basis-0 text-navy font-sans text-[13px]/4">
                    {item.text}
                  </span>
                  <span
                    className={`font-sans shrink-0 ${
                      isProblem
                        ? "text-[#EF4444] text-xs/4"
                        : "text-teal text-[13px]/4"
                    }`}
                  >
                    {item.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story text */}
      <div className="grow shrink basis-0 min-w-0">
        <div className="uppercase tracking-[0.8px] mb-3 text-teal font-sans text-[11px]/3.5">
          {storySection.label}
        </div>
        <h2 className="text-[36px] leading-[1.15] tracking-[-1px] mb-5 text-navy font-bold m-0">
          {storySection.headline}
        </h2>
        {storySection.paragraphs.map((p, i) => (
          <p
            key={i}
            className={`text-base leading-[1.7] text-[#64748B] m-0 ${
              i < storySection.paragraphs.length - 1 ? "mb-4" : ""
            }`}
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
