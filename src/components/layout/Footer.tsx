import { useNavigate } from "react-router-dom";
import {
  footerColumns,
  footerTagline,
  footerLegalLinks,
  footerCopyright,
} from "@/data/mock-landing";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="flex flex-col pt-16 pb-12 gap-12 bg-navy px-20">
      <div className="flex gap-15">
        {/* Brand column */}
        <div className="grow-0 shrink-0 basis-[220px] flex flex-col gap-4">
          <span className="tracking-[-0.02em] text-white font-extrabold text-[17px]/[22px]">
            Unlocked AEO
          </span>
          <p className="text-[13px] leading-[1.65] max-w-[180px] text-white/45">
            {footerTagline}
          </p>
          <div className="flex mt-1 gap-3">
            {["threads", "x", "linkedin"].map((platform) => (
              <button
                key={platform}
                className="flex items-center justify-center rounded-md bg-white/8 shrink-0 size-8 border-none cursor-pointer hover:bg-white/15 transition-colors"
                onClick={() =>
                  console.log("ACTION: open_social", { platform })
                }
              >
                <SocialIcon platform={platform} />
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div
            key={col.title}
            className="grow shrink basis-0 flex flex-col gap-3"
          >
            <span className="tracking-[0.06em] uppercase mb-1 text-white/35 font-semibold text-xs/4">
              {col.title}
            </span>
            {col.links.map((link) => (
              <button
                key={link.label}
                className="text-left text-white/65 text-[13px]/4 bg-transparent border-none cursor-pointer p-0 hover:text-white/90 transition-colors"
                onClick={() => {
                  if (link.href) {
                    navigate(link.href);
                  } else {
                    console.log("ACTION: navigate_footer", { link: link.label });
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="h-px bg-white/8 shrink-0" />

      <div className="flex justify-between items-center">
        <span className="text-white/30 text-xs/4">{footerCopyright}</span>
        <div className="flex gap-6">
          {footerLegalLinks.map((link) => (
            <button
              key={link.label}
              className="text-white/30 text-xs/4 bg-transparent border-none cursor-pointer p-0 hover:text-white/60 transition-colors"
              onClick={() => {
                if (link.href) {
                  navigate(link.href);
                } else {
                  console.log("ACTION: navigate_legal", { page: link.label });
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "threads":
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M2 4h11M2 7.5h11M2 11h11"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "x":
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M1 7.5C1 3.9 3.9 1 7.5 1S14 3.9 14 7.5 11.1 14 7.5 14 1 11.1 1 7.5z"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.4"
          />
          <path
            d="M9.5 3H11L9 7.5 11 12H9.5L7.5 8.5 5.5 12H4L6 7.5 4 3h1.5L7.5 6.5z"
            fill="rgba(255,255,255,0.5)"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect
            x="1"
            y="1"
            width="13"
            height="13"
            rx="3"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.4"
          />
          <path
            d="M5 8V6M7.5 8V5M10 8V7"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
