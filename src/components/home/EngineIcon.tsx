import geminiLogo from "@/assets/gemini-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";

interface EngineIconProps {
  slug: string;
  size?: number;
  variant?: "logo" | "badge";
}

export function EngineIcon({ slug, size = 20, variant = "logo" }: EngineIconProps) {
  if (variant === "badge") {
    return <EngineIconBadge slug={slug} />;
  }

  switch (slug) {
    case "chatgpt":
      return (
        <svg width={size} height={size} viewBox="0 0 22 22" fill="none" className="shrink-0">
          <path
            d="M11 0C8.07 0 5.42 1.37 3.67 3.52A5.5 5.5 0 0 0 1.1 8.25a5.5 5.5 0 0 0 .73 9.17A5.5 5.5 0 0 0 7.7 21.9 5.5 5.5 0 0 0 11 22a5.5 5.5 0 0 0 4.3-2.09 5.5 5.5 0 0 0 5.87-3.48 5.5 5.5 0 0 0 .73-9.17A5.5 5.5 0 0 0 18.33 3.52 5.5 5.5 0 0 0 11 0z"
            fill="#74AA9C"
          />
          <path
            d="M11 4.4a6.6 6.6 0 1 1 0 13.2A6.6 6.6 0 0 1 11 4.4zm0 1.6a5 5 0 1 0 0 10A5 5 0 0 0 11 6zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case "perplexity":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="shrink-0">
          <rect width="20" height="20" rx="4" fill="#20808D" />
          <path
            d="M5 10h10M10 5v10M6.5 6.5l7 7M13.5 6.5l-7 7"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "gemini":
      return (
        <img src={geminiLogo} alt="Gemini" width={size} height={size} className="shrink-0" />
      );
    case "grok":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path
            d="M4 4L16 16M16 4L4 16"
            stroke="#0A2540"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="10" r="3" fill="#0A2540" />
        </svg>
      );
    case "claude":
      return (
        <img src={claudeLogo} alt="Claude" width={size} height={size} className="shrink-0" />
      );
    case "copilot":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="shrink-0">
          <circle cx="10" cy="10" r="8" fill="#0078D4" />
          <path
            d="M7 10.5L9 12.5L13 8"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return <div className="rounded bg-slate-muted" style={{ width: size, height: size }} />;
  }
}

function EngineIconBadge({ slug }: { slug: string }) {
  const configs: Record<string, { bg: string; icon: JSX.Element }> = {
    chatgpt: {
      bg: "bg-[#10A37F]",
      icon: (
        <svg width="12" height="12" viewBox="0 0 41 41" fill="#FFFFFF" className="shrink-0">
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.239-3.507 10.079 10.079 0 0 0-10.63 4.908 9.962 9.962 0 0 0-6.675 3.305 10.079 10.079 0 0 0-2.489 11.032 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.239 3.507 10.079 10.079 0 0 0 10.63-4.908 9.966 9.966 0 0 0 6.675-3.305 10.079 10.079 0 0 0 2.489-11.032z" />
        </svg>
      ),
    },
    perplexity: {
      bg: "bg-[#1C1C1C]",
      icon: (
        <svg width="10" height="10" viewBox="0 0 14 14" fill="#FFFFFF" className="shrink-0">
          <path d="M7 0L9.5 5H14L10.5 8.5L12 14L7 11L2 14L3.5 8.5L0 5H4.5L7 0Z" />
        </svg>
      ),
    },
    gemini: {
      bg: "bg-white border border-[#E8EAED]",
      icon: (
        <img src={geminiLogo} alt="Gemini" width="14" height="14" className="shrink-0" />
      ),
    },
    grok: {
      bg: "bg-black",
      icon: (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF" className="shrink-0">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    claude: {
      bg: "bg-[#FDF0EB]",
      icon: (
        <img src={claudeLogo} alt="Claude" width="14" height="14" className="shrink-0" />
      ),
    },
    copilot: {
      bg: "bg-white border border-[#E8EAED]",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <defs>
            <linearGradient id="copilot-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2870EA" />
              <stop offset="1" stopColor="#7B61FF" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="10" r="8" stroke="url(#copilot-grad)" strokeWidth="2" fill="none" />
          <circle cx="9" cy="10" r="1.2" fill="#2870EA" />
          <circle cx="15" cy="10" r="1.2" fill="#7B61FF" />
          <path d="M7 18 Q12 22 17 18" stroke="url(#copilot-grad)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
  };

  const config = configs[slug];
  if (!config) return null;

  return (
    <div className={`flex items-center justify-center shrink-0 rounded-[5px] size-5 ${config.bg}`}>
      {config.icon}
    </div>
  );
}
