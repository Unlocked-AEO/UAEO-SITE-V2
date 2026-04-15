import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactFAQs } from "@/data/mock-contact";

export function ContactFAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-10 bg-[#F8FAFC]">
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-[28px] tracking-[-1px] leading-[115%] mb-2 text-center text-[#0A2540] font-sans font-bold">
            Common questions
          </h2>
          <p className="text-[15px] leading-[165%] text-center text-[#64748B] font-sans m-0">
            Can't find what you're looking for?{" "}
            <button
              className="text-[#4ECDC4] font-sans font-semibold text-[15px] bg-transparent border-none cursor-pointer p-0 hover:underline"
              onClick={() => navigate("/faq")}
            >
              Browse all FAQs →
            </button>
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col rounded-2xl overflow-clip bg-white border border-solid border-[#E6EBF1]">
          {contactFAQs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={i}
                className={`flex flex-col text-left bg-transparent border-0 cursor-pointer px-6 ${
                  i < contactFAQs.length - 1 ? "border-b border-b-solid border-b-[#F1F5F9]" : ""
                }`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between py-5 gap-4">
                  <span className="text-[#0A2540] font-sans font-semibold text-[15px]/5">
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M4 6l4 4 4-4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {isOpen && (
                  <div className="pb-5 -mt-1">
                    <p className="text-[14px] leading-[165%] text-[#64748B] font-sans m-0">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
