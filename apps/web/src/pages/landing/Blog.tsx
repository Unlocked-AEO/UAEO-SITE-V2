import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogHero } from "@/components/home/BlogHero";
import { BlogFeaturedArticle } from "@/components/home/BlogFeaturedArticle";
import { BlogArticleGrid } from "@/components/home/BlogArticleGrid";
import { BlogNewsletter } from "@/components/home/BlogNewsletter";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function Blog() {
  if (DEMO_STATE === "loading") {
    return <BlogLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <BlogHero />
        <BlogFeaturedArticle />
        <BlogArticleGrid />
        <BlogNewsletter />
      </main>
      <Footer />
    </div>
  );
}

function BlogLoading() {
  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main className="flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-3 border-surface border-t-teal rounded-full animate-spin" />
          <span className="text-slate-muted text-sm">Loading...</span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
