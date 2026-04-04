import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-md transition-opacity hover:opacity-90 cursor-pointer";

  const variants = {
    primary: "bg-teal text-white",
    dark: "bg-navy text-white",
    outline: "bg-white border-[1.5px] border-solid border-border-input text-slate-text",
    ghost: "bg-transparent text-slate-text",
  };

  const sizes = {
    sm: "py-[7px] px-4 text-[13px]/4",
    md: "py-[11px] px-5.5 text-[15px]/[18px]",
    lg: "py-3.5 px-7 text-[15px]/[18px]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
