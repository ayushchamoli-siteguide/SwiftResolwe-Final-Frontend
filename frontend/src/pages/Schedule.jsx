import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarCheck, Clock, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Payment is disabled for launch. Keep the checkout imports around (commented)
// so a real gateway can be wired back in later.
// import DummyCheckoutModal from "@/components/swift/DummyCheckoutModal";
import {
  DISPUTE_CATEGORIES,
  useConsultationSlots,
  useCreateConsultationOrder,
  useMockPayment,
} from "@/hooks/useConsultation";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  category: z.enum(
    ["B2C", "B2B", "MSME", "BANKS_NBFC", "ENTERPRISE", "CROSS_BORDER"],
    { errorMap: () => ({ message: "Select a dispute category" }) },
  ),
});

// Local calendar day → "YYYY-MM-DD" (treated as the IST business day).
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatSlotTime(iso) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function formatSlotFull(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

export default function Schedule() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedSlot, setSelectedSlot] = useState(null);
  // Payment disabled for launch — checkout modal state kept for future use.
  // const [order, setOrder] = useState(null);
  // const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const dateKey = selectedDate ? toDateKey(selectedDate) : null;
  const slotsQuery = useConsultationSlots(dateKey);
  const createOrder = useCreateConsultationOrder();
  const mockPay = useMockPayment();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });
  const category = watch("category");

  // Disable past days and weekends (Mon–Fri only, matching backend hours).
  const disabledDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const day = d.getDay();
      return d < today || day === 0 || day === 6;
    };
  }, []);

  const slots = slotsQuery.data?.slots ?? [];

  const onDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const onSubmit = async (values) => {
    if (!selectedSlot) {
      toast.error("Please pick a time slot.");
      return;
    }
    try {
      const created = await createOrder.mutateAsync({
        ...values,
        slotStart: selectedSlot,
      });

      // ── Payment step disabled for launch ──────────────────────────────
      // Previously this opened the dummy checkout overlay:
      //   setOrder(created);
      //   setCheckoutOpen(true);
      // For now we confirm the booking directly (no fee). To re-enable a
      // real gateway later, restore the two lines above and drop the
      // auto-confirm call below.
      const result = await mockPay.mutateAsync({
        orderId: created.orderId,
        outcome: "success",
      });
      if (result.success) {
        onPaymentSuccess(result.data);
      } else {
        toast.error(result.message || "Could not confirm the booking.");
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
          "Could not reserve the slot. Please try another time.",
      );
    }
  };

  const onPaymentSuccess = (data) => {
    // setCheckoutOpen(false);
    setConfirmed(data);
    toast.success("Consultation confirmed! Check your email for details.");
    // Free-up view: refetch availability so the booked slot disappears.
    queryClient.invalidateQueries({ queryKey: ["consultation-slots"] });
  };

  // ── Success screen ──
  if (confirmed) {
    return (
      <main className="relative pt-32 md:pt-40 pb-32 min-h-[80vh] bg-radial-cyan">
        <div className="max-w-lg mx-auto px-5 sm:px-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[color:rgba(16,185,129,0.12)] flex items-center justify-center text-[color:var(--positive,#10b981)] mb-6">
            <CheckCircle2 size={28} />
          </div>
          <h1 className="font-display text-[30px] md:text-[38px] font-semibold tracking-tight text-[color:var(--text-primary)]">
            Consultation confirmed
          </h1>
          <p className="mt-4 text-[15px] text-[color:var(--text-secondary)]">
            Your 30-minute consultation is booked for{" "}
            <strong>{formatSlotFull(confirmed.slotStart)}</strong>. A
            confirmation with the meeting link has been emailed to you.
          </p>
          <div className="mt-7 rounded-xl border border-[color:var(--border-soft)] bg-white p-5 text-left">
            <p className="text-[12px] uppercase tracking-wide text-[color:var(--text-muted)]">
              Meeting link
            </p>
            <a
              href={confirmed.meetingLink}
              target="_blank"
              rel="noreferrer"
              data-testid="confirmed-meeting-link"
              className="text-[15px] font-medium text-[color:var(--accent-deep)] break-all hover:underline"
            >
              {confirmed.meetingLink}
            </a>
          </div>
          <Link
            to="/"
            className="cta-secondary inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-[14px] font-semibold"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </div>
      </main>
    );
  }

  // ── Booking form ──
  return (
    <main className="relative pt-28 md:pt-36 pb-28 min-h-[80vh] bg-radial-cyan">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[color:rgba(6,182,212,0.12)] flex items-center justify-center text-[color:var(--accent-deep)] mb-5">
            <CalendarCheck size={24} />
          </div>
          <h1 className="font-display text-[32px] md:text-[42px] font-semibold tracking-tight text-[color:var(--text-primary)]">
            Schedule a 30-min Consultation
          </h1>
          <p className="mt-4 text-[15.5px] text-[color:var(--text-secondary)] max-w-xl mx-auto">
            Pick a time, share a few details, and confirm your slot. Slots are
            30 minutes, Mon–Fri.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: calendar + slots */}
          <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-5">
            <p className="font-semibold text-[15px] text-[color:var(--text-primary)] mb-3">
              1. Choose a date
            </p>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                disabled={disabledDays}
                data-testid="schedule-calendar"
              />
            </div>

            {selectedDate && (
              <div className="mt-5">
                <p className="font-semibold text-[15px] text-[color:var(--text-primary)] mb-3 flex items-center gap-2">
                  <Clock size={15} /> 2. Choose a time
                </p>
                {slotsQuery.isLoading ? (
                  <div className="flex items-center gap-2 text-[14px] text-[color:var(--text-muted)] py-4">
                    <Loader2 size={15} className="animate-spin" /> Loading
                    slots…
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-[14px] text-[color:var(--text-muted)] py-4">
                    No slots available for this date. Please pick another day.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((s) => {
                      const active = selectedSlot === s.slotStart;
                      return (
                        <button
                          key={s.slotStart}
                          type="button"
                          data-testid="slot-btn"
                          onClick={() => setSelectedSlot(s.slotStart)}
                          className={`px-2 py-2 rounded-lg text-[13px] font-medium border transition ${
                            active
                              ? "bg-[color:var(--accent-deep,#0e7490)] text-white border-transparent"
                              : "bg-white text-[color:var(--text-primary)] border-[color:var(--border-soft)] hover:border-[color:var(--accent)]"
                          }`}
                        >
                          {formatSlotTime(s.slotStart)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: details form */}
          <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-5">
            <p className="font-semibold text-[15px] text-[color:var(--text-primary)] mb-4">
              3. Your details
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  data-testid="full-name-input"
                  placeholder="Jane Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-[12.5px] text-red-600 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="email-input"
                  placeholder="you@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[12.5px] text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  inputMode="tel"
                  data-testid="phone-input"
                  placeholder="+91 98765 43210"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-[12.5px] text-red-600 mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Dispute category</Label>
                <Select
                  value={category}
                  onValueChange={(v) =>
                    setValue("category", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger data-testid="category-select">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPUTE_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-[12.5px] text-red-600 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="rounded-lg bg-[color:rgba(6,182,212,0.06)] border border-[color:var(--border-soft)] px-3 py-2.5 text-[13px] text-[color:var(--text-secondary)]">
                {selectedSlot ? (
                  <>
                    Selected slot:{" "}
                    <strong>{formatSlotFull(selectedSlot)}</strong>
                  </>
                ) : (
                  "Pick a date and time on the left to continue."
                )}
              </div>

              <button
                type="submit"
                data-testid="pay-confirm-btn"
                disabled={createOrder.isPending || mockPay.isPending || !selectedSlot}
                className="cta-primary w-full px-5 py-3 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {createOrder.isPending || mockPay.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Confirming…
                  </>
                ) : (
                  <>Confirm</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Payment disabled for launch. Re-enable for a real gateway:
      <DummyCheckoutModal
        open={checkoutOpen}
        order={order}
        onSuccess={onPaymentSuccess}
        onClose={() => setCheckoutOpen(false)}
      /> */}
    </main>
  );
}
