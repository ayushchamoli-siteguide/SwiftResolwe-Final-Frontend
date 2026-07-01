import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, Loader2, CreditCard } from "lucide-react";
import { useMockPayment } from "@/hooks/useConsultation";

// A dummy stand-in for the Razorpay checkout overlay. It collects nothing
// real — clicking "Pay" calls the backend mock-callback which simulates the
// gateway's server-to-server confirmation (payment.captured).
export default function DummyCheckoutModal({ open, order, onSuccess, onClose }) {
  const mockPay = useMockPayment();
  const [error, setError] = useState("");

  if (!order) return null;

  const rupees = (order.amount / 100).toLocaleString("en-IN");

  const pay = async (outcome) => {
    setError("");
    try {
      const result = await mockPay.mutateAsync({
        orderId: order.orderId,
        outcome,
      });
      if (result.success) {
        onSuccess(result.data);
      } else {
        setError(result.message || "Payment failed. Please try again.");
      }
    } catch (e) {
      setError(
        e?.response?.data?.message || "Payment could not be processed.",
      );
    }
  };

  const busy = mockPay.isPending;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="dummy-checkout-modal"
        >
          <motion.div
            className="absolute inset-0 bg-[color:rgba(14,23,38,0.6)] backdrop-blur-sm"
            onClick={busy ? undefined : onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-sm w-full rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header — mimics a gateway checkout banner */}
            <div className="bg-[color:var(--accent-deep,#0e7490)] text-white px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} />
                  <span className="font-semibold text-[15px]">
                    Swift Resolwe
                  </span>
                </div>
                {!busy && (
                  <button
                    onClick={onClose}
                    data-testid="checkout-close"
                    aria-label="Close"
                    className="p-1 rounded-full hover:bg-white/15"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <div className="mt-3">
                <p className="text-[12px] uppercase tracking-wide text-white/70">
                  Amount payable
                </p>
                <p className="text-[28px] font-bold leading-tight">₹{rupees}</p>
                <p className="text-[12px] text-white/70">
                  30-minute consultation
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-xl border border-dashed border-[color:rgba(6,182,212,0.4)] bg-[color:rgba(6,182,212,0.06)] p-3 text-[12.5px] text-[color:var(--text-secondary,#475569)] mb-4">
                Test mode — no real card required. This simulates a payment and
                confirms your booking via the backend.
              </div>

              {/* Purely decorative card fields */}
              <div className="space-y-2.5 opacity-90 pointer-events-none select-none">
                <div className="h-10 rounded-lg border border-gray-200 bg-gray-50 flex items-center px-3 text-[13px] text-gray-400">
                  Card number · 4111 1111 1111 1111
                </div>
                <div className="flex gap-2.5">
                  <div className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 flex items-center px-3 text-[13px] text-gray-400">
                    12 / 34
                  </div>
                  <div className="h-10 w-20 rounded-lg border border-gray-200 bg-gray-50 flex items-center px-3 text-[13px] text-gray-400">
                    CVV
                  </div>
                </div>
              </div>

              {error && (
                <p
                  data-testid="checkout-error"
                  className="mt-3 text-[13px] text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                onClick={() => pay("success")}
                disabled={busy}
                data-testid="checkout-pay-btn"
                className="cta-primary w-full mt-5 px-5 py-3 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Processing…
                  </>
                ) : (
                  <>Pay ₹{rupees}</>
                )}
              </button>

              <button
                onClick={() => pay("failure")}
                disabled={busy}
                data-testid="checkout-fail-btn"
                className="w-full mt-2 px-5 py-2 rounded-xl text-[12.5px] font-medium text-gray-400 hover:text-gray-600 disabled:opacity-60"
              >
                Simulate failed payment
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] text-gray-400">
                <ShieldCheck size={13} />
                Secured test checkout
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
