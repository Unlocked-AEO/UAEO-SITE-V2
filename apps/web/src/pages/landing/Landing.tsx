import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SolutionCards } from "@/components/home/SolutionCards";
import { FeatureCards } from "@/components/home/FeatureCards";
import { AnalyticsBanner } from "@/components/home/AnalyticsBanner";
import { StatsSection } from "@/components/home/StatsSection";
import { EnterpriseSection } from "@/components/home/EnterpriseSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AgencySection } from "@/components/home/AgencySection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { CTASection } from "@/components/home/CTASection";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function Landing() {
  if (DEMO_STATE === "loading") {
    return <LandingLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <HeroSection />
        <SolutionCards />
        <FeatureCards />
        <AnalyticsBanner />
        <StatsSection />
        <EnterpriseSection />
        <TestimonialsSection />
        <AgencySection />
        <ResourcesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function LandingLoading() {
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
