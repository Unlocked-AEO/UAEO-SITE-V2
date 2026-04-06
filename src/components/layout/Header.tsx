import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems } from "@/data/mock-landing";
import type { NavItem } from "@/data/mock-landing";
import { Button } from "@/components/ui/Button";
import { IS_LOGGED_IN } from "@/lib/mock-auth";

function NavButton({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hasDropdown = item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <button
        className={`flex items-center rounded-md py-2 px-3.5 gap-[3px] bg-transparent border-none cursor-pointer hover:bg-surface transition-colors ${isActive ? "border-b-2 border-b-teal rounded-b-none" : ""}`}
        onClick={() => {
          if (item.href) {
            navigate(item.href);
          } else if (!hasDropdown) {
            console.log("ACTION: navigate", { page: item.label });
          }
        }}
      >
        <span className={`font-medium text-sm/[18px] ${isActive ? "text-navy" : "text-slate-text"}`}>
          {item.label}
        </span>
        {item.hasDropdown && (
          <span className="mt-px text-slate-text text-[9px]/3">▾</span>
        )}
      </button>

      {hasDropdown && open && (
        <div className="absolute top-full left-0 pt-1 z-50">
          <div className="flex flex-col rounded-lg py-1.5 bg-white border border-border-light shadow-[0px_8px_24px_#0A254014] min-w-[180px]">
            {item.dropdownItems!.map((sub) => (
              <button
                key={sub.label}
                className="text-left py-2.5 px-4 bg-transparent border-none cursor-pointer hover:bg-surface transition-colors"
                onClick={() => {
                  setOpen(false);
                  if (sub.href) {
                    navigate(sub.href);
                  } else {
                    console.log("ACTION: navigate", { page: sub.label });
                  }
                }}
              >
                <span className="text-slate-text text-sm/[18px]">
                  {sub.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function isNavActive(item: NavItem, pathname: string): boolean {
  // Check direct href match
  if (item.href && pathname === item.href) return true;
  // Check dropdown children
  if (item.dropdownItems) {
    return item.dropdownItems.some((sub) => sub.href && pathname === sub.href);
  }
  return false;
}

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="flex items-center justify-between w-full h-[68px] px-10 bg-white border-b border-border-light shrink-0">
      {/* Logo */}
      <button
        className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0"
        onClick={() => navigate("/")}
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
          <NavButton key={item.label} item={item} isActive={isNavActive(item, pathname)} />
        ))}
      </nav>

      {/* CTAs */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(IS_LOGGED_IN ? "/dashboard" : "/signup")}
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
