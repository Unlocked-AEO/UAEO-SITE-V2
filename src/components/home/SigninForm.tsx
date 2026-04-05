import { useNavigate } from "react-router-dom";
import { signinForm } from "@/data/mock-signin";

export function SigninForm() {
  const navigate = useNavigate();

  return (
    <div className="grow shrink basis-[0%] flex items-center justify-center bg-white">
      <div className="w-100 flex flex-col shrink-0">
        {/* Header */}
        <div className="mb-9">
          <div className="mt-0 mb-1.5 text-[#0A2540] font-['Inter',system-ui,sans-serif] font-extrabold text-2xl/7.5 mx-0">
            {signinForm.heading}
          </div>
          <div className="text-[#64748B] font-['Inter',system-ui,sans-serif] text-sm/4.5 m-0">
            {signinForm.subtext}{" "}
            <button
              className="text-[#4ECDC4] font-['Inter',system-ui,sans-serif] text-sm/4.5 bg-transparent border-none cursor-pointer p-0 hover:underline"
              onClick={() => navigate("/signup")}
            >
              {signinForm.signupLink}
            </button>
          </div>
        </div>

        {/* Email field */}
        <div className="flex flex-col mb-4 gap-1.5">
          <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[13px]/4">
            {signinForm.emailLabel}
          </div>
          <div className="h-11 flex items-center rounded-[10px] px-3.5 bg-[#F0FDFA] [border-width:1.5px] border-solid border-[#4ECDC4] shrink-0">
            <div className="inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] shrink-0 text-sm/4.5">
              {signinForm.emailPlaceholder}
            </div>
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col mb-2 gap-1.5">
          <div className="text-[#0A2540] font-['Inter',system-ui,sans-serif] font-semibold text-[13px]/4">
            {signinForm.passwordLabel}
          </div>
          <div className="h-11 flex items-center justify-between rounded-[10px] px-3.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0">
            <div className="tracking-[3px] inline-block text-[#94A3B8] font-['Inter',system-ui,sans-serif] shrink-0 text-lg/5.5">
              {signinForm.passwordPlaceholder}
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: '0' }}>
              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#94A3B8" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2" stroke="#94A3B8" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-7">
          <button
            className="inline-block text-[#4ECDC4] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-[13px]/4 bg-transparent border-none cursor-pointer p-0 hover:underline"
            onClick={() => console.log("ACTION: forgot_password")}
          >
            {signinForm.forgotPassword}
          </button>
        </div>

        {/* Sign in button */}
        <button
          className="h-12 flex items-center justify-center mb-6 rounded-xl bg-[#4ECDC4] shrink-0 border-none cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => {
            console.log("ACTION: sign_in");
            navigate("/dashboard");
          }}
        >
          <div className="inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-bold shrink-0 text-[15px]/4.5">
            {signinForm.submitLabel}
          </div>
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6 gap-3">
          <div className="grow shrink basis-[0%] h-px bg-[#E2E8F0]" />
          <div className="inline-block text-[#94A3B8] font-['Inter',system-ui,sans-serif] shrink-0 text-xs/4">
            {signinForm.dividerText}
          </div>
          <div className="grow shrink basis-[0%] h-px bg-[#E2E8F0]" />
        </div>

        {/* Google button */}
        <button
          className="h-11 flex items-center justify-center rounded-[10px] gap-2.5 bg-white [border-width:1.5px] border-solid border-[#E2E8F0] shrink-0 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
          onClick={() => console.log("ACTION: sign_in_google")}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: '0' }}>
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          <div className="inline-block text-[#0A2540] font-['Inter',system-ui,sans-serif] font-medium shrink-0 text-sm/4.5">
            {signinForm.googleLabel}
          </div>
        </button>
      </div>
    </div>
  );
}
