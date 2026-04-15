import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrandGuidelinesHero } from "@/components/home/BrandGuidelinesHero";
import { BrandGuidelinesLogo } from "@/components/home/BrandGuidelinesLogo";
import { BrandGuidelinesColour } from "@/components/home/BrandGuidelinesColour";
import { BrandGuidelinesTypography } from "@/components/home/BrandGuidelinesTypography";
import { BrandGuidelinesSpacing } from "@/components/home/BrandGuidelinesSpacing";
import { BrandGuidelinesComponents } from "@/components/home/BrandGuidelinesComponents";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function BrandGuidelines() {
  if (DEMO_STATE === "loading") {
    return <BrandGuidelinesLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <BrandGuidelinesHero />
        <BrandGuidelinesLogo />
        <BrandGuidelinesColour />
        <BrandGuidelinesTypography />
        <BrandGuidelinesSpacing />
        <BrandGuidelinesComponents />
      </main>
      <Footer />
    </div>
  );
}

function BrandGuidelinesLoading() {
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
