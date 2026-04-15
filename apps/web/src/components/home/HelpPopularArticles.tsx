import { popularSection, popularArticles } from "@/data/mock-help";

export function HelpPopularArticles() {
  const leftColumn = popularArticles.slice(0, 4);
  const rightColumn = popularArticles.slice(4, 8);

  return (
    <section className="flex flex-col items-center bg-[#F8FAFC] p-20">
      {/* Eyebrow */}
      <span className="tracking-[1.8px] uppercase mb-4 text-teal text-[11px]/3.5">
        {popularSection.eyebrow}
      </span>

      {/* Headline */}
      <h2 className="text-[38px] tracking-[-1px] leading-[1.15] mb-13 text-center text-navy font-bold">
        {popularSection.headline}
      </h2>

      {/* Two-column article list */}
      <div className="flex w-full max-w-7xl gap-8">
        <ArticleColumn articles={leftColumn} />
        <div className="w-px shrink-0 bg-[#E2E8F0]" />
        <ArticleColumn articles={rightColumn} />
      </div>
    </section>
  );
}

function ArticleColumn({
  articles,
}: {
  articles: typeof popularArticles;
}) {
  return (
    <div className="flex flex-col grow shrink basis-0 gap-1">
      {articles.map((article, i) => {
        const isLast = i === articles.length - 1;
        return (
          <button
            key={article.id}
            className={`flex items-center justify-between py-5 gap-4 text-left bg-transparent border-none cursor-pointer p-0 hover:opacity-70 transition-opacity ${
              isLast ? "" : "border-b border-[#E2E8F0]"
            }`}
            onClick={() =>
              console.log("ACTION: read_help_article", {
                id: article.id,
                title: article.title,
              })
            }
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[15px] leading-[1.4] text-navy">
                {article.title}
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded-[100px] py-0.5 px-2.5 bg-[#F0FDFA] border border-teal">
                  <span className="text-teal text-[11px]/3.5">
                    {article.categoryLabel}
                  </span>
                </span>
              </div>
            </div>
            <span className="shrink-0 text-[#CBD5E1] text-base/5">→</span>
          </button>
        );
      })}
    </div>
  );
}
