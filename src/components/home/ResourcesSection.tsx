import { resourcesSection, blogPosts } from "@/data/mock-landing";

export function ResourcesSection() {
  const featured = blogPosts.find((p) => p.featured);
  const articles = blogPosts.filter((p) => !p.featured);

  return (
    <section className="flex flex-col gap-10 bg-white p-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <span className="tracking-[0.06em] uppercase mb-3 block text-teal font-semibold text-[13px]/4">
            {resourcesSection.label}
          </span>
          <h2 className="text-[36px] leading-[1.15] tracking-[-0.03em] text-navy font-bold m-0">
            {resourcesSection.headline}
          </h2>
        </div>
        <button
          className="text-iris font-semibold text-sm/[18px] bg-transparent border-none cursor-pointer p-0 hover:opacity-80 shrink-0"
          onClick={() => console.log("ACTION: see_all_articles")}
        >
          {resourcesSection.cta}
        </button>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Featured post */}
        {featured && (
          <div className="grow-[1.4] shrink basis-0 flex flex-col gap-4">
            <button
              className="h-[200px] flex items-center justify-center relative rounded-xl overflow-clip shrink-0 border-none cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 135deg, oklab(96.8% -0.019 -0.004) 0%, oklab(92.6% -0.040 -0.009) 100%)",
              }}
              onClick={() =>
                console.log("ACTION: read_article", {
                  title: featured.title,
                })
              }
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017 / 40%) 0%, oklab(62.2% -0.105 -0.015 / 60%) 100%)",
                }}
              />
              <span className="tracking-[-0.04em] relative text-white/30 font-extrabold text-5xl/[58px]">
                AEO
              </span>
            </button>
            <div>
              <span className="uppercase tracking-[0.06em] text-slate-muted font-semibold text-[11px]/[14px]">
                {featured.category}
              </span>
              <h3 className="text-navy font-bold text-base/5 mt-1 mb-1 m-0">
                {featured.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-slate-body mb-2 m-0">
                {featured.description}
              </p>
              <button
                className="text-iris font-semibold text-[13px]/4 bg-transparent border-none cursor-pointer p-0 hover:opacity-80"
                onClick={() =>
                  console.log("ACTION: read_article", {
                    title: featured.title,
                  })
                }
              >
                {featured.cta}
              </button>
            </div>
          </div>
        )}

        {/* Article list */}
        <div className="grow shrink basis-0 flex flex-col gap-6">
          {articles.map((post, i) => (
            <div
              key={post.title}
              className={`flex flex-col pb-6 gap-1.5 ${i < articles.length - 1 ? "border-b border-border-light" : ""}`}
            >
              <span className="uppercase tracking-[0.06em] text-slate-muted font-semibold text-[11px]/[14px]">
                {post.category}
              </span>
              <h4 className="text-[15px] leading-[1.35] tracking-[-0.01em] text-navy font-bold m-0">
                {post.title}
              </h4>
              <button
                className="mt-1 text-iris font-semibold text-xs/4 bg-transparent border-none cursor-pointer p-0 text-left hover:opacity-80"
                onClick={() =>
                  console.log("ACTION: read_article", { title: post.title })
                }
              >
                {post.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
