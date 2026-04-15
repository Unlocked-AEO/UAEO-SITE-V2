import { useNavigate } from "react-router-dom";
import { dashboardUser, dashboardTabs } from "@/data/mock-dashboard";
import { LogoIcon } from "@/components/ui/LogoIcon";

interface DashboardShellProps {
  activeTab: string;
  children: React.ReactNode;
}

export function DashboardShell({ activeTab, children }: DashboardShellProps) {
  const navigate = useNavigate();

  return (
    <div className="font-sans antialiased flex flex-col min-h-screen bg-surface">
      {/* Header */}
      <header className="flex items-end shrink-0 px-8 bg-white border-b border-border-light">
        {/* Logo */}
        <div className="flex items-center h-14 shrink-0">
          <button
            className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity duration-150"
            onClick={() => navigate("/")}
          >
            <LogoIcon size={28} />
            <span className="tracking-[-0.3px] text-navy font-semibold text-sm/5">
              Unlocked AEO
            </span>
          </button>
        </div>

        {/* Tabs */}
        <nav className="flex mx-auto -mb-px">
          {dashboardTabs.map((tab) => (
            <button
              key={tab.slug}
              className={`flex items-center px-5 py-4 border-b-2 bg-transparent border-x-0 border-t-0 cursor-pointer transition-colors duration-150 ${
                tab.slug === activeTab
                  ? "border-b-teal"
                  : "border-b-transparent hover:border-b-border-light"
              }`}
              onClick={() => {
                if (tab.href) {
                  navigate(tab.href);
                } else {
                  console.log("ACTION: navigate_dashboard_tab", { tab: tab.slug });
                }
              }}
            >
              <span
                className={`text-[13px]/4 whitespace-nowrap transition-colors duration-150 ${
                  tab.slug === activeTab
                    ? "text-navy font-semibold"
                    : "text-slate-muted hover:text-slate-body"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="flex items-center h-14 shrink-0">
          <button
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity duration-150"
            onClick={() => navigate("/dashboard/profile")}
          >
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-navy font-medium text-[13px]/4">
                {dashboardUser.company}
              </span>
              <span className="text-slate-muted text-[11px]/3">
                {dashboardUser.lastScan}
              </span>
            </div>
            <div className="flex items-center justify-center shrink-0 rounded-full bg-teal size-8">
              <span className="text-white font-semibold text-xs/4">
                {dashboardUser.initials}
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="grow flex flex-col gap-5 pt-6 pb-10 px-8">
        {children}
      </main>
    </div>
  );
}
