import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";
import geminiLogo from "@/assets/gemini-logo.svg";
import grokLogo from "@/assets/grok-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
import copilotLogo from "@/assets/copilot-logo.svg";

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
        <img src={grokLogo} alt="Grok" width={size} height={size} className="shrink-0" />
      );
    case "claude":
      return (
        <img src={claudeLogo} alt="Claude" width={size} height={size} className="shrink-0" />
      );
    case "copilot":
      return (
        <img src={copilotLogo} alt="Copilot" width={size} height={size} className="shrink-0" />
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
      bg: "bg-[#F5F5F5]",
      icon: (
        <img src={grokLogo} alt="Grok" width="14" height="14" className="shrink-0" />
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
        <img src={copilotLogo} alt="Copilot" width="14" height="14" className="shrink-0" />
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
