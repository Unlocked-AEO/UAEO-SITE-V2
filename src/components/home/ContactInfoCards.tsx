import { useNavigate } from "react-router-dom";
import { contactInfoCards } from "@/data/mock-contact";
import type { ContactInfoCard } from "@/data/mock-contact";

function CardIcon({ icon }: { icon: ContactInfoCard["icon"] }) {
  switch (icon) {
    case "mail":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: '0' }}>
          <rect x="2" y="4" width="18" height="14" rx="3" stroke="#4ECDC4" strokeWidth="1.5" />
          <path d="M2 7l9 5 9-5" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: '0' }}>
          <path d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 3v-3H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 9h8M7 12h5" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: '0' }}>
          <rect x="2" y="4" width="18" height="16" rx="3" stroke="#4ECDC4" strokeWidth="1.5" />
          <path d="M2 9h18M7 2v4M15 2v4" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="11" cy="14" r="1.5" fill="#4ECDC4" />
        </svg>
      );
  }
}

export function ContactInfoCards() {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-10 bg-white">
      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center mb-13">
          <div className="inline-flex items-center mb-4 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-solid border-[#4ECDC459]">
            <div className="uppercase tracking-[0.8px] inline-block text-[#4ECDC4] font-sans shrink-0 text-[11px]/3.5">
              Get in Touch
            </div>
          </div>
          <h2 className="text-[38px] tracking-[-1px] leading-[115%] text-center text-[#0A2540] font-sans font-bold">
            Other ways to reach us.
          </h2>
        </div>

        {/* Cards */}
        <div className="flex gap-6">
          {contactInfoCards.map((card) => (
            <div
              key={card.title}
              className="grow shrink basis-[0%] flex flex-col rounded-2xl bg-[#F8FAFC] border border-solid border-[#E6EBF1] p-8"
            >
              <div className="flex items-center justify-center mb-5 rounded-xl size-11" style={{ backgroundImage: 'linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)' }}>
                <CardIcon icon={card.icon} />
              </div>
              <div className="mb-2.5 text-[#0A2540] font-sans text-lg/5.5">
                {card.title}
              </div>
              <div className="text-[14px] leading-[160%] text-[#64748B] font-sans grow">
                {card.description}
              </div>
              <button
                className="mt-5 text-[#4ECDC4] font-sans font-semibold text-sm/4.5 bg-transparent border-none cursor-pointer p-0 hover:underline text-left"
                onClick={() => {
                  if (card.ctaAction === "book_demo") {
                    navigate("/schedule");
                  } else {
                    console.log(`ACTION: ${card.ctaAction}`);
                  }
                }}
              >
                {card.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
