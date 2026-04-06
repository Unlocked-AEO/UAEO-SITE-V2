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
    <div className="font-sans antialiased flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* Top bar */}
      <header className="flex items-center shrink-0 h-14 px-7 gap-3 bg-white border-b border-border-light">
        <button
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0"
          onClick={() => navigate("/")}
        >
          <LogoIcon size={28} />
          <span className="tracking-[-0.3px] text-navy font-bold text-[15px]/[18px]">
            Unlocked AEO
          </span>
        </button>

        <div className="grow" />

        <button
          className="flex items-center gap-4 bg-transparent border-none cursor-pointer p-0"
          onClick={() => navigate("/dashboard/profile")}
        >
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
        </button>
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
            onClick={() => {
              if (tab.href) {
                navigate(tab.href);
              } else {
                console.log("ACTION: navigate_dashboard_tab", { tab: tab.slug });
              }
            }}
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
