import { changePasswordSection, passwordFields } from "@/data/mock-security";
import type { PasswordField } from "@/data/mock-security";

function PasswordInput({ field }: { field: PasswordField }) {
  const isCurrentPassword = field.name === "currentPassword";

  return (
    <div className="grow shrink basis-0 flex flex-col gap-1.75">
      <label className="text-[#475569] font-sans text-xs/4">
        {field.label}
      </label>
      <div className="flex items-center rounded-[10px] py-2.75 px-3.5 gap-2 bg-white border-[1.5px] border-border-light">
        <span
          className={`text-[#CBD5E1] font-sans text-[13px]/4 ${
            isCurrentPassword ? "tracking-[4px]" : ""
          }`}
        >
          {field.placeholder}
        </span>
      </div>
    </div>
  );
}

export function ChangePasswordCard() {
  return (
    <div className="rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Header */}
      <div className="flex justify-between items-center py-5.5 px-7 border-b border-[#F0F4F8]">
        <div>
          <h2 className="text-navy font-sans text-sm/[18px] m-0">
            {changePasswordSection.title}
          </h2>
          <p className="mt-0.75 text-[#94A3B8] font-sans text-xs/4 m-0">
            {changePasswordSection.subtitle}
          </p>
        </div>
      </div>

      {/* Password fields */}
      <div className="flex flex-col py-6 px-7 gap-4.5">
        <div className="flex flex-col lg:flex-row gap-6">
          {passwordFields.map((field) => (
            <PasswordInput key={field.name} field={field} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end py-4 px-7 bg-[#FAFBFC] border-t border-[#F0F4F8]">
        <button
          className="flex items-center rounded-[10px] py-2.5 px-5.5 gap-2 bg-teal cursor-pointer border-none hover:opacity-90 transition-opacity"
          onClick={() => console.log("ACTION: update_password")}
        >
          <span className="text-white font-sans text-[13px]/4">
            Update Password
          </span>
        </button>
      </div>
    </div>
  );
}
