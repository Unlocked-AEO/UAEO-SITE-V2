import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AEOHero } from "@/components/home/AEOHero";
import { AEODefinition } from "@/components/home/AEODefinition";
import { AEOComparison } from "@/components/home/AEOComparison";
import { AEOCitationSignals } from "@/components/home/AEOCitationSignals";
import { AEOWhyNow } from "@/components/home/AEOWhyNow";
import { AEOHowWeHelp } from "@/components/home/AEOHowWeHelp";
import { AEOCTASection } from "@/components/home/AEOCTASection";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function WhatIsAEO() {
  if (DEMO_STATE === "loading") {
    return <WhatIsAEOLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <AEOHero />
        <AEODefinition />
        <AEOComparison />
        <AEOCitationSignals />
        <AEOWhyNow />
        <AEOHowWeHelp />
        <AEOCTASection />
      </main>
      <Footer />
    </div>
  );
}

function WhatIsAEOLoading() {
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
