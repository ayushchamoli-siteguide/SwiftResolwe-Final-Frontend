import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";

// Dispute categories — value maps to the backend `DisputeCategory` enum,
// label matches the Triage Engine wording on the site.
export const DISPUTE_CATEGORIES = [
  { value: "B2C", label: "B2C" },
  { value: "B2B", label: "B2B" },
  { value: "MSME", label: "MSME" },
  { value: "BANKS_NBFC", label: "Banks and NBFCs" },
  { value: "ENTERPRISE", label: "Enterprise" },
  { value: "CROSS_BORDER", label: "Cross Border" },
];

// GET available 30-minute slots for a date (YYYY-MM-DD).
export function useConsultationSlots(date) {
  return useQuery({
    queryKey: ["consultation-slots", date],
    enabled: Boolean(date),
    staleTime: 30_000,
    queryFn: async () => {
      const { data } = await apiClient.get("/api/consultations/slots", {
        params: { date },
      });
      return data.data; // { date, slotMinutes, slots: [...] }
    },
  });
}

// POST create a booking order (reserves the slot with a soft-lock).
export function useCreateConsultationOrder() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post(
        "/api/consultations/order",
        payload,
      );
      return data.data; // { bookingId, orderId, amount, currency, keyId, ... }
    },
  });
}

// POST the dummy checkout result (simulates the gateway → backend confirm).
export function useMockPayment() {
  return useMutation({
    mutationFn: async ({ orderId, outcome = "success" }) => {
      const { data } = await apiClient.post(
        "/api/consultations/payment/mock-callback",
        { orderId, outcome },
      );
      return data; // { success, message, data? }
    },
  });
}
