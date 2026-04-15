import { useState } from "react";
import { contactSupportSection } from "@/data/mock-support";

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

function CheckCircleIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" fill="#4ECDC4" opacity="0.12" />
      <circle cx="12" cy="12" r="10" stroke="#4ECDC4" strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="#4ECDC4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-12 px-7 gap-3">
      <CheckCircleIcon />
      <h3 className="text-navy font-sans text-[15px]/[18px] m-0 mt-1">
        Message sent!
      </h3>
      <p className="text-[#94A3B8] font-sans text-[13px]/4 m-0 text-center max-w-xs">
        We'll get back to you within 2 business hours.
      </p>
      <button
        className="mt-2 text-teal font-sans text-[13px]/4 bg-transparent border-none cursor-pointer hover:underline"
        onClick={() => {
          console.log("ACTION: reset_support_form");
          onReset();
        }}
      >
        Send another message
      </button>
    </div>
  );
}

export function ContactSupportCard() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Header */}
      <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
        <h2 className="text-navy font-sans text-sm/[18px] m-0">
          {contactSupportSection.title}
        </h2>
        <p className="mt-0.75 text-[#94A3B8] font-sans text-xs/4 m-0">
          {contactSupportSection.subtitle}
        </p>
      </div>

      {sent ? (
        <SuccessState onReset={() => setSent(false)} />
      ) : (
        <>
          {/* Form */}
          <div className="flex flex-col py-6 px-7 gap-4">
            {/* Subject dropdown */}
            <div className="flex gap-3.5">
              <div className="grow flex flex-col gap-1.75">
                <label className="text-[#475569] font-sans text-xs/4">
                  Subject
                </label>
                <button
                  className="flex items-center rounded-[10px] py-2.75 px-3.5 gap-2.5 bg-white border-[1.5px] border-border-light cursor-pointer w-full text-left"
                  onClick={() =>
                    console.log("ACTION: open_support_topic_dropdown")
                  }
                >
                  <span className="grow text-[#CBD5E1] font-sans text-[13px]/4">
                    Select a topic…
                  </span>
                  <ChevronDownIcon />
                </button>
              </div>
            </div>

            {/* Message textarea */}
            <div className="flex flex-col gap-1.75">
              <label className="text-[#475569] font-sans text-xs/4">
                Message
              </label>
              <div className="min-h-[90px] rounded-[10px] py-3 px-3.5 bg-white border-[1.5px] border-border-light">
                <span className="text-[#CBD5E1] font-sans text-[13px]/4">
                  Describe your issue or question…
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
            <button
              className="rounded-[10px] py-2.5 px-5.5 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
              onClick={() => {
                console.log("ACTION: send_support_message");
                setSent(true);
              }}
            >
              <span className="text-white font-sans text-[13px]/4">
                Send Message
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
