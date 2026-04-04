import { blogArticles } from "@/data/mock-blog";

export function BlogArticleGrid() {
  return (
    <section className="pb-14 px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="tracking-[-0.3px] text-navy font-bold text-xl/6">
            Latest articles
          </h2>
          <button
            className="text-teal font-semibold text-[13px]/4 bg-transparent border-none cursor-pointer p-0 hover:opacity-70 transition-opacity"
            onClick={() => console.log("ACTION: view_all_articles")}
          >
            See all →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {blogArticles.map((article) => (
            <button
              key={article.id}
              className="flex flex-col rounded-2xl overflow-clip bg-white border border-border-light shadow-[0px_1px_4px_rgba(10,37,64,0.05)] text-left cursor-pointer p-0 hover:shadow-[0px_4px_16px_rgba(10,37,64,0.1)] transition-shadow"
              onClick={() =>
                console.log("ACTION: read_article", {
                  id: article.id,
                  title: article.title,
                })
              }
            >
              {/* Accent bar */}
              <div
                className="h-1.5 shrink-0"
                style={{ backgroundImage: article.accentGradient }}
              />

              <div className="flex flex-col grow shrink basis-0 gap-3 p-6">
                {/* Category badge */}
                <span className={`inline-block self-start rounded-md py-[3px] px-2.5 ${article.categoryBg}`}>
                  <span
                    className={`${article.categoryColor} font-bold text-[11px]/3.5`}
                  >
                    {article.category.label}
                  </span>
                </span>

                {/* Title */}
                <h3 className="text-[17px] tracking-[-0.3px] leading-[1.35] text-navy font-bold">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] leading-[1.65] text-[#64748B]">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#F0F4F8]">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center shrink-0 rounded-full size-6"
                      style={{ backgroundImage: article.author.gradient }}
                    >
                      <span className="text-white font-bold text-[9px]/3">
                        {article.author.initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-navy font-semibold text-xs/4">
                        {article.author.name}
                      </div>
                      <div className="text-[#94A3B8] text-[11px]/3.5">
                        {article.date} · {article.readTime}
                      </div>
                    </div>
                  </div>

                  {article.badge && (
                    <span
                      className={`rounded-sm py-[3px] px-2 ${article.badge.bg} border ${article.badge.border}`}
                    >
                      <span
                        className={`${article.badge.color} font-semibold text-[10px]/3`}
                      >
                        {article.badge.label}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-10">
          <button
            className="text-navy font-sans text-base/5 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => console.log("ACTION: load_more_articles")}
          >
            Load more articles
          </button>
        </div>
      </div>
    </section>
  );
}
