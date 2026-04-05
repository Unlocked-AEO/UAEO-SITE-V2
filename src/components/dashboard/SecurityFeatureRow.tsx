import type { SecurityFeature } from "@/data/mock-security";

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748B"
      strokeWidth="1.8"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" fill="#64748B" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748B"
      strokeWidth="1.8"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748B"
      strokeWidth="1.8"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

const iconMap = {
  lock: LockIcon,
  shield: ShieldIcon,
  key: KeyIcon,
};

const badgeStyles = {
  muted: "bg-[#F0F4F8] text-[#94A3B8]",
  purple: "bg-[#F5F3FF] text-[#7C3AED]",
};

const buttonStyles = {
  default:
    "bg-[#FAFBFC] border-[1.5px] border-border-light hover:bg-[#F0F4F8]",
  purple:
    "bg-[#F5F3FF] border-[1.5px] border-[#DDD6FE] hover:bg-[#EDE9FE]",
};

export function SecurityFeatureRow({ feature }: { feature: SecurityFeature }) {
  const Icon = iconMap[feature.icon];

  return (
    <div className="flex items-center rounded-[14px] py-5.5 px-7 gap-5 bg-white border border-border-light flex-col sm:flex-row">
      {/* Icon */}
      <div className="flex items-center justify-center shrink-0 rounded-xl bg-[#F0F4F8] size-11">
        <Icon />
      </div>

      {/* Text */}
      <div className="grow">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-navy font-sans text-sm/[18px]">
            {feature.title}
          </span>
          {feature.badge && (
            <span
              className={`rounded-md py-0.75 px-2 ${
                badgeStyles[feature.badgeVariant]
              }`}
            >
              <span className="tracking-[0.05em] font-sans text-[10px]/3">
                {feature.badge}
              </span>
            </span>
          )}
        </div>
        <p className="mt-1 text-[#94A3B8] font-sans text-xs/4 m-0">
          {feature.description}
        </p>
      </div>

      {/* Button */}
      <button
        className={`shrink-0 rounded-[10px] py-2.25 px-4.5 cursor-pointer transition-colors text-navy font-sans text-base/5 ${
          buttonStyles[feature.buttonVariant]
        }`}
        onClick={() =>
          console.log(`ACTION: ${feature.buttonAction}`, { id: feature.id })
        }
      >
        {feature.buttonLabel}
      </button>
    </div>
  );
}
