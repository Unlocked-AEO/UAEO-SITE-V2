import { dashboardUser, dashboardTabs } from "@/data/mock-dashboard";

interface DashboardShellProps {
  activeTab: string;
  children: React.ReactNode;
}

export function DashboardShell({ activeTab, children }: DashboardShellProps) {
  return (
    <div className="font-sans antialiased flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* Top bar */}
      <header className="flex items-center shrink-0 h-14 px-7 gap-3 bg-white border-b border-border-light">
        <button
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0"
          onClick={() => console.log("ACTION: navigate_home")}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#4ECDC4" />
            <path
              d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 4c2.21 0 4.26.65 5.98 1.76L7.76 23.98A9.96 9.96 0 0 1 6 18c0-5.514 4.486-10 10-10zm0 20c-2.21 0-4.26-.65-5.98-1.76l14.22-14.22A9.96 9.96 0 0 1 26 18c0 5.514-4.486 10-10 10z"
              fill="#FFFFFF"
            />
          </svg>
          <span className="tracking-[-0.3px] text-navy font-bold text-[15px]/[18px]">
            Unlocked AEO
          </span>
        </button>

        <div className="grow" />

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-px">
            <span className="text-navy font-semibold text-[13px]/4">
              {dashboardUser.company}
            </span>
            <span className="text-slate-muted text-[10px]/3">
              {dashboardUser.lastScan}
            </span>
          </div>
          <div className="flex items-center justify-center shrink-0 rounded-full bg-teal size-9">
            <span className="text-white font-bold text-[13px]/4">
              {dashboardUser.initials}
            </span>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <nav className="flex px-7 bg-white border-b border-border-light">
        {dashboardTabs.map((tab) => (
          <button
            key={tab.slug}
            className={`flex items-center -mb-px px-4 py-3 border-b-2 bg-transparent border-none cursor-pointer transition-colors ${
              tab.slug === activeTab
                ? "border-b-teal"
                : "border-b-transparent"
            }`}
            onClick={() =>
              console.log("ACTION: navigate_dashboard_tab", { tab: tab.slug })
            }
          >
            <span
              className={`text-[13px]/4 whitespace-nowrap ${
                tab.slug === activeTab
                  ? "text-navy font-semibold"
                  : "text-slate-muted"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="grow flex flex-col gap-5 pt-6 pb-10 px-7">
        {children}
      </main>
    </div>
  );
}
