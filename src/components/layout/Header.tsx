import { navItems } from "@/data/mock-landing";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="flex items-center justify-between w-full h-[68px] px-10 bg-white border-b border-border-light shrink-0">
      {/* Logo */}
      <button
        className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0"
        onClick={() => console.log("ACTION: navigate_home")}
      >
        <div
          className="w-[26px] h-[26px] rounded-[5px] shrink-0"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 135deg, oklab(62.2% -0.105 -0.015) 0%, oklab(77.6% -0.110 -0.017) 100%)",
          }}
        />
        <span className="tracking-[-0.5px] text-navy font-bold text-[17px]/[22px]">
          Unlocked AEO
        </span>
      </button>

      {/* Nav */}
      <nav className="flex items-center gap-0.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center rounded-md py-2 px-3.5 gap-[3px] bg-transparent border-none cursor-pointer hover:bg-surface transition-colors"
            onClick={() =>
              console.log("ACTION: navigate", { page: item.label })
            }
          >
            <span className="text-slate-text font-medium text-sm/[18px]">
              {item.label}
            </span>
            {item.hasDropdown && (
              <span className="mt-px text-slate-text text-[9px]/3">▾</span>
            )}
          </button>
        ))}
      </nav>

      {/* CTAs */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("ACTION: navigate_dashboard")}
        >
          Dashboard
        </Button>
        <Button
          variant="dark"
          size="sm"
          onClick={() => console.log("ACTION: contact_sales")}
        >
          Contact sales ›
        </Button>
      </div>
    </header>
  );
}
