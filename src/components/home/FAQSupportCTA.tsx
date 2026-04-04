import { faqCTA } from "@/data/mock-faq";

export function FAQSupportCTA() {
  return (
    <section className="w-full flex flex-col items-center py-22 px-20 min-h-90 bg-navy">
      <div className="mb-7 rounded-[100px] py-1.25 px-4 bg-teal/15 border-[1.5px] border-teal/40">
        <span className="tracking-[1.8px] text-center uppercase text-teal font-sans text-[11px]/3.5">
          {faqCTA.badge}
        </span>
      </div>

      <h2 className="text-[42px] tracking-[-1.5px] leading-[1.1] mb-4 text-center text-white font-bold m-0">
        {faqCTA.headline}
      </h2>

      <p className="text-[17px] leading-[1.6] mb-11 max-w-[440px] text-center text-white/60 m-0">
        {faqCTA.description}
      </p>

      <div className="flex items-center gap-4">
        <button
          className="rounded-[10px] py-3.5 px-7 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: chat_with_support")}
        >
          <span className="text-center text-navy font-sans text-[15px]/4.5">
            {faqCTA.primaryCTA}
          </span>
        </button>
        <button
          className="rounded-[10px] py-3.5 px-7 bg-white/8 border-[1.5px] border-white/15 cursor-pointer hover:bg-white/12 transition-colors"
          onClick={() => console.log("ACTION: browse_help_centre")}
        >
          <span className="text-center text-white font-sans text-[15px]/4.5">
            {faqCTA.secondaryCTA}
          </span>
        </button>
      </div>
    </section>
  );
}
