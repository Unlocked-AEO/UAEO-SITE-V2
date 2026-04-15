import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HIWHero } from "@/components/home/HIWHero";
import { HIWStepCrawl } from "@/components/home/HIWStepCrawl";
import { HIWStepExtract } from "@/components/home/HIWStepExtract";
import { HIWStepSimulate } from "@/components/home/HIWStepSimulate";
import { HIWStepReport } from "@/components/home/HIWStepReport";
import { HIWCTASection } from "@/components/home/HIWCTASection";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function HowItWorks() {
  if (DEMO_STATE === "loading") {
    return <HowItWorksLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <HIWHero />
        <HIWStepCrawl />
        <HIWStepExtract />
        <HIWStepSimulate />
        <HIWStepReport />
        <HIWCTASection />
      </main>
      <Footer />
    </div>
  );
}

function HowItWorksLoading() {
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
