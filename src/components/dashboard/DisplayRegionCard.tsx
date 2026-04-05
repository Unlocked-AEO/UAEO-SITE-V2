import {
  selectedTimezone,
  selectedTheme,
  displayRegionSection,
  type ThemeOption,
} from "@/data/mock-preferences";

const themes: { id: ThemeOption; label: string; icon: React.ReactNode }[] = [
  {
    id: "light",
    label: "Light",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="shrink-0" stroke="currentColor">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    id: "dark",
    label: "Dark",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="shrink-0" stroke="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: "system",
    label: "System",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="shrink-0" stroke="currentColor">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export function DisplayRegionCard() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Header */}
      <div className="py-5.5 px-7 border-b border-[#F0F4F8]">
        <div className="text-navy font-sans text-sm/[18px]">
          {displayRegionSection.title}
        </div>
        <div className="mt-0.5 text-[#94A3B8] font-sans text-xs/4">
          {displayRegionSection.subtitle}
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col md:flex-row py-6 px-7 gap-6">
        {/* Timezone */}
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[#475569] font-sans text-xs/4">
            Timezone
          </label>
          <button
            className="flex items-center rounded-[10px] py-2.5 px-3.5 gap-2.5 bg-white border-[1.5px] border-border-light cursor-pointer hover:border-[#CBD5E1] transition-colors"
            onClick={() => console.log("ACTION: open_timezone_picker")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="grow text-left text-navy font-sans text-[13px]/4">
              {selectedTimezone.label}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Theme */}
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[#475569] font-sans text-xs/4">Theme</label>
          <div className="flex gap-2">
            {themes.map((theme) => {
              const isActive = theme.id === selectedTheme;
              return (
                <button
                  key={theme.id}
                  className={`flex-1 flex items-center rounded-[10px] py-2.5 px-3.5 gap-2 border-[1.5px] cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#F7FEFE] border-teal text-[#0D9488]"
                      : "bg-[#FAFBFC] border-border-light text-[#94A3B8] hover:border-[#CBD5E1]"
                  }`}
                  onClick={() =>
                    console.log("ACTION: set_theme", { theme: theme.id })
                  }
                >
                  {theme.icon}
                  <span className="font-sans text-xs/4">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
        <button
          className="rounded-[10px] py-2.5 px-5.5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: save_display_preferences")}
        >
          <span className="text-white font-sans text-[13px]/4 font-medium">
            Save Preferences
          </span>
        </button>
      </div>
    </div>
  );
}
