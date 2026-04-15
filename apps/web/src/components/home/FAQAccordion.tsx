import { useState } from "react";
import { faqCategories } from "@/data/mock-faq";

export function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState(
    faqCategories[0].slug
  );

  return (
    <section className="w-full flex items-start gap-20 min-h-475 bg-white p-20">
      {/* Sidebar nav */}
      <div className="flex flex-col w-55 shrink-0 pt-1 gap-1">
        <div className="tracking-[1.8px] uppercase mb-3 text-slate-muted font-sans text-[11px]/3.5">
          Jump to
        </div>
        {faqCategories.map((cat) => (
          <button
            key={cat.slug}
            className={`rounded-lg py-2 px-3.5 text-left border-none cursor-pointer font-sans text-sm/4.5 transition-colors ${
              activeCategory === cat.slug
                ? "bg-[#F0FDFA] text-teal"
                : "bg-transparent text-[#64748B] hover:bg-surface"
            }`}
            onClick={() => {
              setActiveCategory(cat.slug);
              console.log("ACTION: jump_to_category", { category: cat.slug });
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ content */}
      <div className="flex flex-col grow shrink basis-0 gap-14">
        {faqCategories.map((cat) => (
          <FAQSection key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  );
}

function FAQSection({ category }: { category: (typeof faqCategories)[0] }) {
  return (
    <div className="flex flex-col">
      <div className="tracking-[1.8px] uppercase mb-6 text-teal font-sans text-[11px]/3.5">
        {category.label}
      </div>
      {category.items.map((item, i) => (
        <FAQItemRow
          key={item.question}
          item={item}
          isLast={i === category.items.length - 1}
        />
      ))}
    </div>
  );
}

function FAQItemRow({
  item,
  isLast,
}: {
  item: (typeof faqCategories)[0]["items"][0];
  isLast: boolean;
}) {
  const [isOpen, setIsOpen] = useState(item.defaultOpen ?? false);
  const hasAnswer = !!item.answer;

  return (
    <div
      className={`flex flex-col py-6 border-t border-[#E2E8F0] ${
        isLast ? "border-b" : ""
      }`}
    >
      <button
        className="flex justify-between items-start gap-6 bg-transparent border-none cursor-pointer p-0 text-left w-full"
        onClick={() => {
          if (hasAnswer) {
            setIsOpen(!isOpen);
            console.log("ACTION: toggle_faq", {
              question: item.question,
              open: !isOpen,
            });
          }
        }}
      >
        <span
          className={`text-[17px] leading-[1.4] text-navy shrink-0 ${
            isOpen && hasAnswer ? "font-bold" : "font-semibold"
          }`}
        >
          {item.question}
        </span>
        <div
          className={`flex items-center justify-center shrink-0 rounded-full border-[1.5px] size-6 ${
            isOpen && hasAnswer
              ? "bg-[#F0FDFA] border-teal"
              : "bg-surface border-[#E2E8F0]"
          }`}
        >
          <span
            className={`font-sans text-sm/4.5 ${
              isOpen && hasAnswer ? "text-teal" : "text-slate-muted"
            }`}
          >
            {isOpen && hasAnswer ? "−" : "+"}
          </span>
        </div>
      </button>
      {isOpen && hasAnswer && (
        <p className="text-[15px] leading-[1.7] mt-4 max-w-[680px] text-[#64748B] m-0">
          {item.answer}
        </p>
      )}
    </div>
  );
}
