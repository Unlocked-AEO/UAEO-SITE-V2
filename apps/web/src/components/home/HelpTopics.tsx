import { topicsSection, helpTopics } from "@/data/mock-help";

export function HelpTopics() {
  return (
    <section className="flex flex-col items-center pt-22 pb-20 bg-white px-20">
      {/* Eyebrow */}
      <span className="tracking-[1.8px] uppercase mb-4 text-teal text-[11px]/3.5">
        {topicsSection.eyebrow}
      </span>

      {/* Headline */}
      <h2 className="text-[38px] tracking-[-1px] leading-[1.15] mb-14 text-center text-navy font-bold">
        {topicsSection.headline}
      </h2>

      {/* Topic cards grid */}
      <div className="flex flex-wrap w-full max-w-7xl justify-center gap-6">
        {helpTopics.map((topic) => (
          <button
            key={topic.id}
            className="flex flex-col w-[376px] rounded-2xl gap-4 bg-[#FAFAFA] border-[1.5px] border-[#F1F5F9] shrink-0 p-8 text-left cursor-pointer hover:border-teal/30 hover:shadow-[0px_4px_16px_rgba(10,37,64,0.06)] transition-all"
            onClick={() =>
              console.log("ACTION: browse_topic", {
                topic: topic.id,
                title: topic.title,
              })
            }
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center rounded-xl shrink-0 size-12"
              style={{ backgroundImage: topic.iconGradient }}
            >
              <span className="text-[22px]/7">{topic.emoji}</span>
            </div>

            {/* Title */}
            <h3 className="text-navy font-bold text-lg/[22px]">
              {topic.title}
            </h3>

            {/* Description */}
            <p className="text-[14px] leading-[1.6] text-[#64748B]">
              {topic.description}
            </p>

            {/* Article count */}
            <span className="mt-1 text-teal text-[13px]/4">
              {topic.articleCount} articles →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
