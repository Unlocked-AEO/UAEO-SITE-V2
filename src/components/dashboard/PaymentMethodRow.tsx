import { paymentMethod } from "@/data/mock-billing";

export function PaymentMethodRow() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center rounded-[14px] py-5.5 px-7 gap-5 bg-white border border-border-light">
      {/* Card icon */}
      <div className="w-11 h-7.5 flex items-center justify-center shrink-0 rounded-md bg-[#1A1F71]">
        <span className="tracking-[-0.5px] text-white font-sans text-[11px]/[14px] font-bold">
          {paymentMethod.brand}
        </span>
      </div>

      {/* Details */}
      <div className="grow">
        <div className="text-navy font-sans text-[13px]/4">
          {paymentMethod.brand} ending in {paymentMethod.last4}
        </div>
        <div className="mt-0.5 text-[#94A3B8] font-sans text-xs/4">
          Expires {paymentMethod.expiry} · Billing email:{" "}
          {paymentMethod.billingEmail}
        </div>
      </div>

      {/* Update button */}
      <button
        className="rounded-[10px] py-2 px-4.5 border-[1.5px] border-border-light bg-white cursor-pointer hover:bg-surface transition-colors"
        onClick={() => console.log("ACTION: update_payment_method")}
      >
        <span className="text-navy font-sans text-[13px]/4 font-medium">
          Update Payment
        </span>
      </button>
    </div>
  );
}
