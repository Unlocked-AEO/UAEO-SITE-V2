import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";
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
        <img src={openaiLogo} alt="ChatGPT" width={size} height={size} className="shrink-0" />
      );
    case "perplexity":
      return (
        <img src={perplexityLogo} alt="Perplexity" width={size} height={size} className="shrink-0" />
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
      bg: "bg-[#EAF5F0]",
      icon: (
        <img src={openaiLogo} alt="ChatGPT" width="14" height="14" className="shrink-0" />
      ),
    },
    perplexity: {
      bg: "bg-[#E8F4F5]",
      icon: (
        <img src={perplexityLogo} alt="Perplexity" width="14" height="14" className="shrink-0" />
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
