import { useState } from "react";
import { scheduleWeek, bookingFormFields } from "@/data/mock-schedule-call";

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: '0' }}>
      <path d="M4 6l4 4 4-4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScheduleCalendar() {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);

  return (
    <section className="py-20 px-10 bg-[#F8FAFC]">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex gap-8">
          {/* Left — Calendar */}
          <div className="grow shrink basis-[0%] rounded-2xl bg-white border border-solid border-[#E6EBF1] overflow-clip">
            {/* Calendar header */}
            <div className="flex items-center justify-between py-4 px-6 border-b border-b-solid border-b-[#E6EBF1]">
              <h3 className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-base/5 m-0">
                Select a time
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[#64748B] font-['Inter',system-ui,sans-serif] text-sm/4.5">
                  Week of Apr 7, 2025
                </span>
                <div className="flex gap-1">
                  <button className="flex items-center justify-center size-7 rounded-md bg-[#F8FAFC] border border-solid border-[#E6EBF1] cursor-pointer hover:bg-[#F0F4F8] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: '0' }}>
                      <path d="M8 2L4 6l4 4" stroke="#425466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="flex items-center justify-center size-7 rounded-md bg-[#F8FAFC] border border-solid border-[#E6EBF1] cursor-pointer hover:bg-[#F0F4F8] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: '0' }}>
                      <path d="M4 2l4 4-4 4" stroke="#425466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Day columns */}
            <div className="flex">
              {scheduleWeek.map((day, dayIdx) => (
                <div
                  key={day.day}
                  className={`grow shrink basis-[0%] flex flex-col ${dayIdx < scheduleWeek.length - 1 ? "border-r border-r-solid border-r-[#E6EBF1]" : ""}`}
                >
                  {/* Day header */}
                  <div className="flex flex-col items-center py-3 border-b border-b-solid border-b-[#E6EBF1] bg-[#FAFBFC]">
                    <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-[11px]/3.5 uppercase tracking-[0.5px]">
                      {day.day}
                    </span>
                    <span className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-sm/4.5">
                      {day.date}
                    </span>
                  </div>

                  {/* Time slots */}
                  <div className="flex flex-col gap-1.5 p-2">
                    {day.slots.map((slot) => {
                      const isSelected = selectedSlot?.day === day.date && selectedSlot?.time === slot.time;
                      return (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          className={`py-2.5 rounded-lg text-center font-['Inter',system-ui,sans-serif] text-[13px]/4 border-none cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-[#4ECDC4] text-[#0A2540] font-semibold"
                              : slot.available
                                ? "bg-[#F0FDFA] text-[#0A2540] hover:bg-[#E0FAF7]"
                                : "bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed"
                          }`}
                          onClick={() => {
                            if (slot.available) {
                              setSelectedSlot({ day: day.date, time: slot.time });
                              console.log("ACTION: select_time_slot", { day: day.date, time: slot.time });
                            }
                          }}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Timezone note */}
            <div className="flex items-center justify-center py-3 border-t border-t-solid border-t-[#E6EBF1]">
              <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-xs/4">
                All times shown in Eastern Time (ET)
              </span>
            </div>
          </div>

          {/* Right — Booking form */}
          <div className="w-[380px] shrink-0 flex flex-col rounded-2xl bg-white border border-solid border-[#E6EBF1] p-7">
            <h3 className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-base/5 mb-1 m-0">
              Your details
            </h3>
            <p className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-[13px]/4 mb-6 m-0">
              {selectedSlot
                ? `Selected: ${selectedSlot.day} at ${selectedSlot.time} ET`
                : "Select a time slot to continue"}
            </p>

            <div className="flex flex-col gap-4">
              {/* Half-width fields */}
              {Array.from({ length: 2 }, (_, rowIdx) => {
                const pair = bookingFormFields.filter(f => f.halfWidth).slice(rowIdx * 2, rowIdx * 2 + 2);
                return (
                  <div key={rowIdx} className="flex gap-3">
                    {pair.map((field) => (
                      <div key={field.label} className="grow shrink basis-[0%] flex flex-col gap-1.5">
                        <label className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[12px]/3.5">
                          {field.label}{field.required ? " *" : ""}
                        </label>
                        {field.type === "select" ? (
                          <div className="h-10 flex items-center justify-between rounded-lg px-3 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0">
                            <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-[13px]/4">{field.placeholder}</span>
                            <ChevronDownIcon />
                          </div>
                        ) : (
                          <div className="h-10 flex items-center rounded-lg px-3 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0">
                            <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-[13px]/4">{field.placeholder}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Full-width textarea */}
              {bookingFormFields.filter(f => !f.halfWidth).map((field) => (
                <div key={field.label} className="flex flex-col gap-1.5">
                  <label className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[12px]/3.5">
                    {field.label}
                  </label>
                  <div className="flex items-start rounded-lg px-3 py-2.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] min-h-[80px]">
                    <span className="text-[#94A3B8] font-['Inter',system-ui,sans-serif] text-[13px]/4">
                      {field.placeholder}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              className={`mt-6 h-11 flex items-center justify-center rounded-xl border-none cursor-pointer transition-opacity ${
                selectedSlot
                  ? "bg-[#4ECDC4] hover:opacity-90"
                  : "bg-[#E2E8F0] cursor-not-allowed"
              }`}
              onClick={() => {
                if (selectedSlot) {
                  console.log("ACTION: confirm_booking", {
                    ...selectedSlot,
                  });
                }
              }}
            >
              <span className={`font-['Inter',system-ui,sans-serif] font-bold text-[14px]/4.5 ${selectedSlot ? "text-[#0A2540]" : "text-[#94A3B8]"}`}>
                Confirm booking
              </span>
            </button>

            <p className="mt-3 text-[11px] text-center leading-[150%] text-[#94A3B8] font-['Inter',system-ui,sans-serif] m-0">
              30-minute call · Free · No commitment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
