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
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path
            d="M10 2C10 2 12.5 7.5 18 10C12.5 12.5 10 18 10 18C10 18 7.5 12.5 2 10C7.5 7.5 10 2 10 2Z"
            fill="#4285F4"
          />
        </svg>
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
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path
            d="M10 2L13.5 8.5H18L14 12.5L15.5 18L10 14.5L4.5 18L6 12.5L2 8.5H6.5L10 2Z"
            fill="#CC785C"
          />
        </svg>
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
        <svg width="12" height="12" viewBox="0 0 192 192" fill="none" className="shrink-0">
          <defs>
            <linearGradient id="gemini-grad" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4" />
              <stop offset="0.5" stopColor="#9B72CB" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            d="M96 20c-4.4 13.4-14.2 24.8-28 31.2C54.2 57.6 40 58.4 27 54c4.4 13.4 3.4 28.4-3.2 41.2C17.2 108 7.8 117.4 0 122c13.4 4.4 24.8 14.2 31.2 28C37.6 163.8 38.4 178 34 191c13.4-4.4 28.4-3.4 41.2 3.2 12.8 6.6 22.2 16 26.8 23.8 4.6-7.8 14-17.2 26.8-23.8C141.6 187.6 156.6 186.6 170 191c-4.4-13.4-3.4-28.4 3.2-41.2C179.8 136.8 192 127.4 192 122c-13.4-4.4-24.8-14.2-31.2-28C154.4 80.2 155.4 65.2 158 52c-13.4 4.4-28.4 3.4-41.2-3.2C103.8 42.2 100.6 27.8 96 20z"
            fill="url(#gemini-grad)"
          />
        </svg>
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
      bg: "bg-[#D97757]",
      icon: (
        <svg width="11" height="11" viewBox="0 0 32 32" fill="#FFFFFF" className="shrink-0">
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c2.21 0 4.26.65 5.98 1.76L7.76 21.98A9.96 9.96 0 0 1 6 16c0-5.514 4.486-10 10-10zm0 20c-2.21 0-4.26-.65-5.98-1.76l14.22-14.22A9.96 9.96 0 0 1 26 16c0 5.514-4.486 10-10 10z" />
        </svg>
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
