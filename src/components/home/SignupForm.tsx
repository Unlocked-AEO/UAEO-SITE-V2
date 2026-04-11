import { useNavigate } from "react-router-dom";
import {
  signupFieldsRow1,
  signupFieldsRow2,
  signupFieldsRow3,
  signupOptionalField,
} from "@/data/mock-signup";
import type { SignupField } from "@/data/mock-signup";

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: '0' }}>
      <path d="M4 6l4 4 4-4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: '0' }}>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" stroke="#94A3B8" strokeWidth="1.5" />
    </svg>
  );
}

function FormField({ field }: { field: SignupField }) {
  const isPassword = field.type === "password";
  const isSelect = field.type === "select";

  return (
    <div className="grow shrink basis-[0%] flex flex-col gap-1.5">
      <div className="text-[#0A2540] font-sans font-semibold text-[13px]/4">
        {field.label}{field.required ? " *" : ""}
      </div>
      <div className={`h-11 flex items-center ${isSelect || isPassword ? "justify-between" : ""} rounded-[10px] px-3.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0`}>
        <div className={`inline-block text-[#94A3B8] font-sans shrink-0 ${isPassword ? "tracking-[3px] text-lg/5.5" : "text-sm/4.5"}`}>
          {field.placeholder}
        </div>
        {isSelect && <ChevronDownIcon />}
        {isPassword && <EyeIcon />}
      </div>
      {field.hint && (
        <div className="inline-block text-[#94A3B8] font-sans text-[11px]/3.5">
          {field.hint}
        </div>
      )}
    </div>
  );
}

export function SignupForm() {
  const navigate = useNavigate();

  return (
    <div className="grow shrink basis-[0%] flex items-center justify-center overflow-clip bg-white">
      <div className="w-130 flex flex-col shrink-0">
        {/* Header */}
        <div className="mb-8">
          <div className="mt-0 mb-1.5 text-[#0A2540] font-sans font-extrabold text-2xl/7.5 mx-0">
            Create your account
          </div>
          <div className="text-[#64748B] font-sans text-sm/4.5 m-0">
            Already have an account?{" "}
            <button
              className="text-[#4ECDC4] font-sans text-sm/4.5 bg-transparent border-none cursor-pointer p-0 hover:underline"
              onClick={() => {
                console.log("ACTION: navigate_signin");
                navigate("/signin");
              }}
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Row 1: Company Name + Website */}
        <div className="flex mb-4 gap-4">
          {signupFieldsRow1.map((field) => (
            <FormField key={field.label} field={field} />
          ))}
        </div>

        {/* Row 2: Email + Industry */}
        <div className="flex mb-4 gap-4">
          {signupFieldsRow2.map((field) => (
            <FormField key={field.label} field={field} />
          ))}
        </div>

        {/* Row 3: Password + Team Size */}
        <div className="flex mb-4 gap-4">
          {signupFieldsRow3.map((field) => (
            <FormField key={field.label} field={field} />
          ))}
        </div>

        {/* Optional: How did you hear about us */}
        <div className="flex flex-col mb-7 gap-1.5">
          <div className="text-[#0A2540] font-sans font-semibold text-[13px]/4">
            {signupOptionalField.label}
          </div>
          <div className="h-11 flex items-center justify-between rounded-[10px] px-3.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0">
            <div className="inline-block text-[#94A3B8] font-sans shrink-0 text-sm/4.5">
              {signupOptionalField.placeholder}
            </div>
            <ChevronDownIcon />
          </div>
        </div>

        {/* Submit */}
        <button
          className="h-12 flex items-center justify-center mb-4 rounded-xl bg-[#4ECDC4] shrink-0 border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: create_account")}
        >
          <div className="inline-block text-[#0A2540] font-sans font-bold shrink-0 text-[15px]/4.5">
            Create account
          </div>
        </button>

        {/* Legal */}
        <div className="text-[12px] text-center leading-[round(up,160%,1px)] text-[#94A3B8] font-sans m-0">
          By creating an account you agree to our{" "}
          <button
            className="text-[#94A3B8] font-sans text-[12px] bg-transparent border-none cursor-pointer p-0 underline hover:text-[#64748B]"
            onClick={() => navigate("/terms")}
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            className="text-[#94A3B8] font-sans text-[12px] bg-transparent border-none cursor-pointer p-0 underline hover:text-[#64748B]"
            onClick={() => navigate("/privacy")}
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
