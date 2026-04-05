import { dashboardUser } from "@/data/mock-dashboard";
import { settingsTabs, profilePageHeader } from "@/data/mock-profile";
import type { SettingsTab } from "@/data/mock-profile";

interface SettingsShellProps {
  activeTab: string;
  children: React.ReactNode;
}

export function SettingsShell({ activeTab, children }: SettingsShellProps) {
  return (
    <div className="font-sans antialiased flex flex-col min-h-screen bg-surface">
      {/* Top bar */}
      <header className="flex items-center h-14 shrink-0 px-7 bg-white border-b border-border-light">
        <button
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
          onClick={() => console.log("ACTION: navigate_home")}
        >
          <div className="flex items-center justify-center shrink-0 rounded-md bg-teal size-7">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <circle cx="8" cy="8" r="5.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <path
                d="M5.5 8h5M8 5.5v5"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-navy font-sans text-sm/[18px]">
            Unlocked AEO
          </span>
        </button>

        <div className="grow" />

        <div className="flex items-center gap-2">
          <span className="text-slate-body font-sans text-sm/[18px]">
            {dashboardUser.company}
          </span>
          <div className="flex items-center justify-center shrink-0 rounded-full bg-teal size-9">
            <span className="text-white font-sans text-[13px]/4">
              {dashboardUser.initials}
            </span>
          </div>
        </div>
      </header>

      {/* Page header + tabs */}
      <div className="shrink-0 bg-white border-b border-border-light">
        <div className="max-w-[1360px] px-10 mx-auto">
          {/* Title row */}
          <div className="flex items-center pt-6 pb-5 gap-3.5">
            <button
              className="flex items-center justify-center shrink-0 rounded-lg bg-white border-[1.5px] border-border-light size-8 cursor-pointer hover:bg-surface transition-colors"
              onClick={() => console.log("ACTION: navigate_back")}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M9 11L5 7L9 3"
                  stroke="#425466"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div>
              <h1 className="tracking-[-0.3px] text-navy font-sans text-xl/6 m-0">
                {profilePageHeader.title}
              </h1>
              <p className="mt-0.5 text-[#94A3B8] font-sans text-[13px]/4 m-0">
                {profilePageHeader.subtitle}
              </p>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex">
            {settingsTabs.map((tab: SettingsTab) => (
              <button
                key={tab.slug}
                className={`pt-2.5 pb-3 px-5 border-b-[2.5px] bg-transparent border-x-0 border-t-0 cursor-pointer transition-colors ${
                  tab.slug === activeTab
                    ? "border-b-teal"
                    : "border-b-transparent"
                }`}
                onClick={() =>
                  console.log("ACTION: navigate_settings_tab", {
                    tab: tab.slug,
                  })
                }
              >
                <span
                  className={`font-sans text-[13px]/4 ${
                    tab.slug === activeTab
                      ? "text-[#0D9488]"
                      : "text-[#94A3B8]"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="grow max-w-[1360px] w-full flex flex-col py-8 px-10 gap-5 mx-auto">
        {children}
      </main>
    </div>
  );
}
