import { contactFormFields, contactFormTopics } from "@/data/mock-contact";
import type { ContactFormField } from "@/data/mock-contact";

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: '0' }}>
      <path d="M4 6l4 4 4-4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FormField({ field }: { field: ContactFormField }) {
  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[13px]/4">
          {field.label}{field.required ? " *" : ""}
        </label>
        <div className="flex items-start rounded-[10px] px-3.5 py-3 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] min-h-[120px]">
          <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-sm/5">
            {field.placeholder}
          </span>
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[13px]/4">
          {field.label}{field.required ? " *" : ""}
        </label>
        <div className="h-11 flex items-center justify-between rounded-[10px] px-3.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0">
          <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-sm/4.5">
            {field.placeholder}
          </span>
          <ChevronDownIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[13px]/4">
        {field.label}{field.required ? " *" : ""}
      </label>
      <div className="h-11 flex items-center rounded-[10px] px-3.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0">
        <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-sm/4.5">
          {field.placeholder}
        </span>
      </div>
    </div>
  );
}

export function ContactForm() {
  const halfWidthFields = contactFormFields.filter((f) => f.halfWidth);
  const fullWidthFields = contactFormFields.filter((f) => !f.halfWidth);

  return (
    <section className="py-20 px-10 bg-[#F8FAFC]">
      <div className="max-w-[680px] mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-[28px] tracking-[-1px] leading-[115%] mb-2 text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold">
            Send us a message
          </h2>
          <p className="text-[15px] leading-[165%] text-[#64748B] font-['Inter',system-ui,sans-serif] m-0">
            Fill out the form below and we'll get back to you within one business day.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Half-width rows */}
          {Array.from({ length: Math.ceil(halfWidthFields.length / 2) }, (_, rowIdx) => {
            const pair = halfWidthFields.slice(rowIdx * 2, rowIdx * 2 + 2);
            return (
              <div key={rowIdx} className="flex gap-4">
                {pair.map((field) => (
                  <div key={field.label} className="grow shrink basis-[0%]">
                    <FormField field={field} />
                  </div>
                ))}
              </div>
            );
          })}

          {/* Full-width fields */}
          {fullWidthFields.map((field) => (
            <FormField key={field.label} field={field} />
          ))}
        </div>

        {/* Submit */}
        <button
          className="mt-8 w-full h-12 flex items-center justify-center rounded-xl bg-[#4ECDC4] border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: submit_contact_form")}
        >
          <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold text-[15px]/4.5">
            Send message
          </span>
        </button>

        {/* Privacy note */}
        <p className="mt-4 text-[12px] text-center leading-[160%] text-[#94A3B8] font-['Inter',system-ui,sans-serif] m-0">
          By submitting this form you agree to our{" "}
          <a href="/privacy" className="text-[#94A3B8] underline hover:text-[#64748B]">Privacy Policy</a>.
          We'll never share your information with third parties.
        </p>
      </div>
    </section>
  );
}
