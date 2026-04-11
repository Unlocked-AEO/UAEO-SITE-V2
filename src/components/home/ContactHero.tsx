import { contactHero } from "@/data/mock-contact";

export function ContactHero() {
  return (
    <section className="relative flex flex-col items-center pt-24 pb-20 px-10 overflow-clip bg-white">
      {/* Decorative glows */}
      <div
        className="absolute -top-25 -right-15 w-135 h-135 rounded-[50%]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 15%) 0%, oklab(77.6% -0.110 -0.017 / 4%) 60%, oklab(0% -.0001 0 / 0%) 80%)",
        }}
      />
      <div
        className="absolute top-15 left-25 w-65 h-65 rounded-[50%]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(87.1% -0.123 0.059 / 12%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />

      {/* Badge */}
      <div className="relative inline-flex items-center mb-6 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-solid border-[#4ECDC459]">
        <div className="uppercase tracking-[0.8px] inline-block text-[#4ECDC4] font-sans shrink-0 text-[11px]/3.5">
          {contactHero.badge}
        </div>
      </div>

      {/* Headline */}
      <h1 className="relative text-[54px] leading-[108%] tracking-[-2px] mb-5 text-center text-[#0A2540] font-sans font-bold whitespace-pre-line">
        {contactHero.headline}
      </h1>

      {/* Subtext */}
      <p className="relative text-[18px] leading-[165%] max-w-[520px] text-center text-[#64748B] font-sans">
        {contactHero.subtext}
      </p>
    </section>
  );
}
