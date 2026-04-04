import { useState } from "react";
import {
  termsIntro,
  termsSections,
  termsContact,
} from "@/data/mock-terms";

export function TermsContent() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <section className="flex items-start pt-18 pb-20 gap-20 bg-white px-10 lg:px-20">
      {/* Table of contents sidebar */}
      <nav className="flex flex-col w-[220px] shrink-0 gap-0.5 sticky top-8">
        <span className="tracking-[1.8px] uppercase mb-3.5 text-[#94A3B8] text-[11px]/3.5">
          Contents
        </span>
        {termsSections.map((section, i) => (
          <button
            key={section.number}
            className={`rounded-md py-[7px] px-3 text-left text-[13px]/4 bg-transparent border-none cursor-pointer transition-colors ${
              i === activeSection
                ? "bg-teal/6 text-teal"
                : "text-[#64748B] hover:text-navy"
            }`}
            onClick={() => {
              setActiveSection(i);
              console.log("ACTION: navigate_to_section", {
                section: section.tocLabel,
              });
            }}
          >
            {section.tocLabel}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex flex-col grow shrink basis-0 max-w-[820px] gap-12">
        {/* Intro callout */}
        <div className="rounded-xl py-6 px-7 bg-teal/6 border-[1.5px] border-teal">
          <p className="text-sm leading-[1.7] text-navy">{termsIntro}</p>
        </div>

        {/* Sections */}
        {termsSections.map((section, i) => {
          const isLast = i === termsSections.length - 1;
          const isContact = section.number === "12";

          return (
            <div
              key={section.number}
              className={`flex flex-col gap-3 ${!isLast ? "pb-12 border-b border-[#F1F5F9]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="tracking-[1.5px] uppercase text-teal shrink-0 text-[11px]/3.5">
                  {section.number}
                </span>
                <h2 className="text-navy font-bold shrink-0 text-[22px]/7">
                  {section.title}
                </h2>
              </div>
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[15px] leading-[1.75] text-[#475569]"
                >
                  {p}
                </p>
              ))}
              {isContact && (
                <div className="flex flex-col rounded-[10px] py-5 px-6 gap-1.5 bg-surface border border-[#E2E8F0]">
                  <span className="text-navy text-[15px]/[18px]">
                    {termsContact.company}
                  </span>
                  <button
                    className="text-left text-[#64748B] text-sm/[18px] bg-transparent border-none cursor-pointer p-0 hover:text-teal transition-colors"
                    onClick={() =>
                      console.log("ACTION: email_legal", {
                        email: termsContact.email,
                      })
                    }
                  >
                    {termsContact.email}
                  </button>
                  <span className="text-[#64748B] text-sm/[18px]">
                    {termsContact.location}
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
