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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
