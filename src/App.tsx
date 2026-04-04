import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/landing/Landing";
import HowItWorks from "@/pages/landing/HowItWorks";
import About from "@/pages/landing/About";
import WhatIsAEO from "@/pages/landing/WhatIsAEO";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-is-aeo" element={<WhatIsAEO />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
