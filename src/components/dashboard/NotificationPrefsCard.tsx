import {
  notificationPrefs,
  notificationSection,
} from "@/data/mock-preferences";

export function NotificationPrefsCard() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Header */}
      <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
        <div className="text-navy font-sans text-sm/[18px]">
          {notificationSection.title}
        </div>
        <div className="mt-0.5 text-[#94A3B8] font-sans text-xs/4">
          {notificationSection.subtitle}
        </div>
      </div>

      {/* Toggle rows */}
      <div className="py-2">
        {notificationPrefs.map((pref, i) => (
          <div
            key={pref.id}
            className={`flex items-center py-4.5 px-7 gap-4 ${
              i < notificationPrefs.length - 1
                ? "border-b border-[#F8FAFC]"
                : ""
            }`}
          >
            <div className="grow">
              <div className="text-navy font-sans text-[13px]/4">
                {pref.title}
              </div>
              <div className="mt-0.5 text-[#94A3B8] font-sans text-xs/4">
                {pref.description}
              </div>
            </div>
            <button
              className={`w-10 h-5.5 flex items-center rounded-full shrink-0 p-0.5 border-none cursor-pointer transition-colors ${
                pref.enabled ? "bg-[#0D9488]" : "bg-[#E2E8F0]"
              }`}
              onClick={() =>
                console.log("ACTION: toggle_notification", {
                  id: pref.id,
                  newValue: !pref.enabled,
                })
              }
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white shrink-0 transition-all ${
                  pref.enabled ? "ml-auto" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
