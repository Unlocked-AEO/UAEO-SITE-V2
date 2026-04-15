import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TeamsHero } from "@/components/home/TeamsHero";
import { TeamsShowcase } from "@/components/home/TeamsShowcase";
import { TeamsCTA } from "@/components/home/TeamsCTA";

// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";

export default function Teams() {
  if (DEMO_STATE === "loading") {
    return <TeamsLoading />;
  }

  return (
    <div className="font-sans antialiased bg-white">
      <Header />
      <main>
        <TeamsHero />
        <TeamsShowcase />
        <TeamsCTA />
      </main>
      <Footer />
    </div>
  );
}

function TeamsLoading() {
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
