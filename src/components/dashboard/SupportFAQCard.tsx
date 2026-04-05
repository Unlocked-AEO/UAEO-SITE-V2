import { supportFAQs } from "@/data/mock-support";
import type { SupportFAQ } from "@/data/mock-support";

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#94A3B8"
      strokeWidth="2.5"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FAQRow({ faq, isLast }: { faq: SupportFAQ; isLast: boolean }) {
  return (
    <button
      className={`flex items-center justify-between py-4 px-7 w-full bg-transparent border-none cursor-pointer text-left hover:bg-[#FAFBFC] transition-colors ${
        !isLast ? "border-b border-[#F8FAFC]" : ""
      }`}
      onClick={() =>
        console.log("ACTION: toggle_support_faq", { id: faq.id })
      }
    >
      <span className="text-navy font-sans text-[13px]/4">
        {faq.question}
      </span>
      <ChevronDownIcon />
    </button>
  );
}

export function SupportFAQCard() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Header */}
      <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
        <h2 className="text-navy font-sans text-sm/[18px] m-0">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ list */}
      <div>
        {supportFAQs.map((faq, idx) => (
          <FAQRow
            key={faq.id}
            faq={faq}
            isLast={idx === supportFAQs.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
