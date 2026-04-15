import { agencySection, agencyCards } from "@/data/mock-landing";

const featureIcons = [
  <svg key="code" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3L2 7L5 11M9 3L12 7L9 11" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="globe" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 7H5M7 5v4" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="doc" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#4ECDC4" strokeWidth="1.5" />
    <path d="M4 7h6M4 9.5h3" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round" />
  </svg>,
  <svg key="settings" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="3" stroke="#4ECDC4" strokeWidth="1.5" />
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
];

const cardIcons = [
  <svg key="plus" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 11h16M11 3v16" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="upload" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M6 8l5-5 5 5M11 3v12" stroke="#7C8CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 18h16" stroke="#7C8CF8" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="check" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#4ECDC4" strokeWidth="2" />
    <path d="M8 11l2 2 4-4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export function AgencySection() {
  return (
    <>
      {/* Main agency section */}
      <section className="flex items-start relative overflow-clip gap-20 bg-navy p-20">
        {/* Background glow */}
        <div
          className="absolute -bottom-[100px] left-1/2 w-[900px] h-[400px]"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 12%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
            translate: "-50%",
          }}
        />
        <div
          className="absolute top-[60px] right-20 w-[500px] h-[500px]"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(57.8% 0.034 -0.232 / 8%) 0%, oklab(0% 0 -.0001 / 0%) 60%)",
          }}
        />

        {/* Left column */}
        <div className="grow-0 shrink-0 basis-[400px] relative">
          <span className="tracking-[0.06em] uppercase mb-4 block text-teal font-semibold text-[13px]/4">
            {agencySection.label}
          </span>
          <h2 className="text-[38px] leading-[1.15] tracking-[-0.03em] mb-5 text-white font-bold whitespace-pre-wrap m-0">
            {agencySection.headline}
          </h2>
          <p className="text-[16px] leading-[1.65] mb-10 text-white/60 m-0">
            {agencySection.description}
          </p>

          <div className="flex flex-col mb-10 gap-4">
            {agencySection.features.map((feature, i) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0 rounded-md bg-teal/15 border border-teal/30 size-7">
                  {featureIcons[i]}
                </div>
                <span className="text-white/80 text-sm/[18px]">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              className="inline-flex items-center rounded-md py-2.5 px-5 gap-1.5 border-[1.5px] border-teal/40 bg-transparent text-teal font-semibold text-sm/[18px] cursor-pointer hover:bg-teal/10 transition-colors"
              onClick={() => console.log("ACTION: explore_agency_plan")}
            >
              {agencySection.primaryCTA}
            </button>
            <button
              className="inline-block text-white/70 font-semibold text-sm/[18px] py-2.5 px-5 bg-transparent border-none cursor-pointer hover:text-white transition-colors"
              onClick={() => console.log("ACTION: agency_contact_sales")}
            >
              {agencySection.secondaryCTA}
            </button>
          </div>
        </div>

        {/* Code block */}
        <div className="grow shrink basis-0 relative rounded-xl overflow-clip bg-[#0D1B2A] border border-white/10">
          <div className="flex items-center py-3 px-4 gap-2 bg-[#1A2D42] border-b border-white/8">
            <div className="rounded-full bg-[#FF5F57] shrink-0 size-2.5" />
            <div className="rounded-full bg-[#FFBD2E] shrink-0 size-2.5" />
            <div className="rounded-full bg-[#28C941] shrink-0 size-2.5" />
            <span className="ml-2 text-white/35 text-[11px]/[14px]">
              {agencySection.codeFile}
            </span>
          </div>
          <div className="p-6">
            {agencySection.codeLines.map((line, i) => {
              if (line.text === "") return <div key={i} className="h-3" />;

              if (line.highlighted) {
                return (
                  <div
                    key={i}
                    className="-ml-6 pr-3 pl-[22px] bg-teal/8 border-l-2 border-teal py-2 rounded-r-md"
                  >
                    <code className="text-[12px] leading-[1.8] text-white/75 font-mono">
                      {line.text}
                    </code>
                  </div>
                );
              }

              return (
                <div key={i} className={line.indent ? "pl-5" : ""}>
                  <code
                    className={`text-[12px] leading-[1.8] font-mono ${
                      line.isComment
                        ? "text-slate-muted"
                        : line.dim
                          ? "text-white/50"
                          : "text-white/75"
                    }`}
                  >
                    {line.text}
                  </code>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agency feature cards */}
      <section className="flex pb-20 gap-5 bg-navy px-20">
        {agencyCards.map((card, i) => (
          <div
            key={card.title}
            className="grow shrink basis-0 flex flex-col rounded-2xl gap-5 bg-white/4 border border-white/10 p-8"
          >
            <div
              className={`flex items-center justify-center rounded-[10px] shrink-0 size-11 ${card.iconColor}`}
            >
              {cardIcons[i]}
            </div>
            <div>
              <h3 className="mb-2 tracking-[-0.02em] text-white font-bold text-lg/[22px] m-0">
                {card.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-white/55 m-0">
                {card.description}
              </p>
            </div>
            <button
              className={`mt-auto ${card.ctaColor} font-semibold text-[13px]/4 bg-transparent border-none cursor-pointer p-0 text-left hover:opacity-80`}
              onClick={() =>
                console.log("ACTION: agency_card_cta", { card: card.title })
              }
            >
              {card.cta}
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
