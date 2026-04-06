import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/landing/Landing";
import HowItWorks from "@/pages/landing/HowItWorks";
import About from "@/pages/landing/About";
import WhatIsAEO from "@/pages/landing/WhatIsAEO";
import Blog from "@/pages/landing/Blog";
import Teams from "@/pages/landing/Teams";
import Pricing from "@/pages/landing/Pricing";
import FAQ from "@/pages/landing/FAQ";
import Help from "@/pages/landing/Help";
import Terms from "@/pages/landing/Terms";
import Privacy from "@/pages/landing/Privacy";
import BrandGuidelines from "@/pages/landing/BrandGuidelines";
import Contact from "@/pages/landing/Contact";
import ScheduleCall from "@/pages/landing/ScheduleCall";
import Product from "@/pages/landing/Product";
import DashboardOverview from "@/pages/dashboard/Overview";
import Profile from "@/pages/dashboard/Profile";
import Security from "@/pages/dashboard/Security";
import Preferences from "@/pages/dashboard/Preferences";
import Billing from "@/pages/dashboard/Billing";
import Support from "@/pages/dashboard/Support";
import Scans from "@/pages/dashboard/Scans";
import RunScan from "@/pages/dashboard/RunScan";
import AdvancedScanSettings from "@/pages/dashboard/AdvancedScanSettings";
import ImprovementPlan from "@/pages/dashboard/ImprovementPlan";
import ImprovementPlanExpanded from "@/pages/dashboard/ImprovementPlanExpanded";
import ScanOverview from "@/pages/dashboard/ScanOverview";
import ScanAIVisibility from "@/pages/dashboard/ScanAIVisibility";
import ScanBrandAccuracy from "@/pages/dashboard/ScanBrandAccuracy";
import ScanContentFreshness from "@/pages/dashboard/ScanContentFreshness";
import Signup from "@/pages/authenticated/Signup";
import Signin from "@/pages/authenticated/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-is-aeo" element={<WhatIsAEO />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/brand-guidelines" element={<BrandGuidelines />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/schedule" element={<ScheduleCall />} />
        <Route path="/product" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/dashboard/scans" element={<Scans />} />
        <Route path="/dashboard/scans/:scanId" element={<ScanOverview />} />
        <Route path="/dashboard/scans/:scanId/ai-visibility" element={<ScanAIVisibility />} />
        <Route path="/dashboard/scans/:scanId/brand-accuracy" element={<ScanBrandAccuracy />} />
        <Route path="/dashboard/scans/:scanId/content-freshness" element={<ScanContentFreshness />} />
        <Route path="/dashboard/scans/new" element={<RunScan />} />
        <Route path="/dashboard/scans/settings" element={<AdvancedScanSettings />} />
        <Route path="/dashboard/improvement-plan" element={<ImprovementPlan />} />
        <Route path="/dashboard/improvement-plan/fix" element={<ImprovementPlanExpanded />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/security" element={<Security />} />
        <Route path="/dashboard/preferences" element={<Preferences />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/dashboard/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
