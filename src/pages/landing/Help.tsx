import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HelpHero } from "@/components/home/HelpHero";
import { HelpTopics } from "@/components/home/HelpTopics";
import { HelpPopularArticles } from "@/components/home/HelpPopularArticles";
import { HelpCTA } from "@/components/home/HelpCTA";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function Help() {
  if (DEMO_STATE === "loading") {
    return <HelpLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <HelpHero />
        <HelpTopics />
        <HelpPopularArticles />
        <HelpCTA />
      </main>
      <Footer />
    </div>
  );
}

function HelpLoading() {
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
