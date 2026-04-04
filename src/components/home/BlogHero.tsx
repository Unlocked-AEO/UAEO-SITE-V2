import { useState } from "react";
import { blogHero, blogCategories } from "@/data/mock-blog";

export function BlogHero() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section className="pt-14 pb-12 bg-white border-b border-border-light px-20">
      <div className="max-w-7xl flex flex-col items-center gap-5 mx-auto">
        {/* Badge */}
        <span className="inline-flex items-center rounded-[20px] py-[5px] px-4 bg-[#F0FDFA] border border-[#4ECDC480]">
          <span className="tracking-[0.08em] uppercase text-center text-teal font-bold text-[11px]/3.5">
            {blogHero.badge}
          </span>
        </span>

        {/* Headline */}
        <h1 className="text-[48px] tracking-[-1.3px] leading-[1.08] text-center text-navy font-extrabold">
          {blogHero.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-[17px] leading-[1.65] max-w-[480px] text-center text-slate-body">
          {blogHero.subheadline}
        </p>

        {/* Category filters */}
        <div className="flex items-center mt-2 flex-wrap justify-center gap-2">
          {blogCategories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                className={`rounded-[20px] py-[7px] px-4 border cursor-pointer transition-colors ${
                  isActive
                    ? "bg-navy border-navy"
                    : "bg-[#F8FAFC] border-border-light hover:bg-surface"
                }`}
                onClick={() => {
                  setActiveCategory(cat.slug);
                  console.log("ACTION: filter_blog_category", {
                    category: cat.slug,
                  });
                }}
              >
                <span
                  className={`text-center font-sans text-[13px]/4 ${
                    isActive ? "text-white font-semibold" : "text-slate-body"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
