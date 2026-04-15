import { faqHero } from "@/data/mock-faq";

export function FAQHero() {
  return (
    <section
      className="w-full flex flex-col items-center pt-24 pb-22 min-h-80 px-20"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 160deg, oklab(98.4% -0.014 -.0002) 0%, oklab(97.1% -0.019 -0.002) 100%)",
      }}
    >
      <div className="mb-7 rounded-[100px] py-1.25 px-4 bg-white border-[1.5px] border-teal">
        <span className="tracking-[1.8px] text-center uppercase text-teal font-sans text-[11px]/3.5">
          {faqHero.badge}
        </span>
      </div>

      <h1 className="text-[56px] tracking-[-2.5px] leading-[1.08] mb-5 max-w-[720px] text-center text-navy font-bold m-0">
        {faqHero.headline}
      </h1>

      <p className="text-[18px] leading-[1.6] max-w-[520px] text-center text-[#64748B] m-0">
        {faqHero.subtext}
      </p>
    </section>
  );
}
