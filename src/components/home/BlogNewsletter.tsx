import { useState } from "react";
import { blogNewsletter } from "@/data/mock-blog";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const n = blogNewsletter;

  return (
    <section className="py-18 px-20 bg-[#F8FAFC] border-t border-b border-border-light">
      <div className="max-w-[560px] flex flex-col items-center gap-4 mx-auto">
        {/* Badge */}
        <span className="inline-flex items-center rounded-[20px] py-[5px] px-3.5 bg-[#F0FDFA] border border-[#4ECDC466]">
          <span className="tracking-[0.08em] uppercase text-center text-teal font-bold text-[11px]/3.5">
            {n.badge}
          </span>
        </span>

        {/* Headline */}
        <h2 className="text-[32px] tracking-[-0.8px] leading-[1.15] text-center text-navy font-extrabold">
          {n.headline}
        </h2>

        {/* Subheadline */}
        <p className="text-[15px] leading-[1.65] text-center text-slate-body">
          {n.subheadline}
        </p>

        {/* Email input + subscribe */}
        <div className="flex items-center mt-2 w-full gap-2">
          <input
            type="email"
            placeholder={n.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="grow shrink basis-0 rounded-lg py-3 px-4 bg-white border-[1.5px] border-border-light text-navy text-base/5 outline-none focus:border-teal transition-colors"
          />
          <button
            className="shrink-0 rounded-lg py-3 px-6 bg-teal text-navy font-semibold text-base/5 border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() =>
              console.log("ACTION: subscribe_newsletter", { email })
            }
          >
            {n.buttonLabel}
          </button>
        </div>

        {/* Footnote */}
        <span className="text-center text-[#94A3B8] text-xs/4">
          {n.footnote}
        </span>
      </div>
    </section>
  );
}
