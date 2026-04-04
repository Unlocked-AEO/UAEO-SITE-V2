import { useState } from "react";
import { helpHero } from "@/data/mock-help";

export function HelpHero() {
  const [query, setQuery] = useState("");

  return (
    <section
      className="flex flex-col items-center relative pt-25 pb-[90px] overflow-clip px-20"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 160deg, oklab(98.4% -0.014 -.0002) 0%, oklab(97.1% -0.019 -0.002) 100%)",
      }}
    >
      {/* Badge */}
      <span className="mb-7 rounded-[100px] py-[5px] px-4 bg-white border-[1.5px] border-teal">
        <span className="tracking-[1.8px] text-center uppercase text-teal font-sans text-[11px]/3.5">
          {helpHero.badge}
        </span>
      </span>

      {/* Headline */}
      <h1 className="text-[56px] tracking-[-2.5px] leading-[1.08] mb-[18px] max-w-[700px] text-center text-navy font-bold">
        {helpHero.headline}
      </h1>

      {/* Subheadline */}
      <p className="text-[18px] leading-[1.6] mb-12 max-w-[480px] text-center text-[#64748B]">
        {helpHero.subheadline}
      </p>

      {/* Search bar */}
      <div className="flex items-center w-[580px] h-14 rounded-[14px] px-5 gap-3 bg-white border-[1.5px] border-[#E2E8F0] shadow-[0px_4px_20px_rgba(10,37,64,0.08)]">
        <span className="text-[#94A3B8] shrink-0 text-lg/[22px]">⌕</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={helpHero.searchPlaceholder}
          className="grow text-[15px]/[18px] text-navy placeholder:text-[#94A3B8] bg-transparent border-none outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("ACTION: search_help", { query });
            }
          }}
        />
      </div>

      {/* Decorative circle */}
      <div
        className="absolute -top-[60px] right-[120px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 12%) 0%, oklab(0% -.0001 0 / 0%) 70%)",
        }}
      />
    </section>
  );
}
