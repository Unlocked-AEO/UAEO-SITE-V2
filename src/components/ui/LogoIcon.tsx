import logoSvg from "@/assets/logo.svg";

interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 28, className = "" }: LogoIconProps) {
  return (
    <img
      src={logoSvg}
      alt="Unlocked AEO"
      width={size}
      height={size}
      className={`shrink-0 rounded-[5px] ${className}`}
    />
  );
}
