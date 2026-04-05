import { useState } from "react";
import {
  privacyIntro,
  policySections,
  privacyContact,
} from "@/data/mock-privacy";

export function PrivacyContent() {
  const [activeSection, setActiveSection] = useState(policySections[0].id);

  const handleTocClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    console.log("ACTION: navigate_toc", { section: sectionId });
  };

  return (
    <section className="flex items-start pt-18 pb-20 gap-20 bg-white px-20">
      {/* Table of contents sidebar */}
      <nav className="flex flex-col w-[220px] shrink-0 gap-0.5 sticky top-8">
        <span className="tracking-[1.8px] uppercase mb-3.5 text-[#94A3B8] text-[11px]/3.5">
          Contents
        </span>
        {policySections.map((section) => (
          <button
            key={section.id}
            className={`rounded-md py-[7px] px-3 text-left text-[13px]/4 bg-transparent border-none cursor-pointer transition-colors ${
              activeSection === section.id
                ? "bg-[#F0FDFA] text-teal"
                : "text-[#64748B] hover:text-navy hover:bg-surface"
            }`}
            onClick={() => handleTocClick(section.id)}
          >
            {section.tocLabel}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <div className="flex flex-col grow shrink basis-0 max-w-[820px] gap-12">
        {/* Intro callout */}
        <div className="rounded-xl py-6 px-7 bg-[#F0FDFA] border-[1.5px] border-teal">
          <p className="text-[14px] leading-[1.7] text-navy">
            {privacyIntro}
          </p>
        </div>

        {/* Policy sections */}
        {policySections.map((section, i) => {
          const isLast = i === policySections.length - 1;
          return (
            <div
              key={section.id}
              id={section.id}
              className={`flex flex-col gap-3 ${
                isLast ? "" : "pb-12 border-b border-[#F1F5F9]"
              }`}
            >
              {/* Section header */}
              <div className="flex items-center gap-3">
                <span className="tracking-[1.5px] uppercase text-teal shrink-0 text-[11px]/3.5">
                  {section.number}
                </span>
                <h2 className="text-navy font-bold shrink-0 text-[22px]/7">
                  {section.title}
                </h2>
              </div>

              {/* Paragraphs */}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[15px] leading-[1.75] text-[#475569]"
                >
                  {p}
                </p>
              ))}

              {/* Contact card for last section */}
              {section.id === "contact-us" && (
                <div className="flex flex-col rounded-[10px] py-5 px-6 gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-navy text-[15px]/[18px]">
                    {privacyContact.company}
                  </span>
                  <button
                    className="text-left text-[#64748B] text-sm/[18px] bg-transparent border-none cursor-pointer p-0 hover:text-teal transition-colors w-fit"
                    onClick={() =>
                      console.log("ACTION: email_privacy", {
                        email: privacyContact.email,
                      })
                    }
                  >
                    {privacyContact.email}
                  </button>
                  <span className="text-[#64748B] text-sm/[18px]">
                    {privacyContact.location}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
